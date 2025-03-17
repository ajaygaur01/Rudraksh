import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    console.log("🔹 API /api/cart/remove called");

    const userId = req.headers.get("x-user-id"); // Get userId from JWT token
    console.log("✅ Extracted User ID:", userId || "No userId found in headers");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: User ID missing" }, { status: 401 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: "Invalid input: productId is required" }, { status: 400 });
    }

    // 🔹 Find UserDetails (Corrected)
    const userDetails = await prisma.userDetails.findFirst({ where: { userId : prisma.userDetails.id} });

    if (!userDetails) {
      console.log("❌ No UserDetails found for userId:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("✅ Found UserDetails with ID:", userDetails.id);

    // 🔹 Find the cart using userDetails.id (NOT userId directly)
    const cart = await prisma.cart.findFirst({
      where: { userId: userDetails.id },
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    console.log("🛒 Found Cart with ID:", cart.id);

    // 🔹 Check if the item exists in the cart
    const cartItem = await prisma.cartItem.findFirst({
      where: { cartId:prisma.cartItem.CartId, productId:prisma.cartItem.productId },
    });

    if (!cartItem) {
      console.log("❌ Item not found in cart:", productId);
      return NextResponse.json({ error: "Item not found in cart" }, { status: 404 });
    }

    console.log("✅ Found Cart Item with Quantity:", cartItem.quantity);

    // 🔹 Remove item from cart & update stock in transaction
    await prisma.$transaction([
      prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId },
      }),
      prisma.productDetails.update({
        where: { id: productId },
        data: { stock: { increment: cartItem.quantity } }, // Restore stock when item is removed
      }),
    ]);

    console.log("✅ Item removed from cart & stock updated");

    // 🔹 Fetch updated cart after deletion
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json(
      { message: "Item removed from cart", cart: updatedCart },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Server Error:", error);

    if (error.code === "P2003") {
      return NextResponse.json({ error: "Invalid foreign key reference" }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    console.log("🔹 API /api/cart/add called");

    const userId = req.headers.get("x-user-id"); // Get userId from JWT token
    console.log("✅ Extracted User ID:", userId || "No userId found in headers");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: User ID missing" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();
    if (!productId || quantity == null || quantity <= 0) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // First, find the UserDetails record where userId matches the JWT token ID
    const userDetails = await prisma.userDetails.findFirst({ 
      where: { id:prisma.userDetails.id } 
    });
    
    if (!userDetails) {
      console.log("❌ No UserDetails found for userId:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("✅ Found UserDetails with ID:", userDetails.id);

    // Fetch product and check stock
    const product = await prisma.productDetails.findUnique({ where: { id: productId } });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    if (product.stock < quantity) return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });

    // Use userDetails.id (NOT userId) for the cart
    const cart = await prisma.cart.upsert({
      where: { userId: userDetails.id }, // This is using userDetails.id as the foreign key
      update: {},
      create: { userId: userDetails.id }, // This is using userDetails.id as the foreign key
    });

    console.log("🛒 Cart upserted with ID:", cart.id);

    // Add item to cart and update stock
    await prisma.$transaction([
      prisma.cartItem.upsert({
        where: { cartId_productId: { cartId: cart.id, productId } },
        update: { quantity: { increment: quantity } },
        create: { cartId: cart.id, productId, quantity },
      }),
      prisma.productDetails.update({
        where: { id: productId },
        data: { stock: { decrement: quantity } },
      }),
    ]);

    return NextResponse.json({ message: "Item added to cart" }, { status: 200 });
  } catch (error: unknown) {
    console.error("❌ Server Error:", error);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).code === "P2003") {
      return NextResponse.json({ error: "Invalid foreign key reference" }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
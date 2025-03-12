import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    console.log("🔹 API /api/cart/add called");

    const userId = req.headers.get("X-User-Id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: User ID missing" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();
    if (!productId || quantity == null || quantity <= 0) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const [user, product] = await prisma.$transaction([
      prisma.userDetails.findUnique({ where: { id: userId } }),
      prisma.productDetails.findUnique({ where: { id: productId } }),
    ]);

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    if (product.stock < quantity) return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });

    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    await prisma.$transaction([
      prisma.cartItem.upsert({
        where: { cartId_productId: { cartId: cart.id, productId } },
        update: { quantity: { increment: quantity } },
        create: { cartId: cart.id, productId, quantity },
      }),
      prisma.productDetails.update({
        where: { id: productId },
        data: { stock: { decrement: quantity } }, // Deduct stock
      }),
    ]);

    return NextResponse.json({ message: "Item added to cart" }, { status: 200 });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

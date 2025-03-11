import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // ✅ Extract userId from request headers (middleware sets this automatically)
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: User ID missing" }, { status: 401 });
    }

    // ✅ Parse request body
    const { productId, quantity } = await req.json();

    if (!productId || quantity == null || quantity <= 0) {
      return NextResponse.json(
        { error: "Invalid input: productId and quantity must be provided and greater than 0" },
        { status: 400 }
      );
    }

    // ✅ Fetch user details and product efficiently
    const [userDetails, product] = await prisma.$transaction([
      prisma.userDetails.findUnique({ where: { userId } }),
      prisma.productDetails.findUnique({ where: { id: productId } }),
    ]);

    if (!userDetails) {
      return NextResponse.json(
        { error: "User details not found", details: `No UserDetails found for userId: ${userId}` },
        { status: 404 }
      );
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { error: "Insufficient stock available", stock: product.stock },
        { status: 400 }
      );
    }

    // ✅ Transaction for handling cart operations
    const updatedCart = await prisma.$transaction(async (tx) => {
      // Find or create cart
      let cart = await tx.cart.findUnique({
        where: { userId: userDetails.id },
        include: { items: true },
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: { userId: userDetails.id },
          include: { items: true },
        });
      }

      // Check if item already exists in cart
      const existingCartItem = cart.items.find((item) => item.productId === productId);
      const newQuantity = existingCartItem ? existingCartItem.quantity + quantity : quantity;

      if (newQuantity > product.stock) {
        throw new Error("Cannot add more than available stock");
      }

      // Add or update cart item
      await tx.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
        update: { quantity: { increment: quantity } },
        create: {
          cart: { connect: { id: cart.id } },
          product: { connect: { id: productId } },
          quantity,
        },
      });

      return tx.cart.findUnique({
        where: { id: cart.id },
        include: { items: { include: { product: true } } },
      });
    });

    return NextResponse.json({ message: "Item added to cart", cart: updatedCart }, { status: 200 });
  } catch (error) {
    console.error("Cart add error:", error);

    return NextResponse.json(
      {
        error: "Failed to process cart request",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // ✅ Ensure Prisma connection is closed
  }
}

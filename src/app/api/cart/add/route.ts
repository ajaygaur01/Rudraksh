import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken'; // If using JWT authentication

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Extract userId from cookie (assuming JWT is used)
    const token = req.cookies.get('authToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
    }

    // Verify and decode the token (use your secret key)
    let decoded;
    try {
      decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = decoded.userId; // Extracted userId

    // Parse JSON request body
    const body = await req.json();
    const { productId, quantity } = body;

    if (!productId || quantity == null || quantity <= 0) {
      return NextResponse.json(
        { error: 'Invalid input: productId and quantity are required' },
        { status: 400 }
      );
    }

    // Find UserDetails associated with the User
    const userDetails = await prisma.userDetails.findUnique({
      where: { userId },
    });

    if (!userDetails) {
      return NextResponse.json(
        { error: 'User details not found', details: `No UserDetails found for userId: ${userId}` },
        { status: 404 }
      );
    }

    // Check if product exists
    const product = await prisma.productDetails.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Ensure stock is available before adding
    if (product.stock < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock available' },
        { status: 400 }
      );
    }

    // Start a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Check if user already has a cart
      let cart = await tx.cart.findUnique({
        where: { userId: userDetails.id },
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: { userId: userDetails.id },
        });
      }

      const existingCartItem = await tx.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
      });

      const newQuantity = existingCartItem ? existingCartItem.quantity + quantity : quantity;

      if (newQuantity > product.stock) {
        throw new Error('Cannot add more than available stock');
      }

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

      return await tx.cart.findUnique({
        where: { id: cart.id },
        include: { items: true },
      });
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Cart add error:', error);

    return NextResponse.json(
      {
        error: 'Failed to process cart request',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: String(error),
      },
      { status: 500 }
    );
  }
}

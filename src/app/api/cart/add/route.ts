import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Parse JSON request body
    const body = await req.json();
    const { productId, userId, quantity } = body;

    // Validate input
    if (!userId || !productId || quantity == null || quantity <= 0) {
      return NextResponse.json(
        { error: 'Invalid input: userId, productId, and quantity are required' },
        { status: 400 }
      );
    }

    // Find UserDetails associated with the User
    const userDetails = await prisma.userDetails.findUnique({
      where: { userId }, // Ensure this matches the schema
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

    // Start a transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Check if user already has a cart
      let cart = await tx.cart.findUnique({
        where: { userId: userDetails.id }, // Corrected userId reference
      });

      // If no cart exists, create one
      if (!cart) {
        cart = await tx.cart.create({
          data: { userId: userDetails.id }, // Use the correct ID
        });
      }

      // Add item to cart (upsert to avoid duplicates)
      const cartItem = await tx.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
        update: {
          quantity: { increment: quantity },
        },
        create: {
          cart: { connect: { id: cart.id } },
          product: { connect: { id: productId } },
          quantity,
        },
      });

      return cartItem;
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

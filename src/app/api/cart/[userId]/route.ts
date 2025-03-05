import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: { userId: string } }) {
  try {
    const { userId } = context.params;

    console.log("Incoming Request for userId:", userId); // Debugging

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Find User
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    console.log("User Found:", user); // Debugging

    if (!user) {
      return NextResponse.json(
        { error: 'User not found', details: `No User found for userId: ${userId}` },
        { status: 404 }
      );
    }

    // Find UserDetails
    const userDetails = await prisma.userDetails.findUnique({
      where: { userId },
    });

    console.log("UserDetails Found:", userDetails); // Debugging

    if (!userDetails) {
      return NextResponse.json(
        { error: 'User details not found', details: `No UserDetails found for userId: ${userId}` },
        { status: 404 }
      );
    }

    // Fetch cart associated with UserDetails
    const cart = await prisma.cart.findUnique({
      where: { userId: userDetails.userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    console.log("Cart Found:", cart); // Debugging

    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found', details: `No Cart found for userId: ${userId}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ items: cart.items || [] }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart', details: String(error) },
      { status: 500 }
    );
  }
}
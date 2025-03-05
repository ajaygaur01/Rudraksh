import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const deletedItems = await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    });

    if (deletedItems.count === 0) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item removed from cart' }, { status: 200 });
  } catch (error) {
    console.error('Error removing item:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

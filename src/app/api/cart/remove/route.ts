import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    // Parse request body
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json({ error: "Invalid input: userId and productId are required" }, { status: 400 });
    }

    // Find UserDetails (Cart is linked to UserDetails, not User)
    const userDetails = await prisma.userDetails.findUnique({
      where: { userId },
    });

    if (!userDetails) {
      return NextResponse.json({ error: "User details not found" }, { status: 404 });
    }

    // Find Cart
    const cart = await prisma.cart.findUnique({
      where: { userId: userDetails.id }, // Correct `userId`
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Delete the cart item
    const deletedItem = await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (deletedItem.count === 0) {
      return NextResponse.json({ error: "Item not found in cart" }, { status: 404 });
    }

    // Fetch updated cart after deletion
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json({ message: "Item removed from cart", cart: updatedCart }, { status: 200 });

  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json({ error: "Server error", details: String(error) }, { status: 500 });
  }
}

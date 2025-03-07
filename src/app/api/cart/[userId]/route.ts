import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Extract userId from request headers (set by middleware)
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: User ID missing" }, { status: 401 });
    }

    console.log("Incoming Request for userId:", userId);

    // Find UserDetails (Cart is linked to UserDetails)
    const userDetails = await prisma.userDetails.findUnique({
      where: { userId },
    });

    if (!userDetails) {
      return NextResponse.json(
        { error: "User details not found", details: `No UserDetails found for userId: ${userId}` },
        { status: 404 }
      );
    }

    // Fetch Cart
    const cart = await prisma.cart.findUnique({
      where: { userId: userDetails.id }, // Correct reference
      include: { 
        items: { include: { product: true } } // Fetch product details
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ message: "Cart is empty", items: [] }, { status: 200 });
    }

    return NextResponse.json({ cart }, { status: 200 });

  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart", details: String(error) }, { status: 500 });
  }
}

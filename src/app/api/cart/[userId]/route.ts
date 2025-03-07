import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken'; // Use JWT to decode userId

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Extract token from cookies
    const token = req.cookies.get('authToken')?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token found" }, { status: 401 });
    }

    // Verify and decode the token (ensure JWT_SECRET is defined in .env)
    let decoded;
    try {
      decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.userId; // Extracted userId

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

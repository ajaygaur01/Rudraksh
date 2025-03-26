import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';// Ensure you have Prisma client set up
const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { productId: string } }) {
  const { productId } = params;

  try {
    const reviews = await prisma.review.findMany({
      where: { productId },
      include: { user: true }, // Include user details for each review
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

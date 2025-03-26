import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    console.log("🔹 API /api/reviews/add called");

    // Get userId from the header
    const userId = req.headers.get("Authorization");
    console.log("✅ Extracted User ID:", userId || "No userId found in headers");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: User ID missing" }, { status: 401 });
    }

    // Parse request body
    const { productId, rating, description } = await req.json();

    // Validate input
    if (!productId || !rating || rating < 1 || rating > 5 || !description.trim()) {
      return NextResponse.json(
        { error: "Invalid input: Ensure productId, rating (1-5), and description are provided" },
        { status: 400 }
      );
    }

    // Check if the product exists
    const product = await prisma.productDetails.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if the user exists
    const userDetails = await prisma.userDetails.findFirst({
      where: { id: prisma.userDetails.id },
    });
    if (!userDetails) {
      console.log("❌ No UserDetails found for userId:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("✅ User and Product validation passed.");

    // Add a review
    const review = await prisma.review.create({
      data: {
        productId,
        userId: userDetails.id, // Use the `userDetails.id` as the foreign key
        rating,
        description,
      },
    });

    console.log("✅ Review created with ID:", review.id);

    return NextResponse.json({ message: "Review added successfully", review }, { status: 200 });
  } catch (error: unknown) {
    console.error("❌ Server Error:", error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    console.log("🔎 Search API Called");

    // Extract search query from request URL
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    if (!query.trim()) {
      return NextResponse.json({ error: "Search query is empty" }, { status: 400 });
    }

    console.log("🔎 Searching for:", query);

    // Search in product name & description using Prisma's `contains`
    const products = await prisma.productDetails.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("❌ Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

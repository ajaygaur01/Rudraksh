import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
      console.log("🔹 API /api/wishlist called");
  
      const userId = req.headers.get("x-user-id");
      console.log("✅ Extracted User ID:", userId || "No userId found in headers");
  
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized: User ID missing" }, { status: 401 });
      }
  
      const wishlist = await prisma.wishlist.findMany({
        where: { userId: prisma.wishlist.userId },
        include: {
          product: true, // Include product details
        },
      });
  
      return NextResponse.json({ wishlist }, { status: 200 });
    } catch (error: unknown) {
      console.error("❌ Server Error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }
  
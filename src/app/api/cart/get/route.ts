import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    console.log("🔹 API /api/cart called");

    // ✅ Extract userId from middleware-injected headers
    const userId = req.headers.get("X-User-Id");
    console.log("✅ Extracted User ID:", userId);

    if (!userId) {
      console.error("❌ Missing User ID in headers");
      return NextResponse.json({ error: "Unauthorized: User ID missing" }, { status: 401 });
    }
         
    const cartdetails = await prisma.cart.findFirst()
    const userkiid = cartdetails.userId
    console.log("-------------------" , userkiid)





    // ✅ Fetch Cart with Items
    const cart = await prisma.cart.findFirst({
      where: { userId: userkiid },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      console.log("🛒 No Cart Found for user", userId);
      return NextResponse.json({ cart: [], message: "Cart is empty" }, { status: 200 });
    }

    console.log("✅ Cart Fetched Successfully");
    return NextResponse.json({ cart }, { status: 200 });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export const config = {
  runtime: "nodejs",
};
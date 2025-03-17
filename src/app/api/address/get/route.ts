import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    console.log("🔹 API /api/address/get called");

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: User ID missing" }, { status: 401 });
    }

    const address = await prisma.address.findMany({
      where: { userId },
    });

    return NextResponse.json({ address }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

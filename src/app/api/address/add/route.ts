import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    console.log("🔹 API /api/address/add called");

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: User ID missing" }, { status: 401 });
    }

    const { street, city, state, country, zipCode } = await req.json();
    if (!street || !city || !state || !country || !zipCode) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const address = await prisma.address.create({
      data: { userId, street, city, state, country, zipCode },
    });

    return NextResponse.json({ message: "Address created", address }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

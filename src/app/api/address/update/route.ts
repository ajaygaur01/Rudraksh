import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    console.log("🔹 API /api/address/update called");

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: User ID missing" }, { status: 401 });
    }

    const { id, street, city, state, country, zipCode } = await req.json();
    if (!id || !street || !city || !state || !country || !zipCode) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const updatedAddress = await prisma.address.update({
      where: { id },
      data: { street, city, state, country, zipCode },
    });

    return NextResponse.json({ message: "Address updated", address: updatedAddress }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Extract user ID from request headers (set by middleware)
    const userId = req.headers.get("X-User-Id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: No user ID found" }, { status: 401 });
    }

    // Fetch user details from the database
    const user = await prisma.userDetails.findFirst({
      where: { id:  prisma.userDetails.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

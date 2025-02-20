import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await prisma.userDetails.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }
    return NextResponse.json(
      { user: { id: user.id, name: user.name, email: user.email, role: user.role } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  } finally {
    await prisma.$disconnect();
  }
}
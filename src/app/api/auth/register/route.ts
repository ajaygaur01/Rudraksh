import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUserDetails = await prisma.userDetails.findUnique({ where: { email } });
    if (existingUserDetails) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user, userDetails] = await prisma.$transaction([
      prisma.user.upsert({
        where: { email },
        update: { name },
        create: { email, name },
      }),
      prisma.userDetails.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: false,
          user: { connect: { email } }, // No need to fetch user separately
        },
      }),
    ]);

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET environment variable is not defined");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const token = jwt.sign({ id:userDetails.id, email: userDetails.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: { id: userDetails.id, name: userDetails.name, email: userDetails.email, role: userDetails.role },
      },
      { status: 201 }
    );

    response.cookies.set("auth_token", token, {
     // httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Install via npm if not already installed

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    const existingUser = await prisma.userDetails.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.userDetails.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: false,
      },
    });

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email },process.env.JWT_SECRET!, { expiresIn: "7d" });

    // Set the cookie in the response
    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );

    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true, // Prevent client-side access
      secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

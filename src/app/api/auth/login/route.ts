import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req : Request) {
  try {
    // Extract email and password from the request
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Find the user in the database
    const user = await prisma.userDetails.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Compare password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    // Create response and set the cookie correctly
    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });

    response.headers.set(
      "Set-Cookie",
      `auth_token=${token}; Path=/; HttpOnly; Secure=${process.env.NODE_ENV === "production"}; SameSite=Lax; Max-Age=604800`
    );

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

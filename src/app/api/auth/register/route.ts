import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();
    console.log("Received body:", body);

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Invalid request. No data received." }, { status: 400 });
    }

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user with this email already exists
    const existingUserDetails = await prisma.userDetails.findUnique({ where: { email } });
    if (existingUserDetails) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Create or find a User record first
    let user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
        }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Now create the UserDetails record
    const userDetails = await prisma.userDetails.create({
      data: {
        id: crypto.randomUUID(),
        name,
        email,
        password: hashedPassword,
        role: false,
        userId: user.id, // This links to the User record we created above
      },
    });

    console.log("✅ UserDetails created:", userDetails);

    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET environment variable is not defined");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const token = jwt.sign(
      { userId: userDetails.id, email: userDetails.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );
    console.log("✅ Generated Token:", token);

    // Return response with cookies
    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: { 
          id: userDetails.id, 
          name: userDetails.name, 
          email: userDetails.email, 
          role: userDetails.role 
        },
      },
      { status: 201 }
    );

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sendResetEmail } from "@/utils/sendEmail"; // You will create this function

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.userDetails.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry
    console.log('Reached here');
    await prisma.userDetails.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });
    console.log('Reached here too');
    // Send email with reset link
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;
    await sendResetEmail(email, resetUrl);

    return NextResponse.json({ message: "Password reset email sent" }, { status: 200 });

  } catch (error) {
    console.error("Error during password reset request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Cashfree } from "cashfree-pg";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { orderId } = await req.json();
    if (!orderId) return NextResponse.json({ error: "Order ID is required" }, { status: 400 });

    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
    
    const paymentStatus = response.data?.payment_status || "FAILED";

    // Update order status in PostgreSQL using Prisma
    await prisma.order.update({
      where: { orderId },
      data: { status: paymentStatus },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error?.response?.data?.message || error.message);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}

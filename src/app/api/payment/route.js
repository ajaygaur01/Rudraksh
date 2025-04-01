import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Cashfree } from "cashfree-pg";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generateOrderId() {
  return crypto.randomUUID().replace(/-/g, "").substr(0, 12);
}

export async function POST(req) {
  try {
    const { userId, customer_phone, customer_name, customer_email, total } = await req.json();

    if (!userId || !customer_phone || !customer_name || !customer_email || !total) {
      return NextResponse.json({ error: "Missing required customer details" }, { status: 400 });
    }

    const orderId = generateOrderId();
    const request = {
      order_amount: parseFloat(total), // ✅ Changed from "amount" to "total"
      order_currency: "INR",
      order_id: orderId,
      customer_details: { customer_id: userId, customer_phone, customer_name, customer_email },
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", request);

    // Store order details in PostgreSQL using Prisma
    await prisma.order.create({
      data: {
        orderId,
        userId, // ✅ Changed from "customer_id" to "userId"
        total: parseFloat(total), // ✅ Ensure consistency with the schema
        status: "PENDING",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error?.response?.data?.message || error.message);
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}

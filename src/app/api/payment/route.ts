import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Cashfree } from "cashfree-pg";
import crypto from "crypto";

const prisma = new PrismaClient();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Cashfree credentials not found in environment variables");
}

Cashfree.XClientId = CLIENT_ID;
Cashfree.XClientSecret = CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generateOrderId() {
  return crypto.randomUUID().replace(/-/g, "").substring(0, 12);
}

export async function POST(req: Request) {
  try {
    console.log("Using credentials - ID:", CLIENT_ID?.substring(0, 4) + "***");

    const { userId, customer_name, customer_email, customer_phone, amount } = await req.json();

    if (!userId || !customer_name || !customer_email || !customer_phone) {
      return NextResponse.json({ error: "Missing required details" }, { status: 400 });
    }

    let total;
    // Fetch cart only if no direct amount is passed
    if (amount) {
      total = parseFloat(amount);
    } else {
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } },
      });

      if (!cart || cart.items.length === 0) {
        return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
      }

      total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }

    const orderId = generateOrderId();

    const requestPayload = {
      order_amount: total,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: userId,
        customer_phone,
        customer_name,
        customer_email,
      },
    };

    const cashfreeResponse = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": CLIENT_ID,
        "x-client-secret": CLIENT_SECRET,
      },
      body: JSON.stringify(requestPayload),
    });

    const response = await cashfreeResponse.json();

    if (!cashfreeResponse.ok) {
      console.error("Cashfree error:", response);
      return NextResponse.json({ error: response.message || "Payment gateway error" }, { status: cashfreeResponse.status });
    }

    return NextResponse.json({
      payment_session_id: response.payment_session_id,
      order_id: orderId,
    });
  } catch (error) {
    console.error("Payment Error:", error);
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 });
  }
}

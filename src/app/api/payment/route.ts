import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import { Cashfree } from "cashfree-pg";
import crypto from "crypto";

// const prisma = new PrismaClient();

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

    const {
      userId,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      orderId,
      customer_name,
      customer_email,
      customer_phone,
      amount,
      shipping_address,
      cart_items
    } = await req.json();

    if (
      !userId ||
      !customer_name ||
      !customer_email ||
      !customer_phone ||
      !shipping_address ||
      !shipping_address.address ||
      !shipping_address.city ||
      !shipping_address.state ||
      !shipping_address.zipCode ||
      !shipping_address.country
    ) {
      return NextResponse.json({ error: "Missing required shipping or customer details" }, { status: 400 });
    }

    const total = parseFloat(amount);

    const generatedOrderId = generateOrderId();
    const itemSummary = cart_items?.map(item => `${item.product?.name} x ${item.quantity}`).join(", ") || "No items";

    const requestPayload = {
      order_amount: total,
      order_currency: "INR",
      order_id: generatedOrderId,
      customer_details: {
        customer_id: userId,
        customer_phone,
        customer_name,
        customer_email,
      },
      order_meta: {
        return_url: "https://yourdomain.com/order/confirmation?order_id={order_id}",
      },
      order_note: `
      
      Shipping to: ${shipping_address.address}, ${shipping_address.city}, ${shipping_address.state}, ${shipping_address.zipCode}, ${shipping_address.country}
      Item Summary: ${itemSummary}
      `
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
      order_id: generatedOrderId,
    });
  } catch (error) {
    console.error("Payment Error:", error);
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 });
  }
}

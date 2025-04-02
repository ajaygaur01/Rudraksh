// payment.js API endpoint
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Check if credentials are available
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Cashfree credentials not found in environment variables");
}

// Generate unique order ID
function generateOrderId() {
  return crypto.randomUUID().replace(/-/g, "").substring(0, 12);
}

export async function POST(req) {
  try {
    console.log("Using credentials - ID:", CLIENT_ID?.substring(0, 4) + "***", "Secret exists:", !!CLIENT_SECRET);
    const { userId, customer_name, customer_email, customer_phone, amount } = await req.json();

    if (!userId || !customer_name || !customer_email || !customer_phone) {
      return NextResponse.json({ error: "Missing required details" }, { status: 400 });
    }

    let total;
    let cartItems = [];

    // If amount is provided directly, use it (for direct checkout)
    if (amount) {
      total = parseFloat(amount);
    } else {
      // Otherwise fetch from cart (for cart checkout)
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } },
      });

      if (!cart || cart.items.length === 0) {
        return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
      }

      // Calculate total price from cart
      total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      cartItems = cart.items;
    }

    // Create order in database first
    const orderId = generateOrderId();
    
    // Create order data object
    const orderData = {
      orderId,
      userId,
      total,
      status: "PENDING",
    };
    
    // Only add items if we have cart items
    if (cartItems.length > 0) {
      orderData.items = {
        create: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      };
    }
    
    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderId,
        userId, // ✅ Now explicitly setting userId as string
        total,
        status: "PENDING",
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });
    // Send order details to admin email
    // await sendOrderEmail(order, cartItems);

    // Return payment session ID and order ID
    return NextResponse.json({ 
      payment_session_id: cashfreeResponse.payment_session_id,
      cf_order_id: cashfreeResponse.cf_order_id,
      order_id: orderId 
    });
    
  } catch (error) {
    console.error("Payment Error:", error);
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 });
  }
}

// 📌 Email Sending Function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function sendOrderEmail(order, items) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Email credentials not configured, skipping email notification");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let itemsList = "";
  if (items && items.length > 0) {
    itemsList = `
      <h3>Items:</h3>
      <ul>
        ${items.map((item) => `<li>${item.product.name} (x${item.quantity}) - ₹${item.product.price}</li>`).join("")}
      </ul>
    `;
  } else {
    itemsList = `<p>Direct payment of ₹${order.total}</p>`;
  }

  const emailBody = `
    <h2>New Order Received</h2>
    <p>Order ID: ${order.orderId}</p>
    <p>Total Amount: ₹${order.total}</p>
    ${itemsList}
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || "admin@example.com",
    subject: "New Order Received",
    html: emailBody,
  });
}
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Cashfree } from "cashfree-pg";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Check if credentials are available
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Cashfree credentials not found in environment variables");
}

// Set up Cashfree configuration
Cashfree.XClientId = CLIENT_ID;
Cashfree.XClientSecret = CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

// Generate unique order ID
function generateOrderId() {
  return crypto.randomUUID().replace(/-/g, "").substring(0, 12); // Fixed deprecated substr
}

// 📌 Payment API
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
      // We don't create order items for direct payments to avoid foreign key issues
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

    // Create order in Cashfree
    const orderId = generateOrderId();
    const request = {
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
    
    // Use fetch with specific headers as shown in the documentation
    const cashfreeResponse = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": CLIENT_ID,
        "x-client-secret": CLIENT_SECRET
      },
      body: JSON.stringify(request)
    });
    
    const response = await cashfreeResponse.json();
    console.log("Cashfree Response:", response);
    
    if (!cashfreeResponse.ok) {
      console.error("Cashfree error:", response);
      return NextResponse.json({ error: response.message || "Payment gateway error" }, { status: cashfreeResponse.status });
    }

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

    // Save order in database
    const order = await prisma.order.create({
      data: orderData
    });

    // Send order details to admin email
    await sendOrderEmail(order, cartItems);

    // Return payment session ID and order ID
    return NextResponse.json({ 
      payment_session_id: response.payment_session_id,
      order_id: orderId 
    });
  } catch (error) {
    console.error("Payment Error:", error);
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 });
  }
}

// 📌 Email Sending Function
async function sendOrderEmail(order, items) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Create email content based on whether there are items or not
  let itemsList = "";
  if (items.length > 0) {
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
    to: "admin@example.com", // 📌 Change this to your email
    subject: "New Order Received",
    html: emailBody,
  });
}
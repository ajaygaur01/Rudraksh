
import nodemailer from "nodemailer"; // If using for admin email
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-webhook-signature");
    const secret = process.env.CASHFREE_WEBHOOK_SECRET!;

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("base64");

    if (expectedSignature !== signature) {
      console.warn("⚠️ Invalid signature received.");
      return new Response("Invalid signature", { status: 401 });
    }

    const body = JSON.parse(rawBody);
    const event = body.event;

    if (event === "PAYMENT_SUCCESS") {
      const { order_id, payment_id, orderAmount, customer_details } = body.data;
      const userEmail = customer_details?.customer_email;

      const user = await prisma.userDetails.findUnique({
        where: { email: userEmail },
        include: { cart: { include: { items: { include: { product: true } } } } },
      });

      if (!user || !user.cart) {
        return NextResponse.json({ error: "User or cart not found" }, { status: 404 });
      }

      const cartItems = user.cart.items;

      const orderData: {
        orderId: string;
        userId: string;
        total: number;
        status: string;
        items?: { create: { productId: string; quantity: number; price: number }[] };
      } = {
        orderId: order_id,
        userId: user.id,
        total: orderAmount,
        status: "PAID",
      };

      if (cartItems.length > 0) {
        orderData.items = {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        };
      }

      const createdOrder = await prisma.order.create({
        data: orderData,
      });

      // Clear the user's cart
      await prisma.cartItem.deleteMany({
        where: { cartId: user.cart.id },
      });

      // Send email to admin
      await sendOrderEmail(createdOrder, cartItems);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ message: "Unhandled event" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return new Response("Webhook error", { status: 500 });
  }
}

// ✅ Email Sending Function
async function sendOrderEmail(order, items) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let itemsList = "";
  if (items.length > 0) {
    itemsList = `
      <h3>Items:</h3>
      <ul>
        ${items
          .map(
            (item) =>
              `<li>${item.product.name} (x${item.quantity}) - ₹${item.product.price}</li>`
          )
          .join("")}
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
    to: "gaurajay787@gmail.com", // ✅ Replace with your admin email
    subject: "New Order Received",
    html: emailBody,
  });
}
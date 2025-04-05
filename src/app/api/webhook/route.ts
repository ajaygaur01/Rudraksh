import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
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

      const createdOrder = await prisma.order.create({
        data: {
          orderId: order_id,
          total: orderAmount,
          status: "PAID",
          paymentId: payment_id,
          user: {
            connect: { id: user.id },
          },
          items: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
      });

      // Clear the cart
      await prisma.cartItem.deleteMany({
        where: { cartId: user.cart.id },
      });

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

  const itemsList = items.length
    ? `
      <h3>Items:</h3>
      <ul>
        ${items.map((item) =>
          `<li>${item.product.name} (x${item.quantity}) - ₹${item.product.price}</li>`
        ).join("")}
      </ul>`
    : `<p>Direct payment of ₹${order.total}</p>`;

  const emailBody = `
    <h2>New Order Received</h2>
    <p>Order ID: ${order.orderId}</p>
    <p>Total Amount: ₹${order.total}</p>
    ${itemsList}
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "gaurajay787@gmail.com",
    subject: "New Order Received",
    html: emailBody,
  });
}

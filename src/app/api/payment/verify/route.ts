import { PrismaClient, OrderStatus } from "@prisma/client"; // Import OrderStatus enum
const prisma = new PrismaClient();
import nodemailer from "nodemailer";

export async function POST(req) {
  const { order_id, payment_status, userId, cartItems, totalAmount } = await req.json();

  if (payment_status !== "PAID") {
    return new Response(JSON.stringify({ message: "Payment Failed" }), { status: 400 });
  }

  // Save order in the database
  const order = await prisma.order.create({
    data: {
      userId,
      paymentId: order_id,
      total: totalAmount,
      status: OrderStatus.PAID, // Use the Prisma enum here
      items: {
        create: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { items: true },
  });

  // Send email to the admin
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: "gaurajay787@gmail.com",
    subject: "New Order Received",
    text: `Order Details:\n${JSON.stringify(order, null, 2)}`,
  };

  await transporter.sendMail(mailOptions);

  return new Response(JSON.stringify({ message: "Order Saved & Email Sent" }), { status: 200 });
}

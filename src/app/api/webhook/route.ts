import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = body.event;

    console.log("🔥 Webhook received:", JSON.stringify(body, null, 2));

    if (event === "PAYMENT_SUCCESS") {
      const { order_id, payment_id, orderAmount, customer_details } = body.data;
      const userEmail = customer_details?.customer_email;

      console.log("📧 Extracted userEmail:", userEmail);

      // First fetch the user
      const user = await prisma.userDetails.findFirst({
        where: {
          email: {
            equals: userEmail,
            mode: "insensitive",
          },
        },
      });

      console.log("👤 User fetched from DB:", user?.email || "User not found");

      if (!user) {
        console.warn("❌ User not found");
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Check if the order already exists
      const existingOrder = await prisma.order.findUnique({
        where: { orderId: order_id },
        include: { items: true },
      });

      if (existingOrder) {
        console.log("⚠️ Order already exists with orderId:", order_id);
        console.log("📦 Existing order has", existingOrder.items.length, "items");
        return NextResponse.json({ 
          success: true,
          orderId: existingOrder.id, 
          message: "Order already processed" 
        });
      }

      // Separately check for cart and items
      const cart = await prisma.cart.findUnique({
        where: { userId: user.id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      console.log("🔍 Checking cart status:", cart ? `Found cart with ${cart.items.length} items` : "No cart found");
      
      // Create order without items first
      const createdOrder = await prisma.order.create({
        data: {
          orderId: order_id,
          total: new Prisma.Decimal(orderAmount),
          status: "PAID",
          paymentId: payment_id,
          user: {
            connect: { id: user.id },
          },
        },
      });
      
      console.log("✅ Order created:", createdOrder.id);
      
      // If cart has items, add them to the order
      if (cart && cart.items.length > 0) {
        console.log("🛒 Processing", cart.items.length, "cart items for order");
        
        // Process each item separately for better error tracking
        for (const item of cart.items) {
          try {
            await prisma.orderItem.create({
              data: {
                orderId: createdOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                price: new Prisma.Decimal(item.product.price),
              },
            });
            console.log(`✅ Added item ${item.productId} to order`);
          } catch (itemError) {
            console.error(`❌ Failed to add item ${item.productId}:`, itemError.message);
          }
        }
      } else {
        // For direct payments without cart items, create at least one record
        // Find a placeholder product
        const placeholderProduct = await prisma.productDetails.findFirst();
        
        if (placeholderProduct) {
          console.log("📝 Creating placeholder order item with product:", placeholderProduct.id);
          
          try {
            await prisma.orderItem.create({
              data: {
                orderId: createdOrder.id,
                productId: placeholderProduct.id,
                quantity: 1,
                price: new Prisma.Decimal(orderAmount),
              },
            });
            console.log("✅ Added placeholder item to order");
          } catch (placeholderError) {
            console.error("❌ Failed to add placeholder item:", placeholderError.message);
          }
        } else {
          console.log("⚠️ No products found for placeholder item, order will have no items");
        }
      }
      
      // Fetch the updated order with items for confirmation and email
      const finalOrder = await prisma.order.findUnique({
        where: { id: createdOrder.id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
      
      console.log("📦 Final order has", finalOrder.items.length, "items");

      // Clear the cart if it exists
      if (cart) {
        await prisma.cartItem.deleteMany({
          where: { cartId: cart.id },
        });
        console.log("🧹 Cart cleared for user:", user.email);
      }

      // Try to send email with the updated order data
      try {
        await sendOrderEmail(finalOrder, finalOrder.items);
      } catch (emailError) {
        console.error("⚠️ Email sending failed but order was created:", emailError.message);
      }

      return NextResponse.json({ 
        success: true,
        orderId: createdOrder.id,
        itemCount: finalOrder.items.length,
        message: "Order processed successfully" 
      });
    }

    return NextResponse.json({ message: "Unhandled event" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return new Response(`Webhook error: ${error.message}`, { status: 500 });
  }
}

// ✅ Email Sending Function with better error handling
async function sendOrderEmail(order, items) {
  // Check if environment variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("⚠️ Email credentials not configured");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password for Gmail
    },
  });

  const itemsList = items && items.length
    ? `
      <h3>Items:</h3>
      <ul>
        ${items.map((item) =>
          `<li>${item.product?.name || 'Unknown Product'} (x${item.quantity}) - ₹${item.price}</li>`
        ).join("")}
      </ul>`
    : `<p>Direct payment of ₹${order.total}</p>`;

  const emailBody = `
    <h2>New Order Received</h2>
    <p>Order ID: ${order.orderId}</p>
    <p>Total Amount: ₹${order.total}</p>
    ${itemsList}
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "gaurajay787@gmail.com", // Admin email address
      subject: "New Order Received",
      html: emailBody,
    });

    console.log("📨 Email sent to admin for order:", order.orderId);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
    throw err; // Re-throw to be caught by the calling function
  }
}
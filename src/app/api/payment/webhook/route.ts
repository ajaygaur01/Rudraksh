export async function POST(request) {
    const body = await request.json();
  
    console.log("Cashfree Webhook received:", body);
  
    // TODO: Verify signature (for security)
    // TODO: Update order status in DB
  
    return new Response("Webhook received", { status: 200 });
  }
  
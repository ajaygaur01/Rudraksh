export async function POST(request) {
    try {
      const contentType = request.headers.get("content-type") || "";
  
      if (!contentType.includes("application/json")) {
        return new Response("Invalid content type", { status: 400 });
      }
  
      const bodyText = await request.text();
      if (!bodyText) {
        return new Response("Empty body", { status: 400 });
      }
  
      const body = JSON.parse(bodyText);
      console.log("Cashfree Webhook received:", body);
  
      return new Response("Webhook received", { status: 200 });
    } catch (error) {
      console.error("Webhook error:", error);
      return new Response("Webhook error", { status: 500 });
    }
  }
  
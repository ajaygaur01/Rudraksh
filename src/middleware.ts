import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  console.log(`🚀 Middleware Running for: ${req.nextUrl.pathname}`);

  // Extract Authorization header
  const token = req.headers.get("auth_token")?.split(" ")[1];
  console.log("🔹 Received Token:", token ? "Token found" : "No token");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized: Token missing" }, { status: 401 });
  }
console.log("---token---" , token)
  try {
    // Verify the JWT using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
console.log('token' , token)
    console.log("✅ Full Decoded Payload:", payload);

    if (!payload.id) {
      console.error("❌ No ID found in payload");
      return NextResponse.json({ error: "Invalid token structure" }, { status: 401 });
    }

    console.log("✅ Extracted User ID:", payload.id);

    // Attach user info to request headers (if needed for Next.js API routes)
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", payload.id);

    return NextResponse.next({ request: { headers: requestHeaders } });

  } catch (error) {
    console.error("❌ Invalid Token:", error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/:path*", // Apply middleware to all API routes
};

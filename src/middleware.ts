


import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  console.log("🚀 Middleware Running for:", req.url);

  // Get token from cookies
  const token = req.cookies.get("auth_token")?.value;
  console.log("🔹 Received Token:", token || "No token found");

  if (!token) {
    console.error("❌ No Token Found - Returning 401");
    return NextResponse.json({ error: "Unauthorized: No token found" }, { status: 401 });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("❌ JWT_SECRET is missing in environment variables");
    }

    // Decode JWT
    const decoded = verify(token, process.env.JWT_SECRET) as { userId: string };
    console.log("✅ Decoded User ID:", decoded.userId || "No userId found in token");

    if (!decoded.userId) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // Forward userId securely to the request headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("X-User-Id", decoded.userId);

    return NextResponse.next({ headers: requestHeaders });
  } catch (error) {
    console.error("❌ Token Verification Error:", error);
    return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/cart/:path*", // Apply only to cart routes
};

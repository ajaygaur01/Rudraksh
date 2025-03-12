import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

export async function middleware(req: NextRequest) {
  console.log("🚀 Middleware Running for:", req.url);

  // Extract token from cookies
  const token = req.cookies.get("auth_token")?.value;
  console.log("🔹 Received Token:", token ? "Token found" : "No token found");

  if (!token) {
    console.error("❌ No Token Found - Returning 401");
    return NextResponse.json({ error: "Unauthorized: No token found" }, { status: 401 });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("❌ JWT_SECRET is missing");
    }

    console.log("🔑 Verifying JWT with jose...");
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

    // Verify JWT and extract payload
    const { payload } = await jwtVerify(token, secretKey) as { payload: JWTPayload };
    console.log("✅ Full Decoded Payload:", payload);

    // Ensure correct user ID is extractedm
    const userId = (payload.id as string) // Prefer userId over id
    console.log("✅ Extracted User ID:", userId || "No userId found in token");

    if (!userId) {
      console.error("❌ Token does not contain a valid userId");
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // Clone request headers and attach userId
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("X-User-Id", userId);

    // Forward request with updated headers
    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (error) {
    console.error("❌ Token Verification Error:", error);
    return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/cart/:path*", // ✅ Applies only to cart 
};

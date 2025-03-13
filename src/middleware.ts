import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  console.log("🚀 Middleware Running Cookie for:", req.url);

  // Extract token from cookies
  const token = req.headers.get("auth_token");
  console.log('---token---',token)
  console.log("🔹 Received Token:", token ? "Token found" : "No token found");

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

    // Ensure correct user ID is extractedm
    const userId = (payload.userId as string) // Prefer userId over id
    console.log("✅ Extracted User ID:", userId || "No userId found in token");

    if (!userId) {
      console.error("❌ Token does not contain a valid userId");
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
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

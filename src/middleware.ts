import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  console.log("🚀 Middleware Running Cookie for:", req.url);

  // Extract token from cookies
  const token = req.cookies.get("auth_token")?.value;
  
  // You're using "eyJhbG..." token from a cookie named "auth_token"
  // But in your error you're showing a JWT being passed as "cookie"

  if (!token) {
    return NextResponse.json({ error: "Unauthorized: Token missing" }, { status: 401 });
  }
  
  try {
    // Verify the JWT using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    console.log("✅ Full Decoded Payload:", payload);
    
    // Your token contains "id", not "userId" based on the cookie you shared
    const userId = payload.id as string;
    
    if (!userId) {
      console.error("❌ Token does not contain a valid id");
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }
    
    console.log("✅ Extracted User ID:", userId);
    
    // Set the user ID in the headers that will be passed to API routes
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", userId);
    
    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (error) {
    console.error("❌ Invalid Token:", error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/cart/:path*",
};
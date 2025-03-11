import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value; // Get token from cookies

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized: No token found" }), { 
      status: 401, 
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    // Decode JWT
    const decoded = verify(token, process.env.JWT_SECRET) as { userId: string };

    if (!decoded?.userId) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { 
        status: 401, 
        headers: { "Content-Type": "application/json" }
      });
    }

    // Clone request and attach userId to headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.userId);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });

  } catch (error) {
    console.error("Middleware Error:", error);

    return new Response(JSON.stringify({ error: "Unauthorized: Invalid token" }), { 
      status: 401, 
      headers: { "Content-Type": "application/json" }
    });
  }
}

// Apply middleware to specific routes (all API routes)
export const config = {
  matcher: "/api/:path*", // Middleware runs for all API endpoints
};

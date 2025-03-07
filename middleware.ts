import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized: No token found" }, { status: 401 });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };

    // Attach userId to request headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.userId);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

// Apply middleware to specific routes (e.g., all API routes)
export const config = {
  matcher: "/api/:path*", // Middleware will run for all API routes
};

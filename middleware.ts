import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * Auth.js Middleware for Route Protection
 * 
 * Protects specified routes and redirects unauthenticated users to login
 */
export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  
  // Define protected routes that require authentication
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    "/portfolio",
  ];
  
  // Define auth routes (should redirect to home if already logged in)
  const authRoutes = ["/login", "/register"];
  
  // Check if current path matches protected routes
  const isProtectedRoute = protectedRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  );
  
  const isAuthRoute = authRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  );
  
  // Redirect to login if accessing protected route while not logged in
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Redirect to home if accessing auth routes while logged in
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl.origin));
  }
  
  return NextResponse.next();
});

/**
 * Matcher Configuration
 * 
 * Exclude static files, images, and API routes from middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) - Auth.js handles its own auth
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

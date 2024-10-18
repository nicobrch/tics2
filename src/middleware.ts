import { authMiddleware } from "better-auth/next-js";
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/",
  "/dashboard",
  "tickets"
];

export default authMiddleware({
  customRedirect: async (session, request) => {
    const baseURL = request.nextUrl.origin;
    if (protectedRoutes.includes(request.nextUrl.pathname) && !session) {
      return NextResponse.redirect(new URL("/login", baseURL));
    }
    if (request.nextUrl.pathname === "/" && session) {
      return NextResponse.redirect(new URL("/dashboard", baseURL));
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/", "/login", "/signup"],
};
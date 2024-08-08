import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/util/server/jwt";

// List of routes to ignore
const IGNORED_ROUTES = ["/", "/auth/register", "/auth/login"]

/**
 * Middleware for handling (protected) routes
 * @param request 
 * @returns a NextResponse 
 */
export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const cookie = request.cookies.get("session");


    if (IGNORED_ROUTES.includes(pathname)) {
        return NextResponse.next();
    }

    // Prevent users with invalid or non existing cookies from going into any of the routes
    if(!cookie) {
        return NextResponse.redirect(new URL("/", request.url))
    }
    

    try {
        const userInfo = verifyToken(cookie.value);

        if (!userInfo) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}


// Ignore static files and API routes
export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
  };
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get token from cookies or localStorage would need to be checked client-side
  // For now, we'll do a basic redirect check
  const pathname = request.nextUrl.pathname

  // Protect dashboard routes - in production, verify JWT token here
  if (pathname.startsWith("/dashboard")) {
    // You can add token verification here in production
    // For now, the client-side check in the layout handles this
    return NextResponse.next()
  }

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith("/auth")) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

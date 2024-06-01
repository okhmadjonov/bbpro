import { withAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, locale } = req.nextUrl;

  if (pathname === "/" && !locale) {
    return NextResponse.redirect(new URL("/en", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

export default withAuth(
  function middleware(req) {
    const pathName = req.nextUrl.pathname;
    const response = NextResponse.next();

    if (!pathName.includes("/login")) {
      // Redirect to login if not authenticated
      if (pathName === "/admin" && !req.nextauth.token?.token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    // Set or delete token cookie
    if (req.nextauth.token) {
      response.cookies.set("token", req.nextauth.token.token + ""); // замена токена на data
    } else {
      response.cookies.delete("token");
    }
    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Check if token exists and return true if it does
        return !!token;
      },
    },
    pages: {
      signIn: "/login", // Define your login page
      signOut: "/auth/signout", // Define your signout page
    },
  }
);

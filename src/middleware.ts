import { withAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, locale } = req.nextUrl;

  // Redirect to the default locale if none is set
  if (pathname === "/" && locale !== "uz") {
    const url = req.nextUrl.clone();
    url.pathname = `/uz`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export default withAuth(
  function middleware(req) {
    const pathName = req.nextUrl.pathname;
    const response = NextResponse.next();

    if (!pathName.includes("/login")) {
      // Redirect to login if not authenticated
      if (pathName.startsWith("/admin") && !req.nextauth.token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    // Set or delete token cookie
    if (req.nextauth.token) {
      response.cookies.set("token", req.nextauth.token.token + "");
    } else {
      response.cookies.delete("token");
    }

    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
      signOut: "/auth/signout",
    },
  }
);

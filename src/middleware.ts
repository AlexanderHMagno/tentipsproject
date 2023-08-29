import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("Santa cachucha");
    console.log(req.nextauth, req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);
export const config = {
  matcher: [
    "/community/:function*",
    // "/blog/queue",
    // "/blog/create",
    // "/blog/:path*/edit",
  ],
};

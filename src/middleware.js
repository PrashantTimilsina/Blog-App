import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const publicPath = ["/resetpassword", "/verifyemail", "/login", "/signup"];
  const isPublicPath = publicPath.includes(path);
  const token = request.cookies.get("token")?.value;
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/resetpassword",
    "/verifyemail",
    "/login",
    "/signup",
    "/profile",
    "/bookmark",
    "/createblog",
    "/changepassword",
  ],
};

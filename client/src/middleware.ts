import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let session;
  try {
    session = await auth();
    // console.log("SESSION", session);
  } catch (error) {
    console.log("ERROR", error);
  }
  // console.log("middleware", process.env.NEXTAUTH_URL, session, pathname);
  // console.log("SESSION", session);
  // console.log("PATHNAME", pathname);

  // // 체크
  if (typeof session === "string" && session === "Bad request.") {
    if (pathname === "/") {
      return;
    }
    // console.log("BAD REQUEST");
    // return NextResponse.redirect(`${process.env.NEXT_AUTH_URL}`);
  }
  if (pathname === "/profile") {
    return NextResponse.redirect(
      `${process.env.NEXT_AUTH_URL}/profile/${session?.user.nickname}`
    );
  }
  if (session && pathname === "/") {
    return NextResponse.redirect(`${process.env.NEXT_AUTH_URL}/main`);
  } else if (!session && pathname !== "/") {
    return NextResponse.redirect(`${process.env.NEXT_AUTH_URL}`);
  } else {
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/main",
    "/",
    "/profile",
    "/rank",
    "/goal",
    "/dashboard",
    "/profile/:path*",
    "/siginin",
    // "/signup",
    // "/api/auth/signin",
    // "/api/auth/signup",
    // "/api/:path*",
  ],
};

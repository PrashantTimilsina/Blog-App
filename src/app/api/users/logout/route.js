import connect from "@/db/db";
import { NextResponse } from "next/server";
connect();
export async function GET(request) {
  try {
    const response = NextResponse.json(
      { message: "Logout Successfull" },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

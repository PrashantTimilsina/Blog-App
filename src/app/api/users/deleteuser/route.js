import connect from "@/db/db";
import User from "@/models/userModel";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
connect();
export async function DELETE(request) {
  try {
    const userId = await getToken(request);
    if (!userId) {
      return NextResponse.json({ message: "Please login" }, { status: 401 });
    }
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const response = NextResponse.json(
      { message: "User deleted" },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

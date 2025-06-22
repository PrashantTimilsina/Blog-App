import User from "@/models/userModel";
import { NextResponse } from "next/server";
import connect from "@/db/db";
connect();
export async function POST(request) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json(
        { message: "You are not authorized" },
        { status: 401 }
      );
    }
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      message: "Verification successfull✅. You can login now",
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

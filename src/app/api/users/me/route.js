import connect from "@/db/db";
import User from "@/models/userModel";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
connect();
export async function GET(request) {
  try {
    const userId = await getToken(request);
    if (!userId) {
      return NextResponse.json(
        { message: "Please login again" },
        { status: 401 }
      );
    }
    const user = await User.findOne({ _id: userId })
      .select("-password -__v")
      .populate("bookmarks");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

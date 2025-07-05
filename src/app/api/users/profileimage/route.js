import connect from "@/db/db";
import User from "@/models/userModel";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
connect();
export async function PUT(request) {
  try {
    const userId = await getToken(request);
    const { image } = await request.json();
    if (!userId) {
      return NextResponse.json({ message: "Please login" }, { status: 401 });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { image },
      { new: true, runValidators: true }
    );
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    return NextResponse.json({ message: "Image uploaded✅" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

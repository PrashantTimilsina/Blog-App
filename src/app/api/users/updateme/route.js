import connect from "@/db/db";
import User from "@/models/userModel";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
connect();
export async function POST(request) {
  try {
    const token = await getToken(request);

    if (!token) {
      return NextResponse.json(
        { message: "Please login again" },
        { status: 400 }
      );
    }
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json(
        { message: "Please provide the required field" },
        { status: 400 }
      );
    }
    const user = await User.findById(token);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    user.name = name;
    await user.save();
    return NextResponse.json({ message: "Profile updated✅" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

import User from "@/models/userModel";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/db/db";
connect();
export async function POST(request) {
  try {
    const userId = await getToken(request);
    if (!userId) {
      return NextResponse.json(
        { message: "Please login again" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword, confirmNewPassword } =
      await request.json();
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return NextResponse.json(
        { message: "Please provide the required field" },
        { status: 400 }
      );
    }
    if (newPassword !== confirmNewPassword) {
      return NextResponse.json(
        {
          message: "New password and confirm new password should be equal",
        },
        { status: 400 }
      );
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const isCurrentPassValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPassValid) {
      return NextResponse.json(
        { message: "Current password does not match" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();
    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

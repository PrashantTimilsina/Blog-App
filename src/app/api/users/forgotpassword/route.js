import User from "@/models/userModel";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/utils/sendEmail";
export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "Please provide your email" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    user.passwordResetToken = hashedToken;
    user.passwordResetExpiry = Date.now() + 30 * 60 * 1000;
    await user.save();
    await sendEmail(user.email, user.name, token, "RESET");
    return NextResponse.json(
      {
        message: "Check your mail and reset your password",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

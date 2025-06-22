import connect from "@/db/db";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/utils/sendEmail";
import crypto from "crypto";
connect();
export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide the required field" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 }
      );
    }

    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
      return NextResponse.json(
        { message: "Email or password is not valid" },
        { status: 400 }
      );
    }
    if (!user.isVerified) {
      const token = crypto.randomBytes(32).toString("hex");
      user.verifyToken = token;
      user.verifyTokenExpiry = Date.now() + 3 * 60 * 60 * 1000;
      await user.save();
      await sendEmail(user.email, user.name, token, "VERIFY");
      return NextResponse.json(
        { message: "Please verify to login! Check your email to verify" },
        { status: 400 }
      );
    }
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "30d",
    });
    const response = NextResponse.json(
      { message: "Logged In Successfully" },
      { status: 200 }
    );
    response.cookies.set("token", token, {
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

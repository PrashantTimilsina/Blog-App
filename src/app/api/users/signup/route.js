import User from "@/models/userModel";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/utils/sendEmail";
import connect from "@/db/db";
import bcrypt from "bcryptjs";
connect();
export async function POST(request) {
  try {
    const { name, password, confirmPassword, email } = await request.json();
    if (!name || !password || !confirmPassword || !email) {
      return NextResponse.json(
        { message: "Please fill the required field" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Password and confirm password are not equal" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = Date.now() + 3 * 24 * 60 * 60 * 1000;
    const user = await User.create({
      name,
      password: hashedPassword,
      email,
      verifyToken: token,
      verifyTokenExpiry: tokenExpiry,
    });
    await sendEmail(user.email, user.name, token, "VERIFY");
    return NextResponse.json(
      {
        message:
          "User created successfully!✅Please check your email and verify to login",
        token,
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Cannot create user", error: error.message },
      { status: 500 }
    );
  }
}

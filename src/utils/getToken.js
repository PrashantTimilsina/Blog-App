import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function getToken(request) {
  try {
    const token = request.cookies.get("token")?.value;

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded.id;
  } catch (error) {}
}

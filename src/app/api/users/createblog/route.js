import connect from "@/db/db";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
connect();
export async function POST(request) {
  try {
    const userId = await getToken(request);
    const { title, content, category, coverImage } = await request.json();
    if (!title || !content || !coverImage || !category) {
      return NextResponse.json(
        { message: "Please provide the required field" },
        { status: 400 }
      );
    }
    if (!userId) {
      return NextResponse.json({ message: "Please login" }, { status: 401 });
    }

    // const user = await User.findById(userId);
    const post = await Post.create({
      title,
      content,
      coverImage,
      category,
      author: userId,
    });
    return NextResponse.json({ message: "Blog created✅" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

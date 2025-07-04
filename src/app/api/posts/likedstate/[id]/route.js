import connect from "@/db/db";
import Post from "@/models/postModel";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
connect();
export async function GET(request, { params }) {
  try {
    const userId = await getToken(request);
    if (!userId) {
      return NextResponse.json({ message: "Please login" }, { status: 401 });
    }
    const postId = params.id;
    if (!postId) {
      return NextResponse.json({ message: "Post not found" }, { status: 400 });
    }
    const post = await Post.findById(postId);
    const liked = post.likes.some((data) => data.toString() === userId);

    return NextResponse.json({ liked }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

import connect from "@/db/db";
import Post from "@/models/postModel";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
connect();
export async function POST(request, { params }) {
  try {
    const userId = await getToken(request);
    const { text } = await request.json();
    const postId = params.id;

    if (!text || !userId || !postId) {
      return NextResponse.json(
        { message: "Comment cannot be added" },
        { status: 400 }
      );
    }
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    post.comments.push({ user: userId, text });
    await post.save();
    return NextResponse.json({ message: "comment added" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

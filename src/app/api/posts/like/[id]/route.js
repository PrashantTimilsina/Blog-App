import Post from "@/models/postModel";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const userId = await getToken(request);
    if (!userId) {
      return NextResponse.json(
        { message: "Please login again" },
        { status: 401 }
      );
    }
    const postId = params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 400 });
    }
    const existingLike = post.likes.includes(userId);
    if (existingLike) {
      post.likes = post.likes.filter((data) => data.toString() !== userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    return NextResponse.json({ message: "Likes updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

import connect from "@/db/db";
import Post from "@/models/postModel";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
connect();
export async function POST(request, { params }) {
  try {
    const userId = await getToken(request);
    const { newComment, oldComment } = await request.json();
    if (!newComment || !oldComment) {
      return NextResponse.json(
        { message: "Please provide the required field" },
        { status: 400 }
      );
    }
    if (!userId) {
      return NextResponse.json({ message: "Please login" }, { status: 400 });
    }
    const postId = params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 400 });
    }
    const comment = post.comments.find(
      (data) => data.user.toString() === userId && data.text === oldComment
    );
    if (!comment) {
      return NextResponse.json(
        { message: "No comment found" },
        { status: 400 }
      );
    }
    comment.text = newComment;
    await post.save();
    return NextResponse.json({ message: "Comment edited " }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

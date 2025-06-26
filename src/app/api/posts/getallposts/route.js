import { getAllPosts } from "@/app/lib/posts";
import connect from "@/db/db";
// import Post from "@/models/postModel";
import { NextResponse } from "next/server";
connect();
export async function GET(request) {
  try {
    const posts = await getAllPosts();
    if (!posts) {
      return NextResponse.json({ message: "No posts found" }, { status: 400 });
    }
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

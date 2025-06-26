import connect from "@/db/db";
import Post from "@/models/postModel";

export async function getAllPosts() {
  await connect();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(posts));
}

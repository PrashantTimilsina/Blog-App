import connect from "@/db/db";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import Description from "./Description";

export default async function PostPage({ params }) {
  await connect();

  const post = await Post.findById(params.id)
    .populate({ path: "author", select: "name image email" })
    .populate({ path: "likes", select: "name image email" })
    .populate({
      path: "comments",
      populate: { path: "user", select: "name image email" },
    })
    .lean(); // Convert Mongoose doc to plain object

  if (!post) {
    return <div>Post not found</div>;
  }

  const plainPost = JSON.parse(JSON.stringify(post)); // ✅ full safe serialization

  return <Description post={plainPost} />;
}

import { getAllPosts } from "@/app/lib/posts";
import BlogCart from "./BlogCart";

export default async function BlogCartWrapper() {
  const posts = await getAllPosts();

  return <BlogCart blog={posts} />;
}

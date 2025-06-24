import BlogCart from "@/components/BlogCart";
import Hero from "@/components/Hero";
import connect from "@/db/db";

export default function Home() {
  connect();
  return (
    <div>
      <Hero />
      <BlogCart />
    </div>
  );
}

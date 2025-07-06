import BlogCartWrapper from "@/components/BlogData";
import Hero from "@/components/Hero";

export default async function Home() {
  return (
    <div>
      <Hero />
      <BlogCartWrapper />
    </div>
  );
}

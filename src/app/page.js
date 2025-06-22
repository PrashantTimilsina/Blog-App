import connect from "@/db/db";

export default function Home() {
  connect();
  return <div>Home</div>;
}

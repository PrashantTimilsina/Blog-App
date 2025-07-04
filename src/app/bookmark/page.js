"use client";

import Image from "next/image";
import { useData } from "@/context/Context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Bookmark() {
  const { profileData, refetchProfile } = useData();
  const router = useRouter();
  useEffect(() => {
    refetchProfile();
  }, []);
  if (profileData?.user?.bookmarks.length === 0)
    return (
      <h1 className="text-center sm:text-3xl font-semibold mt-12 text-xl text-gray-700">
        No bookmarks
      </h1>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-3 mt-4 mx-auto max-w-[1200px]">
      {profileData?.user?.bookmarks?.map((data, index) => (
        <div
          key={index}
          className="border border-gray-700 p-2 rounded w-full h-auto cursor-pointer"
          onClick={() => router.push(`/posts/${data._id}`)}
        >
          <div className="relative w-full h-36 sm:h-44">
            <Image
              src={data.coverImage}
              alt="Blog image"
              fill
              className="object-cover rounded"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold mt-2 sm:mt-5">
            {data.title}
          </h1>
          <p className="text-xs sm:text-sm mt-1">
            {data.content.split(".")[0]}{" "}
            <span className="text-black font-semibold">see more...</span>
          </p>
          <p className="mt-3 sm:mt-5 text-sm font-semibold flex items-center gap-3">
            Category:{" "}
            <span className="bg-black text-white px-4 py-1 rounded">
              {data.category}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Bookmark;

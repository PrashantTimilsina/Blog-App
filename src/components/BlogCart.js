import React from "react";
import blog from "@/db/blogData";
import Image from "next/image";
function BlogCart() {
  return (
    <div className="grid sm:grid-cols-2  sm:mt-2  p-3 sm:gap-5 mx-auto grid-cols-1 mt-4 gap-5 lg:grid-cols-3 lg:container">
      {blog.map((data, index) => (
        <div
          key={index}
          className="border-gray-700 border p-2 rounded sm:w-96 cursor-pointer h-auto"
        >
          <div className="relative sm:h-44 w-full h-36 ">
            <Image
              src={data.coverImage}
              alt="Blog image"
              fill
              className="object-cover rounded"
            />
          </div>
          <h1 className="sm:text-xl sm:mt-5 font-semibold mt-1">
            {data.title}
          </h1>
          <br />
          <p className="sm:text-[1rem] text-xs ">
            {data.content.split(".")[0]}{" "}
            <span className="text-black font-semibold">see more...</span>
          </p>
          <p className="sm:mt-5 flex items-center gap-3 text-[0.8rem] font-semibold mt-3">
            Category:{" "}
            <span className="bg-black text-white px-6 py-1 rounded ">
              {data.category}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default BlogCart;

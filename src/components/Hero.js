"use client";
import { useState } from "react";

const data = [
  { title: "All" },
  { title: "Tech" },
  { title: "Travel" },
  { title: "Food" },
  { title: "Health" },
];
function Hero() {
  const [active, setActive] = useState("All");
  return (
    <div className="   items-center flex justify-center font-semibold flex-col  mt-24  ">
      <h1 className="text-center sm:text-6xl text-4xl">
        Your Own <span className="text-blue-600 font-bold">Blogging</span>
        <br />
        Platform
      </h1>
      <h1 className="sm:text-xl sm:mt-12 p-4 mt-8 mx-auto">
        Express yourself, build your audience, and grow your digital
        presence—all in one place
      </h1>
      <div className="mt-10 flex gap-4">
        <input
          type="text"
          placeholder="Find blogs..."
          className="w-auto sm:w-80 p-2 border outline-none rounded"
        />
        <button className="flex items-center justify-center px-6 sm:px-9 py-2 rounded bg-blue-600 text-white cursor-pointer">
          Search
        </button>
      </div>
      <div className="mt-16 flex sm:gap-12 gap-4 relative">
        {data.map((item, index) => (
          <button
            key={index}
            className={`border rounded-full sm:px-5 sm:py-1.5 cursor-pointer px-2 py-1 hover:bg-blue-500 hover:text-white ${
              active === item.title ? "bg-blue-800 text-white" : ""
            }`}
            onClick={() => setActive(item.title)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Hero;

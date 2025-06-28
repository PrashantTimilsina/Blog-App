"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
function Navbar() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [color, setColor] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setColor(true);
      } else {
        setColor(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const mobileRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (!mobileRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  });
  return (
    <>
      <div
        className={`flex justify-between items-center p-2 text-xl py-5 max-sm:hidden sticky top-0 z-50 ${
          color ? "bg-gray-200" : ""
        }`}
      >
        <div
          className="flex items-center gap-2 lg:ml-20 ml-10 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-10 h-10 relative ">
            <Image
              src="/blog.png"
              alt="Blog icon"
              fill
              className="object-cover "
            />
          </div>
          <h1>Quick Blog</h1>
        </div>
        <div className="mr-6 flex justify-between gap-9">
          <button className="btn" onClick={() => router.push("/")}>
            Home
          </button>
          <button className="btn" onClick={() => router.push("/login")}>
            Login
          </button>
          <button className="btn" onClick={() => router.push("/signup")}>
            Signup
          </button>
        </div>
      </div>
      {/*mobile nav*/}
      <div
        className={`sm:hidden  sticky p-2 flex justify-between top-0 z-50  ${
          color ? "bg-gray-200 text-black w-full" : ""
        }`}
      >
        <div className="flex items-center gap-2 lg:ml-20 ml-8">
          <div className="w-8 h-8 relative ">
            <Image
              src="/blog.png"
              alt="Blog icon"
              fill
              className="object-cover "
            />
          </div>
          <h1>Quick Blog</h1>
        </div>
        {/*buttons*/}
        <div
          className={`absolute h-screen flex flex-col bg-gray-50 w-64 z-50  gap-6  items-center ${
            show ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          } transition-all duration-150 `}
          ref={mobileRef}
        >
          <button className="btn mt-14 w-44" onClick={() => setShow(false)}>
            Home
          </button>
          <button
            className="btn  w-44"
            onClick={() => {
              router.push("/signup");
              setShow(false);
            }}
          >
            Signup
          </button>
          <button
            className="btn w-44"
            onClick={() => {
              router.push("/login");
              setShow(false);
            }}
          >
            Login
          </button>
        </div>

        <div className="relative my-auto mr-4 ">
          {show ? (
            <IoClose
              className="my-auto cursor-pointer text-xl"
              onClick={() => setShow(false)}
            />
          ) : (
            <GiHamburgerMenu
              className="my-auto cursor-pointer"
              onClick={() => setShow(true)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;

"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useData } from "@/context/Context";

function Description({ post }) {
  const commentRef = useRef(null);
  const likeRef = useRef(null);
  console.log(post);
  const [clicked, setClicked] = useState(false);

  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [likes, setLikes] = useState(post?.likes?.length);
  const { profileData } = useData();
  const userId = profileData?.user?._id;
  useEffect(() => {
    const liked = post?.likes?.some((data) => data === userId);
    if (liked) {
      setClicked(true);
    }
  }, [post.likes, userId]);
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => alert("Failed to copy link"));
    } else {
      alert("Clipboard not supported");
    }
  };

  useEffect(() => {
    const handleClose = (e) => {
      if (!likeRef?.current?.contains(e.target)) {
        setShow(false);
      } else {
        setShow(true);
      }
    };
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  });

  useEffect(() => {
    if (showComment) {
      commentRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showComment]);

  const handleLike = async () => {
    try {
      const res = await axios.post(`/api/posts/like/${post._id}`);
      if (res.status === 200) {
        const { likesCount, isLiked } = res.data;

        setClicked(isLiked);

        setLikes(likesCount);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  useEffect(() => {
    async function isLiked() {
      const res = await axios.get(`/api/posts/likedstate/${post._id}`, {
        withCredentials: true,
      });
      const data = res.data;
      console.log(data);
      if (data.liked) {
        setClicked(true);
      }
    }
    isLiked();
  }, [post._id]);
  return (
    <>
      <div className="mt-8 flex flex-col gap-4 text-gray-700 p-2">
        <div className="text-center sm:text-3xl font-semibold text-xl">
          <h1 className="border-b-3 border-gray-600 inline-block pb-2 ">
            {post.title}
          </h1>
        </div>

        <div className="relative w-full sm:h-80 container mx-auto h-56">
          <Image
            src={post.coverImage}
            fill
            alt="Cover Image "
            className="object-cover"
          />
        </div>
        <div className="container mx-auto  text-gray-900">
          <p className="sm:text-2xl leading-9 text-justify text-xl sm:p-0 p-2">
            {post.content}
          </p>
        </div>
        <div className=" text-xl flex justify-end px-4 text-gray-800 italic">
          Written By: <span className=" text-black">{post.author.name}</span>
        </div>
        {/*LIKES AND COMMENT SECTION*/}
        <div className="p-1 sm:ml-16 sm:text-xl flex  items-center sm:gap-10 mx-auto gap-5">
          <div>
            <div
              className="flex gap-1 items-center   p-0.5 rounded cursor-pointer justify-center"
              onClick={handleLike}
            >
              <button className="cursor-pointer flex items-center justify-center gap-1 border border-gray-400 p-2 px-4 ">
                {clicked ? <AiFillLike /> : <BiLike />}
                <h4>Like</h4>
              </button>
            </div>
          </div>
          <div>
            {/*comments*/}
            <button
              className="flex items-center justify-center gap-1 border border-gray-400 p-2 rounded cursor-pointer"
              onClick={() => {
                setShowComment(true);
              }}
            >
              <FaRegComments />
              <h4>Comments</h4>
            </button>
          </div>
          <div>
            {/*comments*/}
            <button
              className="flex items-center justify-center gap-1 border border-gray-400 p-2 rounded cursor-pointer"
              onClick={handleShare}
            >
              <CiShare2 />
              <h4>{copied ? "Link Copied!" : "Share"}</h4>
            </button>
          </div>
        </div>
        <div className="sm:ml-16 font-semibold flex items-center gap-1 ml-6">
          {post.likes.slice(0, 2).map((data, index) => (
            <div
              className="relative h-8 w-8 rounded-full overflow-hidden "
              key={index}
            >
              <Image src={data.image} alt="Liked person image" fill />
            </div>
          ))}

          <h3 className="px-2 cursor-pointer" onClick={() => setShow(true)}>
            Liked by {likes} people
          </h3>
          {show && (
            <div
              className="absolute bg-gray-200 z-50 mx-auto flex justify-between items-center gap-5 sm:w-1/3 p-3 rounded w-full left-0 sm:left-16"
              ref={likeRef}
            >
              <div className="flex flex-col gap-5 ">
                {post.likes.map((data, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <div className="relative overflow-hidden h-8 w-8 rounded-full">
                      <Image
                        src={data.image}
                        alt="Profile pic"
                        className="object-cover"
                        fill
                      />
                    </div>
                    <h3>{data.name}</h3>
                  </div>
                ))}
              </div>
              <IoClose
                onClick={() => setShow(false)}
                className="self-start cursor-pointer text-xl"
              />
            </div>
          )}
        </div>
        {/*comments displaying*/}
        {showComment && (
          <div className="sm:ml-16 mt-5 ml-4" ref={commentRef}>
            <h1 className="text-black text-2xl pb-3">Comments</h1>
            <hr className="p-1" />
            <div className="space-y-6 mt-3">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="w-72 px-2 py-1 outline-none text-black placeholder:text-black"
                />
                <IoSend className="text-xl cursor-pointer" />
              </div>
              {post.comments.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center gap-4">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden ">
                      <Image
                        src={data.user.image}
                        alt="Profile pic"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl">{data.user.name}</h3>
                  </div>
                  <p className="ml-12">{data.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Description;

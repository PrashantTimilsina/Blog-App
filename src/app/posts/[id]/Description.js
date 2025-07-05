"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import axios from "axios";
import { useData } from "@/context/Context";
import { errorMsg, successMsg } from "@/utils/toast";
import { CldImage } from "next-cloudinary";

function Description({ post }) {
  const commentRef = useRef(null);
  const likeRef = useRef(null);
  const [comments, setComments] = useState(post?.comments || []);
  const [bookmark, setBookMark] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState("");

  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [editingText, setEditingText] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newText, setNewText] = useState("");
  const [likes, setLikes] = useState(post?.likes?.length);
  const { profileData, isLoggedIn } = useData();
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
    if (!isLoggedIn) return errorMsg("Please login", 1500);
    try {
      const res = await axios.post(`/api/posts/like/${post?._id}`);
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
    if (profileData?.user?.bookmarks && post?._id) {
      const isBookmarked = profileData.user.bookmarks.some(
        (postObj) => postObj._id.toString() === post._id.toString()
      );
      setBookMark(isBookmarked);
    }
  }, [profileData, post]);
  useEffect(() => {
    async function isLiked() {
      const res = await axios.get(`/api/posts/likedstate/${post?._id}`, {
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
  const handleAddComment = async (e) => {
    if (!isLoggedIn) return errorMsg("Please login", 1500);
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/posts/addcomment/${post._id}`,
        { text },
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      const newComment = {
        user: {
          name: profileData.user.name,
          image: profileData.user.image,
        },
        text,
      };
      const addComment = [newComment, ...comments];
      setComments(addComment);
      setText("");
    } catch (error) {}
  };
  const handleKeyDownComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddComment(e);
    }
  };
  const handleEditComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/posts/editcomment/${post?._id}`,
        { oldComment: editingText, newComment: newText },
        { withCredentials: true }
      );
      const data = res.data;
      const updatedComments = comments.map((comment, index) => {
        if (index === editingIndex) {
          return {
            ...comment,
            text: newText,
          };
        }
        return comment;
      });

      setComments(updatedComments);

      setEditingIndex(null);
      setEditingText(null);
      setNewText("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleBookMark = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return errorMsg("Please login", 1500);
    try {
      const res = await axios.post(`/api/users/bookmark/${post._id}`, "", {
        withCredentials: true,
      });

      const data = res?.data;
      console.log(data);
      successMsg(data.message, 1500);
      if (data.message === "Bookmarked removed") {
        setBookMark(false);
      } else {
        setBookMark(true);
      }
    } catch (error) {
      errorMsg(error.response.data.message, 1500);
    }
  };
  return (
    <>
      <div className="mt-8 flex flex-col gap-4 text-gray-700 p-2">
        <div className="text-center sm:text-3xl font-semibold text-xl">
          <h1 className="border-b-3 border-gray-600 inline-block pb-2 ">
            {post?.title}
          </h1>
          <h2 className="flex justify-end p-2 mr-6  ">
            {bookmark ? (
              <FaBookmark
                className="cursor-pointer font-bold sm:text-4xl text-2xl"
                onClick={handleBookMark}
              />
            ) : (
              <CiBookmark
                className="cursor-pointer font-bold sm:text-4xl text-2xl"
                onClick={handleBookMark}
              />
            )}
          </h2>
        </div>

        <div className="relative w-full sm:h-80 container mx-auto h-56">
          {post?.coverImage?.startsWith("http") ? (
            <Image
              src={post?.coverImage}
              fill
              alt="Cover Image "
              className="object-cover"
            />
          ) : (
            <CldImage
              src={post?.coverImage}
              alt="cover image"
              height={400}
              width={400}
              className="object-cover rounded h-full w-full"
            />
          )}
        </div>
        <div className="container mx-auto  text-gray-900">
          <p className="sm:text-2xl leading-9 text-justify text-xl sm:p-0 p-2">
            {post?.content}
          </p>
        </div>
        <div className=" text-xl flex justify-end px-4 text-gray-800 italic">
          Written By: <span className=" text-black">{post?.author?.name}</span>
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
              {data.image.startsWith("http") ? (
                <Image src={data?.image} alt="Liked person image" fill />
              ) : (
                <CldImage
                  src={data.image}
                  alt="Liked person image"
                  className="h-full w-full object-cover "
                  width={200}
                  height={200}
                />
              )}
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
                {post?.likes?.map((data, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <div className="relative overflow-hidden h-8 w-8 rounded-full">
                      {data.image.startsWith("http") ? (
                        <Image
                          src={data?.image}
                          alt="Liked person image"
                          fill
                        />
                      ) : (
                        <CldImage
                          src={data.image}
                          alt="Liked person image"
                          className="h-full w-full object-cover "
                          width={200}
                          height={200}
                        />
                      )}
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
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDownComment}
                />
                <IoSend
                  className="text-xl cursor-pointer"
                  onClick={handleAddComment}
                />
              </div>
              {comments.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center gap-4">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden ">
                      {data.user.image.startsWith("http") ? (
                        <Image
                          src={data.user.image}
                          alt="Liked person image"
                          fill
                        />
                      ) : (
                        <CldImage
                          src={data.user.image}
                          alt="Liked person image"
                          className="h-full w-full object-cover "
                          width={200}
                          height={200}
                        />
                      )}
                    </div>
                    <h3 className="text-xl">{data.user.name}</h3>
                  </div>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      onChange={(e) => setNewText(e.target.value)}
                      value={newText}
                      className="bg-gray-400 m-2 p-0.5 rounded ml-10"
                      spellCheck={false}
                    />
                  ) : (
                    <p className="ml-12">{data?.text}</p>
                  )}
                  {data?.user?.name === profileData?.user?.name && (
                    <div className="flex gap-8 ml-12 text-black text-[1rem] mt-1">
                      {editingIndex === index ? (
                        <button
                          className="cursor-pointer bg-gray-400 px-4 py-0.5 rounded"
                          onClick={handleEditComment}
                        >
                          Submit
                        </button>
                      ) : (
                        <button
                          className="cursor-pointer bg-gray-400 px-4 py-0.5 rounded"
                          onClick={() => {
                            setEditingIndex(index);
                            setEditingText(data?.text);
                            setNewText(data?.text);
                          }}
                        >
                          Edit
                        </button>
                      )}
                      {editingIndex === index && (
                        <button
                          className="cursor-pointer bg-gray-400 px-4 py-0.5 rounded"
                          onClick={() => {
                            setEditingIndex(null);
                          }}
                        >
                          Back
                        </button>
                      )}
                    </div>
                  )}
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

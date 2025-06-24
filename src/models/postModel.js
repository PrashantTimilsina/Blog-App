import mongoose from "mongoose";
// const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: [true, "Comment cannot be empty"],
    },
  },
  { _id: false } // Optional: disables separate _id for each comment
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post must have a title"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Post must have content"],
    },
    category: {
      type: String,
      enum: ["Tech", "Travel", "Food", "Health", "Other"],
      default: "Other",
    },
    coverImage: {
      type: String, // URL to a post image
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema], // array of comment objects
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;

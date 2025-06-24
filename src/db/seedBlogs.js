// src/db/seedBlogs.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Blog = require("./../models/postModel"); // adjust path if needed
const blogPosts = require("./blogData"); // your blog data array

dotenv.config();

async function seedBlogs() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Optional: Clear existing blog posts
    await Blog.deleteMany({});

    // Insert all blogs
    await Blog.insertMany(blogPosts);
    console.log("✅ Blog posts seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding blog posts:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedBlogs();

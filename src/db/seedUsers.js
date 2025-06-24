const mongoose = require("mongoose");
const User = require("../models/userModel"); // Adjust the path as needed
const dotenv = require("dotenv");

dotenv.config();

// Dummy user data with online profile images
const users = [
  {
    name: "Prashant Timilsina",
    email: "prashanttimilsina16@gmail.com",
    password: "password123",
    role: "user",
    isVerified: true,
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "password123",
    role: "user",
    isVerified: true,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    password: "password123",
    role: "user",
    isVerified: true,
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    name: "Carol Danvers",
    email: "carol.danvers@example.com",
    password: "password123",
    role: "user",
    isVerified: true,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "David Lee",
    email: "david.lee@example.com",
    password: "password123",
    role: "user",
    isVerified: true,
    image: "https://randomuser.me/api/portraits/men/77.jpg",
  },
];

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Optional: Clear existing users
    await User.deleteMany({});

    for (const userData of users) {
      const user = new User(userData);
      await user.save(); // Triggers pre-save middleware (like password hashing)
      console.log(`Created user: ${user.email}`);
    }

    console.log("✅ All users seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding users:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedUsers();

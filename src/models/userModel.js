import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide your username"] },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
    },
    image: String,
    role: { type: String, default: "user", enum: ["user", "admin"] },
    isVerified: { type: Boolean, default: false },
    verifyToken: String,
    verifyTokenExpiry: Date,
    passwordResetToken: String,
    passwordResetExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

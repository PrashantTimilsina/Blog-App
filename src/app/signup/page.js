"use client";
import { errorMsg, successMsg } from "@/utils/toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [btnText, setBtnText] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnText(true);
      const res = await axios.post("/api/users/signup", user);
      const data = res.data;
      console.log(data);
      setUser({ name: "", email: "", password: "", confirmPassword: "" });
      successMsg(data.message, 2000);
      router.push("/login");
    } catch (error) {
      console.log(error);
      errorMsg(error.response.data.message, 1500);
    } finally {
      setBtnText(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-start gap-6  sm:w-1/2 mx-auto text-xl mt-4 w-auto p-3">
      <h1 className="text-2xl font-semibold">Sign up </h1>
      <form
        className="grid sm:grid-cols-2 sm:gap-8 sm:mt-7 grid-cols-1 gap-5 mt-3"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="p-1 text-center bg-gray-300 rounded outline-none "
          value={user.username}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="p-1 text-center bg-gray-300 rounded outline-none"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          className="p-1 text-center bg-gray-300 rounded outline-none"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          type="password"
          placeholder="confirm password"
          id="confirmpassword"
          className="p-1 text-center bg-gray-300 rounded outline-none"
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
        />
        <button
          className={` text-white mt-5 py-2 px-6 rounded cursor-pointer ${
            btnText ? "bg-black " : "bg-blue-500"
          }`}
          disabled={btnText}
        >
          {btnText ? "Loading.." : "Sign up"}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;

"use client";
import { errorMsg, successMsg } from "@/utils/toast";
import axios from "axios";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    password: "",
    email: "",
  });
  const [btnText, setBtnText] = useState(false);
  const [btnTextForgot, setBtnTextForgot] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setBtnText(true);
      const res = await axios.post("/api/users/login", user);
      const data = res.data;

      setUser({ email: "", password: "" });
      successMsg(data.message, 1500);
      router.push("/");
    } catch (error) {
      errorMsg(error.response.data.message, 1500);
    } finally {
      setBtnText(false);
    }
  };
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setBtnTextForgot(true);
      const res = await axios.post("/api/users/forgotpassword", {
        email: user.email,
      });
      const data = res.data;
      successMsg(data.message, 1500);
    } catch (error) {
      errorMsg(error.response.data.message, 1500);
    } finally {
      setBtnTextForgot(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start gap-6  sm:w-1/2 mx-auto text-xl mt-4 w-auto p-3">
      <h1 className="text-2xl font-semibold sm:mt-0 mt-6">Login </h1>
      <form
        className="grid sm:grid-cols-2 sm:gap-8 sm:mt-7  grid-cols-1 sm:w-full mt-2 gap-5"
        onSubmit={handleLogin}
      >
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

        <button
          className={` text-white mt-5 py-2 px-6 rounded cursor-pointer ${
            btnText ? "bg-black " : "bg-blue-500"
          }`}
          disabled={btnText}
        >
          {btnText ? "Loading.." : "Login"}
        </button>
        <button
          className={` text-white mt-3 sm:mt-5 py-2 px-6 rounded cursor-pointer ${
            btnTextForgot ? "bg-slate-500 " : "bg-black"
          }`}
          onClick={handleForgotPassword}
          disabled={btnTextForgot}
        >
          {btnTextForgot ? "Loading..." : "Forgot password"}
        </button>
      </form>
    </div>
  );
}

export default Login;

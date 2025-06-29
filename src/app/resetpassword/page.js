"use client";
import { errorMsg, successMsg } from "@/utils/toast";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [btnText, setBtnText] = useState(false);
  const [user, setUser] = useState({
    token,
    newPassword: "",
    confirmNewPassword: "",
  });
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      setBtnText(true);

      const res = await axios.post("/api/users/resetpassword", user);
      const data = res.data;
      setUser({ newPassword: "", confirmNewPassword: "" });
      successMsg(data.message, 1500);
      router.push("/login");
    } catch (error) {
      errorMsg(error.response.data.message, 1500);
    } finally {
      setBtnText(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center  mt-9">
      <h1 className="text-2xl font-semibold">Reset Password</h1>
      <form
        className="grid sm:grid-cols-2 sm:mt-18 gap-9 text-xl grid-cols-1 mt-9"
        onSubmit={handleReset}
      >
        <label htmlFor="newpass">New password:</label>
        <input
          type="password"
          placeholder="New password"
          id="newpass"
          className="px-2 py-1 outline-none bg-gray-300 rounded"
          onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
        />
        <label htmlFor="confirmnew">Confirm new password:</label>
        <input
          type="password"
          placeholder="Confirm new password"
          id="confirmnew"
          className="px-2 py-1 outline-none bg-gray-300 rounded"
          onChange={(e) =>
            setUser({ ...user, confirmNewPassword: e.target.value })
          }
        />
        <button className="bg-blue-700 text-white px-6 py-2 cursor-pointer rounded mt-3">
          {btnText ? "Loading..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;

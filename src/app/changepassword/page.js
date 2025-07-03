"use client";
import { errorMsg, successMsg } from "@/utils/toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function ChangePassword() {
  const router = useRouter();
  const [user, setUser] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const handleChangePass = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/changepassword", user, {
        withCredentials: true,
      });
      const data = res.data;
      successMsg(data.message, 1500);
      router.push("/");
    } catch (error) {
      errorMsg(error.response.data.message, 1500);
    }
  };
  return (
    <div className="h-screen flex flex-col items-center justify-start mt-10 p-2">
      <h1 className="sm:text-2xl text-xl">Change password</h1>
      <form className="grid grid-cols-2 sm:gap-10 mt-10 sm:text-xl gap-5">
        <label htmlFor="current">Current password:</label>
        <input
          type="password"
          placeholder="Current password"
          id="current"
          className="outline-none bg-gray-300 rounded px-2 py-1"
          onChange={(e) =>
            setUser({ ...user, currentPassword: e.target.value })
          }
        />
        <label htmlFor="newpass">New password:</label>
        <input
          type="password"
          placeholder="New password"
          id="newpass"
          className="outline-none bg-gray-300 rounded px-2 py-1"
          onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
        />
        <label htmlFor="confirmnew">Confirm new password:</label>
        <input
          type="password"
          placeholder="Confirm new password"
          id="confirmnew"
          className="outline-none bg-gray-300 rounded px-2 py-1"
          onChange={(e) =>
            setUser({ ...user, confirmNewPassword: e.target.value })
          }
        />
      </form>
      <button
        className="bg-gray-700 text-white px-6 py-2 rounded mt-12 cursor-pointer"
        onClick={handleChangePass}
      >
        Change password
      </button>
    </div>
  );
}

export default ChangePassword;

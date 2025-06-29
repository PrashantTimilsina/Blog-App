"use client";
import { errorMsg, successMsg } from "@/utils/toast";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/verifyemail", { token });
      const data = res.data;
      successMsg(data.message, 1500);
      router.push("/login");
    } catch (error) {
      errorMsg(error.response.data.message, 1500);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleVerify}
        className="bg-blue-700 px-7 py-3 text-white rounded cursor-pointer"
      >
        Click to Verify your account
      </button>
    </div>
  );
}

export default VerifyPage;

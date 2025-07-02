"use client";
import { useData } from "@/context/Context";
import { errorMsg, successMsg } from "@/utils/toast";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Profile() {
  const router = useRouter();

  const { profileData, setIsLoggedIn, setProfileData } = useData();
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState(profileData?.user?.name || "");
  const handleLogout = async (e) => {
    try {
      const res = await axios.get("/api/users/logout");
      const data = res.data;

      successMsg(data.message, 1500);
      setIsLoggedIn(false);
      router.push("/");
    } catch (error) {
      errorMsg(error.response.data.message, 1500);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/users/updateme",
        { name },
        { withCredentials: true }
      );
      const data = res.data;
      const response = await axios.get("/api/users/me", {
        withCredentials: true,
      });
      const newdata = response.data;
      setProfileData(newdata);
      successMsg(data.message, 1500);

      setUpdate(false);
    } catch (error) {
      errorMsg(error.response.data.message, 1500);
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl font-semibold sm:mt-6 mt-14">
        Profile
      </h1>
      <div className="grid sm:grid-cols-2 items-center h-96 p-2  gap-5 grid-cols-1 sm:mt-0 mt-10">
        <div>
          <div className="relative sm:h-56 sm:w-56 h-48 w-48 rounded-full overflow-hidden mx-auto shadow-lg shadow-black">
            <Image
              src={
                profileData?.user?.image ||
                "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid"
              }
              className="object-cover "
              fill
              alt="profile pic"
            />
          </div>
          <div className="flex gap-4 mt-10 items-center justify-center">
            <button className=" flex items-center justify-center px-6 py-2 bg-slate-600 text-white rounded cursor-pointer">
              Change photo
            </button>
            {update ? (
              <button
                className=" flex items-center justify-center px-6 py-2 bg-slate-600 text-white rounded cursor-pointer"
                onClick={handleUpdate}
              >
                Update
              </button>
            ) : (
              <button
                className=" flex items-center justify-center px-6 py-2 bg-slate-600 text-white rounded cursor-pointer"
                onClick={() => setUpdate(true)}
              >
                Update profile
              </button>
            )}
          </div>
        </div>
        <div className=" space-y-5  text-center sm:text-left">
          {update ? (
            <input
              type="text"
              placeholder="Enter new name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 outline-none bg-gray-400 rounded text-xl"
              spellCheck={false}
            />
          ) : (
            <h1 className="sm:text-2xl text-xl">
              Name: {profileData?.user?.name}
            </h1>
          )}
          <h1 className="sm:text-2xl text-xl">
            Email: {profileData?.user?.email}
          </h1>

          <div className="flex  gap-7 mt-14 sm:flex-row flex-col sm:justify-start justify-center sm:items-start items-center ">
            <button
              className=" flex items-center justify-center px-6 py-2 bg-slate-600 text-white rounded cursor-pointer"
              onClick={() => router.push("/changepassword")}
            >
              Change password
            </button>
            <button
              className="sm:w-auto w-44 flex items-center justify-center px-8 py-2 bg-slate-800 text-white rounded cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

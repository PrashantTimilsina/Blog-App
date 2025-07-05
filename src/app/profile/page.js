"use client";
import { useData } from "@/context/Context";
import { errorMsg, successMsg } from "@/utils/toast";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";

function Profile() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { profileData, setIsLoggedIn, setProfileData, refetchProfile } =
    useData();
  const [publicId, setPublicId] = useState(profileData?.user?.image || "");

  const [update, setUpdate] = useState(false);
  const [name, setName] = useState(profileData?.user?.name || "");
  const profileRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (!profileRef?.current?.contains(e.target)) {
        setShow(false);
      } else {
        setShow(true);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
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
  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete("/api/users/deleteuser", {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      setProfileData(null);
      router.push("/");
    } catch (error) {}
  };
  const handleImageUpload = async (imageId) => {
    try {
      const res = await axios.put(
        "/api/users/profileimage",
        { image: imageId },
        { withCredentials: true }
      );
      const data = res.data;
      console.log(publicId);
      console.log(data);
      successMsg(data.message, 1500);
      refetchProfile();
    } catch (error) {
      errorMsg(error.response.data.message, 1500);
    }
  };
  useEffect(() => {
    setPublicId(profileData?.user?.image || "");
  }, [profileData]);
  return (
    <>
      <h1 className="text-center text-3xl font-semibold sm:mt-10 mt-14 text-gray-600">
        Profile
      </h1>
      <div className="grid sm:grid-cols-2 items-center h-96 p-2  gap-5 grid-cols-1 sm:mt-0 mt-10 text-gray-800">
        <div>
          <div className="relative sm:h-56 sm:w-56 h-48 w-48 rounded-full overflow-hidden mx-auto shadow-lg shadow-black">
            {publicId ? (
              <CldImage
                src={publicId}
                alt="profile pic"
                width={224} // or any size you want
                height={224}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <Image
                src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid"
                alt="default profile"
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="flex gap-4 mt-10 items-center justify-center">
            <CldUploadWidget
              uploadPreset="blogwebapp"
              onSuccess={({ event, info }) => {
                if (event === "success") {
                  setPublicId(info?.public_id);
                  handleImageUpload(info?.public_id);
                }
              }}
            >
              {({ open }) => (
                <button
                  onClick={() => open()}
                  className=" flex items-center justify-center px-6 py-2 bg-slate-600 text-white rounded cursor-pointer"
                >
                  Change photo
                </button>
              )}
            </CldUploadWidget>
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
            {show && (
              <div
                className="absolute  z-50 bg-slate-200  w-96 flex flex-col gap-5 sm:bottom-64 h-44 items-center justify-center rounded text-xl bottom-10"
                ref={profileRef}
              >
                <h1>Are you sure?</h1>
                <div className="flex gap-8">
                  <button
                    className="bg-red-500 text-white px-6 py-0.5 rounded cursor-pointer"
                    onClick={handleDeleteUser}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-green-500 text-white px-6 py-0.5 rounded cursor-pointer"
                    onClick={() => setShow(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            )}
            <button
              className="sm:w-auto w-44 flex items-center justify-center px-8 py-2 bg-red-700 text-white rounded cursor-pointer"
              onClick={() => setShow(true)}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

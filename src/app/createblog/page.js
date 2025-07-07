"use client";
import React, { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useForm } from "react-hook-form";
import axios from "axios";
import { errorMsg, successMsg } from "@/utils/toast";
function CreateBlog() {
  const [publicId, setPublicId] = useState("");
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
    trigger,
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/users/createblog", data, {
        withCredentials: true,
      });
      const newData = res.data;
      successMsg(newData?.message, 1500);
      console.log(newData);
      setPublicId("");
      reset();
    } catch (error) {
      errorMsg(error?.response?.data?.message, 1500);
    }
  };
  return (
    <div className="flex flex-col gap-5 items-center justify-center mt-4 sm:w-1/2 mx-auto bg-gray-200 p-4 rounded w-auto">
      <h1 className="sm:text-2xl font-semibold text-xl">Create a blog</h1>
      <form
        className="flex flex-col gap-5 sm:mt-3 sm:text-xl p-6 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          name="title"
          className="bg-gray-300 py-1 px-2 rounded w-96 outline-none"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-red-500">This field is required</span>
        )}

        <label htmlFor="content">Content*</label>
        <textarea
          type="text"
          id="content"
          name="content"
          placeholder="Content"
          className="bg-gray-300 py-0.5 px-2 rounded w-96 outline-none"
          {...register("content", { required: true })}
        />
        {errors.content && (
          <span className="text-red-500">This field is required</span>
        )}

        <select
          defaultValue=""
          className="outline-none"
          name="category"
          {...register("category", { required: true })}
        >
          <option disabled value="">
            Category*
          </option>
          <option>Tech</option>
          <option>Health</option>
          <option>Food</option>
          <option>Travel</option>
        </select>
        {errors.category && (
          <span className="text-red-500">This field is required</span>
        )}
        {publicId && (
          <CldImage
            src={publicId}
            width={100}
            height={100}
            alt="Blog cover image"
          />
        )}
        <CldUploadWidget
          uploadPreset="blogwebapp"
          onSuccess={({ event, info }) => {
            if (event === "success") {
              setPublicId(info?.public_id);
              setValue("coverImage", info?.public_id);
              trigger("coverImage");
            }
          }}
        >
          {({ open }) => (
            <button
              onClick={() => open()}
              type="button"
              className="bg-gray-700 text-white py-1.5 rounded cursor-pointer"
            >
              Upload a cover image*
            </button>
          )}
        </CldUploadWidget>

        <button className="btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;

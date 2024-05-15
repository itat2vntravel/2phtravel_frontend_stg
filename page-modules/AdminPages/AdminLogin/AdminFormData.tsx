"use client";
import React, { useState } from "react";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ActionAdminLogin from "@/action/Admin/login/adminlogin";
import FormButton from "@/components/FormButton";

const AdminFormData = () => {
  const router = useRouter();
  const [errorMessage1, setErrorMessage1] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  return (
    <>
      <form
        action={async (formData) => {
          if (formData.get("email") && formData.get("password")) {
            setErrorMessage(false);
            setErrorMessage1(false);
            const response = await ActionAdminLogin(formData);
            if (response?.error) {
              reactHotToast.success(response?.error, {
                position: "top-right",
                duration: 1000,
              });
            }
            if (response?.success) {
              reactHotToast.success(response.success, {
                position: "top-right",
                duration: 1000,
              });
              router.push("/admin/dashboard");
            }
          } else {
            if (!formData.get("email") && formData.get("password")) {
              setErrorMessage1(true);
              setErrorMessage(false);
            } else if (formData.get("email") && !formData.get("password")) {
              setErrorMessage1(false);
              setErrorMessage(true);
            } else {
              setErrorMessage1(true);
              setErrorMessage(true);
            }
          }
        }}
        className="mb-3 flex flex-col items-center"
      >
        <label className="text-[15px] w-full flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
          Email <span className="text-red-600 text-[19px]">*</span>
        </label>
        <input
          type="text"
          name="email"
          className={`w-full mt-2 bg-white mb-2 rounded-md p-3 focus:outline-none border border-gray-500  ${
            errorMessage1
              ? "border-customRed border-2 placeholder-customRed"
              : ""
          }`}
          placeholder="Enter your userID or email *"
        />

        <label className="text-[15px]  w-full flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
          Password <span className="text-red-600 text-[19px]">*</span>
        </label>
        <input
          type="password"
          name="password"
          className={`w-full  bg-white mb-4 rounded-md p-3 focus:outline-none border border-gray-500 ${
            errorMessage
              ? "border-customRed border-2 placeholder-customRed"
              : ""
          }`}
          placeholder="Enter your Password *"
        />
        <br></br>
        <div className="w-40 m-0">
          <FormButton>Login</FormButton>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default AdminFormData;

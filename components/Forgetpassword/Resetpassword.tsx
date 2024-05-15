"use client";
import UserChangePassword from "@/action/auth/changepassword";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CustomTextFieldProps {
  labeltext: string;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  value?: string | number; // Add value prop
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CustomTextField: FC<CustomTextFieldProps> = ({
  labeltext,
  type,
  name,
  placeholder,
  required,
  value,
  onChange,
}) => {
  return (
    <>
      <div>
        <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
          {labeltext}{" "}
          {required ? (
            <span className="text-red-600 text-[19px]">*</span>
          ) : (
            <span className="text-red-600 text-[19px]"> </span>
          )}
        </label>
        <div>
          <input
            type={type}
            name={name}
            autoComplete="off"
            placeholder={placeholder}
            required={required}
            value={value} // Set value prop
            onChange={onChange} // Set onChange prop
            className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
            style={{
              paddingTop: "20px",
              position: "relative",
              padding: "10px",
            }}
          />
        </div>
      </div>
    </>
  );
};
export default function ResetpasswordPage() {
  const router = useRouter();
  const searchparams = useSearchParams();
  const token = searchparams?.get("token");
  const [password, setpassword] = useState<string>("");
  const [confirmpassword, setconfirmpassword] = useState<string>("");
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const handleVerify = async () => {
    if (password === confirmpassword) {
      if (!regex.test(password)) {
        toast.error("Password doesn't meet the required criteria");
      } else {
        const req = {
          request_type: "reset__password",
          token: token,
          password: password,
        };
        const response = await UserChangePassword(req);
        if (response?.error) {
          toast.error(response.error);
        }
        if (response?.success) {
          router.push("/signin");
          toast.success(response.success);
        }
      }
    } else {
      toast.error("Password MisMatch");
    }
  };
  return (
    <>
      <h1 className="text-[24px] lg:tex-[32px] mt-[20px] flex justify-center text-[#182c51]  font-bold ">
        New Password
      </h1>
      <div>
        <CustomTextField
          labeltext="New password"
          type="password"
          name="password"
          placeholder="Enter your  new password"
          required={true}
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <CustomTextField
          labeltext="Confirm password"
          type="password"
          name="confirmpassword"
          placeholder="ReEnter your new password"
          required={true}
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
        />

        <button
          className="bg-customBlue  text-white p-2 mt-[20px] w-full rounded-md border border-gray-500 "
          onClick={() => handleVerify()}
        >
          Change Password
        </button>
      </div>
      <ToastContainer />
    </>
  );
}

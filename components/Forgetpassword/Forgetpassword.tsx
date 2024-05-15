"use client";
import UserResetPassword from "@/action/auth/resetpassword";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
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
            value={value} // Set value prop
            onChange={onChange} // Set onChange prop
            className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] ${
              required ? "border-customRed border-2 placeholder-customRed" : ""
            } `}
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

export default function Forgetpassword() {
  const [email, setemail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState(false);
  const router = useRouter();

  const handlesendemail = async () => {
    if (email) {
      setErrorMessage(false);
      const req = {
        request_type: "send__email",
        email: email,
      };
      const response = await UserResetPassword(req);

      if (response?.error) {
        toast.error(response.error);
      }
      if (response?.success) {
        toast.success(response.success);

        setTimeout(() => {
          router.push("/signin");
        }, 3000);
      }
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <>
      <h1 className="text-[24px] lg:tex-[32px] mt-[20px] flex justify-center text-[#182c51]  font-bold ">
        Forget Password
      </h1>
      <div>
        <CustomTextField
          labeltext="Email"
          type="text"
          name="email"
          placeholder="Enter your  email"
          required={errorMessage}
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <button
          className="bg-customBlue  text-white p-2 mt-[10px] w-full rounded-md"
          type="submit"
          onClick={() => handlesendemail()}
        >
          <div className="flex justify-center items-center gap-1">
            <RiLockPasswordFill />
            Forget Password
          </div>
        </button>
      </div>
      <ToastContainer />
    </>
  );
}

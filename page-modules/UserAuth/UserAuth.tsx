"use client";
import React, { FC } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import loginWithUsernameandPassword from "@/action/auth/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import FormButton from "@/components/FormButton";
import Link from "next/link";

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
            // className="bg-white mb-4 rounded-lg p-3 focus:outline-none border border-gray-500"
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
            // placeholder={"Cardholder name"}
            // required
          />
        </div>
      </div>
    </>
  );
};

export default function UserLoginAuth() {
  const router = useRouter();
  return (
    <>
      <form
        action={async (formData) => {
          const response = await loginWithUsernameandPassword(formData);
          if (response?.error) {
            toast.error(response.error);
          }
          if (response?.success) {
            toast.success(response.success);
            router.push("/verifyotp");
          }
        }}
      >
        <CustomTextField
          labeltext="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          required={true}
        />
        <CustomTextField
          labeltext="Password"
          type="password"
          name="password"
          placeholder="Enter your  password"
          required={true}
        />
        <div className="text-end mt-2">
          <Link
            href="/forgetpassword"
            className="text-customBlue font-semibold cursor-pointer text-end hover:text-customRed"
          >
            {" "}
            Forgot password
          </Link>
        </div>

        {/* Keep me logged in checkbox  */}
        <div>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Keep me logged in"
              // required
            />
          </FormGroup>
        </div>
        <FormButton>Sign In</FormButton>
      </form>
      <ToastContainer />
    </>
  );
}

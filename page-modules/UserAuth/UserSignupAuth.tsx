"use client";
import React, { FC, useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import SignupAccount from "@/action/auth/signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import FormButton from "@/components/FormButton";
import MobileIconImage from "@/components/Images/Mobileicon";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Styles from "./Auth.module.css";

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
export default function UserSignupAuth() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const handleChange = (phoneNumber: string) => {
    setValue(phoneNumber);
  };
  return (
    <>
      <form
        action={async (formData) => {
          const response = await SignupAccount(formData);

          if (response?.error) {
            toast.error(response.error);
          }
          if (response?.message) {
            toast.success(response.message);
            router.push("/verifyotp");
          }
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
          <CustomTextField
            labeltext="First Name"
            type="text"
            name="first_name"
            placeholder="Enter your First Name"
            required={true}
          />
          <CustomTextField
            labeltext="Last Name"
            type="text"
            name="last_name"
            placeholder="Enter your Last Name"
            required={true}
          />
        </div>
        <CustomTextField
          labeltext="Email"
          type="text"
          name="email"
          placeholder="Enter your email"
          required={true}
        />
        <div>
          <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
            <MobileIconImage />
            Phone number
          </label>
          <div className={Styles.phonenumber}>
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={handleChange}
              name={"mobile_number"}
              className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
              style={{
                paddingTop: "20px",
                position: "relative",
                padding: "10px",
              }}
              required={true}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
          <CustomTextField
            labeltext="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required={true}
          />
          <CustomTextField
            labeltext="Confirm Password"
            type="password"
            name="confirm_password"
            placeholder="Enter your confirm Password"
            required={true}
          />
        </div>
      
        {/* Keep me logged in checkbox  */}
        <div className="mt-[10px] flex items-center">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              required
              label={`I agree to the`}
            />
          </FormGroup>
          <h1
            className="text-customBlue text-[16px] cursor-pointer hover:text-customRed"
            onClick={() => router.push("/terms-and-conditions")}
          >
            Terms and Conditions
          </h1>
        </div>
        <FormButton>Sign up</FormButton>
      </form>
      <ToastContainer />
    </>
  );
}

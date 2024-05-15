"use client";
import React, { FC } from "react";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import VerfiyOtp, { resendOtp } from "@/action/auth/verify";
import FormButton from "@/components/FormButton";
import Link from "next/link";
import { Typography } from "@mui/material";
import ResendButton from "@/components/Button/ResendButton";

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

const UserVerfiyOtp = () => {
  const router = useRouter();

  return (
    <>
      <form
        action={async (formData) => {
          const response = await VerfiyOtp(formData);
          if (response?.error) {
            reactHotToast.error(response.error, {
              position: "top-right",
              duration: 1000,
            });
          }
          if (response?.success) {
            // toast.success(response.success);
            reactHotToast.success(response.success, {
              position: "top-right",
              duration: 1000,
            });

            router.push("/");
          }
        }}
      >

        <CustomTextField
          labeltext="Otp"
          type="text"
          name="otp"
          placeholder="Enter your  Otp"
          required={true}
        />

        <FormButton>Verify OTP</FormButton>
      </form>
      <div className="mt-1 md:mt-[20px]">
        <Typography
          variant="h6"
          color="#334851"
          sx={{
            fontSize: "20px",
            lineHeight: "54.56px",
            fontWeight: "500",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: "#334851",
              marginRight: "20px",
            }}
          ></div>
          or
          <div
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: "#334851",
              marginLeft: "20px",
            }}
          ></div>
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography
          variant="h6"
          color="#334851"
          sx={{
            fontSize: "16px",
            lineHeight: "54.56px",
            fontWeight: "500",
            color: "#000",
            cursor: "pointer",
          }}
        >
          <Link
            href={"/"}
            className="text-customBlue font-semibold hover:text-customRed"
          >
            Go to Home
          </Link>
        </Typography>
        <div
          className="md:block hidden"
          style={{
            backgroundColor: "#000",
            color: "white",
            padding: "4px",
            borderRadius: "50%",
            textAlign: "center",
          }}
        ></div>

        <div>
          <form
            action={async () => {
              const response = await resendOtp();
              if (response?.error) {
                // toast.error(response.error);
                reactHotToast.error(response.error, {
                  position: "top-right",
                  duration: 1000,
                });
              }
              if (response?.success) {
                // toast.success(response.success);
                reactHotToast.success(response.success, {
                  position: "top-right",
                  duration: 1000,
                });
              }
            }}
          >
            <ResendButton>Resend OTP</ResendButton>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default UserVerfiyOtp;

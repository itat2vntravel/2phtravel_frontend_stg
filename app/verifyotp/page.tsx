import Image from "next/image";
import React from "react";
import Logo from "../../public/logo1.jpg";
import UserVerfiyOtp from "@/page-modules/UserAuth/UserVerfiyOtp";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function VerifyOtpPage() {
  const otp_token = cookies().get("otp_token")?.value as string;
  if (!otp_token) {
    return redirect("/signin");
  }
  return (
    <>
      <div className="h-screen items-center flex justify-center bg-cover">
        <div className="bg-[#ffffffd2]  lg:w-2/5 h-fit  m-5 rounded-md  p-5 border-2 border-[#182c51]">
          <div className="flex justify-center">
            <Image
              src={Logo}
              alt="Logo"
              width={200}
              height={55}
              className="mix-blend-multiply	"
              priority
              quality={100}
            />
          </div>
          <h1 className="text-[24px] lg:tex-[32px] mt-[20px] flex justify-center text-[#182c51]  font-bold ">
            Verify OTP
          </h1>
          <UserVerfiyOtp />
        </div>
      </div>
    </>
  );
}

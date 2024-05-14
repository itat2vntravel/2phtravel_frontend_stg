import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../public/logo1.jpg";
import GoogleSignInButton from "@/components/GoogleButton/GoogleButton";
import UserSignupAuth from "@/page-modules/UserAuth/UserSignupAuth";
import { Typography } from "@mui/material";

import Styles from "@/app/signup/signup.module.css";

export default function SignupPage() {
  return (
    <div
      className={`${Styles.main} bg-cover flex justify-center items-center`}
    >
      <div className="bg-[#ffffffd2] lg:w-2/5 m-5 rounded-md p-5 border-2 border-[#182c51]">
        <div className="flex justify-center">
          <Image
            src={Logo}
            alt="Logo"
            width={200}
            height={55}
            priority
            className="mix-blend-multiply	"
            quality={100}
          />
        </div>

        <h1 className="text-[24px] lg:tex-[32px] mt-[20px] flex justify-center text-customBlue  font-bold ">
          SignUp
        </h1>
        <div className="flex justify-center mt-[20px]">
          <GoogleSignInButton text="Sign up with Google" />
        </div>
        {/* or text  */}
        <div className="mt-[20px]">
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
        <UserSignupAuth />
        {/* line design */}
        <div style={{ marginTop: "35px" }}>
          <div
            style={{ flex: 1, height: "1px", backgroundColor: "#334851" }}
          ></div>
        </div>
        {/* Already accout  */}
        <div
          style={{
            marginTop: "20px",
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
            Already have an account?
            <Link
              href="/signin"
              className="text-customBlue font-semibold pl-2 hover:text-customRed"
            >
              Sign In
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
              href="/"
              className="text-customBlue font-semibold cursor-pointer hover:text-customRed"
            >
              {" "}
              Go to Home
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
}

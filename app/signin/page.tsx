import Image from "next/image";
import React from "react";
import Logo from "../../public/logo1.jpg";
// import GoogleSignInButton from "@/components/GoogleButton/GoogleButton";
import { Typography } from "@mui/material";
import Link from "next/link";
import UserLoginAuth from "@/page-modules/UserAuth/UserAuth";
import dynamic from "next/dynamic";
import Styles from "@/app/signup/signup.module.css";

const GoogleSignInButton = dynamic(
  () => import("@/components/GoogleButton/GoogleButton"),
  {
    ssr: false,
  }
);
export default function LoginPage() {
  return (
    <div
      className={`h-screen ${Styles.content}  flex justify-center items-center bg-cover overflow-auto`}
    >
      <div className="bg-[#ffffffd2]  lg:w-2/5 2xl:h-auto	m-5 rounded-md  p-5 border-2 border-[#182c51]">
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

        <h1 className="text-[24px] lg:tex-[32px] mt-[20px] flex justify-center text-[#182c51]  font-bold ">
          SignIn
        </h1>
        <div className="flex justify-center mt-[20px]">
          <GoogleSignInButton text="Sign in with Google" />
        </div>
        {/* or text  */}
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
        <UserLoginAuth />
        {/* line design */}
        <div style={{ marginTop: "35px" }}>
          <div
            style={{ flex: 1, height: "1px", backgroundColor: "#334851" }}
          ></div>
        </div>
        {/* Go to home and create accout  */}
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
            Don’t have an account?
            <Link
              href="/signup"
              className="text-customBlue font-semibold pl-1 hover:text-customRed"
            >
              Sign Up
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
          {/* dot design */}
        </div>
      </div>
    </div>
  );
}

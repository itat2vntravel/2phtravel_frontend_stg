import Image from "next/image";
import React from "react";
import Logo from "../../public/logo1.jpg";
import Forgetpassword from "@/components/Forgetpassword/Forgetpassword";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function Forgetpasswordpage() {
  return (
    <>
      <div className="h-screen bg-[url('/Login/skyflight.png')] items-center flex justify-center bg-cover ">
        <div className="bg-[#ffffffd2]  lg:w-2/5 h-fit  m-5 rounded-md  p-5">
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
          <Forgetpassword />
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
                href={"/signin"}
                className="flex gap-2 cursor-pointer text-customBlue font-semibold hover:text-customRed"
              >
                Return to SignIn
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}

import Image from "next/image";
import React from "react";
import NotFoundImage from "@/public/notfound/pagenotfound.webp";
import CustomButton from "@/components/Button/Button";
import { FC } from "react";
import Header from "@/components/Header/Header";
import { cookies } from "next/headers";
import Link from "next/link";
import LoadingButton from "@/components/Button/LoadingButton";

export interface NotfoundProps {
  searchParams: {
    open: string;
  };
}
const NotFoundResult: FC<NotfoundProps> = ({ searchParams }) => {
  const UserLoginId = cookies().get("user_id")?.value || "";
  const firstName = cookies().get("first_name")?.value || "";
  const accesstoken = cookies().get("access_token")?.value || "";
  return (
    <>
      <Header
        isMobileView={searchParams?.open}
        userId={UserLoginId}
        firstName={firstName}
        accesstoken={accesstoken}
      />

      <div className="flex justify-center flex-col items-center align-middle ">
        <div>
          <Image
            src={NotFoundImage}
            alt="404 Images"
            height={100}
            width={700}
            className="h-[50vh] md:h-[55vh]"
          />
        </div>
        <h1 className="text-2xl md:text-4xl text-center">
          Oops... Page Not Found!
        </h1>
        <h6
          className="text-md mt-5 mb-5 px-4 text-center"
          style={{ color: "grey" }}
        >{`Please return to the site's homepage, It looks like nothing was found at this location`}</h6>
        <a href="/">
          <LoadingButton
            text="Go to Home Page"
            type="submit"
            routerpathName={""}
            routering={false}
          />
        </a>
      </div>
    </>
  );
};

export default NotFoundResult;

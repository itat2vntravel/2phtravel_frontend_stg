import Link from "next/link";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "@/components/Header/Header";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import Image from "next/image";
import UnsubscribeImage from "@/public/unsubscibe/unsubscibe.png";
import UnsubscribeButton from "@/page-modules/Unsubscribe/UnsubscibeButton";

const Footer = dynamic(() => import("@/components/Footer/Footer"), {
  ssr: false,
  loading: () => <></>,
});
export interface BookFlightsInterface {
  searchParams: {
    open: string;
    email: string;
  };
}

const page: React.FC<BookFlightsInterface> = async ({ searchParams }) => {
  const UserLoginId = cookies().get("user_id")?.value || "";

  const firstName = cookies().get("first_name")?.value || "";
  const accesstoken = cookies().get("access_token")?.value || "";

  return (
    <>
      <Header
        isMobileView={searchParams.open}
        userId={UserLoginId}
        firstName={firstName}
        accesstoken={accesstoken}
      />
      <div className="container mx-auto flex items-center flex-col my-10">
        {/* <div
          className="max-w-md mx-autorounded-md shadow-md p-8"
          style={{ boxShadow: "1px 3px 34px -9px #00000040" }}
        > */}
        <div>
          <Image
            src={UnsubscribeImage}
            alt="2PH Travel UnsubscribeImage image"
            width={100000}
            height={100}
            className="w-[200px] rounded-[5px]"
          />
        </div>
        {searchParams?.email ? (
          <h1 className="text-md md:text-3xl text-center font-semibold my-4">
            We are sorry to see you go!
          </h1>
        ) : (
          <h1 className="text-md text-center lg:text-2xl px-5 font-semibold mt-6">
            You have been successfully unsubscribed from our mailing list.
          </h1>
        )}

        {searchParams?.email && (
          <p className="text-gray-700 text-center max-w-xl">
            Please click the button below to confirm
          </p>
        )}

        {searchParams?.email && (
          <div className="mt-6 text-center">
            <UnsubscribeButton email={searchParams?.email} />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};
export default page;

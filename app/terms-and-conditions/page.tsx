import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TermsandCondition from "@/page-modules/TermsandConditions/TermsandCondition";
import { cookies } from "next/headers";
import React from "react";

export interface Terms {
  searchParams: {
    open: string;
  };
}
export const metadata = {
  title: " 2PH Travel - Terms of Use | Your Trusted Flight Booking Platform",
  description:
    "Review the terms and conditions governing the use of 2PH Travel's flight booking services. By accessing our website and making bookings.",
  authors: [
    {
      name: "2PH Travel",
    },
  ],

  keywords: [
    "philippines flights",
    "flight to philippines",
    "flights to philippines",
    "cheap flight to philippines",
  ],
};

const TermsandConditions: React.FC<Terms> = ({ searchParams }) => {
  const UserLoginId = cookies().get("user_id")?.value || "";
  const firstName = cookies().get("first_name")?.value || "";
  const accesstoken = cookies().get("access_token")?.value || "";
  return (
    <>
      <Header
        isMobileView={searchParams.open}
        userId={UserLoginId}
        accesstoken={accesstoken}
        firstName={firstName}
      />
      <TermsandCondition />
      <Footer />
    </>
  );
};

export default TermsandConditions;

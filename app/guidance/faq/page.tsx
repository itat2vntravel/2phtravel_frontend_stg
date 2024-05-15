import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Faq from "@/page-modules/FAQ/Faq";
import { cookies } from "next/headers";
import React from "react";

export interface FAQInterface {
  searchParams: {
    open: string;
  };
}
export const metadata = {
  title: "2PH Travel - Your Ultimate Travel Companion",
  description:
    "Find answers to common questions about flight bookings, reservations, cancellations, and more.Helpful information to make your travel experience seamless.",
  authors: [
    {
      name: "2PH Travel",
    },
  ],

  keywords: [
    "Philippines flight cost",
    "Philippine Airlines flight attendant",
    "Philippine Airlines flight attendants",
    "flight to Philippines time",
    "how long is the flight to Philippines",
    "how long is a flight to Philippines",
  ],
};

const FAQ: React.FC<FAQInterface> = ({ searchParams }) => {
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
      <Faq />
      <Footer />
    </>
  );
};

export default FAQ;

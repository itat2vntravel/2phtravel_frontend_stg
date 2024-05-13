import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import CookiesPolicy from "@/page-modules/CookiesPolicy/CookiesPolicy";
import { cookies } from "next/headers";
import React from "react";

export interface CookiesInterface {
  searchParams: {
    open: string;
  };
}
export const metadata = {
  title: "Cookies Policy | 2PH Travel - Understanding Our Use of Cookies",
  description:
    "Learn about how 2PH Travel uses cookies to enhance your browsing experience and provide personalized services. Our Cookies Policy outlines the types of cookies we use and how you can manage your preferences.",
  authors: [
    {
      name: "2PH Travel",
    },
  ],

  keywords: [
    "cookies policy",
    "website cookies",
    "cookie management",
    "privacy policy",
  ],
};

const Cookies: React.FC<CookiesInterface> = ({ searchParams }) => {
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
      <CookiesPolicy />
      <Footer />
    </>
  );
};

export default Cookies;

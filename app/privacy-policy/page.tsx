import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import PrivacyPolicy from "@/page-modules/PrivacyPolicy/PrivacyPolicy";
import { cookies } from "next/headers";
import React from "react";

export interface PrivacyInterface {
  searchParams: {
    open: string;
  };
}
export const metadata = {
  title: "2PH Travel - Your Privacy Matters to Us",
  description:
    "How we collect, use, and protect your personal information when you use our flight booking services. Your privacy and security are our top priorities.",
  authors: [
    {
      name: "2PH Travel",
    },
  ],

  keywords: [
    "privacy policy",
    "data protection",
    "personal information",
    "privacy practices",
  ],
};

const Privacy: React.FC<PrivacyInterface> = ({ searchParams }) => {
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
      <PrivacyPolicy />
      <Footer />
    </>
  );
};

export default Privacy;

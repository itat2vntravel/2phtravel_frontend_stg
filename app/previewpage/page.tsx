import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import PreviewDetails from "@/page-modules/PreviewDetails/PreviewDetails";
import { cookies } from "next/headers";
import React from "react";

export interface PreviewpageParams {
  searchParams: {
    open: string;
  };
}

const Previewpage: React.FC<PreviewpageParams> = ({ searchParams }) => {
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
      <PreviewDetails />
      <Footer />
    </>
  );
};

export default Previewpage;

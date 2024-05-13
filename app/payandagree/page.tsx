import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Payandagree from "@/page-modules/Payandagree/Payandagree";
import { cookies } from "next/headers";
import React from "react";

export interface PayandagreePageParams {
  searchParams: {
    open: string;
  };
}

const PayandagreePage: React.FC<PayandagreePageParams> = ({ searchParams }) => {
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
      <Payandagree />
      <Footer />
    </>
  );
};

export default PayandagreePage;

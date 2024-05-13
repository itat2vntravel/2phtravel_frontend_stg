import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Tab from "@/components/Tab/Tab";
import { cookies } from "next/headers";
import React, { FC } from "react";

export interface SettingProps {
  searchParams: {
    open: string;
  };
}
const SettingPage: FC<SettingProps> = ({ searchParams }) => {
  const accesstoken = cookies().get("access_token")?.value || "";
  return (
    <>
      <Header
        isMobileView={searchParams.open}
        userId={""}
        firstName={""}
        accesstoken={accesstoken}
      />
      <div className="p-5 m-5 ">
        <Tab>gfg</Tab>
      </div>
      <Footer />
    </>
  );
};
export default SettingPage;

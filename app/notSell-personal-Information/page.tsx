// NotSellPersonalInformationPage.js
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { cookies } from "next/headers";
import React from "react";

export interface NotSellPersonalInformationParams {
  searchParams: {
    open: string;
  };
}

const NotSellPersonalInformationPage: React.FC<
  NotSellPersonalInformationParams
> = ({ searchParams }) => {
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

      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-customBlue">
            Not Selling Personal Information
          </h1>
          <p className="text-gray-700 mb-4">
            At 2PH Travel, we are committed to protecting your privacy and
            ensuring the confidentiality of your personal information. As part
            of our dedication to transparency and trust, we adhere to a strict
            policy of not selling your personal information to third parties.
          </p>
          <p className="text-gray-700 mb-4">
            Your privacy is paramount to us, and we understand the importance of
            safeguarding your data. When you use our website or interact with
            our services, we may collect certain personal information, such as
            your name, contact details, travel preferences, and booking history.
            This information is used solely for the purpose of facilitating your
            travel arrangements, improving our services, and enhancing your
            overall experience with 2PH Travel.
          </p>
          <p className="text-gray-700 mb-4">
            We do not engage in the sale of personal information, nor do we
            share your data with third-party advertisers or marketers for their
            own purposes. Your information remains confidential and is only
            disclosed to trusted partners and service providers who assist us in
            delivering our services to you.
          </p>
          <p className="text-gray-700 mb-4">
            By choosing 2PH Travel for your travel needs, you can trust that
            your privacy is respected and protected every step of the way. If
            you have any questions or concerns about our privacy practices,
            please don`t hesitate to reach out to us.
          </p>
          <p className="text-gray-700 mb-4">
            Thank you for entrusting us with your travel plans.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotSellPersonalInformationPage;

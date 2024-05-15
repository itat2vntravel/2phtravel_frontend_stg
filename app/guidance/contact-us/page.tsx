import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Contactus from "@/page-modules/ContactUs/Contactus";
import { cookies } from "next/headers";
import React from "react";

export interface ContactInterface {
  searchParams: {
    open: string;
  };
}
export const metadata = {
  title: "2PH Travel - Get in Touch with Our Customer Support Team",
  description:
    "Have questions or need assistance? Contact 2PH Travel's customer support team for help with flight bookings, reservations, refunds, and more.",
  authors: [
    {
      name: "2PH Travel",
    },
  ],

  keywords: [
    "Philippines flight attendant",
    "flight attendant in Philippines",
    "flight attendants in the Philippines",
    "flight attendant Philippines",
    "flight attendants Philippines",
    "Philippines Airlines flight attendant",
  ],
};

const ContactUs: React.FC<ContactInterface> = ({ searchParams }) => {
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
      <Contactus />
      <Footer />
    </>
  );
};

export default ContactUs;

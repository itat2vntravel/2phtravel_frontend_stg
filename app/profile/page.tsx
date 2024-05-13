import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Tab from "@/components/Tab/Tab";
import UserProfileCard from "@/components/UserProfileCard/UserProfileCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { FC } from "react";

export interface ProfileProps {
  searchParams: {
    open: string;
  };
}
export const metadata = {
  title: "Your Profile | 2PH Travel - Manage Your Account and Bookings",
  description:
    "Access and manage your profile on 2PH Travel to view your booking history, update personal information, and customize your travel preferences.",
  authors: [
    {
      name: "2PH Travel",
    },
  ],

  keywords: [
    "us to Philippines flight time",
    "Philippine Airlines stewardess",
    "Filipino flight attendant",
    "Filipino flight attendants",
  ],
};

const ProfilePage: FC<ProfileProps> = ({ searchParams }) => {
  const FulluserId = cookies().get("FulluserId")?.value || "";
  if (!FulluserId) {
    return redirect("/");
  }
  const UserLoginId = cookies().get("user_id")?.value || "";
  const firstName = cookies().get("first_name")?.value || "";
  const accesstoken = cookies().get("access_token")?.value || "";
  const provider = cookies().get("provider")?.value || "";

  return (
    <>
      <Header
        isMobileView={searchParams.open}
        userId={UserLoginId}
        firstName={firstName}
        accesstoken={accesstoken}
      />
      <div className="md:p-5 md:m-5 ">
        <Tab provider={provider}>
          <UserProfileCard />
        </Tab>
      </div>
      <Footer />
    </>
  );
};
export default ProfilePage;

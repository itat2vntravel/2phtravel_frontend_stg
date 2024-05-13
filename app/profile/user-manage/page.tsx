import GetUserBookingStatus from "@/action/booknow/GetuserBookingStatus";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Tab from "@/components/Tab/Tab";
import BookingStatusSection from "@/page-modules/BookingStatus/BookingStatus";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { FC } from "react";

export interface ProfileProps {
  searchParams: {
    open: string;
  };
}
export const metadata = {
  title: "2PH Travel - Track Your Flight Reservations",
  description:
    "Track the status of your flight reservations with ease on 2PH Travel. Stay updated on your booking details, flight status, and itinerary changes in real-time.",
  authors: [
    {
      name: "2PH Travel",
    },
  ],

  keywords: [
    "cheap flight to Philippines",
    "cheap flights Philippines",
    "cheap flights to Philippines",
    "cheapest flight to Philippines",
    "cheap flights to the Philippines",
  ],
};

const UserManagePage: FC<ProfileProps> = async ({ searchParams }) => {
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
          <div>
            <BookingStatusSection userId={FulluserId} />
          </div>
        </Tab>
      </div>
      <Footer />
    </>
  );
};
export default UserManagePage;

import GetBanner from "@/action/Banner/banner";

import Header from "@/components/Header/Header";
import AirlineFlightList from "@/page-modules/AirlineFlightList/AirlineFlightList";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import React from "react";
const Footer = dynamic(() => import("@/components/Footer/Footer"), {
  ssr: false,
  loading: () => <></>,
});
export interface BookFlightsInterface {
  searchParams: {
    open: string;
  };
}
export const metadata = {
  title: "2PH Travel - Book Now for Exclusive Flight Offers",
  description:
    "2PH Travel -book now for exclusive offers on flights to popular destinations worldwide. Don't miss out on our limited-time deals - reserve your seats today!",
  authors: [
    {
      name: "2PH Travel",
    },
  ],

  keywords: [
    "cheap flight to Philippines",
    "flight to Philippines",
    "flights to Philippines",
    "cheap flights Philippines",
    "cheap flights to Philippines",
    "cheapest flight to Philippines",
    "cheap flights to the Philippines",
  ],
};

async function HeroSectionApi() {
  const page = "airline";
  const section = "Banner";

  try {
    const response = await GetBanner(page, section);
    return response;
  } catch (error) {
    console.error("Banner API request failed:", error);
    throw error;
  }
}

const BookFlights: React.FC<BookFlightsInterface> = async ({
  searchParams,
}) => {
  const UserLoginId = cookies().get("user_id")?.value || "";
  const FulluserId = cookies().get("FulluserId")?.value || "";
  const firstName = cookies().get("first_name")?.value || "";
  const accesstoken = cookies().get("access_token")?.value || "";
  const heroBanner = await HeroSectionApi();

  return (
    <>
      <>
        <Header
          isMobileView={searchParams.open}
          userId={UserLoginId}
          firstName={firstName}
          accesstoken={accesstoken}
        />
        <AirlineFlightList heroBanner={heroBanner} userId={FulluserId} />

        <Footer />
      </>
    </>
  );
};

export default BookFlights;

import Header from "@/components/Header/Header";
import { cookies } from "next/headers";
import React from "react";
import dynamic from "next/dynamic";
import GetCityName from "@/action/Admin/City/DestinationCity";

export const metadata = {
  title: "2PH Travel - Explore Destinations Based on Attractions",
  description:
    "Plan your journey by venue with 2PH Travel and discover destinations based on attractions, landmarks, and venues of interest.",
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

const FlightListByDestination = dynamic(
  () =>
    import("@/page-modules/FlightListByDestination/FlightListByDestination"),
  {
    ssr: false,
    loading: () => <></>,
  }
);

const Footer = dynamic(() => import("@/components/Footer/Footer"), {
  ssr: false,
  loading: () => <></>,
});

export interface BookFlightsInterface {
  searchParams: {
    open: string;
  };
}

async function HeroSectionApi() {
  try {
    const response = await GetCityName();
    return response;
  } catch (error) {
    console.error("Banner API request failed:", error);
    throw error;
  }
}

const BookFlights: React.FC<BookFlightsInterface> = async ({
  searchParams,
}: any) => {
  const UserLoginId = cookies().get("user_id")?.value || "";
  const firstName = cookies().get("first_name")?.value || "";
  const accesstoken = cookies().get("access_token")?.value || "";
  const heroBanner = await HeroSectionApi();

  return (
    <>
      <Header
        isMobileView={searchParams.open}
        userId={UserLoginId}
        firstName={firstName}
        accesstoken={accesstoken}
      />

      <FlightListByDestination heroBanner={heroBanner} />

      <Footer />
    </>
  );
};

export default BookFlights;

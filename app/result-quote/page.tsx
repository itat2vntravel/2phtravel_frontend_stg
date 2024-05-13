import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import QuoteResultPage from "@/page-modules/FlightDetails/QuotePage/QuotePage";
import { cookies } from "next/headers";
import React from "react";

export interface BookNowInterface {
  searchParams: {
    open: string;
  };
}

const QuotePage: React.FC<BookNowInterface> = ({ searchParams }) => {
  const UserLoginId = cookies().get("user_id")?.value || "";
  const firstName = cookies().get("first_name")?.value || "";
  const accesstoken = cookies().get("access_token")?.value || "";
  const departureAirport = cookies().get("departureAirportAndCode")?.value
    ? JSON.parse(cookies().get("departureAirportAndCode")?.value || "")
    : undefined;

  const destinationAirport = cookies().get("destinationAirportAndCode")?.value
    ? JSON.parse(cookies().get("destinationAirportAndCode")?.value || "")
    : undefined;
  const type = JSON.parse(cookies().get("type")?.value || "");
  const departureDate = cookies().get("departureDate")?.value
    ? JSON.parse(cookies().get("departureDate")?.value || "")
    : undefined;
  const returnDate = cookies().get("returnDate")?.value
    ? JSON.parse(cookies().get("returnDate")?.value || "")
    : undefined;
  const adultsCount = cookies().get("adults")?.value || 0;
  const childrenCount = cookies().get("children")?.value || 0;
  const infantsCount = cookies().get("Infants")?.value || 0;
  const cabin = cookies().get("cabin")?.value
    ? JSON.parse(cookies().get("cabin")?.value || "")
    : undefined;
  const FulluserId = cookies().get("FulluserId")?.value || "";

  return (
    <>
      <Header
        isMobileView={searchParams.open}
        userId={UserLoginId}
        firstName={firstName}
        accesstoken={accesstoken}
      />
      <QuoteResultPage
        departureAirport={departureAirport}
        type={type}
        destinationAirport={destinationAirport}
        date={departureDate}
        returnDate={returnDate}
        infantsCount={infantsCount}
        childrenCount={childrenCount}
        adultsCount={adultsCount}
        cabin={cabin}
        FulluserId={FulluserId}
      />
      <Footer />
    </>
  );
};

export default QuotePage;

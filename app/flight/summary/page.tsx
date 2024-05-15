import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Summery from "@/page-modules/FlightDetails/Summary/Summery";
import { cookies } from "next/headers";
import React from "react";
import Styles from "./flightdetails.module.css";
import FilghtDetailsSummary from "@/page-modules/Summary/summarypage";
import { redirect } from "next/navigation";

export interface BookNowInterface {
  searchParams: {
    open: string;
  };
}

const BookNow: React.FC<BookNowInterface> = ({ searchParams }) => {

  const UserLoginId = cookies().get("user_id")?.value || "";
  const firstName = cookies().get("first_name")?.value || "";

  const type = JSON.parse(cookies().get("type")?.value || "");

  const adultscount = cookies().get("adults")?.value || 0;
  const childrencount = cookies().get("children")?.value || 0;
  const InfantsCount = cookies().get("Infants")?.value || 0;

  const cabin = cookies().get("cabin")?.value
    ? JSON.parse(cookies().get("cabin")?.value || "")
    : undefined;

  const accesstoken = cookies().get("access_token")?.value || "";
  const departureAirport = cookies().get("departureAirport")?.value
    ? JSON.parse(cookies().get("departureAirport")?.value || "")
    : undefined;

  const destinationAirport = cookies().get("destinationAirport")?.value
    ? JSON.parse(cookies().get("destinationAirport")?.value || "")
    : undefined;
  return (
    <>
      <Header
        isMobileView={searchParams.open}
        userId={UserLoginId}
        firstName={firstName}
        accesstoken={accesstoken}
      />
      <div className={`container mx-auto ${Styles.paddingcontainer}`}>
        <div className="mt-6 mb-6">
          <div className="grid grid-cols-12 gap-4 ">
            <div className=" lg:col-span-8  md:col-span-12 col-span-12 mx-5 ">
              <FilghtDetailsSummary
                departureAirport={departureAirport}
                cabin={cabin}
                destinationAirport={destinationAirport}
              />
            </div>
            <div className=" lg:col-span-4 mx-5  md:col-span-12  col-span-12">
              <Summery
                type={type}
                adults={adultscount}
                childrenCount={childrencount}
                InfantsCount={InfantsCount}
                cabin={cabin}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookNow;

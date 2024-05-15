import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import FlightCard from "@/page-modules/FlightDetails/FlightCard";
import Airlinesradio from "@/page-modules/FlightRadio/Airlinesradio";
import Flightradio from "@/page-modules/FlightRadio/Flightradio";
import { cookies } from "next/headers";
import React, { FC } from "react";
import Departtimeradio from "@/page-modules/FlightRadio/Departtimeradio";
import ModifySearch from "@/page-modules/ModifySearch/ModifySearch";
import SearchTopBanner from "@/components/SearchTopBanner/SearchTopBanner";
import SearchCityName from "@/components/SearchTopBanner/SearchCityName";
import GetBanner from "@/action/Banner/banner";

export interface FlightSearchProps {
  searchParams: {
    open: string;
    stop: string;
    airline: string;
    departtime: string;
  };
}

async function HeroSectionApi() {
  const page = "FlightSearch";
  const section = "heroSection";

  try {
    const response = await GetBanner(page, section);
    return response;
  } catch (error) {
    console.error("Banner API request failed:", error);
    throw error;
  }
}

const FlightSearchpage: FC<FlightSearchProps> = async ({ searchParams }) => {
  const heroBanner = await HeroSectionApi();

  const userId = cookies().get("user_id")?.value || "";
console.log(userId)
  const departureAirport = cookies().get("departureAirport")?.value
    ? JSON.parse(cookies().get("departureAirport")?.value || "")
    : undefined;

  const destinationAirport = cookies().get("destinationAirport")?.value
    ? JSON.parse(cookies().get("destinationAirport")?.value || "")
    : undefined;

  const type = cookies().get("type")?.value
    ? JSON.parse(cookies().get("type")?.value || "")
    : undefined;

  const departureDate = cookies().get("departureDate")?.value
    ? JSON.parse(cookies().get("departureDate")?.value || "")
    : undefined;

  const adultscount = cookies().get("adults")?.value || 0;
  const childrencount = cookies().get("children")?.value || 0;

  const trips = cookies().get("trips")?.value
    ? JSON.parse(cookies().get("trips")?.value || "")
    : undefined;

  const returnDate = cookies().get("returnDate")?.value
    ? JSON.parse(cookies().get("returnDate")?.value || "")
    : undefined;
  const cabin = cookies().get("cabin")?.value
    ? JSON.parse(cookies().get("cabin")?.value || "")
    : undefined;

  const departureAirportmodify = cookies().get("departureAirportmodify")?.value
    ? JSON.parse(cookies().get("departureAirportmodify")?.value || "")
    : undefined;

  const destinationAirportmodify = cookies().get("destinationAirportmodify")
    ?.value
    ? JSON.parse(cookies().get("destinationAirportmodify")?.value || "")
    : undefined;

  const typemodify = cookies().get("typemodify")?.value
    ? JSON.parse(cookies().get("typemodify")?.value || "")
    : undefined;

  const departureDatemodify = cookies().get("departureDatemodify")?.value
    ? JSON.parse(cookies().get("departureDatemodify")?.value || "")
    : undefined;

  const adultsmodify = cookies().get("adultsmodify")?.value || 0;
  const childrenmodify = cookies().get("childrenmodify")?.value || 0;
  const Infantsmodify = cookies().get("Infantsmodify")?.value || 0;

  const tripsmodify = cookies().get("tripsmodify")?.value
    ? JSON.parse(cookies().get("tripsmodify")?.value || "")
    : undefined;

  const returnDatemodify = cookies().get("returnDatemodify")?.value
    ? JSON.parse(cookies().get("returnDatemodify")?.value || "")
    : undefined;
  const cabinmodify = cookies().get("cabinmodify")?.value
    ? JSON.parse(cookies().get("cabinmodify")?.value || "")
    : undefined;

  const email = cookies().get("email")?.value || "";

  const mobile_number = cookies().get("phone_no")?.value
    ? JSON.parse(cookies().get("phone_no")?.value || "")
    : undefined;
  const firstName = cookies().get("first_name")?.value
    ? JSON.parse(cookies().get("first_name")?.value || "")
    : undefined;
  const airlineCodes = cookies().get("airlineCodes")?.value
    ? JSON.parse(cookies().get("airlineCodes")?.value || "")
    : "";

  const UserLoginId = cookies().get("user_id")?.value || "";
  const accesstoken = cookies().get("access_token")?.value || "";

  return (
    <>
      <div>
        <Header
          isMobileView={searchParams.open}
          userId={UserLoginId}
          firstName={firstName}
          accesstoken={accesstoken}
        />
        <SearchTopBanner
          Selecttype={type}
          heroBanner={heroBanner[0]?.image_url}
        />
        <div className="md:p-5 md:m-5 mx-auto">
          <div>
            <ModifySearch
              trips={trips}
              cabin={cabin}
              departureAirport={departureAirport}
              destinationAirport={destinationAirport}
              adults={adultscount}
              childrenCount={childrencount}
              departureAirportmodify={departureAirportmodify}
              destinationAirportmodify={destinationAirportmodify}
              typemodify={typemodify}
              departureDatemodify={departureDatemodify}
              returnDatemodify={returnDatemodify}
              adultsmodify={adultsmodify}
              childrenmodify={childrenmodify}
              cabinmodify={cabinmodify}
              tripsmodify={tripsmodify}
              Infantsmodify={Infantsmodify}
            />
          </div>
          <SearchCityName Selecttype={type} cabin={cabin} />
          <div className="grid grid-cols-12 mt-3">
            <div className="col-span-12 lg:col-span-3 mx-2">
              <div
                className="border rounded-[5px] pl-5 pr-5"
                style={{ boxShadow: "1px 3px 34px -9px #00000040" }}
              >
                <h1 className="text-[16px] md:text-[20px] text-[#152D54] mt-2">
                  Stops
                </h1>
                <Flightradio />
         
                {airlineCodes && airlineCodes.length !== 0 && (
                  <h1 className="text-[16px] md:text-[20px] text-[#152D54] mt-2">
                    Airlines
                  </h1>
                )}
                <Airlinesradio airlineCodes={airlineCodes} />

                <h1 className="text-[16px] md:text-[20px] text-[#152D54] mt-2">
                  Depart Time
                </h1>
                <Departtimeradio />
              </div>
              <p className="text-gray-500 text-[12px] mt-4 flex justify-start items-start gap-1 mb-4">
                <span>*</span> Prices are displayed for reference, contact our
                team to get better prices via email or wire.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-9 mx-5">
              <div>
                <FlightCard
                  type={type}
                  departureAirport={departureAirport}
                  destinationAirport={destinationAirport}
                  departureDate={departureDate}
                  returnDate={returnDate}
                  cabin={cabin}
                  adults={adultscount}
                  childrenCount={childrencount}
                  userId={userId}
                  firstName={firstName}
                  email={email}
                  mobile_number={mobile_number}
                  airline={searchParams.airline}
                  stop={searchParams.stop}
                  departtime={searchParams.departtime}
                  trips={trips}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default FlightSearchpage;

"use client";
import useModifySearch from "@/store/ModifySearch";
import React, { FC } from "react";
import { FaLocationDot } from "react-icons/fa6";
import FlightIconImage from "../Images/FlightIcon";
import airports from "@nwpr/airport-codes";
import { MdFlightClass } from "react-icons/md";

interface SearchCityNameProps {
  Selecttype?: string;
  cabin?: string;
}
interface FlightDataprops {
  airport_name: string;
  iata: string;
  country_code: string;
  city_name: string;
  location: string;
  continent: string;
}
const SearchCityName: FC<SearchCityNameProps> = ({ Selecttype, cabin }) => {
  const { departure, destination } = useModifySearch((state) => state);
  // const departureAirport = airports.find(
  //   (airport) => airport.iata === departure
  // )?.city;
  const departureAirport =
    airports.find((airport) => airport.iata === departure)?.city ===
    "Angeles City"
      ? "Pampanga (Clark)"
      : airports.find((airport) => airport.iata === departure)?.city ===
        "Madras"
      ? "Chennai"
      : airports.find((airport) => airport.iata === departure)?.city;
  const destinationAirport =
    airports.find((airport) => airport.iata === destination)?.city ===
    "Angeles City"
      ? "Pampanga (Clark)"
      : airports.find((airport) => airport.iata === destination)?.city ===
        "Madras"
      ? "Chennai"
      : airports.find((airport) => airport.iata === destination)?.city;
  const EconmyClass =
    cabin === "E" ? "Economy" : cabin === "F" ? "First Class" : "Business";
  return (
    <>
      {Selecttype === "multicities" ? (
        <>
          <div className="flex  items-center gap-2 md:text-[24px] mx-5">
            <FaLocationDot className="text-customBlue" />
            <h1 className="text-customBlue text-[16px] md:text-[24px]">
              Multicities Flights
            </h1>
            {/* <MdFlightClass className="text-customBlue" /> */}
            {/* <h1 className="text-customBlue text-[16px] md:text-[24px]">
              Cabin: {EconmyClass}
            </h1> */}
            {/* <FlightIconImage
              fillColor="#FF0000"
              CustomClass="w-[24px] h-[24px]"
            /> */}
            {/* <h1 className="text-customBlue text-[24px]">{destinationAirport}</h1> */}
          </div>
        </>
      ) : (
        <>
          <div className="flex  items-center gap-2 text-[16px] md:text-[24px] mx-5">
            <FaLocationDot className="text-customBlue" />
            <h1 className="text-customBlue text-[16px] md:text-[24px] ">
              {departureAirport}
            </h1>
            <FlightIconImage
              fillColor="#FF0000"
              CustomClass="w-[24px] h-[24px]"
            />
            <h1 className="text-customBlue text-[16px] md:text-[24px]">
              {destinationAirport}
            </h1>
            {/* <MdFlightClass className="text-customBlue" />
            <h1 className="text-customBlue text-[16px] md:text-[24px]">
              Cabin: {EconmyClass}
            </h1> */}
          </div>
        </>
      )}
    </>
  );
};
export default SearchCityName;

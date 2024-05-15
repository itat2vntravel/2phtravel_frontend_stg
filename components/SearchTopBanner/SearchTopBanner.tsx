"use client";

import React, { FC, useEffect } from "react";
import FlightIconImage from "../Images/FlightIcon";
import airports from "@nwpr/airport-codes";
import { redirect } from "next/navigation";
import useModifySearch from "@/store/ModifySearch";

interface SearchTopBannerprops {
  Selecttype?: string;
  heroBanner?: any;
}
interface FlightDataprops {
  airport_name: string;
  iata: string;
  country_code: string;
  city_name: string;
  location: string;
  continent: string;
}

const SearchTopBanner: FC<SearchTopBannerprops> = ({
  Selecttype,
  heroBanner,
}) => {
  const { departure, destination } = useModifySearch((state) => state);

  useEffect(()=>{
    console.log(departure, destination)
     if(!departure && !destination)
      {
        redirect("/");
      }
      },[])
  const departureAirport = airports.find(
    (airport) => airport.iata === departure
  )?.name;
  const destinationAirport = airports.find(
    (airport) => airport.iata === destination
  )?.name;


  return (
    <>
      {Selecttype === "multicities" ? (
        <>
          <div
            className=" h-[20vh] md:h-[40vh] bg-cover bg-center relative  "
            style={{
              backgroundImage: heroBanner
                ? `url(${heroBanner})`
                : `url('/bgsearch.png' )`,
            }}
            id="GoModify"
          >
            <div className="flex flex-col w-full h-full items-start justify-end px-[40px] pb-[20px]">
              <h1 className="md:text-4xl text-white">Multicities Flights</h1>
            </div>
          </div>
        </>
      ) : (
        <div
          className=" h-[30vh] md:h-[40vh] bg-cover bg-center relative  "
          style={{
            backgroundImage: heroBanner
              ? `url(${heroBanner})`
              : `url('/bgsearch.png' )`,
          }}
          id="GoModify"
        >
          <div className="flex flex-col w-full h-full items-start justify-end px-[40px] pb-[20px]">
            <div className="flex gap-[2px]">
              <h1 className="md:text-4xl text-white"> {departureAirport} </h1>
              <FlightIconImage
                fillColor="#fff"
                CustomClass="w-[30px] md:w-[50px]  h-[30px]  md:h-[50px]"
              />
            </div>

            <h1 className="md:text-4xl text-white">{destinationAirport}</h1>
          </div>
        </div>
      )}
    </>
  );
};
export default SearchTopBanner;

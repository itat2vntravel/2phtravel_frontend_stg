"use client";
import React from "react";

import dynamic from "next/dynamic";

const Airlinedeals = dynamic(
  () => import("@/page-modules/AirlineFlightList/AirlineDeals"),
  {
    ssr: false,
    loading: () => <></>,
  }
);
const WhyChooseUs = dynamic(
  () => import("@/page-modules/AirlineFlightList/WhyChooseUs"),
  {
    ssr: false,
    loading: () => <></>,
  }
);

const AirlineFlightList = ({ heroBanner, userId }: any) => {
  return (
    <div>
      <div className="h-auto bg-cover bg-center relative opacity-70">
        <div
          className="absolute inset-0 bg-black "
          style={{
            backgroundImage: `url(${
              heroBanner[0]?.image_url || "/TopAirlineDeals/flightimage.png"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="flex h-[500px] items-center justify-center ">
          <h1 className="mb-4 text-3xl text-white z-10">Top Airline Deals</h1>
        </div>
      </div>
      <WhyChooseUs />

      <div>
        <Airlinedeals userId={userId} />
      </div>
    </div>
  );
};

export default AirlineFlightList;

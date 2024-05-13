import React from "react";
import load from "../../public/load1.gif";
import Image from "next/image";

export default function Flightloader() {
  return (
    <>
      <div className="h-full  z-[100] flex flex-col items-center justify-center">
        <Image
          src={load}
          width={100}
          height={100}
          alt="loader"
          // className="w-[150px] h-[150px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
          className="w-auto h-auto  "
        />
        <h1 className="mx-2 md:mx-0 text-[14px] md:text-[15px]">
          {/* Please be patient as we load the necessary flight search data for you. */}
          {/* {`We're searching for you, please be patient.`} */}
          Please wait while we find your flight options.
        </h1>
      </div>
    </>
  );
}

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
          className="w-auto h-auto  "
        />
        <h1 className="mx-2 md:mx-0 text-[14px] md:text-[15px]">
          Please wait while we find your flight options.
        </h1>
      </div>
    </>
  );
}

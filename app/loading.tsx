import Image from "next/image";
import React, { FC } from "react";
import load from "@/public/gif/loadingflight.gif";

export interface FlightSearchProps {}

const LoadingPage: FC<FlightSearchProps> = async () => {
  return (
    <>
      <div
        className="h-[100vh]  z-[100] flex flex-col items-center justify-center"
        style={{ border: "2px solid white" }}
      >
        <Image
          src={load}
          width={100}
          height={100}
          alt="loader"
          className="w-fit h-fit  rounded-full"
        />
      </div>
    </>
  );
};
export default LoadingPage;

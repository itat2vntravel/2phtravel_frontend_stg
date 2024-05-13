"use client";

import Image from "next/image";
import ErrorFoundImage from "@/public/error/error.png";
import Link from "next/link";

export default function Error({
  reset,
}: {
  reset: () => void;
  searchParams: {
    open: string;
  };
}) {
  return (
    <>
      <div>
        <div className="h-screen flex items-center justify-center w-full border">
          <div className="container mx-auto flex items-center flex-col my-10">
            <div>
              <Image
                src={ErrorFoundImage}
                alt="2PH Travel Error image"
                width={100000}
                height={100}
                className="w-[200px] rounded-[5px]"
              />
            </div>

            <h1 className="text-md md:text-3xl text-center font-semibold my-4">
              Aaaah! Something went wrong
            </h1>

            <p className="text-gray-700 max-w-xl text-center px-5">
              {` Brace yourself till we get the error fixed.You may also refresh the page or try again later`}
            </p>

            <div className="mt-6 flex items-center justify-between ">
              <button
                className="bg-[#ec2719] flex gap-2 justify-center items-center p-2 rounded-[5px] text-white w-[130px]"
                onClick={() => reset()}
              >
                Try Again
              </button>
              <Link
                href="/"
                className="bg-[#ec2719] flex gap-2 justify-center items-center p-2 rounded-[5px] text-white ml-3 w-[130px]"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

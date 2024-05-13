"use client";
import React from "react";
import AsiaImage from "../../public/Container/asia.jpg";
import EuropeImage from "../../public/Container/Europe.jpg";
import Image from "next/image";
import Link from "next/link";
import { formUrlQuery } from "@/utils/formUrlQuery";
import { useRouter, useSearchParams } from "next/navigation";
import QuotePopup from "@/components/QuotePopup/QuotePopup";

export default function FlightsListCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const CountryList = [
    {
      Image: AsiaImage,
      Title: "Asia Start from $600 *",
      SubTitle: "Asia List",
      Countries: [
        { name: "Thailand", price: 600 },
        { name: "Vietnam", price: 700 },
        // Add more countries as needed
      ],
    },
    {
      Image: AsiaImage,
      Title: "Africa from from $700 *",
      SubTitle: "Africa List",
      Countries: [
        { name: "Ivory Coast", price: 900 },
        { name: "Ethiopia", price: 700 },
        // Add more countries as needed
      ],
    },
    {
      Image: AsiaImage,
      Title: "North America  from $900 *",
      SubTitle: "North America  List",
      Countries: [
        { name: "United States", price: 900 },
        { name: "Canada", price: 1500 },
        // Add more countries as needed
      ],
    },
    {
      Image: EuropeImage,
      Title: "Europe  from $900 *",
      SubTitle: "Europe  List",
      Countries: [
        { name: "United Kingdom", price: 900 },
        { name: "France", price: 1500 },
        { name: "Italy", price: 1500 },
        // Add more countries as needed
      ],
    },
  ];
  const handlebooking = () => {
    let newUrl;
    newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "quotepopup",
      value: "open",
    });

    router.push(newUrl, { scroll: false });
  };
  return (
    <>
      <div className="grid grid-cols-4 gap-[20px] mt-[20px]">
        {CountryList.map((countryItem, index) => (
          <div className="relative h-[500px]" key={index}>
            <div className="border p-3  bg-white  rounded-[5px] hover:z-0 card1 absolute top-0 left-0 w-full h-full z-10 hover:opacity-0 transition duration-300 ease-in-out">
              <div className="flex flex-col">
                <div>
                  <Image
                    src={countryItem.Image}
                    alt="Asia"
                    className="w-[330px] h-[330px] rounded-[5px]"
                  />
                </div>
                <div className="my-4">
                  <h1 className="text-[25px]">{countryItem.Title}</h1>
                </div>
                <div className="flex justify-end">
                  <button className="rounded-[6px] font-normal font-main px-5 py-2 text-white bg-[#ec2719] hidden lg:block">
                    Get a Quote
                  </button>
                </div>
              </div>
            </div>
            <div className="border p-3 rounded-[5px] bg-white hover:z-10 absolute top-0 left-0 w-full h-full   transition duration-300 ease-in-out hover:opacity-1">
              <div className="flex justify-center items-center">
                <h1 className="text-[25px]">{countryItem.SubTitle}</h1>
              </div>
              {countryItem.Countries.map((country, index) => (
                <div
                  className="border p-4 cursor-pointer"
                  onClick={handlebooking}
                  key={index}
                >
                  <div className="flex justify-between">
                    <h1 className="text-[16px] font-normal">{country.name}</h1>
                    <h1 className="text-[16px] font-normal">
                      ${country.price}*
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <QuotePopup />
    </>
  );
}

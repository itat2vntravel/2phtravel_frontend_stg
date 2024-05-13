"use client";
import { Dialog, Divider } from "@mui/material";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaArrowRightLong, FaLocationDot } from "react-icons/fa6";
import airports from "@nwpr/airport-codes";
import Logo from "../../public/logo1.jpg";
import useBookingQuote from "@/store/BookingQuote";
import { formUrlQuery } from "@/utils/formUrlQuery";
import { useRouter, useSearchParams } from "next/navigation";
import QuotePopup from "../QuotePopup/QuotePopup";
import Link from "next/link";

interface ImagePopupInterface {
  promotion: {
    date: string;
    desc: string;
    from_place: string;
    image_url: string;
    price: string;
    title: string;
    to_place: string;
  };
}

const ImagePopup: FC<ImagePopupInterface> = ({ promotion }) => {
  const [Imageopen, setImageOpen] = useState(false);
  const { updateBookingStore } = useBookingQuote((state) => state);
  const router = useRouter();
  const searchParams = useSearchParams();
  const quotepopup = searchParams.get("quotepopup");

  useEffect(() => {
    setTimeout(() => {
      if (!sessionStorage.getItem("ImageOpen")) {
        setImageOpen(true);
        sessionStorage.setItem("ImageOpen", "true");
      }
    }, 3000);
  }, []);

  useEffect(() => {
    if (Imageopen) {
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflowY = "scroll";
    }
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [Imageopen]);

  // const formatDate = (date: string) => {
  //   const [year, month, day] = date.split("-");
  //   return `${month}-${day}-${year}`;
  // };

  // const handlebooking = (res: {
  //   date: string;
  //   desc: string;
  //   from_place: string;
  //   image_url: string;
  //   price: string;
  //   title: string;
  //   to_place: string;
  // }) => {
  //   const DestinationAirport = airports.find(
  //     (airport) => airport.city === res.to_place
  //   )?.name;
  //   const DestinationAirportCode = airports.find(
  //     (airport) => airport.city === res.to_place
  //   )?.iata;
  //   updateBookingStore({
  //     departure: res.from_place,
  //     destination: `${DestinationAirport}[${DestinationAirportCode}]`,
  //     departure_date:
  //       res.date.length >= 11 ? formatDate(res.date.substring(0, 11)) : "",
  //     return_date:
  //       res.date.length >= 11 ? formatDate(res.date.substring(11)) : "",
  //     fair: res.price,
  //   });
  //   setImageOpen(false);
  //   let newUrl;
  //   newUrl = formUrlQuery({
  //     params: searchParams.toString(),
  //     key: "quotepopup",
  //     value: "open",
  //   });

  //   router.push(newUrl, { scroll: false });
  // };

  return (
    <>
      {quotepopup == "open" ? <QuotePopup /> : null}
      <Dialog
        open={Imageopen}
        keepMounted
        onClose={() => setImageOpen(false)}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="md"
        className="!rounded-xl"
      >
        {/* <div
          onClick={() => setImageOpen(false)}
          className=" cursor-pointer text-3xl text-gray-500 flex justify-end mt-[15px] mr-[20px]"
        >
          <IoCloseSharp
            onClick={() => setImageOpen(false)}
            className=" cursor-pointer text-3xl text-gray-500 "
          />
        </div> */}
        {/* <Link href={"/promotion"} className="cursor-pointer">
          <div className="relative !rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 p-3">
             
              <div className="md:w-auto h-auto relative">
                <Image
                  src={promotion?.image_url || "/white.jpg"}
                  alt="Promotion image"
                  width={1000}
                  height={100}
                  className="w-full !h-[440px] md:cursor-zoom-in rounded-2xl"
                />
              </div>

              

              <div className="relative">
                <div className="px-6">
                  <div className="mb-3">
                    <h5 className="mr-2 text-customBlue text-[25px] font-semibold">
                      {promotion.title}
                    </h5>
                  </div>
                  <div className="flex justify-start items-center mb-3">
                    <FaLocationDot className=" text-[#EC2719] text-[18px] rounded-full px-1 " />
                    <h5 className="mr-2 text-customBlue text-[18px] font-semibold">
                      {
                        airports.find(
                          (airport) =>
                            airport.iata ===
                            promotion.from_place
                              ?.split("[")[1]
                              ?.replace("]", "")
                        )?.city
                      }
                    </h5>
                    <FaArrowRightLong className="text-[18px]" />
                    <FaLocationDot className="text-[18px] text-[#EC2719] rounded-full  px-1 " />
                    <h5 className="text-customBlue text-[18px] font-semibold">
                      {promotion.to_place === "Angeles City"
                        ? "Pampanga"
                        : promotion.to_place}
                    </h5>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <h5>
                      Depart :
                      <span className="font-semibold text-customBlue">
                        {" "}
                        {promotion.date.length >= 11
                          ? formatDate(promotion.date.substring(0, 11))
                          : ""}
                      </span>{" "}
                    </h5>
                    <h5>
                      Return :
                      <span className="font-semibold text-customBlue">
                        {" "}
                        {promotion.date.length >= 11
                          ? formatDate(promotion.date.substring(11))
                          : ""}
                      </span>{" "}
                    </h5>
                  </div>
                  <Divider />
                  <div className="mt-3">
                    <p>{promotion.desc}</p>
                  </div>
                </div>

                <div className="mt-3 px-6 relative md:absolute bottom-0 w-full ">
                  <Divider />
                  <div className="flex justify-between items-end mt-3 ">
                    <div>
                      <h3 className="font-semibold text-2xl text-customBlue">
                        <p className="text-[16px] text-black p-0 m-0">Fair</p>$
                        {promotion.price}*
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link> */}
        <div className="relative">
          <IoCloseSharp
            onClick={() => setImageOpen(false)}
            className="absolute top-3 right-3 cursor-pointer text-3xl text-white "
          />
          <Image
            src={promotion?.image_url}
            alt="BannerDemo Image"
            width={140}
            height={10}
            priority
            layout="responsive"
            className="2xl:!h-[640px] lg:!h-[540px] !h-[450px] 2xl:!w-[640px] lg:!w-[540px] !w-[450px] border-2  rounded-md "
          />
        </div>
      </Dialog>
    </>
  );
};

export default ImagePopup;

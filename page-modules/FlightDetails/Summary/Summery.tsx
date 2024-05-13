"use client";
import { Card, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import Styles from "./summery.module.css";
import InfoIcon from "@mui/icons-material/Info";
import CustomButton from "@/components/Button/Button";
import Link from "next/link";
import useSearchFlight from "@/store/flightSearchStore";
import useBookingInfo from "@/store/FlightBooking";
import { usePathname, useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import CardpaymentApi from "@/action/booknow/Cardpayment";
import BookingFormApi from "@/action/booknow/booknow";
import { PulseLoader } from "react-spinners";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import useBookingQuote from "@/store/BookingQuote";

export interface SummaryProps {
  type: string;
  cabin: string;
  adults: string | 0;
  childrenCount: string | 0;
  InfantsCount: string | 0;
}
const Summery: React.FC<SummaryProps> = ({
  type,
  adults,
  childrenCount,
  InfantsCount,
  cabin,
}) => {
  const Currentpath = usePathname();

  const { totalPrice } = useSearchFlight((state) => state);

  const totalAdults =
    typeof adults === "string" ? parseInt(adults, 10) : adults;
  const totalChildrenCount =
    typeof childrenCount === "string"
      ? parseInt(childrenCount, 10)
      : childrenCount;
  const totalInfantsCount =
    typeof InfantsCount === "string"
      ? parseInt(InfantsCount, 10)
      : InfantsCount;
  const totalcount = totalAdults + totalChildrenCount + totalInfantsCount;

  const numberWithCommas = (x: string) => {
    const parts = x.toString().split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");
  };

  return (
    <Card className={` ${Styles.cardShadow} mb-5`}>
      <h1 className="mt-[15px] mx-5 text-[#ff0000] uppercase">Summary</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "15px",
        }}
      >
        <div className="flex justify-between p-[15px]">
          <p className="capitalize font-semibold">Type: </p>
          <p className="capitalize font-semibold">{type}</p>
        </div>
        <hr></hr>

        <div className="flex capitalize justify-between p-[15px]">
          <p className="font-semibold">Passenger: </p>
          <p className="font-semibold">{totalcount}</p>
        </div>
        <hr></hr>
        <div className="flex justify-between p-[15px]">
          <p className="capitalize font-semibold">Cabin: </p>
          <p className="font-semibold">
            {" "}
            {cabin === "E"
              ? "Economy"
              : cabin === "F"
              ? "First Class"
              : "Business"}
          </p>
        </div>

        <hr></hr>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
          }}
        >
          <div>
            <b>Total Fees</b>
            {/* <Tooltip title="Total Fees include Service Fees and Tax Fees">
              <InfoIcon style={{ fontSize: "16px", marginLeft: "5px" }} />
            </Tooltip> */}
          </div>

          <p className="text-xl">
            {" "}
            <b>${numberWithCommas(totalPrice)}*</b>
          </p>
        </div>

        {Currentpath === "/booknow" ? (
          <>
            {/* <>
              <button
                className="bg-[#EC2719] text-white p-2 mt-[20px] w-full rounded-md"
                type="button"
                onClick={() => handlesubmit()}
                disabled={loading ? true : false}
              >
                {loading ? <PulseLoader color="#fff" /> : " Submit and Book"}
              </button>
            </> */}

            <p className="text-gray-500 px-[15px] text-[12px]  flex justify-start items-start gap-1">
              <span>*</span> Prices are displayed for reference, contact our
              team to get better prices via email or wire.
            </p>
          </>
        ) : (
          <>
            <Link href={"/result-quote"}>
              <CustomButton
                text="Submit and Book"
                colored={"true"}
                customclass="w-[100%]"
                type="submit"
              />
            </Link>
            <p className="text-gray-500 text-[12px] mt-4 text-center">
              *Prices are displayed for reference, contact our team to get
              better prices via email or wire.
            </p>
          </>
        )}
      </div>
      <Toaster />
    </Card>
  );
};

export default Summery;

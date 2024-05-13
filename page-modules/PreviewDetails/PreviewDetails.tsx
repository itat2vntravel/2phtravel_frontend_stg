"use client";
import { Card, Container } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
// import SigngoImage from "@/public/payment/Sign&go.png";
import SigngoImage from "@/public/payment/signgo.png";
import Image from "next/image";
import { MdOutlineFlight } from "react-icons/md";
import FlightIconImage from "@/components/Images/FlightIcon";
import { airports } from "@nwpr/airport-codes";
import airlines from "airline-codes";
import { IoIosPrint } from "react-icons/io";
import Getbookflightnow from "@/action/booknow/bookflightnow";
import Style from "./PreviewDetails.module.css";
import LoadImage from "../../public/load2.gif";

interface Segment {
  airlineCode: string;
  departureAirportCode: string;
  departureTime: string;
  arrivalAirportCode: string;
  arrivalTime: string;
  duration: number;
  aircraftModel: string;
  flightNumber: number;
  BookingClass: string;
  departureCountryCode: string;
  arrivalCountryCode: string;
  cabin: string;
}
interface BookingInfo {
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  status: string;
  booking_code: string;
  trip_info: Tripinfoprops[];
}
interface Tripinfoprops {
  date: string;
  departure: string;
  destination: string;
}
interface CardInfo {
  amount: string;
}

export default function PreviewDetails() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [data, setData] = useState([]);
  const [BookingInfoData, setBookingInfoData] = useState<BookingInfo>();
  const [CardInfoData, setCardInfoData] = useState<CardInfo>();
  const [FlightInfoData, setFlightInfoData] = useState([]);
  const departureAirport = BookingInfoData?.trip_info[0].departure;
  const destinationAirport = BookingInfoData?.trip_info[0].destination;

  const handlepayandagree = (token: string) => {
    router.push(`/payandagree?token=${token}`);
  };
  useEffect(() => {
    const bookflightnowAPI = async () => {
      const booktoken = searchParams.get("token") as string;
      try {
        const response = await Getbookflightnow(booktoken);
        // console.log("response", response);
        if (response) {
          setFlightInfoData(response?.booking_info.flight_info);
          setBookingInfoData(response?.booking_info);
          setCardInfoData(response?.card_info);
          router.push(`/previewpage?token=${token}`, { scroll: false });
        }
      } catch (error) {
        console.error("Booking search failed:", error);

        throw error;
      }
    };
    bookflightnowAPI();
  }, [searchParams]);

  const tripsData = FlightInfoData;

  const convertMinutesToHours = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hours ${remainingMinutes} min`;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long", // Display the full name of the day of the week
      month: "short", // Display the abbreviated month name
      day: "2-digit", // Display the day of the month with leading zeros if necessary
      year: "numeric", // Display the full numeric year
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };
  const handlePrint = () => {
    window.print(); // Function to trigger print
  };

  return (
    <>
      {token ? (
        <Container>
          <div className="flex justify-end my-5">
            <button
              onClick={handlePrint}
              className="w-auto rounded-[5px] font-normal	 font-main px-5 py-2 text-white bg-customBlue flex gap-2 items-center "
            >
              <IoIosPrint />
              Print
            </button>
          </div>
          {/* Print button */}
          {BookingInfoData ? (
            <Card className=" border shadow-custom mb-5" id="printContent">
              <div className=" p-3 mx-3">
                <p className="mt-2">Dear {BookingInfoData?.contact_name},</p>
                <p className="mt-2">
                  Your reservation is pending finalization. Please authorize 2PH
                  travel to charge your card via the link. Expect a call from
                  our agent shortly for assistance.
                </p>
                <div className="flex justify-center mt-2">
                  <Image
                    src={SigngoImage}
                    alt="Sign&go"
                    width={1000}
                    height={100}
                    className="w-[200px] h-auto cursor-pointer border rounded-[5px]"
                    onClick={() => handlepayandagree(token)}
                  />
                </div>
                <p className="mt-2">
                  To ensure delivery of future email correspondence, please add
                  support@2phtravel.com to your address book
                </p>
              </div>

              <div className=" bg-customBlue text-customWhite p-3 m-3">
                <h1 className=" flex justify-center items-center uppercase">
                  Passenger Details
                </h1>
              </div>
              <div className="p-5 ">
                <div>
                  <h1 className=" uppercase">
                    {BookingInfoData?.contact_name}{" "}
                  </h1>
                  <div className="grid grid-cols-12 my-2">
                    <div className=" col-span-3 ">
                      <p>Email Address:</p>
                    </div>
                    <div className=" col-span-3">
                      <p>{BookingInfoData?.contact_email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 my-2">
                    <div className=" col-span-3">
                      <p>Contact Number:</p>
                    </div>
                    <div className=" col-span-3">
                      <p>{BookingInfoData?.contact_phone}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="">
                    <p className="text-[18px] my-3 font-bold  text-customBlue">
                      CONFIRMATION NO:
                    </p>
                    <p className="text-[20px] my-3 font-medium text-customBlue uppercase">
                      {BookingInfoData?.booking_code}
                    </p>
                    <p className="text-[16px] my-3 font-medium text-customBlue">
                      Status : {BookingInfoData?.status}
                    </p>
                  </div>
                </div>
                <hr />
                <div className=" my-2 flex justify-end">
                  <div className=" flex items-end gap-2">
                    <h1 className=" font-thin">Total Price:</h1>
                    <h1 className="text-[25px]">USD {CardInfoData?.amount}*</h1>
                  </div>
                </div>
              </div>
              <div className=" bg-customBlue text-customWhite p-3 m-3">
                <h1 className=" flex justify-center items-center uppercase">
                  your schedules
                </h1>
              </div>
              <div className="p-5">
                {tripsData?.map((trip: { segments: any }, index) => (
                  <div key={index}>
                    {trip?.segments.map(
                      (segments: Segment, segmentsindex: number) => (
                        <div key={segmentsindex} className="md:relative">
                          <h1
                            className={`${
                              departureAirport === segments.departureAirportCode
                                ? "block uppercase my-2  text-customBlue "
                                : "hidden"
                            }`}
                          >
                            Depart:
                          </h1>
                          <h1
                            className={`${
                              destinationAirport ===
                              segments.departureAirportCode
                                ? "block uppercase my-2 text-customBlue"
                                : "hidden"
                            }`}
                          >
                            Return:
                          </h1>
                          <div className="border">
                            <div className="flex mb-2 mt-3 flex-col gap-2 flex-wrap md:mb-10px md:ml-[5px]">
                              <div className="flex flex-wrap md:p-0 p-2 gap-2 items-center">
                                <h4 className="flex items-center gap-2  text-[#FF0000]">
                                  {/* <MdFlightTakeoff /> */}
                                  <FlightIconImage
                                    fillColor="#FF0000"
                                    CustomClass="w-[25px] h-[25px]"
                                  />
                                  <b>
                                    {/* {Segment.airlineCode} */}
                                    {airlines
                                      .findWhere({ iata: segments.airlineCode })
                                      .get("name")}
                                  </b>
                                </h4>
                                |
                                <h1 className="text-[15px] md:text-[16px] text-customBlue">
                                  Flight : {""}
                                  {segments.airlineCode} {""}
                                  {segments.flightNumber}
                                </h1>
                                |
                                <h4 className="flex font-semibold items-center gap-2 capitalize text-customBlue  ">
                                  {segments.cabin === "E"
                                    ? "Economy"
                                    : segments.cabin === "F"
                                    ? "First Class"
                                    : "Business"}
                                  {/* Business */}
                                </h4>
                              </div>
                            </div>
                            <div className="grid grid-cols-12  p-4">
                              <div className="col-span-12 md:col-span-3 flex mx-2">
                                <div className="flex flex-col ">
                                  <h4 className="text-[14px] md:text-[15px]">
                                    {formatDate(segments.departureTime)}
                                  </h4>
                                  <h4 className="text-[14px] md:text-[15px]">
                                    {formatTime(segments.departureTime)}
                                  </h4>
                                  <p className="text-[12px]">
                                    {/* {segments.departureAirportCode} */}
                                    {
                                      airports.find(
                                        (airport) =>
                                          airport.iata ===
                                          segments.departureAirportCode
                                      )?.name
                                    }
                                  </p>
                                  <h4 className="text-[14px]  md:text-[15px]">
                                    {segments.departureAirportCode}
                                  </h4>
                                </div>
                              </div>
                              <div className="col-span-12 md:col-span-6 flex">
                                <div className="flex justify-center items-center w-full">
                                  <h1 className="text-[#BDBDBD] block  text-[15px]">
                                    -------
                                  </h1>
                                  <div className="flex justify-center items-center flex-col">
                                    <h1 className="mt-0 text-center  text-[14px] md:text-[15px] leading-[21.66px]">
                                      {convertMinutesToHours(segments.duration)}
                                    </h1>
                                  </div>
                                  <div className="flex text-[#BDBDBD] text-[15px]  justify-center items-center gap-[1px]">
                                    <h1>-------</h1>
                                    <MdOutlineFlight className="rotate-90 mt-[2px]" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-12 md:col-span-3">
                                <div className="mx-2 flex flex-col justify-center ">
                                  <h4 className="text-[14px] md:text-[15px]">
                                    {formatDate(segments.arrivalTime)}
                                  </h4>
                                  <h4 className="text-[14px] md:text-[15px]">
                                    {formatTime(segments.arrivalTime)}
                                  </h4>
                                  <p className="text-[12px]">
                                    {
                                      airports.find(
                                        (airport) =>
                                          airport.iata ===
                                          segments.arrivalAirportCode
                                      )?.name
                                    }
                                  </p>
                                  <h4 className="text-[14px] md:text-[15px]">
                                    {segments.arrivalAirportCode}
                                  </h4>
                                </div>
                              </div>
                            </div>
                            {/* Compare arrivalTime of the last segment with departureTime of the next segment */}
                            <div
                              key={`compare-${segmentsindex}`}
                              className="mt-4 font-semibold text-customRed  md:absolute bottom-[-2px] text-center w-full bg-white z-[10]"
                            >
                              {convertMinutesToHours(
                                (new Date(
                                  trip.segments[
                                    segmentsindex + 1
                                  ]?.departureTime
                                ).getTime() -
                                  new Date(segments.arrivalTime).getTime()) /
                                  (1000 * 60)
                              ) === "NaN hours NaN min" ? (
                                <div></div>
                              ) : (
                                <>
                                  {(destinationAirport ===
                                    segments.arrivalAirportCode) ===
                                    false && (
                                    <p>
                                      --------- Lay over in{" "}
                                      {
                                        airports.find(
                                          (airport) =>
                                            airport.iata ===
                                            segments.arrivalAirportCode
                                        )?.city
                                      }{" "}
                                      {convertMinutesToHours(
                                        (new Date(
                                          trip.segments[
                                            segmentsindex + 1
                                          ]?.departureTime
                                        ).getTime() -
                                          new Date(
                                            segments.arrivalTime
                                          ).getTime()) /
                                          (1000 * 60)
                                      )}{" "}
                                      ---------
                                    </p>
                                  )}{" "}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
              <div className="px-5">
                <div className="mt-4">
                  <h1 className=" uppercase text-customBlue my-2">
                    {" "}
                    Acknowledements:
                  </h1>
                  <p>
                    Your booking has been confirmed, and we look forward to
                    providing you with an exceptional travel experience. Should
                    you have any questions or need further assistance, feel free
                    to reach out to our dedicated support team.
                  </p>
                </div>
                <div className="mt-4">
                  <h1 className="uppercase text-customBlue my-2">
                    Cancellation and Refund:
                  </h1>
                  <p>
                    Need to change or cancel your booking? Learn about our
                    flexible policies here. We&apos;re here to help you if your
                    plans change, offering easy options for cancellations or
                    modifications to your reservation.
                  </p>
                </div>

                <div className="mt-4">
                  <h1 className="uppercase text-customBlue my-2">Rebooking:</h1>
                  <p>
                    Want to change your travel dates? Find out how to do it
                    hassle-free. Whether it&apos;s a different schedule or
                    destination, we&apos;ll assist you in adjusting your plans
                    smoothly.
                  </p>
                </div>

                <div className="my-4">
                  <h1 className="uppercase text-customBlue my-2">
                    Authorized Amount / Charges on Card Statements:
                  </h1>
                  <p>
                    Confused about the charges on your card? Get clarity on the
                    authorized amount and billing details related to your
                    booking. Any temporary holds or charges will be explained,
                    and our support team is available to address any concerns
                    you may have.
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <>
              <div className=" flex justify-center">
                <Image
                  src={LoadImage}
                  width={100}
                  height={100}
                  alt="loader"
                  className="w-auto md:w-[500px] h-auto mix-blend-multiply "
                />
              </div>
            </>
          )}
        </Container>
      ) : (
        <div className="m-5 p-3 bg-red-100 rounded-[5px]">
          <p className=" text-customRed font-semibold text-[25px] flex gap-2 items-center justify-center px-10">
            <FiAlertTriangle />
            Invalid token
          </p>
        </div>
      )}
    </>
  );
}

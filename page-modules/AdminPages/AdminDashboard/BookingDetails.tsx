"use client";
import useUserBookingData from "@/store/UserBookingData";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineFlight } from "react-icons/md";
import { CiWifiOn } from "react-icons/ci";
import Chip from "@/public/admin/chip.png";

const BookingDetails = () => {
  const {
    trip_info,
    status,
    contact_email,
    contact_name,
    contact_phone,
    from_location,
    to_location,
    departure_date,
    return_date,
    created_at,
    page,
    trip_type,
    airline_name,
    card,
    passenger,
    payment_type,
  } = useUserBookingData((state) => state);

  return (
    <div className=" pt-16 xl:pl-16 lg:pl-4 pl-5 xl:pr-16 lg:pr-4 pr-5 w-full pb-20">
      <div className="flex ">
        <Link href="/admin/dashboard">
          <h1 className="flex items-center gap-1 text-customBlue cursor-pointer">
            <IoMdArrowBack /> Go Back
          </h1>
        </Link>
      </div>
      <div className="flex justify-between flex-col md:items-center items-start">
        <div className="border w-full bg-white mt-4">
          <h1 className="mb-3 pl-2 pt-2 ">USER DETAILS</h1>

          <div className="grid grid-cols-12 gap-4 p-4 pt-1">
            <div className="col-span-6">
              <h4 className="mb-4">
                {" "}
                <b>User: </b>
                {contact_name}
              </h4>
              <h4 className="mb-4">
                {" "}
                <b>Email: </b>
                {contact_email}
              </h4>
              <h4 className="mb-4">
                {" "}
                <b>Phone: </b>
                {contact_phone}
              </h4>
              <h4 className="mb-4">
                {" "}
                <b>Booking At: </b>
                {`${created_at.slice(8, 10)}-${created_at.slice(
                  5,
                  7
                )}-${created_at.slice(0, 4)}`}
              </h4>
            </div>

            <div className="col-span-6">
              <h4 className="mb-4 flex gap-2">
                <b>Status: </b>
                <p
                  className={` w-fit rounded-lg py-[1px] px-[18px] ${
                    status === "Completed"
                      ? " bg-[#82DA7E] "
                      : status === "Pending"
                      ? " bg-[#FFC558]  "
                      : status === "Confirmed"
                      ? "bg-[#F9F871]  text-black"
                      : status === "Canceled"
                      ? "bg-[#FF4141] text-white"
                      : "bg-[#a0a0a0] text-white "
                  }`}
                >
                  {status}
                </p>
              </h4>
              {page && (
                <h4 className="mb-4">
                  {" "}
                  <b>Page: </b>
                  {page}
                </h4>
              )}
              {trip_type && (
                <h4 className="mb-4">
                  {" "}
                  <b>trip_type: </b>
                  {trip_type}
                </h4>
              )}
              {airline_name && (
                <h4 className="mb-1">
                  <b>Selected Airline: </b>
                  {airline_name}
                </h4>
              )}
            </div>
          </div>
          <hr></hr>

        </div>{" "}
        <div className=" w-full bg-white mt-4 p-4">
          <div className="p-3 bg-customBlue flex justify-center text-white">
            <h4>Trip Information</h4>
          </div>
          <div className="grid grid-cols-12 gap-4 p-4 pt-1 mb-4  border pb-7">
            {trip_info.length > 0 && trip_info ? (
              trip_info?.map((trip: any, tripindex: number) => (
                <div key={tripindex} className="col-span-12">
                  <div className=" h-full border p-4 mt-3 flex justify-between">
                    <div className="flex flex-col justify-center ">
                      <h4 className="font-semibold">Start From</h4>

                      <p>{trip.departure}</p>
                      <p>
                        {trip.date.length >= 11
                          ? trip.date.substring(0, 10)
                          : trip.date}
                      </p>
                    </div>
                    <div className="flex text-[#BDBDBD] text-[15px]  justify-center items-center gap-[1px]">
                      <h1>------------------</h1>
                      <MdOutlineFlight className="rotate-90 mt-[2px]" />
                    </div>
                    <div className="mx-2 flex flex-col justify-center text-end">
                      <h4 className="font-semibold">To</h4>
                      <p>{trip.destination}</p>
                      <p>
                        {trip.date.length >= 11
                          ? trip.date.substring(13)
                          : trip.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="col-span-12 h-full border p-4">
                  <div className="flex flex-col justify-center ">
                    <h4 className="font-semibold">Start From</h4>
                    <p>{(trip_info as any).departure}</p>
                    <p>
                      {" "}
                      {(trip_info as any).date.length >= 11
                        ? (trip_info as any).date.substring(0, 10)
                        : (trip_info as any).date}
                    </p>
                  </div>
                  <div className="flex text-[#BDBDBD] text-[15px]  justify-center items-center gap-[1px]">
                    <h1>------------------</h1>
                    <MdOutlineFlight className="rotate-90 mt-[2px]" />
                  </div>
                  <div className="mx-2 flex flex-col justify-center text-end">
                    <h4 className="font-semibold">To</h4>
                    <p>{(trip_info as any).destination}</p>
                    {(trip_info as any).date.length >= 11
                      ? (trip_info as any).date.substring(11)
                      : (trip_info as any).date}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {passenger && passenger?.length !== 0 && (
          <div className=" w-full bg-white mt-4 p-4">
            <div className="p-3 bg-customBlue flex justify-center text-white">
              <h4>Passenger Details</h4>
            </div>
            <div className="grid grid-cols-12 gap-4 p-4 pt-1 mb-4  border pb-7">
              {passenger?.map((passenger: any, tripindex: number) => (
                <div key={tripindex} className="md:col-span-4 col-span-12">
                  <div className=" h-full  border p-4 mt-3 flex flex-col justify-between">
                    <h1>
                      {passenger.passenger_type} {tripindex + 1}
                    </h1>
                    <div className="flex flex-col justify-center ">
                      <div className="flex gap-1">
                        <h2>
                          {passenger.title} {passenger.first_name}{" "}
                          {passenger.middle_name} {passenger.last_name}
                        </h2>
                      </div>
                      <h4> {passenger.birthday}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {payment_type === "Card" && card && card?.length !== 0 && (
          <div className=" w-full bg-white mt-4 p-4">
            <div className="p-3 bg-customBlue flex justify-center text-white">
              <h4>Card Info</h4>
            </div>
            {card?.map((card: any, cardindex: number) => (
              <div
                className="grid grid-cols-12 gap-4 p-4 pt-1 mb-4  border pb-7"
                key={cardindex}
              >
                <div className="2xl:col-span-4 md:col-span-5 col-span-12">
                  <div className="card bg-transparent mt-2 ">
                    <div
                      className="rounded-xl text-white p-5"
                      style={{
                        backgroundImage:
                          "url('https://t4.ftcdn.net/jpg/02/26/68/49/360_F_226684997_B70B2bB21Wk2ch12kAV0cqjNlTpX9fdB.jpg')",
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <Image
                          src={Chip}
                          alt="chipImage"
                          width={50}
                          height={50}
                          className="pt-3"
                        />
                        <CiWifiOn className="text-4xl rotate-90" />
                      </div>
                      <h1 className="text-2xl font-normal flex justify-center">
                        {card.card_number}
                      </h1>
                      <div className="flex justify-between mt-4">
                        <div className="flex items-center gap-2 pl-4">
                          <p className="text-sm">Security Code:</p>
                          {card.security_code}
                        </div>
                        <div className="flex items-center gap-2 pr-3">
                          <p className="text-sm">Valid Thru:</p>{" "}
                          {card.expiry_date}
                        </div>
                      </div>

                      <h1 className="mt-4">{card.card_holder_name}</h1>
                    </div>
                  </div>
                </div>
                <div className="col-span-7">
                  <div className="p-4">
                    <h1>Address:</h1>
                    <p>
                      {card.billing_address},{card.apt_unit},<br></br>
                      {card.city} {card.state},
                      <br />
                      {card.country}-{card.zip_code}
                    </p>
                  </div>
                  {card.amount && (
                    <div className="p-4">
                      <h1>Amount:</h1>
                      <p>{card.amount}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;

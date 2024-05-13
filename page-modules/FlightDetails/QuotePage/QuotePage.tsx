"use client";
import CustomField from "@/components/CustomTextField/customField";
import GetQuoteButton from "@/components/QuotePopup/GetQuteButton";
import dayjs from "dayjs";
import { IoMdArrowBack } from "react-icons/io";
import { Card } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import React, { useEffect, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import EmailIconImage from "@/components/Images/EmailIcon";
import MobileIconImage from "@/components/Images/Mobileicon";
import UserIconImage from "@/components/Images/UserImage";
import DateIconImage from "@/components/Images/DateIcon";
import Styles from "../../AirlineFlightList/airlineflight.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import useSearchFlight from "@/store/flightSearchStore";
import useModifySearch from "@/store/ModifySearch";
import Link from "next/link";
import BookingFormApi from "@/action/booknow/booknow";
import Swal from "sweetalert2";
import airports from "@nwpr/airport-codes";
const QuoteResultPage = ({
  departureAirport,
  date,
  type,
  returnDate,
  destinationAirport,
  infantsCount,
  childrenCount,
  adultsCount,
  cabin,
  FulluserId,
}: any) => {
  const searchParams = useSearchParams();
  const { totalPrice } = useSearchFlight((state) => state);
  const { trips } = useModifySearch((state) => state);
  const [loading, setLoading] = useState(false);
  const [errormessage, seterrormessage] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setSingleDateValue({ startDate: date, endDate: date });
  }, [type, date]);

  const [Datevalue, setDateValue] = useState<DateValueType>({
    startDate: date,

    endDate: returnDate || null,
  });
  const [SingleDatevalue, setSingleDateValue] = useState<DateValueType>({
    startDate: date,
    endDate: null,
  });
  const errorPhoneNumber = searchParams.get("errorPhonenumber");

  const [value, setValue] = useState<string>("");
  const handleChange = (phoneNumber: string) => {
    setValue(phoneNumber);
  };

  const handleSingleValueChange = (newValue: any) => {
    setSingleDateValue(newValue);
  };
  const handleValueChange = (newValue: any) => {
    setDateValue(newValue);
  };
  function formatDates(date: any) {
    return dayjs(date, "DDMMYYYY").format("DD/MM/YYYY");
  }
  function formatYearFormat(date: any) {
    return dayjs(date, "DDMMYYYY").format("YYYY-MM-DD");
  }
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSumbit = async (formatDate: FormData) => {
    const trip: { departure: string; destination: string; date: string }[] = [];
    const req = {
      page: "Flight reservation",
      price: totalPrice,
      trip_type: type,
      trip: trip,
      Name: formatDate.get("Name") as string,
      Email: formatDate.get("Email") as string,
      phonenumber: formatDate.get("phonenumber") as string,
      user: FulluserId,
    };

    if (type === "roundtrip") {
      trip.push(
        {
          departure: departureAirport,
          destination: destinationAirport,
          date: `${Datevalue?.startDate}`,
        },
        {
          departure: departureAirport as string,
          destination: destinationAirport as string,
          date: `${Datevalue?.endDate}`,
        }
      );
    } else if (type === "oneway") {
      trip.push({
        departure: departureAirport as string,
        destination: destinationAirport as string,
        date: `${SingleDatevalue?.startDate}`,
      });
    } else {
      individualTrips.forEach((trips) => {
        let [departure, destination, date] = trips.split(",");
        trip.push({
          departure: ` ${
            airports.find((airport) => airport.iata === departure)?.name
          }[${departure}]`,
          destination: ` ${
            airports.find((airport) => airport.iata === destination)?.name
          }[${destination}]`,
          date: formatYearFormat(date),
        });
      });
    }

    setLoading(true);
    seterrormessage(true);

    const response = await BookingFormApi(req);

    if (response.message) {
      setLoading(false);

      Swal.fire({
        icon: "success",
        title: response.message,

        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
        }
      });
    }
  };

  let individualTrips = trips?.split("|");

  return (
    <>
      <div
        className={`  lg:bg-cover bg-cover bg-center bg-no-repeat	 relative  `}
      >
        <div className="bg-[url('/Login/clip1.jpg')] top-0 h-auto  bg-cover bg-center bg-no-repeat z-[-1]  w-full">
          <div className="flex w-full h-full items-center justify-center p-4 md:p-10  ">
            <Card className="rounded-[10px] p-6 pt-3 ">
              <p className="flex justify-center gap-2">
                Make a call to get great prices
                <a
                  href={`tel: 855-767-7778`}
                  className="hover:text-customRed font-bold"
                >
                  855-767-7778
                </a>
              </p>

              <div className="py-2 flex justify-center items-center">
                <div className="flex-1 h-0.5 bg-gray-500 mx-4"></div>
                <p className="bg-white px-4">or</p>
                <div className="flex-1 h-0.5 bg-gray-500 mx-4"></div>
              </div>
              <h2 className="flex justify-center mb-2">
                Submit a Quote Request
              </h2>
              {/* <div className="h-[1px] bg-gray-500"></div> */}
              <form
                action={(formdata) => handleSumbit(formdata)}
                className="w-[500px]"
              >
                <div
                  className={`${
                    type === "multicities" ? "mt-5 mb-3" : " my-5"
                  } flex justify-between`}
                >
                  <div className="flex items-center">
                    <h1>Type:</h1>
                    <p className="pl-1"> {capitalizeFirstLetter(type)}</p>
                  </div>
                  <div className="flex items-center">
                    <h1>Cabin: </h1>
                    <p className="pl-1">
                      {" "}
                      {cabin === "E"
                        ? "Economy"
                        : cabin === "F"
                        ? "First Class"
                        : "Business"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <h1>Total Passengers: </h1>
                    <p className="pl-1">
                      {" "}
                      {parseInt(adultsCount) +
                        parseInt(childrenCount) +
                        parseInt(infantsCount)}
                    </p>
                  </div>
                </div>
                {type === "multicities" ? (
                  <>
                    <div className="flex items-center mb-3">
                      <h1>Total Price:</h1>
                      <p className="pl-1"> {`$${totalPrice}*`}</p>
                    </div>
                    {individualTrips.map((trip, index) => {
                      let [departure, destination, date] = trip.split(",");
                      const namedata = airports.find(
                        (airport) => airport.iata === "MAA"
                      )?.name;
                      return (
                        <>
                          <div
                            key={index}
                            className="grid grid-cols-3 h-full border p-4"
                          >
                            <div className="flex flex-col justify-center">
                              <h4 className="font-semibold">Start From</h4>
                              <p>
                                {` ${
                                  airports.find(
                                    (airport) => airport.iata === departure
                                  )?.name
                                }[${departure}]`}
                              </p>
                            </div>
                            <div className="flex flex-col justify-center">
                              <p className="flex justify-center">
                                {formatDates(date)}
                              </p>
                              <hr className="border-[1px] border-green-800" />
                            </div>
                            <div className="mx-2 flex flex-col justify-center text-end">
                              <h4 className="font-semibold">To</h4>

                              <p>
                                {` ${
                                  airports.find(
                                    (airport) => airport.iata === destination
                                  )?.name
                                }[${destination}]`}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-3 h-full border p-4">
                      <div className="flex flex-col justify-center ">
                        {/* <h4>{formatDate(segments.departureTime)}</h4> */}
                        <h4 className=" font-semibold">Start From</h4>
                        <p>{departureAirport}</p>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className=" flex justify-center">${totalPrice}*</p>
                        <hr className=" border-[1px] border-green-800"></hr>
                      </div>
                      <div className="mx-2 flex flex-col justify-center text-end">
                        <h4 className="font-semibold">To</h4>
                        <p>{destinationAirport}</p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                        <DateIconImage />
                        Depart & Return
                      </label>
                      {type === "roundtrip" ? (
                        <Datepicker
                          placeholder={"Select Date"}
                          minDate={new Date()}
                          showFooter={true}
                          primaryColor={"blue"}
                          inputClassName={`bg-[#F4F4F4] rounded-[5px] w-full p-3 focus:outline-none border border-[#DADADA] h-[40px] md:h-[40px]`}
                          value={Datevalue}
                          onChange={handleValueChange}
                          popoverDirection="down"
                          disabled={true}
                        />
                      ) : (
                        <Datepicker
                          placeholder={"Select Date"}
                          minDate={new Date()}
                          readOnly
                          asSingle={true}
                          showFooter={false}
                          primaryColor={"blue"}
                          inputClassName={`bg-[#F4F4F4] w-full rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[40px] md:h-[40px] ${Styles.inputdatepicker}`}
                          value={SingleDatevalue}
                          onChange={handleSingleValueChange}
                          // displayFormat={"MM/DD/YYYY"}
                          toggleClassName={`hidden`}
                          popoverDirection="down"
                          disabled={true}
                        />
                      )}
                    </div>
                  </>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {" "}
                  <div className=" col-span-1 mt-5">
                    <CustomField
                      type={"text"}
                      label={"Full Name"}
                      placeholder={"Name"}
                      name={"Name"}
                      required={true}
                      icon={<UserIconImage />}
                    />
                  </div>
                  <div className="col-span-1  mt-5">
                    <CustomField
                      type={"email"}
                      label={"Email"}
                      placeholder={"Email"}
                      name={"Email"}
                      required={true}
                      icon={<EmailIconImage />}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                    <MobileIconImage />
                    Phone number
                  </label>
                  <div className={`${Styles.phonenumber}`}>
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={value}
                      onChange={handleChange}
                      name={"phonenumber"}
                      className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[40px]  ${
                        errorPhoneNumber && " border border-red-500	"
                      }`}
                      required={true}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 mt-10  w-full ">
                  <GetQuoteButton loading={loading} errormessage={errormessage}>
                    Get a Quote
                  </GetQuoteButton>
                </div>
              </form>
              {/* <div className="mt-3 text-center  w-full ">
                <Link href={"/flight/search"} className="hover:text-customRed">
                  Serach Again
                </Link>
              </div> */}
              <p className="text-gray-500 text-[12px] mt-4 flex justify-start items-start gap-1 mb-4">
                <span>*</span> Prices are displayed for reference, contact our
                team to get better prices via email or wire.
              </p>
              <div className="mt-3 text-center  w-full ">
                <Link
                  href={"/"}
                  className="hover:text-customRed  text-center flex justify-center items-center gap-2"
                >
                  <IoMdArrowBack /> Go to Home
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteResultPage;

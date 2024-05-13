"use client";
import React, { useEffect, useRef, useState } from "react";
import DateIconImage from "@/components/Images/DateIcon";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import "react-toastify/dist/ReactToastify.css";
import Styles from "./quotepopup.module.css";
import CustomField from "../CustomTextField/customField";
import UserIconImage from "@/components/Images/UserImage";
import EmailIconImage from "@/components/Images/EmailIcon";
import MobileIconImage from "@/components/Images/Mobileicon";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { IoClose } from "react-icons/io5";
import { formUrlQuery } from "@/utils/formUrlQuery";
import { useRouter, useSearchParams } from "next/navigation";
import useBookingQuote from "@/store/BookingQuote";
import UseCityautoComplted from "../AutoComplete/CityautoComplted";
import FlightIconImage from "@/components/Images/FlightIcon";
import BookingFormApi from "@/action/booknow/booknow";
import Swal from "sweetalert2";
import GetQuoteButton from "./GetQuteButton";

export default function QuotePopup() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const quotepopup = searchParams.get("quotepopup");
  // const BookingQuote = sessionStorage.getItem("BookingQuote");
  const {
    departure,
    destination,
    departure_date,
    return_date,
    expiration,
    fair,
    userId,
    updateBookingStore,
  } = useBookingQuote();

  const [Datevalue, setDateValue] = useState<DateValueType>({
    startDate: departure_date,
    endDate: return_date,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setDateValue({
      startDate: departure_date,
      endDate: return_date,
    });
  }, [departure_date, return_date]);

  const handleValueChange = (newValue: any) => {
    setDateValue(newValue);
  };
  const [value, setValue] = useState<string>("");
  const handleChange = (phoneNumber: string) => {
    setValue(phoneNumber);
  };

  const handleClose = () => {
    let newUrl;
    newUrl = formUrlQuery({
      params: searchParams.toString(),
      keysToRemove: ["quotepopup"],
    });
    router.push(newUrl, { scroll: false });
  };
  const handleSumbit = async (formData: FormData) => {
    setLoading(true);
    const req = {
      departureAirport: departure
        ? departure
        : (formData.get("departureAirport") as string),
      destinationAirport: destination
        ? destination
        : (formData.get("destinationAirport") as string),
      Name: formData.get("Name") as string,
      Email: formData.get("Email") as string,
      phonenumber: formData.get("phonenumber") as string,
      departure_date: Datevalue?.startDate as string,
      return_date: Datevalue?.endDate as string,
      user: userId || null,
      type: "roundtrip",
      page: "Journey By Venue",
      trip: [
        {
          departure: departure
            ? departure
            : (formData.get("departureAirport") as string),
          destination: destination
            ? destination
            : (formData.get("destinationAirport") as string),
          date: `${Datevalue?.startDate}  - ${Datevalue?.endDate}`,
        },
      ],
    };
    const response = await BookingFormApi(req);
    if (response.message) {
      setLoading(false);
      let newUrl;
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["quotepopup"],
      });
      router.push(newUrl, { scroll: false });

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

  useEffect(() => {
    if (quotepopup) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [quotepopup]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        let newUrl;
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["quotepopup"],
        });
        router.push(newUrl, { scroll: false });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, router, searchParams]);

  return (
    <>
      {quotepopup === "open" && (
        <>
          <div>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity  overflow-hidden"></div>

            <div className="fixed inset-0  w-screen  z-[1000] ">
              <div className="flex h-full  justify-center p-4 text-center items-center sm:p-0">
                <div
                  className=" rounded-lg max-h-[600px] overflow-y-auto bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg mt-[67px]"
                  ref={menuRef}
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                    <div className="p-2 border-b-[2px] flex  items-center justify-between border-b-[#eedede]">
                      <h2 className="text-[18px]">Your Current Selection</h2>
                      <div onClick={handleClose} className="cursor-pointer">
                        <IoClose onClick={handleClose} />
                      </div>
                    </div>
                    <form action={(formdata) => handleSumbit(formdata)}>
                      <div className="mt-[10px]">
                        <div className="grid grid-cols-12 ">
                          <div className="col-span-12 h-auto">
                            {departure === "" ? (
                              <>
                                <div className="grid grid-cols-2 h-full">
                                  <div className="mr-3">
                                    <UseCityautoComplted
                                      label={"Departure"}
                                      placeholder={"Airport / City Name"}
                                      name={"departureAirport"}
                                      required={true}
                                      icon={<FlightIconImage />}
                                    />
                                  </div>

                                  <div className="mr-3">
                                    <UseCityautoComplted
                                      label={"Destination"}
                                      placeholder={"Airport / City Name"}
                                      name={"destinationAirport"}
                                      required={true}
                                      icon={<FlightIconImage />}
                                    />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="grid grid-cols-3 h-full border p-4">
                                <div className="flex flex-col justify-center ">
                                  {/* <h4>{formatDate(segments.departureTime)}</h4> */}
                                  <h4 className=" font-semibold">Start From</h4>
                                  <p>{departure}</p>
                                </div>
                                <div className="flex flex-col justify-center">
                                  <p className=" flex justify-center">
                                    ${fair}*
                                  </p>
                                  <hr className=" border-[1px] border-green-800"></hr>
                                </div>
                                <div className="mx-2 flex flex-col justify-center text-end">
                                  <h4 className="font-semibold">To</h4>
                                  <p>{destination}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-[10px]">
                        <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                          <DateIconImage />
                          Depart & Return
                        </label>
                        <Datepicker
                          placeholder={"Select Date"}
                          minDate={new Date()}
                          showFooter={true}
                          primaryColor={"blue"}
                          inputClassName={`bg-[#F4F4F4] rounded-[5px] w-full p-3 focus:outline-none border border-[#DADADA] h-[40px] md:h-[40px]`}
                          value={Datevalue}
                          onChange={handleValueChange}
                          popoverDirection="down"
                          disabled={
                            Datevalue?.startDate == "" &&
                            Datevalue?.endDate == ""
                              ? false
                              : true
                          }
                        />
                      </div>

                      <div className="flex flex-wrap w-full gap-y-[10px] gap-x-[20px]">
                        <div className="mt-[10px]  flex-1">
                          <CustomField
                            type={"text"}
                            label={"Full Name"}
                            placeholder={"Name"}
                            name={"Name"}
                            required={true}
                            icon={<UserIconImage />}
                          />
                        </div>
                        <div className="mt-[10px]  flex-1">
                          <CustomField
                            type={"email"}
                            label={"Email"}
                            placeholder={"Email"}
                            name={"Email"}
                            required={true}
                            icon={<EmailIconImage />}
                          />
                        </div>
                        <div
                          className={`relative w-full  border-none outline-none ${Styles.phonenumber}`}
                        >
                          <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                            <MobileIconImage />
                            Phone number
                          </label>
                          <PhoneInput
                            placeholder="Enter phone number"
                            value={value}
                            onChange={handleChange}
                            name={"phonenumber"}
                            className={`w-full bg-[#F4F4F4] mb-4 rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[40px] `}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="bg-gray-50  w-full ">
                        <GetQuoteButton loading={loading}>
                          Get a Quote
                        </GetQuoteButton>
                      </div>
                    </form>
                    {/* <p className="text-gray-500 text-[10px] mt-2 m-0 p-0">
                      * Prices are displayed for reference, contact our team to
                      get better prices via email or wire.
                    </p> */}
                    <p className="text-gray-500 text-[10px] mt-4 flex justify-center items-start gap-1">
                      <span>*</span> Prices are displayed for reference, contact
                      our team to get better prices via email or wire.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

"use client";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import FlightImage from "@/public/Login/clip10.webp";
import { IoLocationSharp } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button, Divider, useMediaQuery } from "@mui/material";
import ActionButton from "./ActionButton";
import CustomButton from "@/components/Button/Button";
import { MdAddToPhotos } from "react-icons/md";
import AddDeals from "@/action/Admin/Deals/AddDeals";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import DateIconImage from "@/components/Images/DateIcon";
import FlightIconImage from "@/components/Images/FlightIcon";
import UseCityautoComplted from "@/components/AutoComplete/CityautoComplted";
import { IoClose } from "react-icons/io5";
import useBookingQuote from "@/store/BookingQuote";
import { useRouter, useSearchParams } from "next/navigation";
import LoaderButton from "./Button";
import DestinationCityAutoComplete from "@/components/AutoComplete/DestinationCityAutoComplete";
import AddDestinationCity from "@/action/Admin/City/AddDestinationCity";
import airports from "@nwpr/airport-codes";
import ImagePrreivew from "../AdminHomeOffer/ImagePrreivew";
import { formUrlQuery } from "@/utils/formUrlQuery";

interface flightdeals {
  flightdeals: [
    {
      flight_deals_id: number;
      destination: string;
      departure: string;
      departure_date: string;
      return_date: string;
      image_url: string;
      fair: string;
    }
  ];
  cityname: [
    {
      city_id: number;
      city_name: string;
      city_image_url: string;
    }
  ];
}

interface FlightDataprops {
  airport_name: string;
  iata: string;
  country_code: string;
  city_name: string;
  location: string;
  continent: string;
}

const DestinationDeals: FC<flightdeals> = ({ flightdeals, cityname }) => {
  const [flightcity, setFlightCity] = useState(cityname[0]?.city_name);
  const componentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [AddPopupOpen, setAddPopupOpen] = useState(false);
  const [addCityOpen, setAddCityOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileImage, setfileImage] = useState("");
  const [filePath, setFilePath] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { departure_date, return_date } = useBookingQuote();
  const matches = useMediaQuery("(max-width:1025px)");
  // const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (matches === false) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["open"],
      });
      router.push(newUrl, { scroll: false });
    }
  }, [matches, router, searchParams]);
  const [Datevalue, setDateValue] = useState<DateValueType>({
    startDate: departure_date,
    endDate: return_date,
  });

  const handlePageChange = (event: any) => {
    setFlightCity(event.target.value);
  };

  const MAX_IMAGE_SIZE_MB = 10;
  const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

  const handleFileChange = (event: any) => {
    const file = event.target.files;
    const filesdata = event.target.files[0];
    if (file) {
      if (filesdata?.size <= MAX_IMAGE_SIZE_BYTES) {
        const objectURL = URL.createObjectURL(file[0]);
        setfileImage(objectURL);
        setFilePath(file);
      } else {
        reactHotToast.error("Image size exceeds 10MB limit", {
          position: "top-right",
          duration: 3000,
        });

        event.target.value = null;
      }
    } else {
      setFilePath([]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      setFilePath(files);
    } else {
      setFilePath([]);
    }
  };

  const handleValueChange = (newValue: any) => {
    setDateValue(newValue);
  };

  const handleSumbit = async (formData1: FormData) => {
    setLoading(true);

    const formData = new FormData();
    const destination = formData1.get("destinationAirport") as string;
    const departureAirport = airports.find(
      (airport) => airport.city === destination.trim()
    )?.name;
    const AirportCode = airports.find(
      (airport) => airport.city === destination.trim()
    )?.iata;

    if (filePath.length !== 0) {
      formData.append("image", filePath[0]);
    }
    formData.append("destination", `${departureAirport} [${AirportCode}]`);
    formData.append("departure", formData1.get("departureAirport") as string);
    formData.append("fair", formData1.get("price") as string);
    formData.append("departure_date", Datevalue?.startDate as string);
    formData.append("return_date", Datevalue?.endDate as string);
    const response = await AddDeals(formData);

    reactHotToast.success("Deals Added Successfully", {
      position: "top-right",
      duration: 1000,
    });
    setAddPopupOpen(false);
    setDateValue({
      startDate: "",
      endDate: "",
    });
    setfileImage("");
    setFilePath([]);
    setLoading(false);
  };

  const handleAddCity = async (formData1: FormData) => {
    const formData = new FormData();
    formData.append("city_name", formData1.get("city_name") as string);
    const response = await AddDestinationCity(formData);
    reactHotToast.success("Destination City Added Successfully", {
      position: "top-right",
      duration: 1000,
    });
    setAddCityOpen(false);
    setLoading(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setfileImage("");
        setFilePath([]);
        setAddPopupOpen(false);
        setDateValue({
          startDate: "",
          endDate: "",
        });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div className=" pt-16 xl:pl-16 lg:pl-4 pl-5 xl:pr-16 lg:pr-4 pr-5 pb-44">
        <div className="flex justify-end sm:flex-row flex-col items-end  mb-4">
          <CustomButton
            text="Add Deals"
            icon={<MdAddToPhotos />}
            onClick={() => {
              setAddPopupOpen(true);
            }}
            customclass="bg-[#142B51] md:p-3 p-1 text-white px-4 flex gap-2 items-center rounded-md"
          />
        </div>
        <div className="flex justify-between items-center sm:flex-row flex-col  mb-4">
          <h1 className="md:w-[50%] w-[100%]"> Destination Deals</h1>
          <div className="md:w-[50%] w-[100%] flex justify-end items-end gap-3">
            <select
              className="md:w-[40%]  w-[100%] px-4 py-4 border-2 border-gray-500 bg-white rounded-2xl "
              id="dropdown"
              value={flightcity}
              onChange={handlePageChange}
            >
              {cityname.map((cityresponse, cityindex) => (
                <option value={cityresponse.city_name} key={cityindex}>
                  {cityresponse.city_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto  rounded-md">
            <div className="grid grid-cols-12 gap-5">
              {flightdeals
                .filter((res) => {
                  const name = res.destination.split("[")[1].trim();
                  const parts = name.split("]");

                  const departureAirport = airports.find(
                    (airport) => airport.iata === parts[0].trim()
                  )?.city;

                  const compare = departureAirport === flightcity;
                  return compare;
                })
                .map((res, index) => {
                  const name = res.destination.split("[")[1].trim();
                  const parts = name.split("]");
                  const destinationAirport = airports.find(
                    (airport) => airport.iata === parts[0].trim()
                  )?.city;
                  const name1 = res.departure.split("[")[1].trim();
                  const parts1 = name1.split("]");
                  const departureAirport = airports.find(
                    (airport) => airport.iata === parts1[0].trim()
                  )?.city;
                  return (
                    <div
                      className="xl:col-span-3 lg:col-span-6 md:col-span-4 col-span-12 border shadow-lg rounded-md"
                      key={index}
                    >
                      <ImagePrreivew
                        offer_image_url={res.image_url || FlightImage}
                      />

                      <div className="p-3">
                        <div className="flex  justify-between items-center mb-3">
                          <div className="flex">
                            <IoLocationSharp className="text-3xl text-[red] rounded-full px-1 " />
                            <h5>{departureAirport}</h5>
                            <FaArrowRightLong className="text-2xl px-1 mx-1" />
                            <h5> {destinationAirport}</h5>
                          </div>
                        </div>

                        <Divider />
                        <div className="py-4">
                          <h5>
                            Date:{" "}
                            <span className=" ">
                              {" "}
                              {res.departure_date} {" - "} {res.return_date}
                            </span>{" "}
                          </h5>
                        </div>
                        <Divider />
                        <div className="flex justify-start text-red-600">
                          <div className="flex items-start">
                            <h3 className="font-semibold text-lg">
                              Price : ${res.fair}
                            </h3>
                            <h3 className="text-md">*</h3>
                          </div>
                        </div>
                      </div>
                      <Divider />
                      <div className="flex justify-around mb-3 mt-3">
                        <ActionButton response={res} cityname={cityname} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {AddPopupOpen && (
          <div>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                  ref={componentRef}
                  className=" rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="p-2 border-b-[2px] flex  items-center justify-between border-b-[#eedede]">
                      <h2 className="text-[18px]">Add Destination Fight</h2>
                      <div
                        onClick={() => {
                          setfileImage("");
                          setFilePath([]);
                          setAddPopupOpen(false);
                          setDateValue({
                            startDate: "",
                            endDate: "",
                          });
                        }}
                        className="cursor-pointer"
                      >
                        <IoClose />
                      </div>
                    </div>
                    <form action={(formdata) => handleSumbit(formdata)}>
                      <div className="mt-[10px]">
                        <div
                          className="rounded-md border-dashed border-black border-2 mb-3 md:p-20 p-8 text-center"
                          onDrop={handleFileDrop}
                          onDragOver={(e) => e.preventDefault()}
                          onClick={() => handleClick()}
                        >
                          <p>Drag & Drop files here or click to select</p>
                          *For better website quality we suggest to use images
                          with 344x344 resolution (below 10Mb)*
                          <input
                            type="file"
                            id="fileInput"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                          />
                        </div>
                        <p>Preview:</p>
                        {fileImage && (
                          <Image
                            src={fileImage}
                            alt="Selected File"
                            width={100}
                            height={200}
                          />
                        )}
                        <div className="grid grid-cols-12 ">
                          <div className="col-span-12 h-auto">
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

                                <div className="">
                                  <DestinationCityAutoComplete
                                    label={"Destination"}
                                    placeholder={"Select City Name"}
                                    name={"destinationAirport"}
                                    required={true}
                                    icon={<FlightIconImage />}
                                    cityname={cityname}
                                  />
                                </div>
                              </div>
                            </>
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
                          // showShortcuts={true}
                          showFooter={false}
                          primaryColor={"blue"}
                          inputClassName={`bg-[#F4F4F4] rounded-[5px]  p-3 focus:outline-none border border-[#DADADA]  h-[40px] md:h-[40px] w-full `}
                          value={Datevalue}
                          onChange={handleValueChange}
                        />
                      </div>

                      <div className="mt-5">
                        <label htmlFor="dropdown">
                          Enter Price{" "}
                          <span className="text-red-600  p-1">*</span>
                        </label>
                        <input
                          type={"number"}
                          name={"price"}
                          className={`w-full bg-[#F4F4F4]  relative  mb-4 rounded-[5px] p-4 focus:outline-none border border-[#DADADA] h-[40px] md:h-[50px]`}
                          placeholder={"Enter Price"}
                          required
                        />
                      </div>

                      <div className="bg-gray-50 mt-5  w-full flex justify-end ">
                        <Button
                          onClick={() => {
                            setfileImage("");
                            setFilePath([]);
                            setAddPopupOpen(false);
                            setDateValue({
                              startDate: "",
                              endDate: "",
                            });
                          }}
                          color="error"
                        >
                          Cancel
                        </Button>
                        {/* <CustomButton
                          text={"Submit"}
                          loading={loading}
                          // onClick={() => handleAddBanner()}
                          customclass="bg-[#142B51] flex gap-[5px] justify-center rounded-md items-center text-white border-none w-[20%]"
                        /> */}
                        <LoaderButton>Submit</LoaderButton>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {addCityOpen && (
          <div>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className=" rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="p-2 border-b-[2px] flex  items-center justify-between border-b-[#eedede]">
                      <h2 className="text-[18px]">Add Destination City</h2>
                      <div
                        onClick={() => {
                          setAddCityOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        <IoClose />
                      </div>
                    </div>
                    <form action={(formdata) => handleAddCity(formdata)}>
                      <div className="mt-[10px]">
                        <div className="grid grid-cols-12 ">
                          <div className="col-span-12 h-auto">
                            <>
                              <div className="mr-3">
                                <UseCityautoComplted
                                  label={"Select Destination City"}
                                  placeholder={"Select Destination City"}
                                  name={"city_name"}
                                  required={true}
                                  icon={<FlightIconImage />}
                                />
                              </div>
                            </>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 mt-5  w-full flex justify-end ">
                        <Button
                          onClick={() => {
                            setAddCityOpen(false);
                          }}
                          color="error"
                        >
                          Cancel
                        </Button>

                        <LoaderButton>Add City</LoaderButton>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default DestinationDeals;

"use client";
import UseCityautoComplted from "@/components/AutoComplete/CityautoComplted";
import CustomButton from "@/components/Button/Button";
import { Button, Divider, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import { MdAddToPhotos } from "react-icons/md";
import FlightIconImage from "@/components/Images/FlightIcon";
import { IoClose } from "react-icons/io5";
import AddDestinationCity from "@/action/Admin/City/AddDestinationCity";
import LoaderButton from "../DestinationDeals/Button";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import ActionButton from "./ActionButton";
import airports from "@nwpr/airport-codes";
import ImagePrreivew from "../AdminHomeOffer/ImagePrreivew";
import { formUrlQuery } from "@/utils/formUrlQuery";

interface flightdeals {
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
const DestinationCityDeals: React.FC<flightdeals> = ({ cityname }) => {
  const router = useRouter();
  const componentRef = useRef<HTMLDivElement>(null);
  const [addCityOpen, setAddCityOpen] = useState(false);
  const [fileImage, setfileImage] = useState("");
  const [filePath, setFilePath] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const SearchParams = useSearchParams();
  const id = SearchParams.get("id") || "";

  const MAX_IMAGE_SIZE_MB = 10;
  const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

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

  const handleAddCity = async (formData1: FormData) => {
    const formData = new FormData();
    const cityname = formData1.get("city_name") as string;
    if (cityname && filePath.length !== 0) {
      const name = cityname.split("[")[1].trim();
      const parts = name.split("]");
      const destinationAirport = airports.find(
        (airport) => airport.iata === parts[0].trim()
      )?.city;

      formData.append("city_name", destinationAirport as string);
      formData.append("city_image", filePath[0]);
      const response = await AddDestinationCity(formData);
      reactHotToast.success("Destination City Added Successfully", {
        position: "top-right",
        duration: 1000,
      });

      setAddCityOpen(false);
    } else {
      reactHotToast.error("Required", {
        position: "top-right",
        duration: 1000,
      });
      setAddCityOpen(false);
    }
    setFilePath([]);
    setfileImage("");
  };

  // Delete Banner Api

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setAddCityOpen(false);
        setFilePath([]);
        setfileImage("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className=" pt-16 xl:pl-16 lg:pl-4 pl-5 xl:pr-16 lg:pr-4 pr-5 pb-36">
        <div className="flex justify-end sm:flex-row flex-col items-end mb-4">
          <CustomButton
            text="Add City"
            icon={<MdAddToPhotos />}
            onClick={() => {
              setAddCityOpen(true);
            }}
            customclass="bg-[#142B51] md:p-3 p-1 text-white px-4 flex gap-2 items-center rounded-md"
          />
        </div>
        <div className="flex justify-between sm:flex-row flex-col  mb-4">
          <h1 className="w-[50%]"> Destination City</h1>
        </div>
        <div>
          <div className="grid grid-cols-12 gap-5">
            {cityname.map((res, index) => (
              <div
                className="xl:col-span-3 lg:col-span-6 md:col-span-4 col-span-12 border shadow-lg rounded-md"
                key={index}
              >
                <ImagePrreivew offer_image_url={res.city_image_url || ""} />

                <div className="p-2">
                  <div className="flex justify-center items-center mb-3">
                    <div className="flex items-center">
                      <h1>
                        {res.city_name === "Angeles City"
                          ? "Pampanga (Clark)"
                          : res.city_name}{" "}
                      </h1>
                    </div>
                  </div>
                </div>

                <Divider />
                <div className="flex justify-around mb-3 mt-3">
                  <ActionButton response={res} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {addCityOpen && (
          <div>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex md:min-h-full min-h-[80%] items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                  ref={componentRef}
                  className=" rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="p-2 border-b-[2px] flex  items-center justify-between border-b-[#eedede]">
                      <h2 className="text-[18px]">Add Destination City</h2>
                      <div
                        onClick={() => {
                          setAddCityOpen(false);
                          setFilePath([]);
                          setfileImage("");
                        }}
                        className="cursor-pointer"
                      >
                        <IoClose />
                      </div>
                    </div>
                    <form action={(formdata) => handleAddCity(formdata)}>
                      <div className="mt-[10px]">
                        <div
                          className="rounded-md border-dashed border-black border-2 mb-3 md:p-20 p-8 text-center"
                          onDrop={handleFileDrop}
                          onDragOver={(e) => e.preventDefault()}
                          onClick={() => handleClick()}
                        >
                          <p>Drag & Drop files here or click to select</p>
                          *For better website quality we suggest to use images
                          with 1920x600 resolution (below 10Mb)*
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
                            setFilePath([]);
                            setfileImage("");
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

export default DestinationCityDeals;

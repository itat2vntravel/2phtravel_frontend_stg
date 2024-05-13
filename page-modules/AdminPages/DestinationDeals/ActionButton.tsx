"use client";
import React, { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import DeleteDeals from "@/action/Admin/Deals/Deletedeals";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import UseCityautoComplted from "@/components/AutoComplete/CityautoComplted";
import { IoClose } from "react-icons/io5";
import FlightIconImage from "@/components/Images/FlightIcon";
import DateIconImage from "@/components/Images/DateIcon";
import useBookingQuote from "@/store/BookingQuote";
import useModifySearch from "@/store/ModifySearch";
// import airports from "@nwpr/airport-codes";
import LoaderButton from "./Button";
import DestinationCityAutoComplete from "@/components/AutoComplete/DestinationCityAutoComplete";
import airports from "@nwpr/airport-codes";

import UpdateDeals from "@/action/Admin/Deals/EditDeals";
import ModalPopup from "@/components/Modal/deletepopup";
interface ActionInterfae {
  response: {
    flight_deals_id: number;
    destination: string;
    image_url: string;
    departure: string;
    departure_date: string;
    return_date: string;
    fair: string;
  };
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

const ActionButton: React.FC<ActionInterfae> = ({ response, cityname }) => {
  const SearchParams = useSearchParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const id = SearchParams.get("id") || "";
  const edit = SearchParams.get("edit") || "";
  const [Id, setId] = useState(0);
  const [loading, setLoading] = useState(false);
  // Update Popup Modal
  const [updateRecord, setUpdateRecord] = useState(false);
  const [apiImage, setApiImage] = useState("");
  // Delete Modal
  const [deleteOpen, setDeleteOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const [fileImage, setfileImage] = useState("");
  const [filePath, setFilePath] = useState([]);
  const { departure_date, return_date } = useBookingQuote();
  const { departure, destination } = useModifySearch((state) => state);
  const [departureAirport, setdepartureAirport] = useState("");
  const [destinationAirport, setdestinationAirport] = useState("");
  const [price, setPrice] = useState("");
  const [Datevalue, setDateValue] = useState<DateValueType>({
    startDate: departure_date,
    endDate: return_date,
  });

  useEffect(() => {
    setdepartureAirport(response.departure || "");
    const name = response.destination.split("[")[1].trim();
    const parts = name.split("]");
    const destinationAirport = airports.find(
      (airport) => airport.iata === parts[0].trim()
    )?.city;

    setdestinationAirport(destinationAirport || "");
    setDateValue({
      startDate: response.departure_date,
      endDate: response.return_date,
    });
    setPrice(response.fair || "");
    setfileImage(response.image_url);
  }, [response]);

  const editBanner = async () => {
    setUpdateRecord(true);
  };

  // Delete Banner
  const handleDeleteBanner = () => {
    setDeleteOpen(true);
  };

  // Delete Banner Api
  const DeleteBannerApi = async () => {
    setLoading(true);
    const deleteId = parseInt(id);
    const response = await DeleteDeals(Id || deleteId);
    reactHotToast.success("Deals Deleted Successfully", {
      position: "top-right",
      duration: 1000,
    });

    setTimeout(() => {
      setLoading(false);
      setDeleteOpen(false);
    }, 1000);
    router.push("/admin/flight-deals");
  };

  // Edit Banner Api

  const handleFileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      setFilePath(files);
    } else {
      setFilePath([]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleValueChange = (newValue: any) => {
    setDateValue(newValue);
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

  const handleSumbit = async (formData1: FormData) => {
    setLoading(true);

    const destination = formData1.get("destinationAirport") as string;
    const departureAirport = airports.find(
      (airport) => airport.city === destination.trim()
    )?.name;
    const AirportCode = airports.find(
      (airport) => airport.city === destination.trim()
    )?.iata;
    const formData = new FormData();
    const airportName = `${departureAirport} [${AirportCode}]`;
    formData.append("destination", airportName);
    if (filePath.length !== 0) {
      formData.append("image", filePath[0]);
    }
    formData.append("departure", formData1.get("departureAirport") as string);

    formData.append("fair", formData1.get("price") as string);
    formData.append("departure_date", Datevalue?.startDate as string);
    formData.append("return_date", Datevalue?.endDate as string);

    const response = await UpdateDeals(Id || edit, formData);

    setUpdateRecord(false);
    setDateValue({
      startDate: "",
      endDate: "",
    });
    reactHotToast.success("Deals Updated Successfully", {
      position: "top-right",
      duration: 1000,
    });
    setfileImage("");
    setFilePath([]);
    router.push("/admin/flight-deals");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handlePriceChange = (e: any) => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setfileImage("");
        setFilePath([]);
        setUpdateRecord(false);
        router.push("/admin/flight-deals");
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
    <>
      <Link
        className="mr-4 ml-6 text-green-700 cursor-pointer"
        onClick={() => {
          setId(response.flight_deals_id);
          editBanner();
        }}
        href={`?edit=${response.flight_deals_id}`}
      >
        <EditIcon /> Edit
      </Link>
      <Link
        className="text-red-600 cursor-pointer "
        onClick={() => {
          setId(response.flight_deals_id);
          handleDeleteBanner();
        }}
        href={`?id=${response.flight_deals_id}`}
      >
        <DeleteIcon /> Delete
      </Link>

      {deleteOpen && (
        // <Dialog
        //   open={deleteOpen}
        //   onClose={() => {
        //     router.push("/admin/flight-deals");
        //     setDeleteOpen(false);
        //   }}
        //   aria-labelledby="alert-dialog-title"
        //   aria-describedby="alert-dialog-description"
        // >
        //   <DialogTitle id="alert-dialog-title">
        //     {"Are you sure you want to Delete?"}
        //   </DialogTitle>

        //   <DialogActions>
        //     <Button
        //       onClick={() => {
        //         router.push("/admin/flight-deals");
        //         setDeleteOpen(false);
        //       }}
        //       className=" border-[#142B51] border-solid text-[#142B51] flex gap-[5px] justify-center rounded-md items-center w-[20%]"
        //     >
        //       NO
        //     </Button>
        //     <Button
        //       onClick={DeleteBannerApi}
        //       className=" flex hover:bg-red-500 gap-[5px] justify-center rounded-md items-center bg-[#142B51] text-white border-none w-[20%]"
        //       variant="contained"
        //       style={{ background: "#142B51" }}
        //     >
        //       {loading ? <PulseLoader color="white" /> : "Yes"}
        //     </Button>
        //   </DialogActions>
        // </Dialog>
        <ModalPopup
          open={deleteOpen}
          setopen={setDeleteOpen}
          note={""}
          //   deletename={DeleteData.email}
          handleDelete={DeleteBannerApi}
          loading={loading}
        />
      )}

      {updateRecord && (
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
                    <h2 className="text-[18px]">Update Destination Fight</h2>
                    <div
                      onClick={() => {
                        setfileImage("");
                        setFilePath([]);
                        setUpdateRecord(false);
                        router.push("/admin/flight-deals");
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
                                  defaultValue={`${departureAirport}`}
                                />
                              </div>

                              <div className="mr-3">
                                {/* <UseCityautoComplted
                                  label={"Destination"}
                                  placeholder={"Airport / City Name"}
                                  name={"destinationAirport"}
                                  required={true}
                                  icon={<FlightIconImage />}
                                  defaultValue={`${destinationAirport}[${destination}]`}
                                /> */}
                                <DestinationCityAutoComplete
                                  label={"Destination"}
                                  placeholder={"Select City Name"}
                                  name={"destinationAirport"}
                                  required={true}
                                  icon={<FlightIconImage />}
                                  cityname={cityname}
                                  defaultValue={destinationAirport}
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
                        Enter Price <span className="text-red-600  p-1">*</span>
                      </label>
                      <input
                        value={price}
                        type={"number"}
                        name={"price"}
                        onChange={handlePriceChange}
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
                          setUpdateRecord(false);
                          setDateValue({
                            startDate: "",
                            endDate: "",
                          });
                        }}
                        color="error"
                      >
                        Cancel
                      </Button>
                      <LoaderButton>Submit</LoaderButton>
                      {/* <CustomButton
                        text={"Submit"}
                        loading={loading}
                        // onClick={handleSumbit}
                        customclass="bg-[#142B51] flex gap-[5px] justify-center rounded-md items-center text-white border-none w-[20%]"
                      /> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default ActionButton;

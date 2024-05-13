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
import UseCityautoComplted from "@/components/AutoComplete/CityautoComplted";
import { IoClose } from "react-icons/io5";
import FlightIconImage from "@/components/Images/FlightIcon";
import LoaderButton from "../DestinationDeals/Button";
import DeleteCity from "@/action/Admin/City/DeleteDestinationCity";
import UpdateCity from "@/action/Admin/City/UpdateDestinationCity";
import DestinationCityActionComple from "@/components/AutoComplete/DestinationCityActionCmplete";
import ModalPopup from "@/components/Modal/deletepopup";
interface ActionInterfae {
  response: {
    city_id: number;
    city_name: string;
    city_image_url: string;
  };
}

const ActionButton: React.FC<ActionInterfae> = ({ response }) => {
  const SearchParams = useSearchParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const id = SearchParams.get("id") || "";
  const edit = SearchParams.get("edit") || "";
  const [Id, setId] = useState(0);
  const [loading, setLoading] = useState(false);
  // Update Popup Modal
  const [updateRecord, setUpdateRecord] = useState(false);
  // Delete Modal
  const [deleteOpen, setDeleteOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const [fileImage, setfileImage] = useState("");
  const [filePath, setFilePath] = useState([]);

  const [selectedCityName, setSelectedCityName] = useState("");

  useEffect(() => {
    setfileImage(response.city_image_url);
    setSelectedCityName(response.city_name);
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
    const response = await DeleteCity(Id || deleteId);
    reactHotToast.success("Destination City Deleted Successfully", {
      position: "top-right",
      duration: 1000,
    });

    setTimeout(() => {
      setLoading(false);
      setDeleteOpen(false);
    }, 1000);
    router.push("/admin/flight-deals-city");
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
    const editId = parseInt(edit);
    const formData = new FormData();
    const cityname = formData1.get("city_name") as string;

    formData.append("city_name", cityname);
    if (filePath.length !== 0) {
      formData.append("city_image", filePath[0]);
    }
    const response = await UpdateCity(Id || editId, formData);
    reactHotToast.success("Destination City Updated Successfully", {
      position: "top-right",
      duration: 1000,
    });
    setUpdateRecord(false);
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
        setUpdateRecord(false);
        router.push("/admin/flight-deals-city");
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
          setId(response.city_id);
          editBanner();
        }}
        href={`?edit=${response.city_id}`}
      >
        <EditIcon /> Edit
      </Link>
      <Link
        className="text-red-600 cursor-pointer "
        onClick={() => {
          setId(response.city_id);
          handleDeleteBanner();
        }}
        href={`?id=${response.city_id}`}
      >
        <DeleteIcon /> Delete
      </Link>

      {deleteOpen && (
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
            <div className="flex md:min-h-full min-h-[80%] items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div
                ref={componentRef}
                className=" rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="p-2 border-b-[2px] flex  items-center justify-between border-b-[#eedede]">
                    <h2 className="text-[18px]">Update Destination City</h2>
                    <div
                      onClick={() => {
                        setfileImage("");
                        setFilePath([]);
                        setUpdateRecord(false);
                        router.push("/admin/flight-deals-city");
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
                        <div className="col-span-12 h-auto"></div>
                      </div>
                    </div>

                    <div className="mr-3">
                      <DestinationCityActionComple
                        label={"Select Destination City"}
                        placeholder={"Select Destination City"}
                        name={"city_name"}
                        required={true}
                        icon={<FlightIconImage />}
                        defaultValue={selectedCityName}
                      />
                    </div>

                    <div className="bg-gray-50 mt-5  w-full flex justify-end ">
                      <Button
                        onClick={() => {
                          setfileImage("");
                          setFilePath([]);
                          setUpdateRecord(false);
                        }}
                        color="error"
                      >
                        Cancel
                      </Button>
                      <LoaderButton>Update</LoaderButton>
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

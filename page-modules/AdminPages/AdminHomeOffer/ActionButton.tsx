"use client";
import React, { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import CustomButton from "@/components/Button/Button";
import Image from "next/image";
import DeleteOffer from "@/action/Admin/Offer/DeleteOffer";
import UpdateOffer from "@/action/Admin/Offer/EditOffer";
import Styles from "./adminhomeoffer.module.css";
import ModalPopup from "@/components/Modal/deletepopup";
interface ActionInterfae {
  response: {
    offer_image_url: string;
    offer_id: number;
    offer_price: string;
    city_name: string;
  };
  AllCities: [];
}
const ActionButton: React.FC<ActionInterfae> = ({ response, AllCities }) => {
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

  const [fileImage, setfileImage] = useState("");
  const [filePath, setFilePath] = useState([]);
  const [price, setPrice] = useState("");
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    setPrice(response.offer_price);
    setCityName(response.city_name);
    setfileImage(response.offer_image_url);
  }, [response]);
  const editBanner = async () => {
    setUpdateRecord(true);
  };

  // Delete Banner
  const handleDeleteBanner = () => {
    setDeleteOpen(true);
  };

  const MAX_IMAGE_SIZE_MB = 10;
  const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

  const handleBannerImage = (event: any) => {
    const file = event.target.files;
    const filesdata = event.target.files[0];
    if (file) {
      if (filesdata?.size <= MAX_IMAGE_SIZE_BYTES) {
        const objectURL = URL.createObjectURL(file[0]);
        setfileImage(objectURL);
        setApiImage(file);
      } else {
        reactHotToast.error("Image size exceeds 10MB limit", {
          position: "top-right",
          duration: 3000,
        });

        event.target.value = null;
      }
    } else {
      setApiImage("");
    }
  };

  // Delete Banner Api
  const DeleteBannerApi = async () => {
    setLoading(true);
    const deleteId = parseInt(id);
    const response = await DeleteOffer(Id || deleteId);
    reactHotToast.success("Offer Deleted Successfully", {
      position: "top-right",
      duration: 1000,
    });

    setTimeout(() => {
      setLoading(false);
      setDeleteOpen(false);
    }, 1000);
    router.push("/admin/homeoffer");
  };

  // Edit Banner Api
  const EditBannerApi = async () => {
    if ((apiImage !== "" || fileImage !== "") && price !== "") {
      setLoading(true);
      const formData = new FormData();
      if (apiImage.length !== 0) {
        formData.append("offer_image", apiImage[0]);
      }
      formData.append("offer_price", price);
      formData.append("city_name", cityName);
      const response = await UpdateOffer(Id || edit, formData);
      reactHotToast.success("Offer Updated Successfully", {
        position: "top-right",
        duration: 1000,
      });
      setUpdateRecord(false);
      router.push("/admin/homeoffer");

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      reactHotToast.error("Required", {
        position: "top-right",
        duration: 1000,
      });
    }
  };
  const handleFileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      setFilePath(files[0]);
    } else {
      setFilePath([]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      <Link
        className="mr-4 ml-6 text-green-700 cursor-pointer"
        onClick={() => {
          setId(response.offer_id);
          editBanner();
        }}
        href={`?edit=${response.offer_id}`}
      >
        <EditIcon /> Edit
      </Link>
      <Link
        className="text-red-600 cursor-pointer "
        onClick={() => {
          setId(response.offer_id);
          handleDeleteBanner();
        }}
        href={`?id=${response.offer_id}`}
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
        <Dialog
          open={updateRecord}
          onClose={() => {
            setUpdateRecord(false);
            setfileImage("");
            setFilePath([]);
            setPrice("");
            router.push("/admin/homeoffer");
          }}
        >
          <DialogTitle className="mt-3">Update Offer </DialogTitle>
          <div className="pb-12 px-12 pt-4 ">
            <h2 className="mb-1 mt-1">
              Select Offer Image: <span className="text-red-600  p-1">*</span>
            </h2>

            <div
              className="rounded-md border-dashed border-black border-2 mb-3 md:p-20 p-8 text-center"
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => handleClick()}
            >
              <p>Drag & Drop files here or click to select</p>
              *For better website quality we suggest to use images with 344x344
              resolution (below 10Mb)*
              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                onChange={handleBannerImage}
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

            <div className="mt-5">
              <label htmlFor="dropdown">
                Enter Price <span className="text-red-600  p-1">*</span>
              </label>
              <input
                type={"number"}
                name={"price"}
                value={price}
                className={`w-full bg-[#F4F4F4] rounded-[5px] p-4 focus:outline-none border border-[#DADADA] h-[40px] md:h-[54px]`}
                placeholder={"Enter Price"}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <label htmlFor="dropdown">
                Enter City Name <span className="text-red-600  p-1">*</span>
              </label>
              <select
                // className="w-[100%] px-4 py-4 border rounded-2xl "
                className={`w-full bg-[#F4F4F4] rounded-[5px] p-4 focus:outline-none border border-[#DADADA] h-[40px] md:h-[54px] ${Styles.dropdown}`}
                id="dropdown"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              >
                <option value="" disabled selected className="hidden">
                  Select Cities
                </option>
                {AllCities.map((res, index) => (
                  <option key={index} value={res}>
                    {res}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 mt-6">
              <CustomButton
                text="Cancel"
                onClick={() => {
                  setUpdateRecord(false);
                  setfileImage("");
                  setFilePath([]);
                  setPrice("");
                  router.push("/admin/homeoffer");
                }}
                customclass="bg-[#EB2822] flex gap-[5px] justify-center rounded-md items-center text-white border-none w-[50%]"
              />
              <CustomButton
                text={"Update"}
                loading={loading}
                onClick={EditBannerApi}
                disabled={
                  fileImage === "" || cityName === "" || price === ""
                    ? true
                    : false
                }
                customclass="bg-[#142B51] flex gap-[5px] justify-center rounded-md items-center text-white border-none w-[50%]"
              />
            </div>
          </div>
        </Dialog>
      )}
      <Toaster />
    </>
  );
};

export default ActionButton;

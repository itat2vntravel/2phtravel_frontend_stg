"use client";
import React, { useEffect, useRef, useState } from "react";
import Styles from "./adminhomeoffer.module.css";
// icons
import { MdAddToPhotos } from "react-icons/md";
import ImagePrreivew from "./ImagePrreivew";
import ActionButton from "./ActionButton";
import CustomButton from "@/components/Button/Button";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import AddOffer from "@/action/Admin/Offer/AddOffer";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import { formUrlQuery } from "@/utils/formUrlQuery";
import { useRouter, useSearchParams } from "next/navigation";
interface offerDataInterface {
  offerdata: [
    {
      offer_image_url: string;
      offer_id: number;
      city_name: string;
      offer_price: string;
    }
  ];
  AllCities: [];
}

const AdminHomeOffer: React.FC<offerDataInterface> = ({
  offerdata,
  AllCities,
}) => {
  const router = useRouter();
  const [AddPopupOpen, setAddPopupOpen] = useState(false);
  const [filePath, setFilePath] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileImage, setfileImage] = useState("");
  const [price, setPrice] = useState("");
  const [cityName, setCityName] = useState("");

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

  // Add Banner Api
  const handleAddBanner = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (filePath.length !== 0) {
        formData.append("offer_image", filePath[0]);
      }
      formData.append("offer_price", price);
      formData.append("city_name", cityName);

      const response = await AddOffer(formData);
      reactHotToast.success("Offer Added Successfully", {
        position: "top-right",
        duration: 1000,
      });
      setAddPopupOpen(false);
    } catch (error) {
      reactHotToast.success("Offer Data failed", {
        position: "top-right",
        duration: 1000,
      });

      setAddPopupOpen(false);
      throw error;
    }

    setTimeout(() => {
      setLoading(false);
      setAddPopupOpen(false);
    }, 1000);
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

  const handleFairChange = (event: any) => {
    setPrice(event.target.value);
  };
  const handleCityChange = (event: any) => {
    setCityName(event.target.value);
  };

  return (
    <div className=" pt-16 xl:pl-16 lg:pl-4 pl-5 xl:pr-16 lg:pr-4 pr-5 ">
      <div className="flex justify-between  mb-8">
        <h1> Home Offers</h1>

        <CustomButton
          text="Add Offer"
          icon={<MdAddToPhotos />}
          onClick={() => {
            setAddPopupOpen(true);
            setfileImage("");
            setFilePath([]);
          }}
          customclass="bg-[#142B51] md:p-4 p-1 text-white px-4 flex gap-2 items-center rounded-md"
        />
      </div>
      <div className="grid grid-cols-12 gap-4 ">
        {offerdata.map(
          (
            res: {
              offer_image_url: string;
              offer_price: string;
              city_name: string;
              offer_id: number;
            },
            index: number
          ) => (
            <div
              key={index}
              className="p-7 flex flex-col h-full items-center w-fit xl:col-span-4  lg:col-span-6 col-span-12 border shadow-md "
            >
              <h1>Title : {res.city_name}</h1>
              <ImagePrreivew offer_image_url={res.offer_image_url} />

              <p className="text-xl mt-2">
                <b>Price :</b>
                {res.offer_price}*
              </p>
              <div className="flex w-full justify-around items-center mt-6">
                <ActionButton response={res} AllCities={AllCities} />
              </div>
            </div>
          )
        )}
      </div>

      {AddPopupOpen && (
        <Dialog
          open={AddPopupOpen}
          onClose={() => {
            setfileImage("");
            setFilePath([]);
            setAddPopupOpen(false);
          }}
        >
          <DialogTitle>Add Offer </DialogTitle>
          <DialogContent>
            <h2 className="mb-5 mt-1">
              Add Offer Image: <span className="text-red-600  p-1">*</span>
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

            <div className="mt-5">
              <label htmlFor="dropdown">
                Enter Price <span className="text-red-600  p-1">*</span>
              </label>
              <input
                type={"number"}
                name={"price"}
                className={`w-full bg-[#F4F4F4]  relative  mb-4 rounded-[5px] p-4 focus:outline-none border border-[#DADADA] h-[40px] md:h-[54px]`}
                placeholder={"Enter Price"}
                required={true}
                onChange={handleFairChange}
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
                onChange={handleCityChange}
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
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setfileImage("");
                setFilePath([]);
                setAddPopupOpen(false);
              }}
              color="error"
            >
              Cancel
            </Button>
            <CustomButton
              text={"Submit"}
              loading={loading}
              onClick={() => handleAddBanner()}
              disabled={
                fileImage === "" || cityName === "" || price === ""
                  ? true
                  : false
              }
              customclass="bg-[#142B51] flex gap-[5px] justify-center rounded-md items-center text-white border-none w-[20%]"
            />
          </DialogActions>
        </Dialog>
      )}
      <Toaster />
    </div>
  );
};

export default AdminHomeOffer;

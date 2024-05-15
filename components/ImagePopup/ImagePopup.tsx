"use client";
import { Dialog } from "@mui/material";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import useBookingQuote from "@/store/BookingQuote";

import { useSearchParams } from "next/navigation";
import QuotePopup from "../QuotePopup/QuotePopup";


interface ImagePopupInterface {
  promotion: {
    date: string;
    desc: string;
    from_place: string;
    image_url: string;
    price: string;
    title: string;
    to_place: string;
  };
}

const ImagePopup: FC<ImagePopupInterface> = ({ promotion }) => {
  const [Imageopen, setImageOpen] = useState(false);
  const { updateBookingStore } = useBookingQuote((state) => state);

  const searchParams = useSearchParams();
  const quotepopup = searchParams.get("quotepopup");

  useEffect(() => {
    // setTimeout(() => {
      if (!sessionStorage.getItem("ImageOpen")) {
        setImageOpen(true);
        sessionStorage.setItem("ImageOpen", "true");
      }
    // }, 5000);
  }, []);

  useEffect(() => {
    if (Imageopen) {
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflowY = "scroll";
    }
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [Imageopen]);

 return (
    <>
      {quotepopup == "open" ? <QuotePopup /> : null}
      
      <Dialog 
        open={Imageopen}
        keepMounted
        onClose={() => setImageOpen(false)}
        aria-describedby="alert-dialog-slide-description1"
        maxWidth="md"
        className="!rounded-xl"
      >
        <div className="relative">
          <IoCloseSharp
            onClick={() => setImageOpen(false)}
            className="absolute top-3 right-3 cursor-pointer text-3xl text-white "
          />
          <Image
            src={promotion?.image_url}
            alt="BannerDemo Image"
            width={140}
            height={10}
            priority
            // layout="responsive"
            className="2xl:!h-[640px] lg:!h-[540px] !h-[450px] 2xl:!w-[640px] lg:!w-[540px] !w-[450px] border-2  rounded-md "
          />
        </div>
      </Dialog>
    </>
  );
};

export default ImagePopup;

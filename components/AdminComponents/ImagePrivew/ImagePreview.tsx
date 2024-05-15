"use client";
import { Dialog } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

interface ImageData {
  res: {
    image_url: string;
  };
}

const ImagePreview: React.FC<ImageData> = ({ res }) => {
  // Image Zoom Modal and seleted Image
  const [Imageopen, setImageOpen] = useState(false);
  const [privewImage, setPreivewImage] = useState("");
  return (
    <>
      <Image
        src={res.image_url}
        alt="BannerDemo Image"
        width={440}
        height={40}
        priority
        className="cursor-zoom-in h-[195px] w-[400px]  "
        onClick={() => {
          setPreivewImage(res.image_url);
          setImageOpen(true);
        }}
      />
      {Imageopen && (
        <Dialog
          open={Imageopen}
          keepMounted
          onClose={() => setImageOpen(false)}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md"
        >
          <Image
            src={privewImage}
            alt="BannerDemo Image"
            width={140}
            height={10}
            priority
            // layout="responsive"
            className="hidden lg:block h-full w-full "
          />
        </Dialog>
      )}
    </>
  );
};

export default ImagePreview;

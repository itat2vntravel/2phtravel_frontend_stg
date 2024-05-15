"use client";
import { Dialog } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

interface ImageInterface {
  offer_image_url: any;
}

const ImagePrreivew: React.FC<ImageInterface> = ({ offer_image_url }) => {
  // Image Zoom Modal and seleted Image
  const [Imageopen, setImageOpen] = useState(false);
  const [privewImage, setPreivewImage] = useState("");
  return (
    <>
      <Image
        src={offer_image_url}
        alt="BannerDemo Image"
        width={400}
        height={70}
        priority
        className="cursor-zoom-in h-[215px]  "
        onClick={() => {
          setPreivewImage(offer_image_url);
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

export default ImagePrreivew;

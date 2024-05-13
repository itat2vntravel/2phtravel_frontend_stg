"use client";
import React, { FC } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import StaticBanner01 from "@/public/BannerStaticImages/banner01.png";
import StaticBanner02 from "@/public/BannerStaticImages/banner02.png";
import StaticBanner03 from "@/public/BannerStaticImages/banner03.png";
import Image from "next/image";
import { Container } from "@mui/material";
import { MdArrowRight } from "react-icons/md";
import { MdArrowLeft } from "react-icons/md";
import Link from "next/link";
export interface SliderProps {
  banner: { image_url: string }[];
}

const SliderComponent: FC<SliderProps> = ({ banner }) => {
  const isTablet = useMediaQuery("(max-width:800px)");
  const isMobile = useMediaQuery("(max-width:750px)");

  const Staticbanner = [
    {
      image_url: StaticBanner01,
    },
    {
      image_url: StaticBanner02,
    },
    {
      image_url: StaticBanner03,
    },
  ];

  const properties = {
    prevArrow: (
      <div className="md:flex justify-center items-center text-white opacity-70 hover:opacity-100 h-full hover:bg-[#00000033] hidden hover:rounded-l-[10px]">
        <button>
          <MdArrowLeft className="text-white text-[40px] opacity-70 hover:opacity-100" />
        </button>
      </div>
    ),
    nextArrow: (
      <div className="md:flex justify-center items-center text-white opacity-70 hover:opacity-100 h-full hover:bg-[#00000033] hidden hover:rounded-r-[10px]">
        <button>
          <MdArrowRight className="text-white text-[40px] opacity-70 hover:opacity-100" />
        </button>
      </div>
    ),
  };
  return (
    <Container className="container mx-auto ">
      <div className="slide-container">
        <Slide autoplay infinite {...properties}>
          {banner.length !== 0
            ? banner.map((image, index) => (
                <div key={index}>
                  <Link href="/bookflights/Cebu">
                    <Image
                      src={image.image_url}
                      alt={`2PH Travel Banner ${index + 1}`}
                      style={{
                        display: "block",
                        margin: "auto",
                        height: isMobile
                          ? "200px"
                          : isTablet
                          ? "300px"
                          : "500px",
                        borderRadius: "10px",
                        width: "100%",
                      }}
                      width={1000}
                      height={100}
                    />
                  </Link>
                </div>
              ))
            : Staticbanner.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image.image_url}
                    alt={`2PH Travel BannerImage ${index + 1}`}
                    style={{
                      display: "block",
                      margin: "auto",
                      height: isMobile ? "200px" : isTablet ? "300px" : "500px",
                      borderRadius: "10px",
                    }}
                    width={1000}
                    height={100}
                  />
                </div>
              ))}
        </Slide>
      </div>
    </Container>
  );
};

export default SliderComponent;

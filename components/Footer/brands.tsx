"use client";
import Image from "next/image";
import React, { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSearchParams } from "next/navigation";
import { Container } from "@mui/material";
export interface BrandsProps {}
const Brands: FC<BrandsProps> = () => {
  var settings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const searchParams = useSearchParams();
  const quotepopup = searchParams.get("quotepopup");
  const sliderlist = [
    {
      imageurl: "/card/asta.png",
      imagename: "asta",
    },

    {
      imageurl: "/card/iatan.png",
      imagename: "iatan",
    },
    {
      imageurl: "/card/bbb.png",
      imagename: "BBB",
    },
    {
      imageurl: "/card/cst.png",
      imagename: "CST",
    },
    {
      imageurl: "/card/americanexpress.png",
      imagename: "americanexpress",
    },
    {
      imageurl: "/card/discover.png",
      imagename: "Discover",
    },

    {
      imageurl: "/card/visa.png",
      imagename: "VISA-logo",
    },
    {
      imageurl: "/card/mastercard.png",
      imagename: "master",
    },
  ];
  return (
    <>
      <div
        style={{
          display: quotepopup == "open" ? "none" : "block",
        }}
      >
        <Container>
          <Slider {...settings}>
            {sliderlist.map((data, index) => (
              <div key={index}>
                <div className=" flex   items-center justify-center p-[5px]   z-0">
                  <Image
                    src={data.imageurl}
                    alt={data.imagename}
                    width={15000}
                    height={20}
                    className="h-[90px] p-2"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </Container>
      </div>
    </>
  );
};
export default Brands;

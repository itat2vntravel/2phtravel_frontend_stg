"use client";

import React, { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "@mui/material";
export interface HomeSliderComponentProps {
  children: React.ReactNode;
}
function SampleNextArrow(props: any) {
  const { className, onClick } = props;
  return <div className={`${className} rounded-full`} onClick={onClick} />;
}

function SamplePrevArrow(props: any) {
  const { className, onClick } = props;
  return <div className={`${className} rounded-full`} onClick={onClick} />;
}
const HomeSliderComponent: FC<HomeSliderComponentProps> = ({
  children,
}: HomeSliderComponentProps) => {
  var settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    arrows: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="p-5 slider-container">
        <Container>
          <div className="exploresilder">
            <Slider {...settings}>{children}</Slider>
          </div>
        </Container>
      </div>
    </>
  );
};
export default HomeSliderComponent;

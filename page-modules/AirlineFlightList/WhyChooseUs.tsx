"use client";
import React from "react";
import Image from "next/image";
import BBB from "@/public/TopAirlineDeals/bbbimage.png";
import IATAN from "@/public/TopAirlineDeals/iataiimage.png";
import Asta from "@/public/TopAirlineDeals/astaimage.png";
import Travel from "@/public/TopAirlineDeals/serviceimage.png";
import customer from "@/public/TopAirlineDeals/csutomerservice.png";
import { Container } from "@mui/material";

const WhyChooseUs = () => {
  return (
    <Container>
      <div className=" text-white relative top-[-40px] md:flex flex-row hidden  justify-evenly">
        <div>
          <Image
            src={IATAN}
            alt="IATAN"
            width={7000000000}
            height={30}
            className=" text-white hidden w-[180px]  h-[80px] lg:block"
          />
        </div>
        <div>
          <Image
            src={BBB}
            alt="BBB"
            width={7000000000}
            height={30}
            className=" text-white hidden w-[180px]  h-[80px] lg:block"
          />
        </div>{" "}
        <div>
          <Image
            src={Asta}
            alt="Asta"
            width={7000000000}
            height={30}
            className=" text-white hidden w-[180px]  h-[80px] lg:block"
          />
        </div>{" "}
        <div>
          <Image
            src={Travel}
            alt="Service Travel"
            width={7000000000}
            height={30}
            className=" text-white hidden w-[180px]  h-[80px] lg:block"
          />
        </div>{" "}
        <div>
          <Image
            src={customer}
            alt="customer"
            width={7000000000}
            height={30}
            className=" text-white hidden w-[180px]  h-[80px] lg:block"
          />
        </div>
      </div>
    </Container>
  );
};

export default WhyChooseUs;

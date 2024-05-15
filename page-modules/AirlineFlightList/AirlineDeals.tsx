"use client";
import React from "react";
import Styles from "./airlineflight.module.css";
import Image from "next/image";
import Asiana from "@/public/Airlines/asiana_airlines.png";
import Eva from "@/public/Airlines/evaair.png";
import Philippine from "@/public/Airlines/philippine_airlines.png";
import Korean from "@/public/Airlines/korean_air.png";
import United from "@/public/Airlines/united_airlines.png";
import { useRouter, useSearchParams } from "next/navigation";
import Singapore from "@/public/Airlines/singapore_airlines.png";
import china from "@/public/Airlines/china_airlines.png";
import { Card, Container } from "@mui/material";
import AirlineDealsPopup from "./AirlineDealsPopup";
import { formUrlQuery } from "@/utils/formUrlQuery";
import PhilipinesImage from "@/public/TopAirlineDeals/philipinesairline.png";
import KoreanImage from "@/public/TopAirlineDeals/koreanairlines.png";
import UnitedImage from "@/public/TopAirlineDeals/unitedairlines.png";
import EvaImage from "@/public/TopAirlineDeals/evaairimage.jpg";
import ChinaImage from "@/public/TopAirlineDeals/chinaairlineflight.webp";
import AsianaImage from "@/public/TopAirlineDeals/asianaflightimage.jpg";
import SingaporeImage from "@/public/TopAirlineDeals/singaporeflight.jpg";

interface FlightInterface {
  logo: any;
  title: string;
  about: string;
  url: string;
  MainImage: any;
}

const Airlinedeals = ({ userId }: any) => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const quotepopup = searchParams.get("quotepopup");
  const Airlinepopup = searchParams.get("airline-offers") || undefined;
  const flightlist: FlightInterface[] = [
    {
      logo: Philippine,
      title: "Philippine Airline",
      about:
        "Philippine Airlines is the flag carrier of the Philippines. Headquartered at the PNB Financial Center in Pasay and is the oldest operating commercial airline in Asia.",
      url: "/bookflights",
      MainImage: PhilipinesImage,
    },
    {
      logo: United,
      title: "United Airline",
      about:
        "United Airlines, Inc. is a major American airline headquartered at the Willis Tower in Chicago, Illinois. United consistently ranks as one of the world's largest airlines",
      url: "/bookflights",
      MainImage: UnitedImage,
    },
    {
      logo: Korean,
      title: "Korean Air",
      about:
        "Korean Air Lines Co., Ltd., operating as Korean Air, is the flag carrier of South Korea and its largest airline based on fleet size, international destinations, and international flights. ",
      url: "/bookflights",
      MainImage: KoreanImage,
    },
    {
      logo: Asiana,
      title: "Asiana Airline",
      about:
        "Asiana Airlines Inc. is a South Korean airline headquartered in Seoul.It accounted for 25% of South Korea's international aviation marketand 20% of its domestic market.",
      url: "/bookflights",
      MainImage: AsianaImage,
    },
    {
      logo: Eva,
      title: "Eva Air",
      about:
        "EVA Airways Corporation is a Taiwanese airline headquartered in Taoyuan City. It is one of the two largest airlines in Taiwan along with  China Airlines.",
      url: "/bookflights",
      MainImage: EvaImage,
    },
    {
      logo: Singapore,
      title: "Singapore Airline",
      about:
        "Singapore Airlines is the flag carrier of Singapore with its hub located at Changi Airport, and a member of the Star Alliance. Singapore Airlines was the first to put the Airbus A380",
      url: "/bookflights",
      MainImage: SingaporeImage,
    },
    {
      logo: china,
      title: "china Airline",
      about:
        "China Airlines is the state-owned flag carrier of the Republic of China. It is one of Taiwan's two major airlines along with EVA Air.",
      url: "/bookflights",
      MainImage: ChinaImage,
    },
  ];

  const handlebooking = (AirlineValue: string) => {
    let newUrl;
    newUrl = formUrlQuery({
      params: searchParams.toString() + `&airline=${AirlineValue}`,

      key: "quotepopup",
      value: "open",
    });

    navigate.push(newUrl, { scroll: false });
  };

  return (
    <Container>
      <div className="my-5">
        <h1 className="text-center text-2xl">Explore the top airlines</h1>
        <div className="my-5">
          <div className="grid grid-cols-3 lg:grid-cols-3   md:grid-cols-12 gap-10">
            {flightlist.map((value, i) => (
              <Card
                className="lg:col-span-1 md:col-span-6
               col-span-3  "
                key={i}
              >
                <div className={` ${Styles.contactAddressCard2} `}>
                  <div className="p-3">
                    <Image
                      src={value.MainImage}
                      alt="image"
                      width={1000000}
                      height={200}
                      className="w-[100%] h-[250px] bg-customWhite rounded-[10px] "
                    />
                  </div>
                  <div
                    style={{
                      padding: value.title === "Korean Air" ? "21px" : "10px",
                    }}
                  >
                    <Image
                      src={value.logo}
                      alt="image"
                      width={1000000}
                      height={200}
                      className="w-[38%] h-[1] bg-customWhite rounded-[5px]"
                    />
                  </div>
                  <hr className="mt-2"></hr>
                  <div className="p-4">
                    <p className="text-sm mt-2 line-clamp-4 text-start">
                      {value.about}
                    </p>

                    <button
                      className={`w-full text-[18px] text-start cursor-pointer text-[#EC2719] font-bold mt-5`}
                      type="button"
                      onClick={() => handlebooking(value.title)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {quotepopup === "open" && (
        <AirlineDealsPopup
          quotepopup={quotepopup}
          userId={userId}
          Airlinepopup={Airlinepopup}
        />
      )}
    </Container>
  );
};

export default Airlinedeals;

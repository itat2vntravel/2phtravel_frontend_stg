"use client";
import DestinationDeals from "@/action/Admin/Deals/DestinationDeals";
import QuotePopup from "@/components/QuotePopup/QuotePopup";
import Asiana from "@/public/Airlines/asiana_airlines.png";
import china from "@/public/Airlines/china_airlines.png";
import Eva from "@/public/Airlines/evaair.png";
import korean from "@/public/Airlines/korean_air.png";
import Philippine from "@/public/Airlines/philippine_airlines.png";
import Singapore from "@/public/Airlines/singapore_airlines.png";
import United from "@/public/Airlines/united_airlines.png";
import useBookingQuote from "@/store/BookingQuote";
import { formUrlQuery } from "@/utils/formUrlQuery";
import { Card, Container, Divider } from "@mui/material";
import airports from "@nwpr/airport-codes";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRightLong, FaLocationDot } from "react-icons/fa6";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import NotfoundImage from "../../public/post.jpg";
import load from "../../public/load.gif";
import Styles from "./filghtbydestination.module.css";

interface FlightInterface {
  logo: any;
  title: string;
  about: string;
  url: string;
}

const FlightListByDestination = ({ heroBanner }: any) => {
  var settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 800,
    arrows: true,
    autoplaySpeed: 5000,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
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
        breakpoint: 530,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { updateBookingStore } = useBookingQuote((state) => state);

  const currentDate = new Date();
  const [data, setData] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = useParams();
  const id = path.id as string;
  const [loading, setLoading] = useState("");

  const filteredData = data.filter(
    (res: any) => !res.is_expired && new Date(res.departure_date) > currentDate
  );
  useEffect(() => {
    FlightData(id);
  }, [id]);
  const FlightData = async (id: string) => {
    setLoading("Loading");

    let decodedUrl = decodeURIComponent(id);
    const departureAirport = airports.find(
      (airport) => airport.city === decodedUrl.trim()
    )?.name;
    const AirportCode = airports.find(
      (airport) => airport.city === decodedUrl.trim()
    )?.iata;
    const airportName = `${departureAirport} [${AirportCode}]`;
    const response = await DestinationDeals(airportName);
    if (response) {
      setData(response);
      setLoading("datafetched");
    } else {
      setLoading("");
    }
  };

  const flightlist: FlightInterface[] = [
    {
      logo: Asiana,
      title: "Asiana Airline",
      about:
        "Asiana Airlines Inc. is a South Korean airline headquartered in Seoul. In 2019, it accounted for 25% of South Korea's international aviation market and 20% of its domestic market.",
      url: "/bookflights",
    },

    {
      logo: korean,
      title: "Korean Air",
      about:
        "Korean Air Lines Co., Ltd., operating as Korean Air, is the flag carrier of South Korea and its largest airline based on fleet size, international destinations, and international flights. ",
      url: "/bookflights",
    },
    {
      logo: United,
      title: "United Airline",
      about:
        "United Airlines, Inc. is a major American airline headquartered at the Willis Tower in Chicago, Illinois.",
      url: "/bookflights",
    },

    {
      logo: china,
      title: "China Airline",
      about:
        "United Airlines, Inc. is a major American airline headquartered at the Willis Tower in Chicago, Illinois.",
      url: "/bookflights",
    },
    {
      logo: Singapore,
      title: "Singpore Airline",
      about:
        "United Airlines, Inc. is a major American airline headquartered at the Willis Tower in Chicago, Illinois.",
      url: "/bookflights",
    },
    {
      logo: Philippine,
      title: "Philippine Airline",
      about:
        "Philippine Airlines is the flag carrier of the Philippines. Headquartered at the PNB Financial Center in Pasay, the airline was founded in 1941 and is the oldest operating commercial airline in Asia.",
      url: "/bookflights",
    },
    {
      logo: Eva,
      title: "Eva Air",
      about:
        "EVA Airways Corporation is a Taiwanese airline headquartered in Taoyuan City. It is one of the two largest airlines in Taiwan along with state-owned China Airlines.",
      url: "/bookflights",
    },
  ];
  const handlebooking = (res: {
    departure: string;
    destination: string;
    departure_date: string;
    return_date: string;
    expiration: number;
    fair: string;
  }) => {
    updateBookingStore({
      departure: res.departure,
      destination: res.destination,
      departure_date: res.departure_date,
      return_date: res.return_date,
      fair: res.fair,
    });

    let newUrl;
    newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "quotepopup",
      value: "open",
    });

    router.push(newUrl, { scroll: false });
  };
  const quotepopup = searchParams.get("quotepopup");

  const data1 = heroBanner.filter((res: any) => res.city_name === id);

  return (
    <>
      {quotepopup == "open" ? <QuotePopup /> : null}
      <div
        className="h-[350px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            data1.length !== 0
              ? `url(${data1[0].city_image_url})`
              : `url('/destinationimages/destination.png' )`,
          display: quotepopup == "open" ? "none" : "block",
        }}
      >
        <div className="flex h-full items-center justify-center">
          <h1 className="text-4xl text-white">
            {decodeURIComponent(id) === "Angeles City"
              ? "Pampanga (Clark)"
              : decodeURIComponent(id)}{" "}
          </h1>
        </div>
      </div>
      <div className="bg-[#F5F7FF]">
        <div
          className="container mx-auto mb-5 "
          style={{
            padding: "8px 20px",
            display: quotepopup == "open" ? "none" : "block",
          }}
        >
          <div className="mt-6 mb-6">
            <h1 className="mb-8 text-3xl ">Explore the top airlines</h1>
            <Container>
              <Slider {...settings}>
                {flightlist.map((value, i) => (
                  <div
                    key={i}
                    // onClick={() => navigate.push(value.url)}
                  >
                    <div className=" flex bg-white rounded-[10px] items-center justify-center m-5 p-4 z-0">
                      <Image
                        src={value.logo}
                        alt="image"
                        // width={1000000000000}
                        // height={200}
                        // // className="w-[150px] h-[140px] m-5 p-5  rounded-[10px] mix-blend-multiply"
                        // className="h-[60px] p-2  mix-blend-multiply"
                        width={1000000}
                        height={200}
                        className="w-[100%] mix-blend-multiply h-[80px] bg-customWhite rounded-[10px] "
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </Container>
          </div>
        </div>
      </div>
      <div className={`container mx-auto mb-3 ${Styles.paddingcontainer}`}>
        <div className="mt-6 p-3">
          <h2 className="mb-3 lg:text-2xl text-lg">
            Discover affordable flights to{" "}
            {decodeURIComponent(id) === "Angeles City"
              ? "Pampanga (Clark)"
              : decodeURIComponent(id)}{" "}
          </h2>

          <div className="grid grid-cols-12 lg:grid-cols-12   md:grid-cols-12 gap-10">
            {filteredData.length !== 0 ? (
              filteredData.map(
                (
                  res: {
                    departure: string;
                    destination: string;
                    departure_date: string;
                    return_date: string;
                    expiration: number;
                    fair: string;
                    image_url: string;
                  },
                  index: number
                ) => {
                  const name = res.destination.split("[")[1].trim();
                  const parts = name.split("]");
                  const destinationAirport = airports.find(
                    (airport) => airport.iata === parts[0].trim()
                  )?.city;
                  const name1 = res.departure.split("[")[1].trim();
                  const parts1 = name1.split("]");
                  const departureAirport = airports.find(
                    (airport) => airport.iata === parts1[0].trim()
                  )?.city;
                  const targetDate: Date = new Date(res.expiration);

                  const currentDate = new Date();

                  const differenceInMilliseconds =
                    targetDate.getTime() - currentDate.getTime();

                  const differenceInDays = Math.ceil(
                    differenceInMilliseconds / (1000 * 3600 * 24)
                  );
                  return (
                    <Card
                      className="rounded-[10px] xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12 "
                      key={index}
                    >
                      <Image
                        src={res.image_url || ""}
                        alt="airport Image"
                        width={10000}
                        height={30}
                        className="w-full h-[344px]"
                      />

                      <div className="p-3">
                        <h3 className="mb-3 font-semibold line-clamp-1">
                          {res.departure}
                        </h3>
                        <div className="flex justify-start items-center mb-3">
                          <FaLocationDot className="text-xl text-[#EC2719] rounded-full px-1 " />
                          <h5 className="mr-2">{departureAirport}</h5>
                          <FaArrowRightLong />
                          <FaLocationDot className="text-xl text-[#EC2719] rounded-full  px-1 " />
                          <h5> {destinationAirport}</h5>
                        </div>
                        <Divider />
                        <div className="py-4">
                          <h5>
                            Depart :
                            <span className="font-semibold">
                              {" "}
                              {res.departure_date}
                            </span>{" "}
                          </h5>
                          <h5>
                            Return :
                            <span className="font-semibold">
                              {" "}
                              {res.return_date}
                            </span>{" "}
                          </h5>
                        </div>
                        <Divider />
                        <div className="flex justify-between flex-wrap md:flex-nowrap items-center pt-4">
                          <button
                            className={`w-auto text-white text-[18px] rounded-[5px]  p-3 md:px-[15px] md:py-[1px] bg-[#EC2719] font-normal`}
                            style={{ padding: "10px" }}
                            type="button"
                            onClick={() => handlebooking(res)}
                          >
                            Book Now
                          </button>

                          <div className="flex flex-col items-end">
                            <h4 className="text-sm">Fares starting from</h4>
                            <div className="flex items-start">
                              <h3 className="font-semibold text-2xl">
                                ${res.fair}
                              </h3>
                              <h3 className="text-md">*</h3>
                            </div>
                            <h4 className="text-sm">Per person</h4>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                }
              )
            ) : loading === "Loading" ? (
              <div className="h-full w-full flex col-span-12   items-center justify-center">
                <Image
                  src={load}
                  width={100}
                  height={100}
                  alt="loader"
                  className="w-[150px] h-[150px]  rounded-full"
                />
              </div>
            ) : (
              <>
                <div className="h-full flex flex-col justify-center items-center col-span-12  w-full p-5">
                  <Image
                    src={NotfoundImage}
                    alt="404 Image"
                    width={10000}
                    height={30}
                    className=" h-[450px] w-[600px] rounded-[10px]"
                  />
                  <h1 className=" uppcase text-red-600 text-[25px] mt-3">
                    {" "}
                    Launching Soon!
                  </h1>

                  <h1 className=" text-[15px] text-center">
                    {" "}
                    We&apos;ll provide the most relevant search results.
                  </h1>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="text-gray-500 text-[13px] mb-4 mt-4 flex justify-center items-start gap-1">
        <span>*</span> Prices are displayed for reference, contact our team to
        get better prices via email or wire.
      </p>
    </>
  );
};

export default FlightListByDestination;

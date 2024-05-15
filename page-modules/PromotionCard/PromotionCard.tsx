"use client";
import Image from "next/image";
import React, { FC, useState } from "react";
import { Container, Dialog, Divider } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import PampangaCityImage from "../../public/Promotion/pampanga-spot-1.jpg";
import Place1 from "@/public/Login/place2.jpg";
import Place2 from "@/public/about/clark/1.jpg";
import Logo from "../../public/logo1.jpg";
import { FaArrowRightLong, FaLocationDot } from "react-icons/fa6";
import airports from "@nwpr/airport-codes";
import useBookingQuote from "@/store/BookingQuote";
import { formUrlQuery } from "@/utils/formUrlQuery";
import QuotePopup from "@/components/QuotePopup/QuotePopup";

interface PromotionCardProps {
  promotion: [];
}
interface DataType {
  date: string;
  desc: string;
  from_place: string;
  image_url: string;
  price: string;
  title: string;
  to_place: string;
}

const PromotionCard: FC<PromotionCardProps> = ({ promotion }) => {
  // Image Zoom Modal and seleted Image
  const [Imageopen, setImageOpen] = useState(false);
  const [privewImage, setPreivewImage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const quotepopup = searchParams.get("quotepopup");

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${month}-${day}-${year}`;
  };
  const { updateBookingStore } = useBookingQuote((state) => state);

  const handlebooking = (res: {
    date: string;
    desc: string;
    from_place: string;
    image_url: string;
    price: string;
    title: string;
    to_place: string;
  }) => {
    const DestinationAirport = airports.find(
      (airport) => airport.city === res.to_place
    )?.name;
    const DestinationAirportCode = airports.find(
      (airport) => airport.city === res.to_place
    )?.iata;
    updateBookingStore({
      departure: res.from_place,
      destination: `${DestinationAirport}[${DestinationAirportCode}]`,
      departure_date:
        res.date.length >= 11 ? formatDate(res.date.substring(0, 11)) : "",
      return_date:
        res.date.length >= 11 ? formatDate(res.date.substring(11)) : "",
      fair: res.price,
    });

    let newUrl;
    newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "quotepopup",
      value: "open",
    });

    router.push(newUrl, { scroll: false });
  };

  const firstSixPromotions = promotion?.slice(0, 6);

  return (
    <>
      {quotepopup == "open" ? <QuotePopup /> : null}

      <Container className="mb-10">
        <div className="mx-auto max-w-4xl text-center my-10">
          <h2 className="text-[32px] font-bold ">Newest List of Promotions</h2>

          <p className="mt-4 text-[#727272] text-[18px]">
            Get ready to soar with incredible flight deals and exclusive offers
            on domestic and international flights. Don`t miss out on our
            upcoming promotions that will make your travel dreams a reality.
          </p>
        </div>

        {promotion.length !== 0 ? (
          <>
            {firstSixPromotions?.map((item: any, index: number) => (
              <div
                className="shadow-custom p-2 border rounded-[5px] mt-[20px]"
                key={index}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 p-3">
                  {/* col 1  */}
                  <div className="md:w-auto h-auto relative">
                    <Image
                      src={item.image_url || "/white.jpg"}
                      alt="Promotion image"
                      width={1000}
                      height={100}
                      className="w-full !h-[440px] md:cursor-zoom-in rounded-[5px]"
                      onClick={() => {
                        setPreivewImage(item.image_url);
                        setImageOpen(true);
                      }}
                    />
                  </div>
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
                        fill
                        className="hidden lg:block h-full w-full "
                      />
                    </Dialog>
                  )}
                  {/* col 2  */}

                  <div className="relative">
                    <div className="px-6">
                      <div className="mb-3">
                        <h5 className="mr-2 text-customBlue text-[25px] font-semibold">
                          {item.title}
                        </h5>
                      </div>
                      <div className="flex justify-start items-center mb-3">
                        <FaLocationDot className=" text-[#EC2719] text-[18px] rounded-full px-1 " />
                        <h5 className="mr-2 text-customBlue text-[18px] font-semibold">
                          {
                            airports.find(
                              (airport) =>
                                airport.iata ===
                                item.from_place?.split("[")[1]?.replace("]", "")
                            )?.city
                          }
                        </h5>
                        <FaArrowRightLong className="text-[18px]" />
                        <FaLocationDot className="text-[18px] text-[#EC2719] rounded-full  px-1 " />
                        <h5 className="text-customBlue text-[18px] font-semibold">
                          {item.to_place === "Angeles City"
                            ? "Pampanga"
                            : item.to_place}
                        </h5>
                      </div>
                      <div className="flex gap-2 mb-2">
                        <h5>
                          Depart :
                          <span className="font-semibold text-customBlue">
                            {" "}
                            {item.date.length >= 11
                              ? formatDate(item.date.substring(0, 11))
                              : ""}
                          </span>{" "}
                        </h5>
                        <h5>
                          Return :
                          <span className="font-semibold text-customBlue">
                            {" "}
                            {item.date.length >= 11
                              ? formatDate(item.date.substring(11))
                              : ""}
                          </span>{" "}
                        </h5>
                      </div>
                      <Divider />
                      <div className="mt-3">
                        <p>{item.desc}</p>
                      </div>
                    </div>

                    <div className="mt-3 px-6 relative md:absolute bottom-0 w-full ">
                      <Divider />
                      <div className="flex justify-between items-end mt-3 ">
                        <div>
                          <h3 className="font-semibold text-2xl text-customBlue">
                            <p className="text-[16px] text-black p-0 m-0">
                              Fair
                            </p>
                            ${item.price}*
                          </h3>
                        </div>
                        <div>
                          {new Date(item.date.substring(0, 10)) < new Date() ? (
                            <></>
                          ) : (
                            <button
                              className={`rounded-[6px] font-normal	 font-main px-5 py-2 text-white bg-[#ec2719] hidden lg:block`}
                              type="button"
                              onClick={() => handlebooking(item)}
                            >
                              Book Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="shadow-custom p-2 border rounded-[5px] mt-[20px]">
              <div className="grid grid-cols-2 p-3">
                {/* col 1  */}
                <div className="md:w-auto h-auto relative">
                  <Image
                    src={PampangaCityImage}
                    alt="Promotion image"
                    width={1000}
                    height={100}
                    className="w-full h-[400px] rounded-[5px]"
                  />
                  <Image
                    src={Logo}
                    alt="Logo"
                    width={200}
                    height={55}
                    priority
                    quality={100}
                    className="absolute right-[10px] top-[10px] mix-blend-multiply"
                    // style={{ marginRight: "20px" }}
                  />
                </div>
                {/* col 2  */}

                <div className="relative">
                  <div className="px-6">
                    <div className="flex justify-start items-center mb-3">
                      <FaLocationDot className=" text-[#EC2719] text-[25px] rounded-full px-1 " />
                      <h5 className="mr-2 text-customBlue text-[25px] font-semibold">
                        New York
                      </h5>
                      <FaArrowRightLong className="text-[25px]" />
                      <FaLocationDot className="text-[25px] text-[#EC2719] rounded-full  px-1 " />
                      <h5 className="text-customBlue text-[25px] font-semibold">
                        Davao
                      </h5>
                    </div>
                    <Divider />
                    <div className="mt-3">
                      <p>
                        Philippine Airlines is the flag carrier of the
                        Philippines. Headquartered at the PNB Financial Center
                        in Pasay, the airline was founded in 1941 and is the
                        oldest operating commercial airline in Asia.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:w-auto h-auto relative mt-4">
                  <Image
                    src={Place1}
                    alt="Promotion image"
                    width={1000}
                    height={100}
                    className="w-full h-[400px] rounded-[5px]"
                  />
                  <Image
                    src={Logo}
                    alt="Logo"
                    width={200}
                    height={55}
                    priority
                    quality={100}
                    className="absolute right-[10px] top-[10px] mix-blend-multiply"
                    // style={{ marginRight: "20px" }}
                  />
                </div>
                {/* col 2  */}

                <div className="relative">
                  <div className="px-6">
                    <div className="flex justify-start items-center mb-3">
                      <FaLocationDot className=" text-[#EC2719] text-[25px] rounded-full px-1 " />
                      <h5 className="mr-2 text-customBlue text-[25px] font-semibold">
                        Chicago
                      </h5>
                      <FaArrowRightLong className="text-[25px]" />
                      <FaLocationDot className="text-[25px] text-[#EC2719] rounded-full  px-1 " />
                      <h5 className="text-customBlue text-[25px] font-semibold">
                        Manila
                      </h5>
                    </div>
                    <Divider />
                    <div className="mt-3">
                      <p>
                        The Philippines, officially the Republic of the
                        Philippines, is an archipelagic country in Southeast
                        Asia made up of over 7,100 islands in the shape of a
                        triangle between the South China Sea and the Pacific
                        Ocean.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:w-auto h-auto relative mt-4">
                  <Image
                    src={Place2}
                    alt="Promotion image"
                    width={1000}
                    height={100}
                    className="w-full h-[400px] rounded-[5px]"
                  />
                  <Image
                    src={Logo}
                    alt="Logo"
                    width={200}
                    height={55}
                    priority
                    quality={100}
                    className="absolute right-[10px] top-[10px] mix-blend-multiply"
                    // style={{ marginRight: "20px" }}
                  />
                </div>
                {/* col 2  */}

                <div className="relative">
                  <div className="px-6">
                    <div className="flex justify-start items-center mb-3">
                      <FaLocationDot className=" text-[#EC2719] text-[25px] rounded-full px-1 " />
                      <h5 className="mr-2 text-customBlue text-[25px] font-semibold">
                        Los Angeles
                      </h5>
                      <FaArrowRightLong className="text-[25px]" />
                      <FaLocationDot className="text-[25px] text-[#EC2719] rounded-full  px-1 " />
                      <h5 className="text-customBlue text-[25px] font-semibold">
                        Singapore
                      </h5>
                    </div>
                    <Divider />
                    <div className="mt-3">
                      <p>
                        Philippine country is bordered by the Philippine Sea to
                        the east, the Celebes Sea to the south, the Sulu Sea to
                        the southwest, and the South China Sea to the west and
                        north.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
      <p className="text-gray-500 text-[12px] mb-4 mt-4 flex justify-center items-start gap-1">
        <span>*</span> Prices are displayed for reference, contact our team to
        get better prices via email or wire.
      </p>
    </>
  );
};
export default PromotionCard;

import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import amex from "@/public/Footerlogo/amex.png";
import discover from "@/public/Footerlogo/discover.png";
import mastercard from "@/public/Footerlogo/mastercard.png";
import visa from "@/public/Footerlogo/visa.png";

import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import Brands from "./brands";
import ArrowButton from "../Button/arrowButton";
import { Container } from "@mui/material";
// import FooterMessage from "./FooterMessage";
import Logo from "@/public/logo1.jpg";
// import Logo from "@/public/logo/logoimage.jpg";
import GetPromotion from "@/action/Admin/Promotion/GetPromotion";

export interface FooterProps {}
async function PromotionImage() {
  try {
    const response = await GetPromotion("latest");
    return response;
  } catch (error) {
    console.error("Offer API request failed:", error);
    throw error;
  }
}

const Footer: FC<FooterProps> = async () => {
  const promotion = await PromotionImage();
  const logoimages = [
    {
      image: visa,
      name: "Visa payement",
    },
    {
      image: discover,
      name: "Discover payment",
    },
    {
      image: mastercard,
      name: "mastercard payment",
    },
    {
      image: amex,
      name: "amex payment",
    },
  ];
  return (
    <>
      {/* <FooterMessage /> */}
      <div className="border">
        <Container>
          <div className=" py-5  ">
            <div className="grid grid-cols-9  md:grid-cols-12 lg:grid-cols-9 gap-8 md:gap-10  w-full h-full p-5  ">
              <div className=" lg:col-span-3 md:col-span-6 col-span-12 flex flex-col items-start ">
                <div className="flex items-center justify-center">
                  <div className="w-[230px] h-[55px]">
                    <Image
                      src={Logo}
                      alt="Logo"
                      width={2000000}
                      height={55}
                      priority
                      quality={100}
                      className="p-0 mix-blend-multiply mb-4"
                      layout="responsive"
                    />
                  </div>
                  {/* <Image
                    src={Logo}
                    alt="Logo"
                    width={2000000}
                    height={55}
                    priority
                    quality={100}
                    className="mix-blend-multiply	w-[200px] h-auto"
                    style={{ marginRight: "20px" }}
                  /> */}
                </div>
                <div className="text-[15px] md:text-sm text-justify mt-[30px]  max-w-xs text-[black] pl-0 md:pl-4 my-3 break-words w-[90%]">
                  2PH Travel is a brand of 2VN Travel INC, major international
                  travel agency and services. Less restrictive fares available
                  at different rates. CST No. 2138727-70
                </div>
                <div className="mt-4 pl-0 md:pl-4 flex ">
                  {logoimages?.map((res, index) => (
                    <Image
                      key={index}
                      src={res.image}
                      alt={`2ph Travel ${res.name}`}
                      width={230}
                      height={20}
                      className="h-[30px] mr-3 w-[50px]"
                    />
                  ))}

                  {/* <Image
                    src={mastercard}
                    alt="mastercard payment"
                    width={230}
                    height={20}
                    className="h-[30px] w-[80px]"
                  />
                  <Image
                    src={discover}
                    alt="discover payment"
                    width={230}
                    height={20}
                    className="h-[30px] w-[80px]"
                  />
                  <Image
                    src={amex}
                    alt="amex payment"
                    width={230}
                    height={20}
                    className="h-[30px] w-[80px]"
                  /> */}
                </div>
              </div>
              <div className=" lg:col-span-2 md:col-span-6 col-span-9">
                <h2
                  style={{
                    fontSize: "16px",
                    letterSpacing: "1.5px",
                    fontWeight: "800",
                  }}
                >
                  About
                  {/* Company */}
                </h2>
                <div
                  style={{ borderBottom: "3px solid red", width: "30%" }}
                ></div>
                <h5
                  className="text-xs  py-2 w-fit cursor-pointer  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/about-us"}>About Us</Link>
                </h5>
                <h5
                  className="text-xs  py-2 cursor-pointer w-fit  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/terms-and-conditions"}>Terms & Condition</Link>
                  {/* <Link href={"/terms-and-conditions"}>Terms and Conditions</Link> */}
                </h5>
                <h5
                  className="text-xs w-fit py-2 cursor-pointer  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/refund-policy"}>Refund Policy</Link>
                  {/* <Link href={"/refund-policy"}>Refund Policy</Link> */}
                </h5>
                <h5
                  className="text-xs w-fit py-2 cursor-pointer  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/promotion"}>Promotion</Link>
                </h5>
                {/* <h5
                  className="text-xs mt-2 py-2 cursor-pointer  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/help-support/contact-us"}>Talk to Us</Link>
                 
                </h5> */}
                {/* <h5
                  className="text-xs  py-2 cursor-pointer  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/help-support/faq"}>Common Inquiry</Link>
                 
                </h5> */}
                {/* <h5
                  className="text-xs  py-2 cursor-pointer  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/help-support/travel-blog"}>Blog</Link>
                
                </h5>

                <h5
                  className="text-xs  py-2 cursor-pointer  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/promotion"}>Promotion</Link>
                </h5> */}
              </div>
              <div className=" lg:col-span-2 md:col-span-6 col-span-9 md:my-10 md:pl-4 lg:pl-0 lg:my-0">
                <h2
                  style={{
                    fontSize: "16px",
                    letterSpacing: "1.5px",
                    fontWeight: "800",
                  }}
                >
                  Customer services
                  {/* Info Links */}
                </h2>
                <div
                  style={{ borderBottom: "3px solid red", width: "30%" }}
                ></div>
                {/* <h5
                  className="text-xs mt-2 py-2 cursor-pointer  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/ourcompany"}>Our company details</Link>
                </h5> */}
                <h5
                  className="text-xs w-fit py-2 cursor-pointer  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/privacy-policy"}>Privacy Policy</Link>
                </h5>
                <h5
                  className="text-xs w-fit py-2 cursor-pointer  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/cookie-policy"}>Cookies Policy</Link>
                </h5>
                {/* <h5
                  className="text-xs  py-2 cursor-pointer  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/refund-policy"}>Refund policy</Link>
                 
                </h5> */}
                {/* <h5
                  className="text-xs  py-2 cursor-pointer  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/payment-guide"}>Payment Pattern</Link>
                 
                </h5> */}
                <h5
                  className="text-xs w-fit py-2 cursor-pointer leading-6  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/notSell-personal-Information"}>
                    Do Not Sell My
                    <br /> Personal Information
                  </Link>
                </h5>
                {/* <h5
                  className="text-xs  py-2 cursor-pointer leading-6  hover:text-customRed"
                  style={{ fontSize: "15px" }}
                >
                  <Link href={"/payment-guide"}>Payment Guidelines</Link>
                </h5> */}
              </div>
              <div className=" lg:col-span-2 md:col-span-6 col-span-9 md:my-10 lg:my-0">
                <h2
                  style={{
                    fontSize: "16px",
                    letterSpacing: "1.5px",
                    fontWeight: "800",
                  }}
                >
                  Get in touch
                  {/* Contact-us */}
                </h2>
                <div
                  style={{ borderBottom: "3px solid red", width: "30%" }}
                ></div>
                <div className="flex  gap-4  justify-start items-center mt-2 pt-2">
                  <FaLocationDot className="text-xl text-customRed rounded-full  " />
                  <h5 className=" flex-1" style={{ fontSize: "15px" }}>
                    9636 Garden Grove Blvd, Unit 22, Garden Grove, Ca 92844{" "}
                  </h5>{" "}
                </div>
                <div className="flex items-center  justify-start gap-4 py-2">
                  <MdEmail className="text-xl  text-customRed rounded-full " />
                  <a
                    href={`mailto:support@2phtravel.com`}
                    className=" hover:text-customRed flex-1 xl:w-[80px] "
                    style={{
                      fontSize: "15px",
                      overflowWrap: "break-word",
                      width: "61%",
                    }}
                  >
                    support@2phtravel.com
                  </a>
                </div>
                <div className="flex items-center justify-start py-2 gap-4">
                  <FaPhone className="text-xl text-customRed  rounded-full " />
                  <a
                    href={`tel: 855-767-7778}`}
                    className=" hover:text-customRed flex-1   "
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    855-767-7778
                  </a>
                </div>
              </div>
            </div>
            <Brands />
            <div className="flex flex-col justify-center items-center w-full h-full mt-3">
              <h2
                style={{
                  fontSize: "16px",
                  letterSpacing: "1.5px",
                  fontWeight: "800",
                }}
              >
                Follow Us
              </h2>
              <div className="flex justify-between items-start">
                <h5 className="text-xs  py-2 cursor-pointer">
                  <Link
                    href={
                      "https://www.facebook.com/profile.php?id=61556760246851"
                    }
                    target="_blank"
                  >
                    <FaFacebook className="text-4xl text-customRed  rounded-full mr-3 px-1  hover:px-0" />
                  </Link>
                </h5>
                <h5 className="text-xs  py-2 cursor-pointer">
                  <Link
                    href={"https://www.instagram.com/2vntravel/"}
                    target="_blank"
                  >
                    <AiFillInstagram className="text-4xl text-customRed  rounded-full mr-3 px-1  hover:px-0" />
                  </Link>
                </h5>
                <h5 className="text-xs  py-2 cursor-pointer">
                  <Link href={"https://twitter.com/2vntravel"} target="_blank">
                    <FaXTwitter className="text-4xl text-customRed rounded-full mr-3 px-1  hover:px-0" />
                  </Link>
                </h5>
                <h5 className="text-xs  py-2 cursor-pointer">
                  <Link
                    href={"https://www.youtube.com/@2vntravel"}
                    target="_blank"
                  >
                    <FaYoutube
                      // style={{ color: "red" }}
                      className="text-4xl text-customRed  rounded-full mr-3 px-1 hover:px-0"
                    />
                  </Link>
                </h5>
              </div>
              <div className="my-[3px]">
                <div className="px-3 text-xs md:text-sm text-[grey]">
                  @2024 2VN TRAVEL INC - DBA 2PH TRAVEL.
                </div>
              </div>
              <div className="px-3 text-xs md:text-sm text-[grey]">
                All rights reserved. CST 2138727-70
              </div>
            </div>
            <ArrowButton />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;

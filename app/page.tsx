import Header from "@/components/Header/Header";
import Image from "next/image";
import customerSupport from "@/public/customerservice.png";
import Destination01 from "@/public/Place/pampanga.png";
import Destination03 from "@/public/Place/davao.png";
import Destination04 from "@/public/Place/manila.png";
import Destination05 from "@/public/Place/cebu.png";
import InsideMapImage01 from "@/public/InsideMapImage01.png";
import InsideMapImage02 from "@/public/InsideMapImage02.png";
import InsideMapImage03 from "@/public/InsideMapImage03.png";
import InsideMapImage04 from "@/public/InsideMapImage04.png";
import ArrowUp from "@/public/ArrowUp.png";
import ArrowDown from "@/public/ArrowDown.png";
import { MdCall } from "react-icons/md";
import Styles from "./home.module.css";
import Link from "next/link";

import { FC } from "react";
import { cookies } from "next/headers";
import GetBanner from "@/action/Banner/banner";
import { PiNumberSquareOneFill } from "react-icons/pi";
import { PiNumberSquareTwoFill } from "react-icons/pi";
import { PiNumberSquareThreeFill } from "react-icons/pi";
import FlightFlyIconImage from "@/components/Images/FlightFlyIcon";
import Newsletter from "@/page-modules/Newsletter/newsletter";
import GetOffer from "@/action/Admin/Offer/getOffer";
import dynamic from "next/dynamic";
import LoadingFlightSearch from "@/page-modules/FlightSearch/LoadingFlightSearch";
import { Container } from "@mui/material";
import GetPromotion from "@/action/Admin/Promotion/GetPromotion";
import StaticImage01 from "@/public/topairlineDealsoffer/newplaceone.jpeg";
import StaticImage02 from "@/public/topairlineDealsoffer/newplacetwo.jpeg";
import StaticImage03 from "@/public/topairlineDealsoffer/newplacethree.jpeg";
import StaticImage04 from "@/public/topairlineDealsoffer/newplacefour.jpeg";
import StaticImage05 from "@/public/topairlineDealsoffer/newplacefive.jpeg";

export const metadata = {
  title: " 2PH Travel - Your best deal to the Philippines and beyond",
  description:
    " Search, compare, and book flights to your dream destinations with ease. Discover great deals, flexible options, and exceptional customer service.",
  authors: [
    {
      name: "2PH Travel",
    },
  ],

  keywords: [
    "cheap flight to Philippines",
    "flight to Philippines",
    "flights to Philippines",
    "cheap flights Philippines",
    "cheap flights to Philippines",
    "cheapest flight to Philippines",
    "cheap flights to the Philippines",
    "Philippines plane tickets",
    "plane ticket to Philippines",
    "plane tickets to Philippines",
  ],
};

const ImagePopup = dynamic(() => import("@/components/ImagePopup/ImagePopup"), {
  ssr: false,
  loading: () => <></>,
});
const Review = dynamic(
  () => import("@/page-modules/FlightSearch/ReviewSlider/Review"),
  {
    ssr: false,
    loading: () => <></>,
  }
);

const Footer = dynamic(() => import("@/components/Footer/Footer"), {
  ssr: false,
  loading: () => <></>,
});

const SliderComponent = dynamic(() => import("@/components/Slider/Slider"), {
  ssr: false,
  loading: () => <></>,
});
const HomeSliderComponent = dynamic(
  () => import("@/page-modules/Home/HomePageSlider"),
  {
    ssr: false,
    loading: () => <></>,
  }
);
const FlightSearchDemo = dynamic(
  () => import("@/page-modules/FlightSearch/FlightSearchdemo"),
  {
    ssr: false,
    loading: () => <LoadingFlightSearch />,
  }
);
export interface HomeProps {
  searchParams: {
    open: string;
  };
}

async function BannerApi() {
  const page = "Home";
  const section = "Carousel";

  try {
    const response = await GetBanner(page, section);
    return response;
  } catch (error) {
    console.error("Banner API request failed:", error);
    throw error;
  }
}
async function HeroSectionApi() {
  const page = "Home";
  const section = "Banner";

  try {
    const response = await GetBanner(page, section);
    return response;
  } catch (error) {
    console.error("Banner API request failed:", error);
    throw error;
  }
}
async function OfferApi() {
  try {
    const response = await GetOffer();
    return response;
  } catch (error) {
    console.error("Offer API request failed:", error);
    throw error;
  }
}
async function PromotionImage() {
  try {
    const response = await GetPromotion("latest");
    return response;
  } catch (error) {
    console.error("Offer API request failed:", error);
    throw error;
  }
}

const Home: FC<HomeProps> = async ({ searchParams }) => {
  const UserLoginId = cookies().get("user_id")?.value || "";
  const firstName = cookies().get("first_name")?.value || "";
  const accesstoken = cookies().get("access_token")?.value || "";
  const FulluserId = cookies().get("FulluserId")?.value || "";

  const banner = await BannerApi();
  const heroBanner = await HeroSectionApi();
  const promotion = await PromotionImage();
  const offer = await OfferApi();

  const Staticoffer = [
    {
      offer_image_url: StaticImage01,
    },
    {
      offer_image_url: StaticImage02,
    },
    {
      offer_image_url: StaticImage03,
    },
    {
      offer_image_url: StaticImage04,
    },
    {
      offer_image_url: StaticImage05,
    },
  ];

  return (
    <div>
      <ImagePopup promotion={promotion} />
      <Header
        isMobileView={searchParams.open}
        userId={UserLoginId}
        firstName={firstName}
        accesstoken={accesstoken}
      />
      <div
        className={` ${Styles.bgimagefull}`}
        style={{
          backgroundImage: heroBanner[0]?.image_url
            ? `url(${heroBanner[0].image_url})`
            : `url('/login/clip16.png' )`,
        }}
      >
        <div>
          <div className="flex h-full items-center justify-center">
            <div
              className={`flex items-center w-[900px] justify-center pt-5 md:pt-20 pb-0 md:pb-20 `}
            >
              <div className={Styles.flightbook}>
                <div
                  className={`${Styles.loginIcon} rounded-[20px] flex w-[171px] gap-[2px] text-white`}
                >
                  <FlightFlyIconImage />
                  Flights
                </div>
                <div
                  className="bg-white rounded-[20px] shadow-custom"
                  style={{
                    padding: "10px 15px",
                    marginTop: "20px",
                  }}
                >
                  <FlightSearchDemo
                    userid={UserLoginId}
                    accesstoken={accesstoken}
                    FulluserId={FulluserId}
                  />
                </div>

                <h3
                  className={`text-white mt-3 md:mt-0 text-[12px] md:text-[14px]`}
                  style={{ letterSpacing: "1px" }}
                >
                  Dates are for reference only. Displayed fares may not match
                  selected dates
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={Styles.gap}>
        <h1
          className={`${Styles.headingName} ${Styles.textcenter} uppercase px-4`}
        >
          {/* Explore attractive flight offers in the Philippines */}
          Explore amazing flight deals for the Philippines
        </h1>

        {offer?.length !== 0 ? (
          offer?.length >= 3 ? (
            <HomeSliderComponent>
              {offer?.map(
                (
                  res: {
                    offer_image_url: string;
                    offer_price: string;
                    city_name: string;
                  },
                  index: number
                ) => (
                  <Link
                    href={`/bookflights/${res.city_name}`}
                    key={index}
                    className="relative border-none transition ease-in-out delay-150 hover:translate-y-[-15px] p-5 "
                  >
                    <Image
                      src={res.offer_image_url}
                      alt={res.city_name}
                      width={350}
                      height={55}
                      priority
                      className=" w-[344px] h-[344px] cursor-pointer"
                      style={{ borderRadius: "10px 10px 0 0" }}
                    />
                    <div className="flex justify-center">
                      <div className="p-3 font-serif italic font-bold">
                        {res.city_name}
                      </div>
                    </div>
                    <div>
                      <div
                        className="p-3 font-bold bg-slate-100 text-center text-black"
                        style={{
                          borderRadius: "0px 0px 10px 10px",
                        }}
                      >
                        Starting From{" "}
                        <span className="text-red-600">
                          ${res.offer_price} *
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </HomeSliderComponent>
          ) : (
            <div className="p-5 slider-container">
              <Container>
                <div className="exploresilder flex items-center justify-center">
                  {offer?.map(
                    (
                      res: {
                        offer_image_url: string;
                        offer_price: string;
                        city_name: string;
                      },
                      index: number
                    ) => (
                      <Link
                        href={`/bookflights/${res.city_name}`}
                        key={index}
                        className="relative border-none transition ease-in-out delay-150 hover:translate-y-[-15px] p-5 "
                      >
                        <Image
                          src={res.offer_image_url}
                          alt={res.city_name}
                          width={350}
                          height={55}
                          priority
                          className=" w-[344px] h-[344px] cursor-pointer"
                          style={{ borderRadius: "10px 10px 0 0" }}
                        />
                        <div>
                          <div className="p-3 font-serif italic font-bold">
                            {res.city_name}
                          </div>
                        </div>
                        <div>
                          <div
                            className="p-3 w-[344px] font-bold bg-slate-100 text-center text-black"
                            style={{
                              borderRadius: "0px 0px 10px 10px",
                            }}
                          >
                            Starting From{" "}
                            <span className="text-red-600">
                              ${res.offer_price} *
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </Container>
            </div>
          )
        ) : (
          <HomeSliderComponent>
            {Staticoffer.map(
              (
                res: {
                  offer_image_url: any;
                },
                index: number
              ) => (
                <div
                  key={index}
                  className="relative border-none transition ease-in-out delay-150 hover:translate-y-[-15px] p-5 "
                >
                  <Image
                    src={res.offer_image_url}
                    width={350}
                    height={55}
                    priority
                    className=" w-[344px] h-[344px] cursor-pointer"
                    style={{ borderRadius: "10px" }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    alt={`2PH Travel Image ${index}`}
                  />
                </div>
              )
            )}
          </HomeSliderComponent>
        )}
      </div>

      <div className={` ${Styles.bgcolor} p-5 md:p-10`}>
        <div
          className={`${Styles.headingName} ${Styles.textcenter} uppercase mb-2`}
        >
          Discover How It Works!
        </div>

        <div className={`${Styles.textcenter} ${Styles.grey} text-[14px] px-8`}>
          {/* To ensure your data and sensitive details are protected, giving you
          peace of mind. */}
          We Protect Your Data and Sensitive Details.
        </div>
        <div className="flex justify-center items-center">
          <div className="flex w-full h-full items-center justify-center">
            <div className="flex justify-center items-center py-4 flex-wrap lg:flex-nowrap">
              <div
                className={`${Styles.discover} flex flex-col items-center justify-center md:w-1/2`}
              >
                <PiNumberSquareOneFill className="text-customBlue text-5xl" />
                <h2 className="text-center m-2 lg:w-3/4 md:1/2">
                  {/* Dial Up Discounts: Call for Cheap Flights Now! */}
                  Instant Discounts: Call Now for Affordable Flights!
                </h2>
                <div
                  className={`text-center m-2  text-[14px] lg:w-3/4 md:1/2 ${Styles.grey} mb-4`}
                >
                  {/* 2PH Travel boasts exclusive contracts with airlines and access
                  to unpublished fares that are not available online. */}
                  2PH Travel has special contracts with airlines and offers
                  exclusive fares not found online
                </div>
              </div>
              <div>
                <Image
                  src={ArrowUp}
                  alt="ArrowUp Image"
                  width={200}
                  height={10}
                  priority
                  className="hidden lg:block"
                />
              </div>
              <div
                className={`${Styles.discover} flex flex-col items-center justify-center md:w-1/2 `}
              >
                <PiNumberSquareTwoFill className="text-customBlue text-5xl" />

                <h2 className="text-center m-2 lg:w-3/4 md:1/2">
                  {/* Your Trip, Your Way: Request FREE Quotes! */}
                  Plan Your Trip Your Way: Get Free Quotes!
                </h2>
                <div
                  className={`text-center text-[14px] m-2 lg:w-3/4 md:1/2 ${Styles.grey}`}
                >
                  {/* Free trip planning and personalized itineraries, 24/7. Chat
                  with your personal travel agent for all your travel needs. */}
                  We offer free trip planning and personalized itineraries
                  around the clock. Chat with your dedicated travel agent for
                  all your travel needs.
                </div>
              </div>
              <div>
                <Image
                  src={ArrowDown}
                  alt="ArrowDown Image"
                  width={200}
                  height={10}
                  priority
                  className="hidden lg:block"
                />
              </div>
              <div
                className={`${Styles.discover} flex flex-col items-center justify-center md:w-1/2`}
              >
                <PiNumberSquareThreeFill className="text-customBlue text-5xl" />
                <h2 className="text-center m-2 lg:w-3/4 md:1/2">
                  Your Security, Our Priority: Pay with Confidence!
                </h2>
                <div
                  className={`text-center m-2 lg:w-3/4 md:1/2 ${Styles.grey} text-[14px]`}
                >
                  {/* Securely confirm your travel and book online with confidence.
                  At 2PH Travel, we provide a range of payment solutions */}
                  Securely confirm your travel plans at 2PH Travel. Choose from
                  a range of safe payment methods
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative  px-5 lg:px-20 py-10 bg-customBlue h-[30vh] md:h-[15vh]">
        <div
          className="absolute bottom-0 left-0 flex justify-around items-center flex-wrap md:flex-nowrap p-5 md:p-0 "
          style={{ width: "100%", height: "100%" }}
        >
          <Image
            src={customerSupport}
            alt="Customer Support Image"
            width={100}
            height={30}
            className={`abolsute bottom-0 left-0 md:block hidden`}
            style={{ width: "auto", height: "100%" }}
          />
          <div className="p-5 md:p-0">
            <h2 className=" text-white text-center md:text-start text-xs md:text-xl">
              {/* Want to get deals upto lower?  */}
              Call us for great deals and free quotes.
            </h2>
            <div className="text-[14px] text-white text-center md:text-start text-xs md:text-base">
              {/* Call our travel agents directly and get a free quotes */}
              Our travel agents make booking easy and affordable.
            </div>
          </div>
          <Link
            href={`tel:855-767-7778`}
            className={`${Styles.callbtn1} ${Styles.callbtn} rounded-[6px]`}
            style={{ fontSize: "14px" }}
          >
            <div className="flex items-center " style={{ fontWeight: "800" }}>
              <MdCall className="text-2xl" style={{ paddingRight: "5px" }} />
              Call Free: 855-767-7778
            </div>
          </Link>
        </div>
      </div>

      <div className="p-10">
        <SliderComponent banner={banner} />
      </div>

      <div
        className={`${Styles.bgimagefull} ${Styles.bgcolor} pb-10 ${Styles.bgimagemapfull}`}
      >
        <div className="flex justify-center items-start h-full w-full">
          <div>
            <div
              className="flex justify-center items-center  "
              style={{ width: "100%" }}
            >
              <Image
                src={InsideMapImage01}
                alt="Tourister Image 1"
                width={150}
                height={20}
                className={`${Styles.Insideimages} mx-0 md:mx-20`}
              />
              <Image
                src={InsideMapImage02}
                alt="Tourister Image 2"
                width={150}
                height={20}
                className={`${Styles.Insideimages} mx-0 md:mx-20`}
              />
              <Image
                src={InsideMapImage03}
                alt="Tourister Image 3"
                width={150}
                height={20}
                className={`${Styles.Insideimages} mx-0 md:mx-20`}
              />
            </div>
            <div
              className={`${Styles.bluetextcolor} font-bold text-center text-4xl my-5`}
            >
              {/* What makes us your best bet? */}
              {`Why We're Your Best Choice?`}
            </div>
            <div className="text-center text-[14px] px-2">
              {/* We always provide optimal customer booking support services in
              terms of time and price! */}
              We offer top-notch customer support for your bookings, ensuring
              the best in time and price!
            </div>

            <div className="flex justify-start items-center">
              <div className="hidden lg:flex items-center justify-start ">
                <Image
                  src={InsideMapImage04}
                  alt="Clock Image"
                  width={120}
                  height={30}
                  priority
                  className="hidden lg:block"
                />
              </div>
              <div className="flex items-center justify-center my-5 w-full lg:w-[80%]">
                <div className="flex flex-col items-center justify-center">
                  <div
                    className={`${Styles.bluetextcolor} font-bold my-5 text-center`}
                  >
                    24/7 Customer Service
                  </div>
                  <div
                    className="text-center text-[14px]"
                    style={{ width: "50%", fontWeight: "600" }}
                  >
                    {/* Our team of skilled travel agents is always ready to assist
                    you anytime, day or night */}
                    Our skilled travel agents are here to help you 24/7, no
                    matter the time.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex items-center justify-between flex-wrap md:flex-nowrap flex-col md:flex-row"
              style={{ width: "100%" }}
            >
              <div className="flex flex-col items-center justify-center">
                <div
                  className={`${Styles.bluetextcolor} my-5 text-center font-bold`}
                >
                  {/* Low Fares Guaranteed */}
                  We Guarantee Low Fares
                </div>
                <div
                  className="text-center text-[14px]"
                  style={{ width: "50%", fontWeight: "600" }}
                >
                  {/* Exclusive phone-only discounts on airfares with partner
                  airlines cannot be found online */}
                  {`Enjoy exclusive discounts on airfares with partner airlines
                  that you won't find online`}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div
                  className={`${Styles.bluetextcolor} text-center my-5 font-bold`}
                >
                  {/* Secured and Trusted */}
                  Secure and Reliable
                </div>
                <div
                  className="text-center text-[14px]"
                  style={{ width: "50%", fontWeight: "600" }}
                >
                  {/* Ensuring your privacy and data security is always our top
                  priority, and we are endorsed by ASTA, CST, BBB, ARC, and
                  IATA. */}
                  We prioritize your privacy and data security, backed by
                  endorsements from ASTA, CST, BBB, ARC, and IATA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-10">
        <div className={`${Styles.headingName} ${Styles.textcenter} mb-2`}>
          Discover Your Dream Destination
        </div>
        <div
          className={`text-center text-[grey] px-5 text-[14px]`}
          style={{ fontWeight: "600" }}
        >
          Embark on an unforgettable journey with us as we set sail towards our
          destination
        </div>
        <div className="container mx-auto ">
          <div className="items-center gap-5 mt-6 grid grid-cols-12">
            <Link
              href="/bookflights/Davao"
              className="xl:col-span-3 lg:col-span-3 flex md:col-span-6 gap-[20px] col-span-12 items-center justify-center"
            >
              <Image
                src={Destination03}
                alt="Destination Image 1"
                width={400}
                height={55}
                className="transition ease-in-out delay-150 hover:translate-y-[-15px] items-centers rounded-[10px] w-[300px] h-[300px] cursor-pointer  "
              />
            </Link>
            <Link
              href="/bookflights/Manila"
              className="xl:col-span-3 lg:col-span-3 flex md:col-span-6 gap-[20px] items-center col-span-12 justify-center"
            >
              <Image
                src={Destination04}
                alt="Destination Image 2"
                width={400}
                height={55}
                className="transition ease-in-out delay-150 hover:translate-y-[-15px] rounded-[10px] w-[300px] h-[300px] cursor-pointer "
              />
            </Link>
            <Link
              href="/bookflights/Cebu"
              className="xl:col-span-3 lg:col-span-3 md:col-span-6 flex items-center gap-[20px] col-span-12 justify-center"
            >
              <Image
                src={Destination05}
                alt="Destination Image 3"
                width={400}
                height={55}
                className="transition ease-in-out delay-150 hover:translate-y-[-15px] rounded-[10px] w-[300px] h-[300px] cursor-pointer "
              />
            </Link>
            <Link
              href="/bookflights/Angeles%20City"
              className="xl:col-span-3 lg:col-span-3 items-center flex md:col-span-6 gap-[20px] col-span-12 justify-center"
            >
              <Image
                src={Destination01}
                alt="Destination Image 4"
                width={400}
                height={55}
                className="transition ease-in-out delay-150 hover:translate-y-[-15px] rounded-[10px] w-[300px] h-[300px] cursor-pointer  "
              />
            </Link>
          </div>
        </div>
      </div>

      <div
        // className={`${Styles.backgroundimageremember} ${Styles.bgimagefull} p-3`}
        className="bg-customBlue p-3"
      >
        <div className="flex flex-col justify-center items-center p-0 md:p-10">
          <div className="text-white font-bold text-center text-md md:text-4xl my-5">
            Are You Ready To Travel? Remember Us !!{" "}
          </div>
          <div className=" text-white text-center max-w-2xl  text-xs md:text-base">
            {`We're committed to making your travel experience seamless and unforgettable. So, buckle up and let's embark on this journey together. Don't miss out on exclusive offers, travel deals, and updates by subscribing to our newsletter on our website. Follow us on social media for daily travel inspiration, tips, and giveaways.`}
          </div>
          <Newsletter />
        </div>
      </div>
      <div className="bg-[#f7f8fc]">
        <div className="container mx-auto ">
          <div className={` flex justify-around items-center flex-wrap`}>
            <div className="flex flex-col items-center justify-center lg:flex-1 flex-wrap">
              <div
                className="text-3xl md:text-3xl  lg:text-4xl my-5 font-bold flex flex-row lg:flex-col justify-start items-start"
                style={{ width: "81%" }}
              >
                What people say
                {/* <br /> */}
                <p
                  style={{ color: " rgb(187, 20, 15)" }}
                  className="pl-2 lg:pl-0"
                >
                  {" "}
                  about us.
                </p>
              </div>
              <div
                className="text-lg md:text-lg lg:text-xl my-5 md:my-0 text-[14px]"
                style={{ color: "#666666", width: "80%" }}
              >
                Our clients share countless smiles with us due to our
                exceptional services, and we cherish each one.
              </div>
            </div>

            <Review />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Home;

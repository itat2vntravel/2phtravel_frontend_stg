import Header from "@/components/Header/Header";
import Image from "next/image";


import Styles from "./home.module.css";
import Link from "next/link";

import { FC } from "react";
import { cookies } from "next/headers";
import GetBanner from "@/action/Banner/banner";

import FlightFlyIconImage from "@/components/Images/FlightFlyIcon";

import GetOffer from "@/action/Admin/Offer/getOffer";
import dynamic from "next/dynamic";
import LoadingFlightSearch from "@/page-modules/FlightSearch/LoadingFlightSearch";

import GetPromotion from "@/action/Admin/Promotion/GetPromotion";

import HomeTitle from "@/components/Title/HomeTitle";

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
const FlightSearchDemo = dynamic(
  () => import("@/page-modules/FlightSearch/FlightSearchdemo"),
  {
    ssr: false,
    loading: () => <LoadingFlightSearch />,
  }
);
const AmazingDeals = dynamic(
  () => import("@/app/homePage/AmazingDeals"),
  {
    ssr: false,
    loading: () => <></>,
  }
);
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
const Discover = dynamic(
  () => import("@/app/homePage/Discover"),
  {
    ssr: false,
    loading: () => <></>,
  }
);

const TravelAgents = dynamic(
  () => import("@/app/homePage/TravelAgents"),
  {
    ssr: false,
    loading: () => <></>,
  }
);
const ExploreComp = dynamic(
  () => import("@/app/homePage/ExploreComp"),
  {
    ssr: false,
    loading: () => <></>,
  }
)
const DreamDestination = dynamic(
  () => import("@/app/homePage/DreamDestination"),
  {
    ssr: false,
    loading: () => <></>,
  }
)

const Newsletter = dynamic(
  () => import("@/page-modules/Newsletter/newsletter"),
  {
    ssr: false,
    loading: () => <></>,
  }
)
const PeopleReview = dynamic(
  () => import("@/app/homePage/PeopleReview"),
  {
    ssr: false,
    loading: () => <></>,
  }
);

const Footer = dynamic(() => import("@/components/Footer/Footer"), {
  ssr: false,
  loading: () => <></>,
});

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
      <AmazingDeals offer={offer}/>
      <Discover />
      <TravelAgents />

      <div className="p-10">
        <SliderComponent banner={banner} />
      </div>

      <ExploreComp />
      <DreamDestination />
      <Newsletter />

      <PeopleReview />

      <Footer />
    </div>
  );
};
export default Home;

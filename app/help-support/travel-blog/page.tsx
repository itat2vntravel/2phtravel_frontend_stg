import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import { cookies } from "next/headers";
import Styles from "@/page-modules/TermsandConditions/terms.module.css";
import Image from "next/image";
import TravelPhilipines from "@/public/Login/place1.jpg";
import ManilaPhilipines from "@/public/about/download.jpg";
import CebuPhilipines from "@/public/about/cebu.jpg";
import ClarkPhilipines from "@/public/about/clark.jpg";
import DaveoPhilipines from "@/public/about/davao.jpg";
import FoodPhilipines from "@/public/about/food.jpg";
import CulturePhilipines from "@/public/about/culture.jpg";

import { Card } from "@mui/material";
import TravelBlogButton from "@/page-modules/TravelBlog/TravelBlog";

export interface PrivacyInterface {
  searchParams: {
    open: string;
  };
}
export const metadata = {
  title: "2PH Travel |Travel Blog - Tips, Story for your Destination",
  description:
    "Embark on a journey of discovery with our travel blog, where we share insider tips, captivating destinations, and unforgettable adventures to inspire your wanderlust.",
  authors: [
    {
      name: "2PH Travel",
    },
  ],

  keywords: [
    "philippines airlines flight attendant",
    "us to philippines flight time",
    "philippine airlines stewardess",
    "filipino flight attendant",
    "filipino flight attendants",
  ],
};

const TravelBlog: React.FC<PrivacyInterface> = ({ searchParams }) => {
  const UserLoginId = cookies().get("user_id")?.value || "";
  const firstName = cookies().get("first_name")?.value || "";
  const accesstoken = cookies().get("access_token")?.value || "";

  return (
    <>
      <Header
        isMobileView={searchParams.open}
        userId={UserLoginId}
        firstName={firstName}
        accesstoken={accesstoken}
      />

      <div
        className={` h-[50vh] lg:bg-cover bg-cover bg-center bg-no-repeat relative `}
      >
        <div className="bg-[url('/about/Philippines.webp')] top-0 h-[50vh] absolute bg-cover bg-center bg-no-repeat opacity-[0.5] z-[-1] w-full"></div>
        <div className="flex w-full h-full md:items-center justify-start ml-0 pt-3 md:pt-0 pl-10 md:pl-56">
          <div className="z-9999">
            <p className="mb-1 text-sm text-customRed">Travel Blog</p>
            <p className="text-black font-serif lg:text-3xl text-[24px] max-w-[36rem] md:max-w-[21rem] lg:max-w-[29rem] font-semibold md:font-medium">
              Explore the Philippines&rsquo;<br></br> unique culture, stunning
              scenery, and rich tradition through our travel blog.
            </p>
          </div>
        </div>
      </div>

      <div className={`container mx-auto ${Styles.paddingcontainer}`}>
        <div className="flex justify-center mt-5 mb-5 flex-col items-center font-serif">
          <h1 className="text-2xl ">Explore Philipines</h1>
          <p className="text-sm text-customBlue">
            Learn more about Culture, Stunning Scenery
          </p>
        </div>
        <div className="grid grid-cols-12 gap-3  ">
          <div className="lg:col-span-8 col-span-12">
            <div className="w-[100%]  flex justify-center mb-4">
              <Card
                className={`${Styles.cardShadow} p-5 mx-5 flex flex-col items-center`}
              >
                <Image
                  src={TravelPhilipines}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[850px] h-[300px]"
                />

                <h2 className="mt-4">
                  Best Place to Visit Around the Philipines
                </h2>
                <p className="text-sm mt-2">
                  You’ll find the Philippines in Southeast Asia. This
                  archipelago of more than 7,000 islands and islets near the
                  equator is south of Taiwan and about 500 miles east of
                  Vietnam. Only about 2,000 of the islands are inhabited. The
                  Philippines lie in the western Pacific Ocean on one side
                  (east), and ....
                </p>
                <TravelBlogButton Titletext="Philippines" />
              </Card>
            </div>
            <div className="md:flex block">
              <div className="md:w-[50%] w-[100%] mt-4">
                <Card
                  className={`${Styles.cardShadow} p-5 mx-5 flex flex-col items-center`}
                >
                  <h1 className="text-customBlue font-serif">Manila</h1>
                  <Image
                    src={ManilaPhilipines}
                    alt="travelPhilipines"
                    width={600}
                    height={300}
                    className="w-[330px] h-[250px]"
                  />

                  <h2 className="mt-4">Popular Place in Manila</h2>
                  <p className="text-sm mt-2 h-[60px]">
                    Manila, the capital of the Philippines, is a densely
                    populated bayside city on the island of....
                  </p>
                  <TravelBlogButton Titletext="Manila" />
                </Card>
              </div>
              <div className="md:w-[50%] w-[100%] mt-4">
                <Card
                  className={`${Styles.cardShadow} p-5 mx-5 flex flex-col items-center`}
                >
                  <h1 className="text-customBlue font-serif">Cebu</h1>
                  <Image
                    src={CebuPhilipines}
                    alt="travelPhilipines"
                    width={600}
                    height={300}
                    className="w-[330px] h-[250px]"
                  />

                  <h2 className="mt-4">Attractive Place in Cebu</h2>
                  <p className="text-sm mt-2 h-[60px]">
                    Cebu is a province of the Philippines, in the country’s
                    Central Visayas region, comprising Cebu Island and more
                    than....
                  </p>
                  <TravelBlogButton Titletext="Cebu" />
                </Card>
              </div>
            </div>
            <div className="md:flex block mt-4 mb-6 ">
              <div className="md:w-[50%] w-[100%] mt-4">
                <Card
                  className={`${Styles.cardShadow} p-5 mx-5 flex flex-col items-center`}
                >
                  <h1 className="text-customBlue font-serif">Clark</h1>
                  <Image
                    src={ClarkPhilipines}
                    alt="travelPhilipines"
                    width={600}
                    height={300}
                    className="w-[330px] h-[250px]"
                  />

                  <h2 className="mt-4">Attractions in Clark</h2>
                  <p className="text-sm mt-2 h-[60px]">
                    It is best known for its Clark Freeport, home for leisure
                    and entertainment, which spans from....
                  </p>
                  <TravelBlogButton Titletext="Clark" />
                </Card>
              </div>
              <div className="md:w-[50%] w-[100%] mt-4">
                <Card
                  className={`${Styles.cardShadow} p-5 mx-5 flex flex-col items-center`}
                >
                  <h1 className="text-customBlue font-serif">Davao</h1>
                  <Image
                    src={DaveoPhilipines}
                    alt="travelPhilipines"
                    width={600}
                    height={300}
                    className="w-[330px] h-[250px]"
                  />

                  <h2 className="mt-4">Tourist Spots in Davao</h2>
                  <p className="text-sm mt-2 h-[60px]">
                    Davao City, Philippines has many tourist spots, including
                    parks, museums, shopping malls, and....
                  </p>
                  <TravelBlogButton Titletext="Davao" />
                </Card>
              </div>
            </div>
          </div>
          <div className="col-span-4 lg:block hidden">
            MOST POPULAR
            <div style={{ borderBottom: "3px solid red", width: "20%" }}></div>
            <div className="w-[60%] mt-5 ">
              <Card
                className={`${Styles.cardShadow} p-5 flex flex-col items-center`}
              >
                <Image
                  src={FoodPhilipines}
                  alt="travelPhilipines"
                  width={150}
                  height={60}
                  className="w-[100%] h-[100px]"
                />

                <h2 className="mt-2 text-customRed">Food Blog</h2>
                <p className="text-sm mt-2">
                  Adobo is one of the most popular Filipino dishes and is
                  considered....
                </p>
                <TravelBlogButton Titletext="food" />
              </Card>
            </div>
            <div className="w-[60%] mt-5 ">
              <Card
                className={`${Styles.cardShadow} p-5 flex flex-col items-center`}
              >
                <Image
                  src={CulturePhilipines}
                  alt="travelPhilipines"
                  width={150}
                  height={70}
                  className="w-[100%] h-[100px]"
                />

                <h2 className="mt-2 text-customRed">Culture of Philipines</h2>
                <p className="text-sm mt-2">
                  Culture is a blend of Filipino and Spanish traditions, with
                  influences....
                </p>
                <TravelBlogButton Titletext="culture" />
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TravelBlog;

import React from "react";
import Header from "@/components/Header/Header";
import { cookies } from "next/headers";
import { FC } from "react";
import Footer from "@/components/Footer/Footer";
import PromotionCard from "@/page-modules/PromotionCard/PromotionCard";
import GetPromotion from "@/action/Admin/Promotion/GetPromotion";

async function PromotionApi() {
  try {
    const response = await GetPromotion("all");
    return response;
  } catch (error) {
    console.error("Banner search failed:", error);

    throw error;
  }
}

export interface HomeProps {
  searchParams: {
    open: string;
  };
}
export const metadata = {
  title: "2PH Travel - Discover Exclusive Deals on Flights",
  description:
    "Explore 2PH Travel's special offers and promotions to find exclusive deals on flights to your favorite destinations.",
  authors: [
    {
      name: "2PH Travel",
    },
  ],
  keywords: [
    "Philippines flight cost",
    "Philippine Airlines flight attendant",
    "Philippine Airlines flight attendants",
    "flight to Philippines time",
    "how long is the flight to Philippines",
    "how long is a flight to Philippines",
  ],
};

const Promotion: FC<HomeProps> = async ({ searchParams }) => {
  const UserLoginId = cookies().get("user_id")?.value || "";
  const firstName = cookies().get("first_name")?.value || "";
  const accesstoken = cookies().get("access_token")?.value || "";
  const promotion = await PromotionApi();
  return (
    <>
      <Header
        isMobileView={searchParams.open}
        userId={UserLoginId}
        firstName={firstName}
        accesstoken={accesstoken}
      />

      <div className="h-[350px] bg-cover bg-center relative bg-[url('/destinationimages/promotion.png')]">
        <div className="flex h-full items-center justify-center">
          <h1 className="text-4xl text-white">Promotion</h1>
        </div>
      </div>
      <PromotionCard promotion={promotion} />

      <Footer />
    </>
  );
};

export default Promotion;

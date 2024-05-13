import AdminHeader from "@/components/AdminComponents/Header/AdminHeader";
import AdminSidebar from "@/components/AdminComponents/Sidebar/AdminSidebar";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import GetPromotion from "@/action/Admin/Promotion/GetPromotion";
import PromotionPage from "@/page-modules/AdminPages/Promotion/Promotion";
import GetCityName from "@/action/Admin/City/DestinationCity";

async function PromotionApi() {
  try {
    const response = await GetPromotion("all");
    return response;
  } catch (error) {
    console.error("Banner search failed:", error);

    throw error;
  }
}

async function DestinationCIty() {
  try {
    const response = await GetCityName();
    return response;
  } catch (error) {
    console.error("City search failed:", error);

    throw error;
  }
}

export interface BannerSearchProps {
  searchParams: {
    open: string;
  };
}
const Promotion: React.FC<BannerSearchProps> = async ({ searchParams }) => {
  const first_name = cookies().get("admin_first_name")?.value || "";
  const last_name = cookies().get("admin_last_name")?.value || "";

  if (!first_name) {
    return redirect("/");
  }
  const data = await PromotionApi();
  const city = await DestinationCIty();
  return (
    <div className="w-full">
      <AdminHeader
        first_name={first_name}
        last_name={last_name}
        isMobileView={searchParams.open}
      />
      <div className="grid grid-cols-12">
        <div className="xl:col-span-2 lg:col-span-3 col-span-3   ">
          <AdminSidebar />
        </div>
        <div className=" xl:col-span-10 lg:col-span-9 col-span-12 ">
          <div className="bg-gray-100 ">
            <PromotionPage promotiondata={data} cityname={city} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;

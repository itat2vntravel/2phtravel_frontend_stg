import AdminHeader from "@/components/AdminComponents/Header/AdminHeader";
import AdminSidebar from "@/components/AdminComponents/Sidebar/AdminSidebar";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import AdminHomeOffer from "@/page-modules/AdminPages/AdminHomeOffer/AdminHomeOffer";
import GetOffer from "@/action/Admin/Offer/getOffer";
import GetCityName from "@/action/Admin/City/DestinationCity";

async function OfferApi() {
  try {
    const response = await GetOffer();
    return response;
  } catch (error) {
    console.error("Offer search failed:", error);

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

export interface OfferSearchProps {
  searchParams: {
    open: string;
  };
}
const HomeOffer: React.FC<OfferSearchProps> = async ({ searchParams }) => {
  const first_name = cookies().get("admin_first_name")?.value || "";
  const last_name = cookies().get("admin_last_name")?.value || "";

  if (!first_name) {
    return redirect("/");
  }
  const data = await OfferApi();
  const Cities = await DestinationCIty();
  const AllCities = Cities.map((res: { city_name: any }) => res.city_name);
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
            <AdminHomeOffer offerdata={data} AllCities={AllCities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOffer;

import AdminHeader from "@/components/AdminComponents/Header/AdminHeader";
import AdminSidebar from "@/components/AdminComponents/Sidebar/AdminSidebar";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import DestinationDeals from "@/page-modules/AdminPages/DestinationDeals/DestinationDeals";
import GetAllDestinationDeals from "@/action/Admin/Deals/GetAllDestinationDeals";
import GetCityName from "@/action/Admin/City/DestinationCity";

export interface FlightDealsSearchProps {
  searchParams: {
    open: string;
  };
}

async function FightDealsApi() {
  try {
    const response = await GetAllDestinationDeals();
    return response;
  } catch (error) {
    console.error("Flight search failed:", error);

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

const FlightDeals: React.FC<FlightDealsSearchProps> = async ({
  searchParams,
}) => {
  const first_name = cookies().get("admin_first_name")?.value || "";
  const last_name = cookies().get("admin_last_name")?.value || "";

  if (!first_name) {
    return redirect("/");
  }
  const data = await FightDealsApi();
  const city = await DestinationCIty();
  return (
    <div className="">
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
            <DestinationDeals flightdeals={data} cityname={city} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDeals;

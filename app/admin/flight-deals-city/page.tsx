import AdminHeader from "@/components/AdminComponents/Header/AdminHeader";
import AdminSidebar from "@/components/AdminComponents/Sidebar/AdminSidebar";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import GetCityName from "@/action/Admin/City/DestinationCity";
import DestinationCityDeals from "@/page-modules/AdminPages/DestinationCity/DestinationCity";

export interface FlightDealsSearchProps {
  searchParams: {
    open: string;
  };
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

const DestinationCity: React.FC<FlightDealsSearchProps> = async ({
  searchParams,
}) => {
  const first_name = cookies().get("admin_first_name")?.value || "";
  const last_name = cookies().get("admin_last_name")?.value || "";

  if (!first_name) {
    return redirect("/");
  }
  const destinationdetails = await DestinationCIty();
  const city = destinationdetails.sort(
    (a: { city_id: number }, b: { city_id: number }) => b.city_id - a.city_id
  );
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
            <DestinationCityDeals cityname={city} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCity;

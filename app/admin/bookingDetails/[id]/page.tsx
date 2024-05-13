import AdminHeader from "@/components/AdminComponents/Header/AdminHeader";
import AdminSidebar from "@/components/AdminComponents/Sidebar/AdminSidebar";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import GetBookingHistroy from "@/action/booknow/GetBookingnow";
import GetSearchResult from "@/action/booknow/bookingsearch";
import BookingDetails from "@/page-modules/AdminPages/AdminDashboard/BookingDetails";

export interface DashboardSearchProps {
  searchParams: {
    open: string;
    page: number;
    q: string;
  };
}

async function GetBookingData(page: number) {
  try {
    const response = await GetBookingHistroy(page);
    return response;
  } catch (error) {
    console.error("Booking search failed:", error);

    throw error;
  }
}
async function GetBookingSearchHistroy(q: string, page: number) {
  try {
    const response = await GetSearchResult(q, page);
    return response;
  } catch (error) {
    console.error("Booking search failed:", error);

    throw error;
  }
}

const Dashboard: React.FC<DashboardSearchProps> = async ({ searchParams }) => {
  const first_name = cookies().get("admin_first_name")?.value || "";
  const last_name = cookies().get("admin_last_name")?.value || "";

  if (!first_name) {
    return redirect("/");
  }
  let data;
  if (searchParams.q) {
    data = await GetBookingSearchHistroy(searchParams.q, searchParams.page);
  } else {
    data = await GetBookingData(searchParams.page);
  }
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
            <BookingDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

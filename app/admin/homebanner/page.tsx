import AdminHeader from "@/components/AdminComponents/Header/AdminHeader";
import AdminSidebar from "@/components/AdminComponents/Sidebar/AdminSidebar";
import AdminBanner from "@/page-modules/AdminPages/AdminBanner/AdminBanner";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import GetHomeBanner from "@/action/Banner/getHomeBanner";

async function BannerApi() {
  const page = "Home";
  try {
    const response = await GetHomeBanner(page);
    return response;
  } catch (error) {
    console.error("Banner search failed:", error);

    throw error;
  }
}

export interface BannerSearchProps {
  searchParams: {
    open: string;
  };
}
const Bannner: React.FC<BannerSearchProps> = async ({ searchParams }) => {
  const first_name = cookies().get("admin_first_name")?.value || "";
  const last_name = cookies().get("admin_last_name")?.value || "";

  if (!first_name) {
    return redirect("/");
  }
  const data = await BannerApi();
  return (
    <div className="w-full">
      <AdminHeader
        first_name={first_name}
        last_name={last_name}
        isMobileView={searchParams.open}
      />
      <div className="grid grid-cols-12 ">
        <div className=" xl:col-span-2 lg:col-span-3 col-span-3    ">
          <AdminSidebar />
        </div>
        <div className="xl:col-span-10 lg:col-span-9 col-span-12">
          <div className="bg-gray-100 lg:h-full   ">
            <AdminBanner bannerdata={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bannner;

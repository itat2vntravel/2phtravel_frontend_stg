import AdminHeader from "@/components/AdminComponents/Header/AdminHeader";
import AdminSidebar from "@/components/AdminComponents/Sidebar/AdminSidebar";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import GetAllBanner from "@/action/Banner/AllBanner";
import HeroSection from "@/page-modules/AdminPages/Hero-section/herosection";

async function BannerApi() {
  try {
    const response = await GetAllBanner();
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
const HeroSectionPage: React.FC<BannerSearchProps> = async ({
  searchParams,
}) => {
  const first_name = cookies().get("admin_first_name")?.value || "";
  const last_name = cookies().get("admin_last_name")?.value || "";

  if (!first_name) {
    return redirect("/");
  }
  const Alldata = await BannerApi();
  const Filtereddata = Alldata?.filter((res: any) => res.page === "airline");
  const data = Filtereddata?.sort(
    (a: { banner_id: number }, b: { banner_id: number }) =>
      a.banner_id - b.banner_id
  );

  return (
    <div className="w-full">
      <AdminHeader
        first_name={first_name}
        last_name={last_name}
        isMobileView={searchParams.open}
      />
      <div className="grid grid-cols-12 ">
        <div className="xl:col-span-2 lg:col-span-3 col-span-3   ">
          <AdminSidebar />
        </div>
        <div className=" xl:col-span-10 lg:col-span-9 col-span-12 ">
          <div className="bg-gray-100 ">
            <HeroSection bannerdata={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionPage;

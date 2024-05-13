import AdminHeader from "@/components/AdminComponents/Header/AdminHeader";
import AdminSidebar from "@/components/AdminComponents/Sidebar/AdminSidebar";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
import GetNewsletterDetails from "@/action/Admin/Newsletter/GetNewsletterDeatils";
import SubscribedDetails from "@/page-modules/AdminPages/newsletter-user/Subscribed";

export interface DashboardSearchProps {
  searchParams: {
    open: string;
    page: string;
  };
}

const NewsLetterUserDetails: React.FC<DashboardSearchProps> = async ({
  searchParams,
}) => {
  const first_name = cookies().get("admin_first_name")?.value || "";
  const last_name = cookies().get("admin_last_name")?.value || "";

  if (!first_name) {
    return redirect("/");
  }

  const userdata = await GetNewsletterDetails(searchParams.page);

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
            <SubscribedDetails userdata={userdata} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterUserDetails;

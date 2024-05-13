import Footer from "@/components/Footer/Footer";
import UpdatepasswordSection from "@/components/Forgetpassword/Updatepassword";
import Header from "@/components/Header/Header";
import Tab from "@/components/Tab/Tab";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { FC } from "react";

export interface ProfileProps {
  searchParams: {
    open: string;
  };
}
export const metadata = {
  title: "2PH Travel - Update Your Account Password",
  description:
    "Change your password securely on 2PH Travel to ensure the safety of your account.",
  authors: [
    {
      name: "2PH Travel",
    },
  ],

  keywords: [
    "change password",
    "update password",
    "password security",
    "account security",
    "password change",
  ],
};

const UserManagePage: FC<ProfileProps> = ({ searchParams }) => {
  const FulluserId = cookies().get("FulluserId")?.value || "";

  if (!FulluserId) {
    return redirect("/");
  }
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
      <div className="md:p-5 md:m-5 ">
        <Tab>
          <div className=" bg-white shadow-md rounded-lg overflow-hidden">
            <div className=" bg-[url(/Login/clip16.png)] h-[30vh] bg-cover    text-white px-4 py-5 sm:px-6">
              <div className="flex flex-col  justify-end h-full">
                <h3 className="text-lg font-semibold leading-6">
                  Change Password
                </h3>
                <p className="mt-1 max-w-2xl text-sm">
                  Update Current password of the user.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 overflow-x-auto">
              <UpdatepasswordSection />
            </div>
          </div>
        </Tab>
      </div>
      <Footer />
    </>
  );
};
export default UserManagePage;

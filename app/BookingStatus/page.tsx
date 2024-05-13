import Link from "next/link";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "@/components/Header/Header";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import Image from "next/image";
import ContactImage from "@/public/customer/contactimage.jpg";

const Footer = dynamic(() => import("@/components/Footer/Footer"), {
  ssr: false,
  loading: () => <></>,
});
export interface BookFlightsInterface {
  searchParams: {
    open: string;
  };
}

const page: React.FC<BookFlightsInterface> = async ({ searchParams }) => {
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
      <div className="container mx-auto flex items-center flex-col my-10">
        <div>
          <Image
            src={ContactImage}
            alt="2PH Travel customer image"
            width={100000}
            height={100}
            className="w-[200px] "
          />
        </div>

        <h1 className="text-md md:text-3xl text-center font-semibold mb-4">
          Thank you for choosing 2PH Travel for your booking.
        </h1>

        <p className="text-gray-700 max-w-xl text-center px-5">
          {` Our team will reach out to you shortly to provide further assistance. Meanwhile, feel free to explore our services and destinations.`}
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="bg-[#ec2719] flex gap-2 justify-center items-center p-2 rounded-[5px] text-white "
          >
            <IoMdArrowRoundBack />
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default page;

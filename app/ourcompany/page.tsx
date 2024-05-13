import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

export interface OurcompanydetailsPageParams {
  searchParams: {
    open: string;
  };
}

const OurcompanydetailsPage: React.FC<OurcompanydetailsPageParams> = ({
  searchParams,
}) => {
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
      <div className="bg-[url('/destinationimages/destination.png')] h-[30vh] md:h-[40vh] bg-cover bg-center relative  ">
        <div className="flex w-full h-full items-center justify-center">
          <h1 className="text-4xl text-white"> Our Company</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center ">
        <div className="max-w-5xl mx-auto p-8 bg-white  rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            <Image
              src="/logo1.jpg"
              alt="Company Logo"
              width={1000}
              height={100}
              className="md:w-[300px] rounded-lg mb-4 mix-blend-multiply"
            />
            <div>
              <p className="text-gray-700 mb-4">
                Learn about 2PH Travel: We&rsquo;re a trusted name in travel
                services, dedicated to making your journeys seamless and
                enjoyable. With our commitment to excellence, we provide
                tailored solutions for all your travel needs.
              </p>
              <p className="text-gray-700 mb-4">
                From booking flights to arranging accommodations, we strive to
                ensure your travel experience is stress-free and memorable. in
                company details page 2PH Travel is not providing
                accomadations.So it should be {"`"} We strive to ensure your
                travel experience is stress-free and memorable{"`"}.
              </p>
            </div>
          </div>

          {/* Placeholder for map */}
          <div className="w-full h-64 bg-gray-300 rounded-lg mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1658.255887835846!2d-117.964086!3d33.77328!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd287bc5100001%3A0x5dd7a79fcb4a4f58!2s9636%20Garden%20Grove%20Blvd%20Suite%2022%2C%20Garden%20Grove%2C%20CA%2092844%2C%20USA!5e0!3m2!1sen!2sin!4v1714133042182!5m2!1sen!2sin"
              className="w-full h-full"
              loading="lazy"
            ></iframe>
          </div>
          <h2 className="text-xl font-bold mb-2">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions or need assistance, please don`t hesitate
            to reach out to us. Our customer support team is available 24/7 to
            help you with your travel inquiries.
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-bold">Email:</span>{" "}
            <a href="mailto:support@2phtravel.com" className="text-customBlue">
              support@2phtravel.com
            </a>
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Phone:</span> 855-767-7778
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OurcompanydetailsPage;

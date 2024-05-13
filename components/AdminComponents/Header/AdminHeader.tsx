"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/logo1.jpg";
import { IoMenu } from "react-icons/io5";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { ImHome3 } from "react-icons/im";
import { GiRocketFlight } from "react-icons/gi";
import { BiSolidOffer } from "react-icons/bi";
import { TbCarouselHorizontalFilled } from "react-icons/tb";
import { BiSolidCarousel } from "react-icons/bi";
import AdminHeaderAccordion from "./AdminHeaderAccordion";
import { FaCity } from "react-icons/fa6";
import { MdExplore } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { usePathname } from "next/navigation";

export interface AdminHeaderProps {
  first_name: string;
  last_name: string;
  isMobileView: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  isMobileView,
  first_name,
  last_name,
}) => {
  const pathname = usePathname();
  const home = [
    {
      title: "Home",
      url: "/admin/homebanner",
      icon: <ImHome3 className="text-lg" />,
    },
    {
      title: "Top Airline",
      url: "/admin/airline",
      icon: <GiRocketFlight className="text-lg" />,
    },
    {
      title: "Home Offers",
      url: "/admin/homeoffer",
      icon: <TbCarouselHorizontalFilled className="text-lg" />,
    },
  ];

  const destination = [
    {
      title: "Destination Deals",
      icon: <BiSolidOffer className="text-lg" />,

      url: "/admin/flight-deals",
    },
    {
      title: "Destination City",
      icon: <FaCity className="text-lg" />,

      url: "/admin/flight-deals-city",
    },
  ];

  return (
    <div className="h-[10vh] sticky z-[1000] flex justify-between items-center shadow-md w-screen top-0 bg-white ">
      <div className="h-fit flex items-center">
        <Link
          href={"?open=true"}
          className={` block lg:hidden ml-2 bg-[#142B51] rounded-[20px] text-white px-4 py-1`}
        >
          <IoMenu className="text-2xl" />
        </Link>
        <Link href={"/admin/dashboard"}>
          <Image
            src={Logo}
            alt="Logo"
            width={220}
            height={60}
            priority
            quality={100}
            className="p-3 mix-blend-multiply"
            style={{ marginRight: "20px" }}
          />
        </Link>
      </div>
      <div className="lg:mr-20 mr-4 flex">
        <p>
          {/* Welcome */}
          <b>
            {/* {first_name}
            {last_name} */}
            Admin
          </b>
        </p>
      </div>

      {isMobileView ? (
        <div>
          <Box
            position="fixed"
            top={0}
            bottom={0}
            left={0}
            right={0}
            bgcolor="#142B51"
            zIndex={9999}
            sx={{ overflowY: "scroll", overflowX: "hidden" }}
          >
            <div className="flex items-center mt-5 justify-between">
              <div className="ml-7 flex bg-white rounded-2xl p-2  w-fit">
                <div className="pr-2">
                  <Image
                    src={Logo}
                    alt="Logo"
                    width={200}
                    height={55}
                    priority
                    className="mix-blend-multiply"
                    quality={100}
                  />
                </div>
              </div>
              <Link href={"?open="}>
                <IconButton
                  edge="start"
                  aria-label="close"
                  sx={{ position: "absolute", top: 0, right: 0 }}
                >
                  <IoClose className="text-white text-2xl" />
                </IconButton>{" "}
              </Link>
            </div>
            <div className="bg-[#313C4C] h-1 mt-5"> </div>
            <Box sx={{ paddingLeft: "15px" }}>
              <div>
                <div
                  style={{ marginTop: "20px" }}
                  className={`mb-5 ${
                    pathname === "/admin/dashboard"
                      ? "bg-blue-50 px-4 py-3 rounded-lg text-customBlue"
                      : "text-white"
                  }`}
                >
                  <Link href={"/admin/dashboard"} className=" flex gap-2">
                    <MdDashboard className="text-2xl" /> Booking Status
                  </Link>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <AdminHeaderAccordion
                    accordionicon={<BiSolidCarousel className="text-2xl" />}
                    accordion="Banner"
                    optionheaderData={home}
                    pathname={pathname}
                  />
                </div>
                <div style={{ marginTop: "15px" }}>
                  <AdminHeaderAccordion
                    accordionicon={<MdExplore className="text-2xl" />}
                    accordion="Destination"
                    optionheaderData={destination}
                    pathname={pathname}
                  />
                </div>

                <div
                  style={{ marginTop: "20px" }}
                  className={`mb-9  ${
                    pathname === "/admin/user-details"
                      ? "bg-blue-50 px-4 py-3 rounded-lg text-customBlue"
                      : "text-white"
                  }`}
                >
                  <Link href={"/admin/user-details"} className=" flex gap-2">
                    <FaRegUserCircle className="text-2xl" /> User details
                  </Link>
                </div>
                <div
                  style={{ marginTop: "20px" }}
                  className={`mb-9  ${
                    pathname === "/admin/subscribed-newsletter"
                      ? "bg-blue-50 px-4 py-3 rounded-lg text-customBlue"
                      : "text-white"
                  }`}
                >
                  <Link
                    href={"/admin/subscribed-newsletter"}
                    className=" flex gap-2"
                  >
                    <MdOutlineMail className="text-2xl" /> Newsletter
                    Subscription
                  </Link>
                </div>
                <div
                  style={{ marginTop: "20px" }}
                  className={`mb-9  ${
                    pathname === "/admin/enquiry-form"
                      ? "bg-blue-50 px-4 py-3 rounded-lg text-customBlue"
                      : "text-white"
                  }`}
                >
                  <Link href={"/admin/enquiry-form"} className=" flex gap-2">
                    <MdLabelImportantOutline className="text-2xl" /> Enquiry
                    Details
                  </Link>
                </div>
                <div
                  style={{ marginTop: "20px" }}
                  className={`mb-9  ${
                    pathname === "/admin/promotion"
                      ? "bg-blue-50 px-4 py-3 rounded-lg text-customBlue"
                      : "text-white"
                  }`}
                >
                  <Link href={"/admin/promotion"} className="flex gap-2">
                    <FaChartLine className="text-2xl" /> Promotion
                  </Link>
                </div>
              </div>
            </Box>
            <div className="bg-[#313C4C] h-1 mt-5"> </div>
            <Box sx={{ paddingLeft: "15px" }}>
              <div style={{ paddingLeft: "15px", marginTop: "20px" }}>
                <div style={{ marginTop: "30px" }}>
                  <Link href={"/logout"} className="text-white flex gap-2">
                    <GrLogout className="text-2xl" />
                    Logout
                  </Link>
                </div>
              </div>
            </Box>
          </Box>
        </div>
      ) : null}
    </div>
  );
};

export default AdminHeader;

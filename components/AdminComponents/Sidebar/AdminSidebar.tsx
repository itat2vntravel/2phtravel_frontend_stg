"use client";
import React from "react";
import { GrLogout } from "react-icons/gr";
import { MdOutlineDiscount } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import Link from "next/link";
import { BiCarousel } from "react-icons/bi";
import { TbCarouselHorizontalFilled } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { LiaCitySolid } from "react-icons/lia";
import { MdOutlineExplore } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { GiRocketFlight } from "react-icons/gi";
import { MdOutlineMail } from "react-icons/md";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
const AdminSidebar = () => {
  const pathname = usePathname();

  const sidemenu = [
    {
      title: "Booking Status",
      icon: <MdOutlineDashboardCustomize className="text-lg" />,
      sublink: false,
      link: "/admin/dashboard",
    },
    {
      title: "Banner",
      icon: <BiCarousel className="text-lg" />,
      sublink: true,
      submenu: [
        {
          title: "Home",
          url: "/admin/homebanner",
          icon: <HiOutlineHomeModern className="text-lg" />,
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
      ],
      link: "/admin/homebanner",
    },
    {
      title: "Destination",
      icon: <MdOutlineExplore className="text-lg" />,
      sublink: true,
      submenu: [
        {
          title: "Destination Deals",
          icon: <MdOutlineDiscount className="text-lg" />,

          url: "/admin/flight-deals",
        },
        {
          title: "Destination City",
          icon: <LiaCitySolid className="text-lg" />,

          url: "/admin/flight-deals-city",
        },
      ],
      link: "/admin/flight-deals",
    },
    {
      title: "User details",
      icon: <FaRegUserCircle className="text-lg" />,
      sublink: false,
      link: "/admin/user-details",
    },
    {
      title: "Newsletter Subscription",
      icon: <MdOutlineMail className="text-lg" />,
      sublink: false,
      link: "/admin/subscribed-newsletter",
    },
    {
      title: "Enquiry Details",
      icon: <MdLabelImportantOutline className="text-lg" />,
      sublink: false,
      link: "/admin/enquiry-form",
    },
    {
      title: "Promotion",
      icon: <FaChartLine className="text-lg" />,
      sublink: false,
      link: "/admin/promotion",
    },
  ];
  return (
    <div
      className={` lg:flex flex-col justify-between border-e shadow-md bg-[#142B51] text-white lg:fixed hidden xl:w-[19%] lg:w-[25%] md:w-[25%] w-[25%] lg:h-full`}
    >
      <div className="px-4 mt-4 overflow-y-auto mb-24 ">
        <ul className="mt-4 space-y-1">
          {sidemenu.map((res, index) =>
            res.sublink === true ? (
              <details
                key={index}
                className={`mt-3 group [&_summary::-webkit-details-marker]:hidden`}
              >
                <summary
                  className={`mt-3 flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 ${
                    res.title === "Banner" &&
                    (pathname === "/admin/homebanner" ||
                      pathname === "/admin/homeoffer" ||
                      pathname === "/admin/airline")
                      ? " bg-blue-50 px-4 py-3 text-[#142B51]"
                      : res.title === "Destination" &&
                        (pathname === "/admin/flight-deals" ||
                          pathname === "/admin/flight-deals-city")
                      ? "bg-blue-50 px-4 py-3 text-[#142B51]"
                      : ""
                  }`}
                >
                  <span className=" flex rounded-lg items-center gap-2  ">
                    {res.icon}
                    {res.title}
                  </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  {res?.submenu?.map((response, subindex) => (
                    <li key={subindex}>
                      <Link
                        href={response.url}
                        className={`flex rounded-lg items-center gap-2  px-4 py-3`}
                      >
                        {response.icon}
                        {response.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <li key={index} className="">
                <Link
                  href={res.link}
                  className={`flex rounded-lg items-center gap-2  px-4 py-3  mt-3 ${
                    pathname === res.link
                      ? " bg-blue-50 px-4 py-3 text-[#142B51]"
                      : res.title === "Booking Status" &&
                        pathname.split("2PH_TRAVEL_")[0] ===
                          "/admin/bookingDetails/"
                      ? "bg-blue-50 px-4 py-3 text-[#142B51]"
                      : ""
                  }`}
                >
                  {res.icon}
                  {res.title}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
      <div className="sticky inset-x-0 px-6  cursor-pointer text-white  bottom-6 border-t border-gray-100">
        <Link href={"/logout"}>
          <h1 className="mt-4 flex items-center gap-2">
            <GrLogout className="text-lg" />
            Logout
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;

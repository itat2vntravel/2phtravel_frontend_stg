import React, { FC } from "react";
import Styles from "./header.module.css";
import Logo from "../../public/logo1.jpg";
import Image from "next/image";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import MenuItems from "../Menu/MenuItems";
import { MdEmail } from "react-icons/md";

import { RiSpeakFill } from "react-icons/ri";
import GetCityName from "@/action/Admin/City/DestinationCity";
import { Box, IconButton } from "@mui/material";
import HeaderAccordion from "../Accordion/HeaderAccordion";
import { GiHamburgerMenu } from "react-icons/gi";
import LinkMenu from "../Menu/LinkMenu";
import dynamic from "next/dynamic";
import SocialLinks from "../CommonUtils/SocialLinks";

const UserMenuIcon = dynamic(() => import("@/components/Header/UserMenuIcon"), {
  ssr: false,
  loading: () => <></>,
});

async function DestinationCIty() {
  try {
    const response = await GetCityName();
    return response;
  } catch (error) {
    console.error("City search failed:", error);

    throw error;
  }
}

export interface HeaderProps {
  isMobileView: string;
  userId: string;
  firstName: string;
  accesstoken: string;
}

const Header: FC<HeaderProps> = async ({
  isMobileView,
  userId,
  firstName,
  accesstoken,
}) => {
  const destinationdetails = await DestinationCIty();

  const destination = destinationdetails
    ?.sort(
      (a: { city_id: number }, b: { city_id: number }) => b.city_id - a.city_id
    )
    ?.sort((a: { city_name: string }, b: { city_name: string }) => {
      if (a.city_name === "Manila") return -1;
      if (b.city_name === "Manila") return 1;
      return 0;
    });

  const helpsupport = [
    {
      title: "Blog",
      url: "/guidance/travel-blog",
    },
    {
      title: "Payment Guidance",
      url: "/guidance/payment-guide",
    },
    {
      title: "Talk to Us",
      url: "/guidance/contact-us",
    },
    {
      title: "FAQ",
      url: "/guidance/faq",
    },
  ];

  return (
    <>
      <div className="lg:h-[40px] px-[50px] hidden lg:flex flex-wrap justify-between items-center  text-white bg-[#142D53]">
        <div className="flex gap-2  justify-center items-center">
          <h2 className="font-normal text-[14px]">Follow Us: </h2>
          <SocialLinks className="text-l"/>
        </div>
        <div className="flex flex-wrap gap-2 ">
          <h2 className="flex gap-2 text-[14px] capitalize font-normal justify-center items-center">
            <RiSpeakFill />
            we speak English and Filipino |
          </h2>
          <a href={`mailto:support@2phtravel.com`} className="cursor-pointer">
            <h2 className="flex gap-2 font-normal text-[14px] justify-center items-center">
              <MdEmail />
              support@2phtravel.com
            </h2>
          </a>
        </div>
      </div>
      <div
        id="headermenu"
        className="lg:h-[40px]  p-[10px] flex lg:hidden flex-wrap justify-between items-center  text-white bg-[#142D53]"
      >
        <div className="flex flex-wrap gap-2 ">
          <h2 className=" font-normal justify-center items-center">
            we speak English and Filipino |{" "}
            <a href={`tel: 855-767-7778`}>855-767-7778</a> |
            <a href={`mailto:support@2phtravel.com`} className="cursor-pointer">
              {" "}
              support@2phtravel.com
            </a>
          </h2>{" "}
        </div>
      </div>

      <div
        className={`${Styles.header} flex px-[10px] md:px-[10px]  py-[10px] items-centershadow-custom justify-between`}
        id="headermenu"
      >
        <Link
          href={{
            href: "/",
            query: {
              open: true,
            },
          }}
          className={`block lg:hidden`}
        >
          <GiHamburgerMenu className="text-2xl" />
        </Link>{" "}
        <div className={Styles.logo}>
          <a href="/">
            <Image
              src={Logo}
              alt="Logo"
              width={2000000}
              height={55}
              priority
              quality={100}
              className="mix-blend-multiply	w-[200px] h-[60px]"
              style={{ marginRight: "20px" }}
            />
          </a>
        </div>
        <div
          className={`${Styles.headericonlist} text-nowrap	 gap-[10px] md:gap-[10px] xl:gap-[15px] `}
        >
          <div className="hidden lg:block">
            <LinkMenu
              hrefpath={"/airline-offers"}
              title={"Best Airline Offers"}
              color={"black"}
            />
          </div>

          <div className="hidden lg:block">
            <MenuItems
              title={"Journey By Venue"}
              color={"black"}
              disabled={false}
              options={destination}
            />
          </div>

          <div className="hidden lg:block">
            <MenuItems
              title={"Guidance"}
              color={"black"}
              disabled={false}
              options={helpsupport}
            />
          </div>
          <div className="hidden lg:block">
            <LinkMenu
              hrefpath={"/promotion"}
              title={"Promotion"}
              color={"black"}
            />
          </div>
          <div className="hidden lg:block ">
            <h2 className="flex gap-2 justify-center items-center">
              <Image
                src="/gif/phone.gif"
                alt="Ring"
                className="w-[40px] text-white bg-white mr-1 rounded-[20px]"
                width={50}
                height={10}
                unoptimized
              />

              <div className="flex flex-col">
                <a href={`tel: 855-767-7778`}>
                  <div className="text-[12px] font-semibold ">
                    Call us 24/7 for Exclusive Fares
                  </div>
                  <div className="font-semibold "> 855-767-7778</div>
                </a>
              </div>
            </h2>
          </div>
          <div className="block sticky top-0  lg:hidden">
            <h2 className="flex gap-2 justify-center items-center">
              <a href={`tel: 855-767-7778`}>
                <Image
                  src="/gif/phone.gif"
                  alt="Ring"
                  className="w-[40px] text-white bg-white mr-1 rounded-[20px]"
                  width={50}
                  height={10}
                  unoptimized
                />
              </a>
            </h2>
          </div>

          {accesstoken ? (
            <>
              <div
                className={`${Styles.loginIcon} hidden lg:block !py-[2px] !px-2 w-auto text-center`}
              >
                <UserMenuIcon userId={userId} firstName={firstName} />
              </div>
            </>
          ) : (
            <>
              <Link
                href={"/signin"}
                className={`rounded-[6px] font-normal	 font-main px-5 py-2 text-white bg-[#ec2719] hidden lg:block`}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {isMobileView ? (
        <div>
          <Box
            position="fixed"
            top={0}
            bottom={0}
            left={0}
            right={0}
            bgcolor="#142D53"
            zIndex={9999999}
            sx={{ overflowY: "scroll", overflowX: "hidden" }}
          >
            <div className="flex items-center justify-between">
              <a href="/">
                <div className={Styles.topnav}>
                  <div
                    className={`${Styles.logo} bg-white mt-4 rounded-[20px] `}
                  >
                    <Image
                      src={Logo}
                      alt="Logo"
                      width={200}
                      height={55}
                      priority
                      quality={100}
                      className="mix-blend-multiply"
                    />
                  </div>
                </div>
              </a>

              <Link
                href={{
                  href: "/",
                  query: {
                    open: "",
                  },
                }}
              >
                <IconButton
                  edge="start"
                  className={Styles.link}
                  aria-label="close"
                  sx={{ position: "absolute", top: 0, right: 0 }}
                >
                  <CloseIcon className={Styles.bgwhite} />
                </IconButton>{" "}
              </Link>
            </div>
            <div className={Styles.bggray}> </div>
            <Box sx={{ paddingLeft: "15px" }}>
              <div>
                <div
                  style={{ marginTop: "30px", paddingLeft: "14px" }}
                  className="text-white"
                >
                  <LinkMenu
                    hrefpath={"/airline-offers"}
                    title={"Best Airline Offers"}
                    color={"white"}
                  />
                </div>

                <div style={{ marginTop: "30px" }}>
                  <HeaderAccordion
                    accordion={"Journey By Venue"}
                    optionheaderData={destination}
                  />
                </div>

                <div style={{ marginTop: "30px" }}>
                  <HeaderAccordion
                    accordion={"Guidance"}
                    optionheaderData={helpsupport}
                  />
                </div>
                <div
                  style={{ marginTop: "30px", paddingLeft: "14px" }}
                  className="text-white"
                >
                  <LinkMenu
                    hrefpath={"/promotion"}
                    title={"Promotion"}
                    color={"white"}
                  />
                </div>
              </div>
            </Box>
            <div className={Styles.bggray}> </div>
            <Box className={Styles.icons} sx={{ paddingLeft: "15px" }}>
              <div
                className={Styles.mobiletext}
                style={{ paddingLeft: "15px", marginTop: "20px" }}
              >
                {accesstoken ? (
                  <>
                    <div style={{ marginTop: "30px" }}>
                      <Link
                        href={"/profile"}
                        className="text-white text-[14px] font-semibold"
                      >
                        Profile
                      </Link>
                    </div>

                    <div style={{ marginTop: "30px" }}>
                      <Link href={"/logout"} className="text-white">
                        <div className="flex items-center text-[14px] font-semibold">
                          <LogoutIcon className="mr-2 " />
                          Logout
                        </div>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <Link href={"/signin"} className=" text-white">
                      <div className="flex items-center text-[14px] font-semibold ">
                        <LoginIcon className="mr-2" />
                        Login
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </Box>
          </Box>
        </div>
      ) : null}
    </>
  );
};

export default Header;

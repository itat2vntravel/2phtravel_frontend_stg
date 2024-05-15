"use client";
import React, { FC } from "react";
import Styles from "./menu.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface MenuProps {
  title: any;
  hrefpath: any;
  color: string;
}

const LinkMenu: FC<MenuProps> = ({ title, hrefpath, color }) => {
  const router = usePathname();
  const selectedDestination = router.includes("/airline-offers")
    ? "!text-customRed"
    : color;
  const selectedTheme = router.includes("/promotion")
    ? "!text-customRed"
    : color;
  const selectedFlights = router == "/" ? "red" : color;
  const selectedHelpSupport = router.includes("/guidance") ? "red" : color;

  return (
    <div>
      <div className={Styles.dropdown}>
        <Link
          className={`text-[14px] font-semibold ${Styles.dropbtn} ${
            Styles.buttonhover
          } 
          ${
            title === "Best Airline Offers"
              ? selectedDestination
              : title === "Promotion"
              ? selectedTheme
              : ""
          }
          `}
          href={hrefpath}
        >
          {title}
        </Link>
      </div>
    </div>
  );
};

export default LinkMenu;

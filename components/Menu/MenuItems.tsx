"use client";
import React, { FC } from "react";
import Styles from "./menu.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface MenuProps {
  title: any;
  color: any;
  disabled: boolean;
  options: any;
}

const MenuItems: FC<MenuProps> = ({ title, color, disabled, options }) => {
  const router = usePathname();

  const selectedDestination = router.includes("/bookflights")
    ? "#EC2719"
    : "black";
  const selectedTheme = router.includes("/cabin") ? "#EC2719" : "black";
  const selectedFlights = router == "/" ? "#EC2719" : "black";
  const selectedHelpSupport = router.includes("/help-support")
    ? "#EC2719"
    : "black";
  return (
    <div>
      <div className={Styles.dropdown}>
        <button
          className={`${Styles.dropbtn}
          
          
          ${Styles.buttonhover} text-[14px] font-semibold ${
            !disabled && Styles.dropbtn1
          } }`}
          disabled={disabled}
          style={{
            color:
              title == "Journey By Venue"
                ? selectedDestination
                : title == "Guidance"
                ? selectedHelpSupport
                : "black",
          }}
        >
          {title}
        </button>

        {!disabled && (
          <div className={Styles.dropdowncontent}>
            {options.map((data: any, index: any) => (
              <div key={index}>
                {data.title === "" ? (
                  <></>
                ) : (
                  <>
                    <Link
                      href={`${
                        data.city_name !== undefined
                          ? `/bookflights/${data.city_name}`
                          : `${data.url}`
                      }`}
                      key={index}
                      className={`text-[14px] font-semibold
                      
                      ${
                        router ===
                        `/bookflights/${data.city_name?.replace(/\s/g, "%20")}`
                          ? "!text-customRed"
                          : "text-black"
                      }
                      ${
                        router === `${data.url}` || router === `${data.url}`
                          ? "!text-customRed"
                          : "text-customWhite"
                      }
                      `}
                    >
                      {data.title ||
                        (data.city_name === "Angeles City"
                          ? "Pampanga (Clark)"
                          : data.city_name)}
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItems;

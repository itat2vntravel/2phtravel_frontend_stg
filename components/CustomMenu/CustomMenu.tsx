"use client";

import React, { useEffect, useState, useRef } from "react";

import Styles from "./customMenu.module.css";
import useModifySearch from "@/store/ModifySearch";
import { usePathname } from "next/navigation";

interface InputProps {
  label?: string;
  type: string;
  placeholder: string;
  // disabled?: boolean;
  // [key: string]: any;
  // value?: string | number;
  name: string;
  CustomStyle?: string;
  icon?: React.ReactNode;
  adults?: string | 0;
  childrenCount?: string | 0;
}

const CustomMenu: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  // value,
  name,
  CustomStyle,
  icon,
  //  disabled,
  adults,
  childrenCount,
  // ...otherprops
}) => {
  // const matches = useMediaQuery("(max-width:767px)");
  const menuRef = useRef<HTMLDivElement>(null);
  const { Passenger, ModifySearchStore } = useModifySearch((state) => state);
  const adultsCount = parseInt(adults || "");
  const children = parseInt(childrenCount || "");
  const path = usePathname();
  const [count, setcount] = useState(
    path === "/flight/search" ? adultsCount : 1
  );
  const [countchildren, setcountchildren] = useState(
    path === "/flight/search" ? children : 0
  );
  const [countInfants, setcountInfants] = useState(
    path === "/flight/search" ? Passenger.Infants : 0
  );
  const [open, setopen] = useState(false);

  const handleClickMenu = () => {
    setopen(!open);
  };
  const handleSumbit = () => {
    localStorage.setItem("adults", count.toString());
    ModifySearchStore({
      Passenger: {
        adults: count,
        Children: countchildren,
        Infants: countInfants,
      },
    });
    setopen(false);
  };

  useEffect(() => {
    // localStorage.setItem("adults", count.toString());
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        localStorage.setItem("adults", count.toString());
        ModifySearchStore({
          Passenger: {
            adults: count,
            Children: countchildren,
            Infants: countInfants,
          },
        });
        setopen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, ModifySearchStore, count, countInfants, countchildren, menuRef]);

  const increaseCount = () => {
    const total = count + countchildren + countInfants;

    if (total !== 9) {
      setcount(count + 1);
    }
  };
  const increaseChilderCount = () => {
    const total = count + countchildren + countInfants;

    if (total !== 9) {
      setcountchildren(countchildren + 1);
    }
  };
  const increaseInfantsCount = () => {
    const total = count + countchildren + countInfants;

    if (total !== 9) {
      if (countInfants !== 1) {
        setcountInfants(countInfants + 1);
      }
    }
  };
  return (
    <div className={`relative ${Styles.main}`} ref={menuRef}>
      {open && (
        <div
          className="absolute top-[calc(100% + 10px)] left-0 w-[100%] z-10"
          style={{
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255)",
            top: "100%",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            zIndex: "999999",
          }}
        >
          <div className="flex justify-between p-3">
            <div>
              <h3>{`Adult`}</h3>
              <h6>{`(12+yrs)`}</h6>
            </div>
            <div className="flex">
              <div>
                <input
                  type="button"
                  value="-"
                  style={{
                    width: "30px",
                    borderRadius: "50%",
                    border: "2px solid grey",
                    textAlign: "center",
                  }}
                  className=" cursor-pointer"
                  onClick={() =>
                    setcount((prevState) =>
                      prevState > 1 ? prevState - 1 : prevState
                    )
                  }
                />
              </div>
              <div>
                <input
                  type="text"
                  name="adultcount"
                  value={count}
                  style={{
                    width: "30px",

                    textAlign: "center",
                    outline: "none",
                    border: "none",
                    background: "none",
                  }}
                  readOnly={true}
                />
              </div>

              <div>
                <input
                  type="button"
                  value="+"
                  style={{
                    width: "30px",
                    borderRadius: "50%",
                    border: "2px solid grey",
                    textAlign: "center",
                  }}
                  className=" cursor-pointer"
                  onClick={increaseCount}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between p-3">
            <div>
              <h3>{`Children`}</h3>
              <h6>{`(2-11 years)`}</h6>
            </div>

            <div className="flex">
              <div>
                <input
                  type="button"
                  value="-"
                  style={{
                    width: "30px",
                    borderRadius: "50%",
                    border: "2px solid grey",
                    textAlign: "center",
                  }}
                  className=" cursor-pointer"
                  onClick={() =>
                    setcountchildren((prevState) =>
                      prevState > 0 ? prevState - 1 : prevState
                    )
                  }
                />
              </div>
              <div>
                <input
                  type="text"
                  name="childrencount"
                  value={countchildren}
                  style={{
                    width: "30px",

                    textAlign: "center",
                    outline: "none",
                    border: "none",
                    background: "none",
                  }}
                  readOnly={true}
                />
              </div>
              <div>
                <input
                  type="button"
                  value="+"
                  style={{
                    width: "30px",
                    borderRadius: "50%",
                    border: "2px solid grey",
                    textAlign: "center",
                  }}
                  className=" cursor-pointer"
                  onClick={increaseChilderCount}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between p-3">
            <div>
              <h3>{`Infants`}</h3>
              <h6>{`(Under 2 years)`}</h6>
            </div>
            <div className="flex">
              <div>
                <input
                  type="button"
                  value="-"
                  style={{
                    width: "30px",
                    borderRadius: "50%",
                    border: "2px solid grey",
                    textAlign: "center",
                  }}
                  className=" cursor-pointer"
                  onClick={() =>
                    setcountInfants((prevState) =>
                      prevState > 0 ? prevState - 1 : prevState
                    )
                  }
                />
              </div>
              <div>
                <input
                  type="text"
                  name="infantscount"
                  value={countInfants}
                  style={{
                    width: "30px",

                    textAlign: "center",
                    background: "none",
                    outline: "none",
                    border: "none",
                  }}
                  readOnly={true}
                />
              </div>

              <div>
                <input
                  type="button"
                  value="+"
                  style={{
                    width: "30px",
                    borderRadius: "50%",
                    border: "2px solid grey",
                    textAlign: "center",
                  }}
                  className=" cursor-pointer"
                  onClick={increaseInfantsCount}
                />
              </div>
            </div>
          </div>
          <div className="p-4">
            <button
              type="button"
              className="text-white bg-customBlue w-[100%] cursor-pointer"
              style={{
                fontSize: "14px",
                padding: "5px",
                borderRadius: "40px",
              }}
              onClick={handleSumbit}
            >
              Done
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <label className="flex gap-[5px]  my-[5px] text-[14px] md:text-[15px] leading-[18.05px] font-bold">
          {" "}
          {icon}
          {label}
        </label>
        <input
          type={type}
          name={name}
          className={`bg-[#F4F4F4]  rounded-[5px] text-[14px] md:text-[15px] cursor-pointer p-3 focus:outline-none border border-[#DADADA] ${CustomStyle} h-[40px] md:h-[40px] w-full `}
          placeholder={placeholder}
          style={{
            paddingTop: "20px",
            position: "relative",
            padding: "10px",
          }}
          value={`${count + countchildren + countInfants}`}
          onClick={handleClickMenu}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default CustomMenu;

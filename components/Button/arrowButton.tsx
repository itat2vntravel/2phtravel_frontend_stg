"use client";
import Styles from "./arrawbutton.module.css";
import { MdCall } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { GiTakeMyMoney } from "react-icons/gi";
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";

const ArrowButton = () => {
  const router = useRouter();
  const upArrowHandler = () => {
    window.scroll(0, 0);
  };
  const [showUpArrow, setShowUpArrow] = useState(false);

  const scrollHandler = () => {
    if (window.scrollY > 0) {
      setShowUpArrow(true);
    } else {
      setShowUpArrow(false);
    }
  };
  const downArrowHandler = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);


  return (
    <>
      <div className="flex flex-row ">
        <div
          className={`${Styles.rnProgressParent} bg-customRed`}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "10px 0 ",
          }}
          onClick={showUpArrow ? upArrowHandler : downArrowHandler}
        >
          {showUpArrow ? (
            <IoIosArrowUp className="text-white text-xl" />
          ) : (
            <IoIosArrowDown className="text-white text-xl" />
          )}
        </div>
        <Tooltip title="Payment Pattern">
          <div
            className={`${Styles.rnProgressParentpayment} bg-customRed`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px 0 ",
            }}
            onClick={() => router.push("/guidance/payment-guide")}
          >
            <GiTakeMyMoney className="text-white text-4xl" />
          </div>
        </Tooltip>
      </div>
    </>
  );
};

export default ArrowButton;

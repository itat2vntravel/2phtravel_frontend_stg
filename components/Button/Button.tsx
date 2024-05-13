"use client";
import React from "react";
import Button from "@mui/material/Button";
import useSearchFlight from "@/store/flightSearchStore";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
interface SearchButtonProps {
  onClick?: () => void;
  text: string;
  colored?: string;
  icon?: any;
  customclass?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  [key: string]: any;
}
const CustomButton: React.FC<SearchButtonProps> = ({
  text,
  onClick,
  colored,
  type,
  icon,
  customclass,
  routing,
  loading,
  disabled,
  ...otherprops
}) => {
  // const { setflightResult } = useSearchFlight();
  const { updateUserStore } = useSearchFlight((state) => state);

  const router = useRouter();
  const handleclickFunction = () => {
    updateUserStore({
      publishedBaseFare: routing.publishedBaseFare,
      key: routing.key,
      mainAirlineCode: routing.mainAirlineCode,
      totalPrice: routing.totalPrice,
      adultBasePrice: routing.adultBasePrice,
      adultTax: routing.adultTax,
      childBasePrice: routing.childBasePrice,
      childTax: routing.childTax,
      rules: routing.rules,
      trips: routing.trips,
    });
    // setflightResult(routing);
    router.push("/flight/summary");
  };

  return (
    <button
      onClick={routing ? handleclickFunction : onClick}
      className={`${customclass}  p-2 ${
        colored === "true"
          ? `bg-[#EC2719] text-white rounded-[6px]`
          : `border-2 border-[#3966AF] text-black mt-3 mb-3 rounded-[20px]`
      }`}
      type={type}
      disabled={disabled}
      {...otherprops}
    >
      {loading ? (
        <PulseLoader color="white" />
      ) : icon ? (
        <>
          {icon}
          {text}
        </>
      ) : (
        `${text}`
      )}
    </button>
  );
};
export default CustomButton;

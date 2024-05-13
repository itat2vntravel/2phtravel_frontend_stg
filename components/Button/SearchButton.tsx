"use client";
import React from "react";
import Button from "@mui/material/Button";
import { useFormStatus } from "react-dom";

interface SearchButtonProps {
  onClick?: () => void;
  text: string;
  loadingtext: string;
  //   custom?: string;
  type?: "submit" | "reset" | "button";
  [key: string]: any;
}

const SearchButton: React.FC<SearchButtonProps> = ({
  text,

  loadingtext,
  //   onClick,
  //   custom,
  type,
  style,
  ...otherprops
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`w-auto rounded-[6px] font-normal	 font-main px-5 py-2 text-white bg-[#ec2719] `}
      type={type}
      style={style}
      disabled={pending ? true : false}
    >
      {pending ? loadingtext : text}
    </button>
  );
};

export default SearchButton;

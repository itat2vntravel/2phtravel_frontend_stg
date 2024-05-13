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

const ModifySearchButton: React.FC<SearchButtonProps> = ({
  text,

  loadingtext,
  //   onClick,
  //   custom,
  type,
  style,
  disabled,
  ...otherprops
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`w-auto rounded-[6px] font-normal	 font-main px-5 py-2 text-white bg-[#ec2719] ${
        disabled && `opacity-[0.4]`
      } `}
      type={type}
      style={style}
      disabled={pending || disabled ? true : false}
    >
      {pending ? loadingtext : text}
    </button>
  );
};

export default ModifySearchButton;

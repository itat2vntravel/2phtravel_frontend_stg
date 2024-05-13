"use client";
import { TextField } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Styles from "./customTextfield.module.css";
import { useSearchParams } from "next/navigation";

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  Customclassname?: string;
  // [key: string]: any;
  // value?: string | number;
  name: string;
  icon?: React.ReactNode;
}

const CustomField: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  // value,
  name,
  icon,
  required,
  Customclassname,
  //  disabled,
  ...otherprops
}) => {
  const matches = useMediaQuery("(max-width:767px)");
  const today = new Date().toISOString().split("T")[0];
  const searchParams = useSearchParams();
  const errorName = searchParams.get("errorName");
  const errorEmail = searchParams.get("errorEmail");

  return (
    <div className={`relative ${Styles.main}`}>
      <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
        {icon}
        {label}
      </label>
      <input
        type={type}
        name={name}
        className={`w-full bg-[#F4F4F4] ${Customclassname}
        
        ${errorName === name && " border border-red-500	"}
        ${errorEmail === name && " border border-red-500	"}
        rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[40px] md:h-[40px]`}
        placeholder={placeholder}
        min={today}
        required={required}
      />
    </div>
  );
};

export default CustomField;

"use client";
import { TextField } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Styles from "./customTextfield.module.css";

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  // [key: string]: any;
  // value?: string | number;
  name: string;
  ClassStyle?: string;
  icon?: React.ReactNode;
}

const CustomFieldDatePicker: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  // value,
  name,
  icon,
  required,
  ClassStyle,
  disabled = false,
  ...otherprops
}) => {
  const matches = useMediaQuery("(max-width:767px)");
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className={`relative ${Styles.main}`}>
      <div className="flex flex-col">
        <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
          {icon}
          {label}
        </label>
        <input
          type={type}
          name={name}
          className={`bg-[#F4F4F4] rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[40px] md:h-[40px] ${ClassStyle} ${Styles.fullwidth}`}
          placeholder={placeholder}
          min={label === "Depart" ? today : ""}
          style={{
            paddingTop: "20px",
            position: "relative",

            width:
              type == "date"
                ? !matches
                  ? "215px"
                  : "100%"
                : !matches
                ? "215px"
                : "100%",
            padding: "10px",
          }}
          disabled={disabled}
          required={required}
        />
      </div>
    </div>
  );
};

export default CustomFieldDatePicker;

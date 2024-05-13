import { TextField } from "@mui/material";
import React from "react";

interface InputProps {
  labeltext: string;
  type: string;
  value?: string | number;
  name: string;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
}

const CustomTextField: React.FC<InputProps> = ({
  labeltext,
  value,
  type,
  name,
  required,
  placeholder,
  disabled,
}) => {
  return (
    <div className="flex flex-col relative mt-2">
      <label className="mb-2 absolute pr-1 pl-1 bg-white text-[12px] top-[-17px] left-3 font-thin ">
        <b>
          {labeltext}{" "}
          {required === true ? (
            <span className="text-red-600 text-[19px]">*</span>
          ) : (
            <span className="text-red-600 text-[19px]"> </span>
          )}
        </b>
      </label>
      <input
        type={type}
        name={name}
        className=" bg-white mb-4 rounded-lg p-3  focus:outline-none border border-gray-500 "
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default CustomTextField;

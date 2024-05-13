"use client";
import { useState } from "react";

interface InputProps {
  label?: string;
  Customclassname?: string;
  defaultValue?: string;
  placeholder: string;
  name: string;
  required: boolean;
  icon?: React.ReactNode;
  cityname: [
    {
      city_id: number;
      city_name: string;
      city_image_url: string;
    }
  ];
}

const DestinationCityAutoComplete: React.FC<InputProps> = ({
  label,
  placeholder,
  name,
  required,
  icon,
  Customclassname,
  defaultValue = "",
  cityname,
}) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowOptions(e.target.value.trim().length > 0);
  };

  const handleSelectOption = (airportName: string) => {
    setInputValue(airportName);
    setShowOptions(false);
  };
  const handleInputFocus = () => {
    setShowOptions(true);
  };
  const handleInputBlur = () => {
    setTimeout(() => {
      setShowOptions(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <label className="mt-[20px] md:mt-[2px] block text-[15px] leading-[18.05px] font-bold">
        <div className="flex gap-[5px] my-[5px]">
          {icon}
          {label}
        </div>
      </label>
      <input
        type="text"
        className={`bg-[#F4F4F4] ${Customclassname}  rounded-[5px] p-3 mb-0 focus:outline-none border border-[1px solid rgba(218, 218, 218, 1)] h-[40px]  w-full `}
        placeholder={placeholder}
        autoComplete="off"
        style={{
          paddingTop: "20px",
          position: "relative",
          padding: "10px",
        }}
        name={name}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        required={required}
      />
      {showOptions && (
        <ul className="absolute z-[100] w-full py-1 overflow-x-hidden	 overflow-y-auto text-base bg-white border border-gray-300 rounded-md shadow-lg max-h-60 focus:outline-none">
          {cityname.map((item, index) => (
            <li
              key={index}
              className="px-3 py-2 cursor-pointer select-none hover:bg-[#162E54] hover:text-white"
              onClick={() => handleSelectOption(`${item.city_name}`)}
            >
              <div className="grid grid-cols-1">
                <div>
                  <div className="flex flex-wrap gap-1"> {item.city_name}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DestinationCityAutoComplete;

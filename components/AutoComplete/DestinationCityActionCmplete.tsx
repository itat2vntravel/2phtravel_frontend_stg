"use client";
import airports from "@nwpr/airport-codes";
import { useEffect, useState } from "react";
import { MdAirlines } from "react-icons/md";

interface InputProps {
  label?: string;
  Customclassname?: string;
  defaultValue?: string | undefined;
  placeholder: string;
  name: string;
  required: boolean;
  icon?: React.ReactNode;
}
interface FlightDataprops {
  airport_name: string;
  iata: string;
  country_code: string;
  city_name: string;
  location: string;
  continent: string;
}
const DestinationCityActionComple: React.FC<InputProps> = ({
  label,
  placeholder,
  name,
  required,
  icon,
  Customclassname,
  defaultValue,
}) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue || "");
  const [showOptions, setShowOptions] = useState<boolean>(false);

  // const filteredAirports = data;
  const filteredAirports = airports
    ?.filter((airport) => {
      return (
        (airport.name &&
          airport.name.toLowerCase().includes(inputValue.toLowerCase())) ||
        (airport.iata &&
          airport.iata.toLowerCase().includes(inputValue.toLowerCase())) ||
        (airport.city &&
          airport.city.toLowerCase().includes(inputValue.toLowerCase()))
      );
    })
    ?.filter((airport) => airport.iata !== undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowOptions(e.target.value.trim().length > 0);
  };

  const handleSelectOption = (airportName: string | undefined) => {
    setInputValue(airportName || "");
    setShowOptions(false);
  };
  const handleInputFocus = () => {
    setShowOptions(true);
  };
  const handleInputBlur = () => {
    // Use setTimeout to ensure that the options list is hidden after clicking an option
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

      {showOptions && filteredAirports.length > 0 && (
        <ul className="absolute z-[100] w-full py-1 overflow-x-hidden	 overflow-y-auto text-base bg-white border border-gray-300 rounded-md shadow-lg max-h-60 focus:outline-none">
          {filteredAirports.slice(0, 10).map((item, index: number) => (
            <li
              key={index}
              className="px-3 py-2 cursor-pointer select-none hover:bg-[#162E54] hover:text-white"
              onClick={() => handleSelectOption(item.city)}
            >
              <div className="grid grid-cols-1">
                <div>
                  <div className="flex flex-wrap gap-1">
                    <MdAirlines />
                    <p className="text-[14px]">
                      {item.city === "Angeles City"
                        ? "Pampanga (Clark)"
                        : item.city}
                      ,
                    </p>
                    <p className="text-[14px]">{item.country}</p>,
                    <p className="text-[14px]">[{item.iata}]</p>,
                    <p className="text-[12px]">{item.name}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DestinationCityActionComple;

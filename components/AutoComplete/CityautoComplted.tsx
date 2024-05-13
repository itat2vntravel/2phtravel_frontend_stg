"use client";
import { useEffect, useRef, useState } from "react";
import { MdAirlines } from "react-icons/md";
// import GetFlightList from "@/action/Flight/FlightList";
import { airports } from "@nwpr/airport-codes";
import { IoClose } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";

interface InputProps {
  label?: string;
  Customclassname?: string;
  defaultValue?: string | undefined;
  placeholder: string;
  name: string;
  required: boolean;
  icon?: React.ReactNode;
  onDepartureValueChange?: (value: string) => void;
  onDestinationValueChange?: (value: string) => void;
}
interface FlightDataprops {
  airport_name: string;
  iata: string;
  country_code: string;
  city_name: string;
  location: string;
  continent: string;
}
const UseCityautoComplted: React.FC<InputProps> = ({
  label,
  placeholder,
  name,
  required,
  icon,
  Customclassname,
  defaultValue,
  onDepartureValueChange,
  onDestinationValueChange,
}) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue || "");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(40);
  const componentRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const errordepartureAirport = searchParams.get("errordepartureAirport");
  const errordestinationAirport = searchParams.get("errordestinationAirport");
  const router = useRouter();
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);
  const focusedOptionRef = useRef<HTMLLIElement>(null);

  const errorDepartureAirportsArray = errordepartureAirport
    ? errordepartureAirport.split(",")
    : "";
  const errorDestinationAirportArray = errordestinationAirport
    ? errordestinationAirport.split(",")
    : "";
  const errorDepartureClass = errorDepartureAirportsArray.includes(name)
    ? "border border-red-500"
    : "";
  const errorDestinationClass = errorDestinationAirportArray.includes(name)
    ? "border border-red-500"
    : "";

  useEffect(() => {
    const clearInputFieldValues = (
      errorAirportsArray: string[],
      name: string
    ) => {
      // Check if the errorAirportsArray is empty or null
      if (!errorAirportsArray || errorAirportsArray.length === 0) {
        return; // Exit the function early if the array is empty or null
      }

      const allEqual = errorAirportsArray.every((airport) => airport === name);

      if (allEqual) {
        errorAirportsArray.forEach((airport) => {
          const input = document.querySelector(
            `input[name="${airport}"]`
          ) as HTMLInputElement;
          if (input) {
            input.value = ""; // Clear the input field value
          }

          if (airport === name) {
            setInputValue("");
          }
        });
      }
    };
    if (errordepartureAirport) {
      const errorDepartureAirportsArray = errordepartureAirport.split(",");
      clearInputFieldValues(errorDepartureAirportsArray, name);
    }

    if (errordestinationAirport) {
      const errorDestinationAirportArray = errordestinationAirport.split(",");
      clearInputFieldValues(errorDestinationAirportArray, name);
    }
    if (errordepartureAirport === "departureAirport") {
      const departureInput = document.querySelector(
        'input[name="departureAirport"]'
      ) as HTMLInputElement;
      if (departureInput) {
        departureInput.value = " ";
        if (errordepartureAirport === name) {
          setInputValue("");
        }
      }
      // setInputValue("");
    }
    if (errordestinationAirport === "destinationAirport") {
      const destinationAirportInput = document.querySelector(
        'input[name="destinationAirport"]'
      ) as HTMLInputElement;
      if (destinationAirportInput) {
        destinationAirportInput.value = " ";
        if (errordestinationAirport === name) {
          setInputValue("");
        }
        // setInputValue(errordestinationAirport === name && "");
      }
    }
    // Function to handle outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [errordepartureAirport, errordestinationAirport, name]);
  const preferredAirports = [
    "ATL",
    "DFW",
    "DEN",
    "ORD",
    "LAX",
    "JFK",
    "LAS",
    "MCO",
    "MIA",
    "CLT",
    "SEA",
    "PHX",
    "EWR",
    "SFO",
    "IAH",
    "BOS",
    "FLL",
    "MSP",
    "LGA",
    "DTW",
    "PHL",
    "SLC",
    "DCA",
    "SAN",
    "BWI",
    "TPA",
    "AUS",
    "IAD",
    "BNA",
    "MDW",
    "CRK",
    "MNL",
    "CEB",
    "DVO",
    "PPS",
    // "CGY",
    // "BCD",
    // "TAC",
    // "ILO",
    // "ZAM",
  ];

  const filteredAirports = airports
    // Exclude airports with names containing "Military", "Airfield", or "airstrips"
    .filter(
      (airport) =>
        !airport.name?.toLowerCase().includes("military") &&
        !airport.name?.toLowerCase().includes("airfield") &&
        !airport.name?.toLowerCase().includes("force") &&
        !airport.name?.toLowerCase().includes("airstrips")
    )
    .filter(
      (airport) =>
        airport.country?.toLowerCase() !== "singapore" ||
        airport.name?.toLowerCase() === "singapore changi airport"
    )
    .filter((airport) => {
      return (
        (airport.name &&
          airport.name.toLowerCase().includes(inputValue?.toLowerCase())) ||
        (airport.iata &&
          airport.iata.toLowerCase().includes(inputValue?.toLowerCase())) ||
        (airport.country &&
          airport.country.toLowerCase().includes(inputValue.toLowerCase())) ||
        (airport.city &&
          airport.city.toLowerCase().includes(inputValue.toLowerCase()))
      );
    })
    .filter((airport) => airport.iata !== undefined)
    .filter((airport) => {
      // Check if the input value is "USA" and filter airports from the United States
      if (inputValue.toLowerCase() === "usa") {
        return airport.country?.toLowerCase() === "united states";
      }
      return true;
    })
    .sort((a, b) => {
      const indexA = a.iata ? preferredAirports.indexOf(a.iata) : -1;
      const indexB = b.iata ? preferredAirports.indexOf(b.iata) : -1;

      if (indexA === -1 && indexB === -1) {
        // If both airports are not in the preferred list, sort alphabetically by city
        const cityA = a.city ?? "";
        const cityB = b.city ?? "";
        // Push 'null' or 'undefined' values to the end
        if (cityA === "" && cityB !== "") return 1;
        if (cityB === "" && cityA !== "") return -1;
        return cityA.localeCompare(cityB);
      } else if (indexA === -1) {
        // If only airport A is not in the preferred list, push it to the end
        return 1;
      } else if (indexB === -1) {
        return -1;
      } else {
        return indexA - indexB;
      }
    });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setShowOptions(true);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedOptionIndex((prevIndex) =>
          Math.min(prevIndex + 1, filteredAirports.length - 1)
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedOptionIndex((prevIndex) => Math.max(prevIndex - 1, -1));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedOptionIndex !== -1) {
          handleSelectOption(
            `${filteredAirports[focusedOptionIndex]?.name} [${filteredAirports[focusedOptionIndex]?.iata}]`
          );
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    // Scroll the focused option into view
    if (focusedOptionRef.current) {
      focusedOptionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedOptionIndex]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onDestinationValueChange) {
      onDestinationValueChange(e.target.value);
    }
    if (onDepartureValueChange) {
      onDepartureValueChange(e.target.value);
    }
    setShowOptions(e.target.value.trim().length > 0);
  };
  useEffect(() => {
    if (typeof onDestinationValueChange === "function") {
      onDestinationValueChange(inputValue);
    }
  }, [inputValue, onDestinationValueChange]);

  useEffect(() => {
    if (typeof onDepartureValueChange === "function") {
      onDepartureValueChange(inputValue);
    }
  }, [inputValue, onDepartureValueChange]);

  const handleSelectOption = (airportName: string) => {
    if (airportName) {
      setInputValue(airportName);
      setShowOptions(false);
    }
  };
  const handleInputFocus = () => {
    setShowOptions(true);
  };
  const handleInputBlur = () => {
    // Use setTimeout to ensure that the options list is hidden after clicking an option
    setTimeout(() => {
      setShowOptions(false);
    }, 1000);
  };
  const handleDisplayAdditionalResults = () => {
    setDisplayCount((prevCount) => prevCount + 40);
  };

  const formatAirport = (dataString: any) => {
    if (dataString) {
      const str = dataString;

      const regex = /\[([^\]]+)\]/;
      const match = str.match(regex);

      const extractedValue = match ? match[1] : null;

      return extractedValue;
    }
  };
  return (
    <div className="relative" ref={componentRef}>
      <label className="mt-[15px] md:mt-[2px] block text-[14px] md:text-[15px] leading-[18.05px] font-bold">
        <div className="flex gap-[5px] my-[5px]">
          {icon}
          {label}
        </div>
      </label>
      <div className="flex relative ">
        <input
          type="text"
          className={`bg-[#F4F4F4] ${Customclassname}
          ${errordepartureAirport === name && " border border-red-500	"}
          ${errordestinationAirport === name && " border border-red-500	"}
          ${errorDepartureClass}
          ${errorDestinationClass}
          text-[14px] md:text-[15px]  rounded-[5px] p-3 mb-0 focus:outline-none border border-[1px solid rgba(218, 218, 218, 1)] h-[40px]  w-full `}
          placeholder={placeholder}
          autoComplete="off"
          style={{
            // borderRadius: "20px",
            // border: "none",
            paddingTop: "20px",
            position: "relative",
            padding: "10px",
            // width: matches ? "100%" : "215px",
          }}
          name={name}
          value={inputValue}
          onChange={handleChange}
          // onFocus={handleInputFocus}
          onClick={handleInputFocus}
          onKeyDown={handleKeyDown}
          // onBlur={handleInputBlur}
          // required={required}
        />
        {inputValue && (
          <h1
            className="text-gray-600 cursor-pointer absolute right-0 mr-[10px] mt-[11px]"
            onClick={() => setInputValue("")}
          >
            <IoClose className="bg-[#f4f4f4] hover:text-blue-950" />
          </h1>
        )}
      </div>
      {/* // IoClose onclick to inputValue clear */}
      {showOptions && filteredAirports.length > 0 && (
        <>
          <ul className="absolute z-[100] w-full py-1 overflow-x-hidden	 overflow-y-auto text-base bg-white border border-gray-300 rounded-md shadow-lg max-h-60 focus:outline-none">
            <h1 className="px-3 text-[16px] uppercase text-customBlue">
              {filteredAirports.length < 5985
                ? "similar"
                : "popular USA cities"}
            </h1>

            {filteredAirports
              .slice(0, displayCount)
              .map((item, index: number) => (
                <>
                  <h1 className="px-3 text-[14px] uppercase text-customBlue ">
                    {filteredAirports.length < 5985
                      ? ""
                      : item.iata === "CRK" && "popular Philippines cities"}
                  </h1>
                  <li
                    ref={index === focusedOptionIndex ? focusedOptionRef : null}
                    key={index}
                    className={`px-3 py-2 cursor-pointer select-none hover:bg-[#162E54] hover:text-white ${
                      index === focusedOptionIndex ? "bg-[#a9b1bd] " : ""
                    }`}
                    // className="px-3 py-2 cursor-pointer select-none hover:bg-[#162E54] hover:text-white"
                    onClick={() =>
                      handleSelectOption(`${item.name} [${item.iata}]`)
                    }
                  >
                    <div className="grid grid-cols-12">
                      <div className="col-span-1 mt-[5px]">
                        <p className="text-[12px] text-center block">
                          <MdAirlines />
                        </p>
                      </div>
                      <div className="col-span-9">
                        <div className="flex flex-col gap-1 whitespace-nowrap overflow-hidden	">
                          <p className="text-[12px] block">
                            {/* <MdAirlines />  */}
                            {item.name}
                          </p>
                          {/* <p className="text-[14px]"></p>, */}
                          <p className="text-[12px]">
                            {item.city === "Angeles City"
                              ? "Pampanga (Clark)"
                              : item.city === "Madras"
                              ? "Chennai"
                              : item.city}
                            ,
                            {item.country === "United States"
                              ? "USA"
                              : item.country}
                          </p>
                          {/* <p className="text-[12px]">{item.country}</p>, */}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[12px] block">[{item.iata}]</p>
                      </div>
                    </div>
                  </li>
                </>
              ))}
            {filteredAirports.length > displayCount && (
              <li
                ref={
                  displayCount === focusedOptionIndex ? focusedOptionRef : null
                }
                className={`px-3 py-2  border-t-[1.5px] border-t-[#716f6f] cursor-pointer select-none hover:bg-[#162E54] hover:text-white ${
                  displayCount === focusedOptionIndex
                    ? "bg-[#142D53] text-white"
                    : ""
                }`}
                // className="px-3 py-2  border-t-[1.5px] border-t-[#716f6f] cursor-pointer select-none hover:bg-[#162E54] hover:text-white"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents event propagation
                  handleDisplayAdditionalResults();
                }}
              >
                Show more results
              </li>
            )}
          </ul>
        </>
      )}
      {showOptions && filteredAirports.length == 0 && (
        <>
          {formatAirport(inputValue) === null && (
            <ul className="absolute z-[100] w-full py-1 overflow-x-hidden	 overflow-y-auto text-base bg-white border border-gray-300 rounded-md shadow-lg max-h-60 focus:outline-none">
              <li className="px-3 py-2   cursor-pointer select-none hover:bg-[#162E54] hover:text-white">
                There is no airport in the area.
              </li>
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default UseCityautoComplted;

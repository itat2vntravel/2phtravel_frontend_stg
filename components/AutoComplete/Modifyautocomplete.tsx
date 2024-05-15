"use client";
import * as React from "react";
import { styled } from "@mui/system";

const Label = styled("label")({
  display: "block",
});

interface Option {
  code: string;
  name: string;
  // Add any other properties if available
}

interface InputProps {
  label?: string;
  defaultValue?: string;
  Customclassname?: string;
  placeholder: string;
  name: string;
  cabin: boolean;
  required: boolean;
  AutocompleteOptions: Option[];
  icon?: React.ReactNode;
  onInputValueChange?: (value: string) => void;
}

const UseModifyAutocomplete: React.FC<InputProps> = ({
  label,
  placeholder,
  name,
  AutocompleteOptions,
  cabin,
  required,
  icon,
  defaultValue = "",
  Customclassname,
  onInputValueChange,
}) => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = React.useState<string>(defaultValue);
  const [showOptions, setShowOptions] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] =
    React.useState<string>(defaultValue);
  const [hoveredOption, setHoveredOption] = React.useState<string>("");
  const [focusedOptionIndex, setFocusedOptionIndex] =
    React.useState<number>(-1);
  const focusedOptionRef = React.useRef<HTMLLIElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowOptions(e.target.value.trim().length > 0);
    setHoveredOption("");
    if (onInputValueChange) {
      onInputValueChange(e.target.value);
    }
  };

  React.useEffect(() => {
    if (typeof onInputValueChange === "function") {
      onInputValueChange(inputValue);
    }
  }, [inputValue, onInputValueChange]);
  const handleInputFocus = () => {
    setShowOptions(true);
    setHoveredOption("");
  };

  const handleSelectOption = (selectedOption: string) => {
    setHoveredOption("");
    setInputValue(selectedOption);
    setSelectedOption(selectedOption);
    setShowOptions(false);
  };

  const handleMouseEnter = (optionName: string) => {
    setHoveredOption(optionName);
  };

  const handleMouseLeave = () => {
    setHoveredOption("");
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowOptions(false);
        setHoveredOption("");
      }
    }
    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions, menuRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setShowOptions(true);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedOptionIndex((prevIndex) =>
          Math.min(prevIndex + 1, AutocompleteOptions.length - 1)
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedOptionIndex((prevIndex) => Math.max(prevIndex - 1, -1));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedOptionIndex !== -1) {
          handleSelectOption(`${AutocompleteOptions[focusedOptionIndex].name}`);
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className={`relative`} ref={menuRef}>
      <div className={`relative`}>
        <Label
          className="text-[14px] md:text-[15px]  flex gap-[5px] my-[5px] leading-[18.05px] font-bold"
          sx={{ display: "flex" }}
        >
          {icon}
          {label}
        </Label>
        <input
          type="text"
          className={`bg-[#F4F4F4] ${Customclassname} text-[14px] md:text-[15px] rounded-[5px] p-3 mb-0 focus:outline-none border border-[1px solid rgba(218, 218, 218, 1)] h-[40px]  w-full `}
          placeholder={placeholder}
          autoComplete="off"
          name={name}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleInputFocus}
          // onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          required={required}
        />
        {showOptions && AutocompleteOptions.length > 0 && (
          <ul className="absolute z-[100] w-full py-1 overflow-x-hidden overflow-y-auto text-base bg-white border border-gray-300 rounded-md shadow-lg max-h-60 focus:outline-none">
            {AutocompleteOptions.slice(0, 10).map((econmyclass, index) => (
              <li
                key={index}

                className={`px-3 py-2 cursor-pointer select-none hover:bg-[#162E54] hover:text-white 
                ${
                  selectedOption === econmyclass.name
                    ? hoveredOption == ""
                      ? "bg-customBlue text-white"
                      : ""
                    : ""
                }
                  ${index === focusedOptionIndex ? "bg-[#a9b1bd] " : ""}
                `}
                onMouseEnter={() => handleMouseEnter(econmyclass.name)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleSelectOption(econmyclass.name)}
              >
                {econmyclass.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UseModifyAutocomplete;

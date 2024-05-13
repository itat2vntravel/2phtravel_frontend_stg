"use client";
import { Card } from "@mui/material";
import Styles from "./passangerdetails.module.css";
import React, { FC, useState } from "react";
import useSearchFlight from "@/store/flightSearchStore";
import { useSearchParams } from "next/navigation";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

export interface PassengerDetailsprops {
  adults: any;
  childrenCount: any;
  InfantsCount: any;
}
interface CustomTextFieldProps {
  labeltext: string;
  type: string;
  name: string;
  placeholder: string;

  required?: boolean;
  value?: string | number; // Add value prop
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CustomTextField: FC<CustomTextFieldProps> = ({
  labeltext,
  type,
  name,
  placeholder,
  required,
  value,
  onChange,
}) => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("errorMessage");

  return (
    <>
      <div>
        <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
          {labeltext}{" "}
          {required ? (
            <span className="text-red-600 text-[19px]">*</span>
          ) : (
            <span className="text-red-600 text-[19px]"> </span>
          )}
        </label>
        <div>
          <input
            type={type}
            name={name}
            autoComplete="off"
            // className="bg-white mb-4 rounded-lg p-3 focus:outline-none border border-gray-500"
            placeholder={placeholder}
            // required={required}
            value={value} // Set value prop
            onChange={onChange} // Set onChange prop
            className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px]  `}
            style={{
              paddingTop: "20px",
              position: "relative",
              padding: "10px",
            }}

            // placeholder={"Cardholder name"}
            // required
          />
        </div>
        {errorMessage && !value && labeltext !== "Middle Name" && (
          <p className="text-red-600">Please fill {labeltext}</p>
        )}
      </div>
    </>
  );
};
const PassengerDetails: FC<PassengerDetailsprops> = ({
  adults,
  childrenCount,
  InfantsCount,
}) => {
  const [passengerDetails, setPassengerDetails] = useState<any[]>([]);
  const { updateUserStore } = useSearchFlight((state) => state);
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("errorMessage");
  const [SingleDatevalue, setSingleDateValue] = useState<DateValueType[]>([]);
  // const handleSingleValueChange = (newValue: any) => {
  //   setSingleDateValue(newValue);
  // };
  const handleSingleValueChange = (
    newValue: any,
    category: string,
    i: number
  ) => {
    const updatedDateValues = [...SingleDatevalue];
    updatedDateValues[i - 1] = newValue;
    setSingleDateValue(updatedDateValues);
    handleInputChange(
      i - 1,
      "birthday",
      newValue,
      `${category} ${i}`,
      category
    );
  };
  const handleInputChange = (
    index: number,
    key: string,
    value: string,
    type: string,
    passenger_type: string
  ) => {
    const updatedPassengerDetails = [...passengerDetails];
    updatedPassengerDetails[index] = {
      ...updatedPassengerDetails[index],
      [key]: value,
      type: type,
      passenger_type: passenger_type,
    };

    setPassengerDetails(updatedPassengerDetails);
    updateUserStore({
      PassengerList: updatedPassengerDetails,
    });
  };

  const renderPassengerFields = (count: number, category: string) => {
    const passengers = [];

    for (let i = 1; i <= count; i++) {
      const passengerType =
        category === "adults"
          ? "adults"
          : category === "children"
          ? "child"
          : "infant";
      // const passengerIndex =
      //   category === "adults" ? i - 1 : i + adults - 1 + childrenCount - 1;
      const passengerIndex =
        category === "adults"
          ? i - 1
          : category === "children"
          ? i + adults - 1
          : i + adults + childrenCount - 1;
      const passenger = passengerDetails[passengerIndex] || {}; // Get passenger details for this index
      const titleValue = passenger.title || "";
      const firstNameValue = passenger.first_name || "";
      const middleNameValue = passenger.middle_name || "";
      const lastNameValue = passenger.last_name || "";
      const dobValue = passenger.birthday || "";

      passengers.push(
        <div
          key={`${category}_${i}`}
          className="mt-6 border-2 border-[#e3e3e3]"
        >
          <div className={`${Styles.passengerheading}`}>
            <h4>{`PASSENGER ${category.toUpperCase()} ${i}`}</h4>
          </div>
          <div className="p-10">
            <div className="grid grid-cols-12 gap-4 ">
              <div className="xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-3 col-span-6">
                <CustomTextField
                  labeltext="Title"
                  type="text"
                  name={`Title_${category}${i}`}
                  placeholder="Title"
                  required={true}
                  value={titleValue}
                  onChange={(e) =>
                    handleInputChange(
                      passengerIndex,
                      "title",
                      e.target.value,
                      `${category} ${i}`,
                      passengerType
                    )
                  }
                />
              </div>
              <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-3 col-span-6">
                <CustomTextField
                  labeltext="First Name"
                  type="text"
                  name={`First_Name_${category}${i}`}
                  placeholder="First Name"
                  required={true}
                  value={firstNameValue}
                  onChange={(e) =>
                    handleInputChange(
                      passengerIndex,
                      "first_name",
                      e.target.value,
                      `${category} ${i}`,
                      passengerType
                    )
                  }
                />
              </div>
              <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-3 col-span-6">
                <CustomTextField
                  labeltext="Middle Name"
                  type="text"
                  name={`Middle_Name_${category}${i}`}
                  placeholder="Middle Name"
                  value={middleNameValue}
                  onChange={(e) =>
                    handleInputChange(
                      passengerIndex,
                      "middle_name",
                      e.target.value,
                      `${category} ${i}`,
                      passengerType
                    )
                  }
                />
              </div>
              <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-3 col-span-6">
                <CustomTextField
                  labeltext="Last Name"
                  type="text"
                  name={`Last_Name_${category}${i}`}
                  placeholder="Last Name"
                  required={true}
                  value={lastNameValue}
                  onChange={(e) =>
                    handleInputChange(
                      passengerIndex,
                      "last_name",
                      e.target.value,
                      `${category} ${i}`,
                      passengerType
                    )
                  }
                />
              </div>
              <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-3 col-span-6">
                <CustomTextField
                  labeltext="DOB"
                  type="date"
                  name={`birthday_${category}${i}`}
                  placeholder="DOB"
                  required={true}
                  value={dobValue}
                  onChange={(e) =>
                    handleInputChange(
                      passengerIndex,
                      "birthday",
                      e.target.value,
                      `${category} ${i}`,
                      category
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return passengers;
  };

  return (
    <div className="mt-6">
      <Card className={`${Styles.cardShadow} p-5`}>
        <h1 style={{ color: "red" }} className="mb-4">
          PASSENGER INFORMATION
        </h1>
        <p style={{ color: "#7e7e7e" }}>
          <b style={{ color: "black" }}>Important Note:</b> <br></br>
          As required by the airlines, passengers complete name must exactly
          match the information in the passport. If the traveler’s name has a
          suffix (e.g. Jr., Sr., II, III, etc.), please type it as shown in the
          passport. <br></br>Passengers age must correspond with the travel date
          upon booking.
        </p>

        {typeof adults === "string" &&
          parseInt(adults) > 0 &&
          renderPassengerFields(parseInt(adults), "adults")}
        {typeof childrenCount === "string" &&
          parseInt(childrenCount) > 0 &&
          renderPassengerFields(parseInt(childrenCount), "children")}
        {typeof InfantsCount === "string" &&
          parseInt(InfantsCount) > 0 &&
          renderPassengerFields(parseInt(InfantsCount), "infant")}
      </Card>
    </div>
  );
};

export default PassengerDetails;

"use client";
import React, { FC, useEffect, useState } from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";
import AutocompleteOptions from "../../../airports.json";
import Styles from "../flightsearch.module.css";
import UseCityautoComplted from "@/components/AutoComplete/CityautoComplted";
import "react-phone-number-input/style.css";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import "react-toastify/dist/ReactToastify.css";
import FlightIconImage from "@/components/Images/FlightIcon";
import DateIconImage from "@/components/Images/DateIcon";
import { Grid } from "@mui/material";
import AirportJson from "../../../components/AutoComplete/airports.json";
import { useMediaQuery } from "@mui/material";
import { airports } from "@nwpr/airport-codes";

export interface MultiCityProps {
  flight: any;
  flightsall: any;
  index: number;
  quote: boolean;
  onChange: (key: string, value: any) => void;
}
const Label = styled("label")({
  display: "block",
});
const Input = styled("input")(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  color: theme.palette.mode === "light" ? "#000" : "#fff",
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  overflow: "auto",
  maxHeight: 250,
  border: "1px solid rgba(0,0,0,.25)",
  "& li.Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));

const MultiCity: FC<MultiCityProps> = ({
  flight,
  flightsall,
  index,
  onChange,
  quote,
}) => {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: AutocompleteOptions,
    getOptionLabel: (option) => `${`${option?.name} [${option?.code}]`}`,
  });
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;
  const [SingleDatevalue, setSingleDateValue] = useState<DateValueType>({
    startDate: flight.date || formattedDate,
    endDate: flight.date || new Date(new Date().getFullYear(), 11, 1),
  });

  const handleDateChange = (value: any) => {
    onChange("date", value);

    if (flightsall.length > index + 1) {
      const updatedFlights = [...flightsall];
      for (let i = index + 1; i < updatedFlights.length; i++) {
        if (!updatedFlights[i] || !updatedFlights[i].date) {
          continue;
        }
        if (value.startDate > updatedFlights[i].date.startDate) {
          updatedFlights[i].date = null;
        }
      }
      onChange("flightsall", updatedFlights);
    }

    setSingleDateValue(value);
  };

  const filtereddestinationAirport = airports.find(
    (airport) => airport.iata === flight.destination
  )?.name;
  const filteredAirport = airports.find(
    (airport) => airport.iata === flight.departure
  )?.name;
  const matches = useMediaQuery("(max-width:767px)");

  const uptodate =
    index === 0
      ? new Date()
      : index === 1
      ? flightsall[0].date
        ? flightsall[0].date?.startDate
          ? new Date(flightsall[0].date.startDate)
          : new Date(flightsall[0].date)
        : new Date()
      : index === 2
      ? flightsall[1].date
        ? flightsall[1].date?.startDate
          ? new Date(flightsall[1].date.startDate)
          : new Date(flightsall[1].date)
        : new Date()
      : new Date();

  const getMaxDate = () => {
    if (flightsall.length === 0) {
      return undefined;
    }
    if (flightsall.length === 3) {
      if (flight.date && index !== 2 && index !== 0) {
        const latestDate = flightsall.reduce(
          (latest: Date, flight: { date: { startDate: any } }) => {
            const startDate = new Date(flight.date?.startDate || flight.date);

            return startDate > latest ? startDate : undefined;
          },
          new Date(0)
        );

        return latestDate;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  };

  return (
    <>
      <Grid item xs={12} sm={6} lg={4} md={4} xl={4}>
        {flight.departure && (
          <UseCityautoComplted
            label={"Departure"}
            placeholder={"Airport / City Name"}
            name={`departureAirport ${index}`}
            required={true}
            icon={<FlightIconImage />}
            defaultValue={`${filteredAirport}[${flight.departure}]`}
          />
        )}
        {!flight.departure && (
          <UseCityautoComplted
            label={"Departure"}
            placeholder={"Airport / City Name"}
            name={`departureAirport ${index}`}
            required={true}
            icon={<FlightIconImage />}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={6} lg={4} md={4} xl={4}>
        {flight.destination && (
          <UseCityautoComplted
            label={"Destination"}
            placeholder={"Airport / City Name"}
            name={`destinationAirport ${index}`}
            required={true}
            icon={<FlightIconImage />}
            defaultValue={`${filtereddestinationAirport}[${flight.destination}]`}
          />
        )}
        {!flight.destination && (
          <UseCityautoComplted
            label={"Destination"}
            placeholder={"Airport / City Name"}
            name={`destinationAirport ${index}`}
            required={true}
            icon={<FlightIconImage />}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={6} lg={4} md={4} xl={4}>
        <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
          <DateIconImage />
          Depart
        </label>
        <div className={`w-full md:w-auto ${Styles.datepciker}`}>
          {flight.date && (
            <Datepicker
              placeholder={"Select Date"}
              minDate={uptodate}
              maxDate={getMaxDate()}
              asSingle={true}
              readOnly
              // showShortcuts={true}
              showFooter={false}
              primaryColor={"blue"}
              inputClassName={`bg-[#F4F4F4] w-full  rounded-[5px] p-3 focus:outline-none 
              border ${SingleDatevalue ? "border-[#DADADA]" : "border-red-500"}
              h-[40px] md:h-[40px] ${Styles.inputdatepicker}`}
              value={SingleDatevalue}
              onChange={handleDateChange}
              popoverDirection={quote ? "down" : "down"}
              toggleClassName={"hidden"}
              useRange={quote ? false : matches ? false : true}
            />
          )}
          {!flight.date && (
            <Datepicker
              placeholder={"Select Date"}
              minDate={uptodate}
              maxDate={getMaxDate()}
              asSingle={true}
              readOnly
              // showShortcuts={true}
              showFooter={false}
              primaryColor={"blue"}
              inputClassName={`bg-[#F4F4F4] w-full  rounded-[5px] p-3 focus:outline-none
              border ${SingleDatevalue ? "border-[#DADADA]" : "border-red-500"}
              h-[40px] md:h-[40px] ${Styles.inputdatepicker}`}
              value={SingleDatevalue}
              onChange={handleDateChange}
              toggleClassName={"hidden"}
              popoverDirection={quote ? "down" : "down"}
              useRange={quote ? false : matches ? false : true}
            />
          )}
        </div>
      </Grid>
    </>
  );
};

export default MultiCity;

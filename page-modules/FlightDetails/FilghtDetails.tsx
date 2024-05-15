"use client";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import React, { FC } from "react";
import Styles from "./flightdetails.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useSearchFlight from "@/store/flightSearchStore";
import FlightIconImage from "@/components/Images/FlightIcon";
import { MdOutlineFlight } from "react-icons/md";
import airports from "@nwpr/airport-codes";
import airlines from "airline-codes";

interface FilghtDetailsSummaryProps {
  destinationAirport: string;
  departureAirport: string;
  cabin: string;
}
interface Segment {
  airlineCode: string;
  departureAirportCode: string;
  departureTime: string;
  arrivalAirportCode: string;
  arrivalTime: string;
  duration: number;
  aircraftModel: string;
  flightNumber: number;
  BookingClass: string;
  departureCountryCode: string;
  arrivalCountryCode: string;
}
const FilghtDetails: FC<FilghtDetailsSummaryProps> = ({
  departureAirport,
  destinationAirport,
  cabin,
}) => {
  const { rules, trips } = useSearchFlight((state) => state);
  const convertMinutesToHours = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hours ${remainingMinutes} min`;
  };
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long", // Display the full name of the day of the week
      month: "short", // Display the abbreviated month name
      day: "2-digit", // Display the day of the month with leading zeros if necessary
      year: "numeric", // Display the full numeric year
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };
  return (
    <>
      <Accordion className={`${Styles.cardShadow}`} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="p-2 m-0"
        >
          <h1 className="ml-4 text-customRed">FLIGHT DETAILS</h1>
        </AccordionSummary>
        <AccordionDetails>
          {trips.map((trip, index) => (
            <div key={index}>
              {trip.segments?.map((Segment: Segment, index: number) => (
                <>
                  <h1
                    className={`${
                      departureAirport === Segment.departureAirportCode
                        ? "block uppercase my-2  text-customBlue "
                        : "hidden"
                    }`}
                  >
                    Depart:
                  </h1>
                  <h1
                    className={`${
                      destinationAirport === Segment.departureAirportCode
                        ? "block uppercase my-2 text-customBlue pt-[7px] border-t-[2px]"
                        : "hidden"
                    }`}
                  >
                    Return:
                  </h1>
                  <div className="flex mb-2 flex-col gap-2 flex-wrap md:mb-10px md:ml-[5px]">
                    <div className="flex gap-2 items-center">
                      <h4 className="flex items-center gap-2  text-[#FF0000]">
                        {/* <MdFlightTakeoff /> */}
                        <FlightIconImage
                          fillColor="#FF0000"
                          CustomClass="w-[25px] h-[25px]"
                        />
                        <b>
                          {/* {Segment.airlineCode} */}
                          {airlines
                            .findWhere({ iata: Segment.airlineCode })
                            .get("name")}
                        </b>
                      </h4>
                      |
                      <h1 className="text-[15px] md:text-[16px] text-customBlue">
                        Flight : {""}
                        {Segment.airlineCode} {""}
                        {Segment.flightNumber}
                      </h1>
                      |
                      <h4 className="flex font-semibold items-center gap-2 capitalize text-customBlue  ">
                        {cabin === "E"
                          ? "Economy"
                          : cabin === "F"
                          ? "First Class"
                          : "Business"}
                      </h4>
                    </div>
                  </div>
                  <div className="grid grid-cols-12" key={index}>
                    <div className="col-span-12 md:col-span-3 flex mx-2">
                      <div className="flex flex-col ">
                        <h4 className="text-[14px] md:text-[15px]">
                          {formatDate(Segment.departureTime)}
                        </h4>
                        <h4 className="text-[14px] md:text-[15px]">
                          {formatTime(Segment.departureTime)}
                        </h4>
                        <p className="text-[12px]">
                          {
                            airports.find(
                              (airport) =>
                                airport.iata === Segment.departureAirportCode
                            )?.name
                          }
                        </p>
                        <h4 className="text-[14px]  md:text-[15px]">
                          {Segment.departureAirportCode}
                        </h4>
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 flex">
                      <div className="flex justify-center items-center w-full">
                        <h1 className="text-[#BDBDBD] block  text-[15px]">
                          -------
                        </h1>
                        <div className="flex justify-center items-center flex-col">
                          <h1 className="mt-0 text-center  text-[14px] md:text-[15px] leading-[21.66px]">
                            {convertMinutesToHours(Segment.duration)}
                          </h1>
                        </div>
                        <div className="flex text-[#BDBDBD] text-[15px]  justify-center items-center gap-[1px]">
                          <h1>-------</h1>
                          <MdOutlineFlight className="rotate-90 mt-[2px]" />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-3">
                      <div className="mx-2 flex flex-col justify-center ">
                        <h4 className="text-[14px] md:text-[15px]">
                          {formatDate(Segment.arrivalTime)}
                        </h4>
                        <h4 className="text-[14px] md:text-[15px]">
                          {formatTime(Segment.arrivalTime)}
                        </h4>
                        <p className="text-[12px]">
                          {
                            airports.find(
                              (airport) =>
                                airport.iata === Segment.arrivalAirportCode
                            )?.name
                          }
                        </p>
                        <h4 className="text-[14px] md:text-[15px]">
                          {Segment.arrivalAirportCode}
                        </h4>
                      </div>
                    </div>
                  </div>
                  {/* Compare arrivalTime of the last segment with departureTime of the next segment */}
                  <div
                    key={`compare-${index}`}
                    className="my-4 font-semibold text-customRed  text-center  bg-white z-[10]"
                  >
                    {convertMinutesToHours(
                      (new Date(
                        trip.segments[index + 1]?.departureTime
                      ).getTime() -
                        new Date(Segment.arrivalTime).getTime()) /
                        (1000 * 60)
                    ) === "NaN hours NaN min" ? (
                      <div></div>
                    ) : (
                      <>
                        {(destinationAirport === Segment.arrivalAirportCode) ===
                          false && (
                          <p>
                            ------- Lay over in{" "}
                            {airports.find(
                              (airport) =>
                                airport.iata === Segment.arrivalAirportCode
                            )?.city === "Angeles City"
                              ? "Pampanga (Clark)"
                              : airports.find(
                                  (airport) =>
                                    airport.iata === Segment.arrivalAirportCode
                                )?.city === "Madras"
                              ? "Chennai"
                              : airports.find(
                                  (airport) =>
                                    airport.iata === Segment.arrivalAirportCode
                                )?.city}{" "}
                            {convertMinutesToHours(
                              (new Date(
                                trip.segments[index + 1]?.departureTime
                              ).getTime() -
                                new Date(Segment.arrivalTime).getTime()) /
                                (1000 * 60)
                            )}{" "}
                            -------
                          </p>
                        )}{" "}
                      </>
                    )}
                  </div>
                </>
              ))}
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FilghtDetails;

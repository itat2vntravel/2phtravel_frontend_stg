"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import CustomButton from "@/components/Button/Button";
import FlightSearchResult from "@/action/search/FlightSearch";
import NotfoundImage from "../../public/404.jpg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Flightloader from "@/components/flightloader/flightloader";
import useModifySearch from "@/store/ModifySearch";
import FlightIconImage from "@/components/Images/FlightIcon";
import { MdOutlineFlight } from "react-icons/md";
import GotoFirstImage from "@/components/Images/GotoFirstImage";
import GotoBackImage from "@/components/Images/GotoBackImage";
import { formUrlQuery } from "@/utils/formUrlQuery";
import airlines from "airline-codes";
import airports from "@nwpr/airport-codes";
// import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import baggageIcon from "../../public/baggage-icon-blue.png";
import LoadingPage from "@/app/loading";

interface Request {
  departureAirport: string;
  destinationAirport: string;
  type: string;
  departureDate: string;
  returnDate?: string;
  // adults: number;
  adults?: number;
  depart_time?: string;
  airline?: string;
  cabin?: string;
  id?: string; // Optional
  name?: string; // Optional
  email?: string; // Optional
  phone_no?: string; // Optional
  stop?: string; // Optional
  trips?: string; // Optional
  children?: number;
}

export interface FlightCardProps {
  type: string;
  departureAirport: string;
  destinationAirport: string;
  departureDate: string;
  returnDate?: string;
  cabin?: string;
  userId: string;
  firstName: string;
  email: string;
  mobile_number: string;
  airline: string;
  stop: string;
  departtime: string;
  trips?: string; // Optional
  adults: string | 0;
  childrenCount: string | 0;
}

interface ItemType {
  totalPrice: number;
  mainAirlineCode: string;
  adultBasePrice: string;
  childBasePrice: string;
  privateFareType: string;
  duration: number;
  trips: [];
  rules: {
    baggages: [
      {
        weight?: number;
        unit?: string;
        allowancePiecesSpecified: boolean;
        allowancePieces?: number;
        unitSpecified: boolean;
        weightSpecified?: boolean;
        dimensionUnitSpecified: boolean;
        dimensionSpecified: boolean;
        segments: [];
      }
    ];
  };
}
interface TripType {
  tripTime: string;
  duration: number;
  segments: SegmentsType[];
}
interface DataType {
  airTicketListResponse: {
    routings: any;
  };
}
interface Flight {
  departure: string;
  destination: string;
  date: Date | string | null | number;
}
interface SegmentsType {
  airlineCode: string;
  flightNumber: string;
  departureAirportCode: string;
  arrivalAirportCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  stop: number;
  cabin: string;
}

const FlightCard: FC<FlightCardProps> = ({
  type,
  destinationAirport,
  departureAirport,
  departureDate,
  returnDate,
  cabin,
  firstName,
  email,
  mobile_number,
  // trips,
  adults,
  childrenCount,
}) => {
  const [data, setdata] = useState<DataType>();
  const [loading, setloading] = useState(true);
  const router = useRouter();

  const SearchParams = useSearchParams();

  const ItemsPerPage = 6;
  const MaxVisiblePages = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsToRender: ItemType[] | undefined =
    data?.airTicketListResponse?.routings;
  const stop = SearchParams.get("stop") as string;

  // Filter items based on the 'stop' query parameter
  let filteredItems = itemsToRender;

  if (stop === "non-stop") {
    filteredItems = itemsToRender?.filter((routing) =>
      routing.trips.every(
        (trip: { segments: any }) => trip?.segments.length === 1
      )
    );
  } else if (stop === "1-stop") {
    filteredItems = itemsToRender?.filter((routing) =>
      routing.trips.some(
        (trip: { segments: any }) => trip?.segments.length === 2
      )
    );
  } else if (stop === "2-stop-more") {
    filteredItems = itemsToRender?.filter((routing) =>
      routing.trips.some((trip: { segments: any }) => trip?.segments.length > 2)
    );
  } else if (stop === null) {
    // If stop is null, display all items without filtering
    filteredItems = itemsToRender;
  }

  const totalItems: number = filteredItems?.length || 0;
  const totalPages: number = Math.ceil(totalItems / ItemsPerPage);
  const [openDetailsIndex, setOpenDetailsIndex] = useState<number | null>(null); // State to track open details index
  const [ErrorMessage, setErrorMessage] = useState<string>("NO RESULTS FOUND!");

  // const totalItems: number = data?.airTicketListResponse?.routings.length || 0;
  // const totalPages: number = Math.ceil(totalItems / ItemsPerPage);

  const {
    departure,
    destination,
    departure_date,
    return_date,
    Passenger,
    cabinclass,
    modifyStatus,
    trips,
    ModifySearchStore,
  } = useModifySearch((state) => state);

  // if (isLoading) {
  //   return <div><LoadingPage/></div>;
  // }
  // await new Promise(resolve => setTimeout(resolve, 2000));
  useEffect(() => {
    ModifySearchStore({
      modifyStatus: true,
    });
    // let newUrl;
    // newUrl = formUrlQuery({
    //   params: SearchParams.toString(),
    //   keysToRemove: ["airline", "stop", "departtime"],
    // });
    // router.push(newUrl, { scroll: false });
  }, [ModifySearchStore]);

  useEffect(() => {
    const userId = String(localStorage.getItem("guestuserid"));
    // const adults = String(localStorage.getItem("adults"));
    const adultsCount = adults as number;
    const children = childrenCount as number;
    // const children = Passenger.Children;
    const airline = SearchParams.get("airline") as string;

    const departtime = SearchParams.get("departtime") as string;
    const stop = SearchParams.get("stop") as string;
    // const GetStop = SearchParams.get("stop");

    if (stop === "non-stop") {
      setCurrentPage(1);
      setOpenDetailsIndex(null);
    } else if (stop === "1-stop") {
      setCurrentPage(1);
      setOpenDetailsIndex(null);
    } else if (stop === "2-stop-more") {
      setCurrentPage(1);
      setOpenDetailsIndex(null);
    }

    if (modifyStatus === true) {
      FlightReselutApi(
        departure,
        destination,
        type,
        departure_date,
        return_date,
        cabinclass,
        adultsCount,
        children,
        userId,
        firstName,
        email,
        mobile_number,
        airline,
        stop,
        departtime,
        trips
      );
      // }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    departureAirport,
    destinationAirport,
    type,
    departureDate,
    returnDate,
    cabin,
    firstName,
    email,
    mobile_number,
    SearchParams,
    ModifySearchStore,
    departure,
    destination,
    departure_date,
    return_date,
    cabinclass,
    Passenger.Children,
    Passenger.Infants,
    trips,
    adults,
    childrenCount,
    modifyStatus,
  ]);

  const FlightReselutApi = async (
    departure: string,
    destination: string,
    type: string,
    departure_date: string,
    return_date?: string,
    _cabinclass?: string,
    adults?: number,
    children?: number,
    userId?: string,
    firstName?: string,
    email?: string,
    mobile_number?: string,
    airline?: string,
    stop?: string,
    departtime?: string,
    trips?: string
  ) => {
    setloading(true);
    try {
      const req: Request = {
        departureAirport: departure,
        destinationAirport: destination,
        type,
        departureDate: departure_date,
        returnDate: return_date,
        cabin: cabin || undefined,
        adults: adults || 0,
        children: children || 0,
        depart_time: departtime || "",
        airline: airline || "",
        trips: trips || undefined,
        // stop: stop || "",
        id: userId || undefined,
        name: !userId ? firstName || undefined : undefined,
        email: !userId ? email || undefined : undefined,
        phone_no: !userId ? mobile_number || undefined : undefined,
      };

      if (type === "roundtrip") {
        if (req.returnDate && req.departureDate) {
          const response = await FlightSearchResult(req);
          if (response.success) {
            setdata(response);
            setTimeout(() => {
              setloading(false);
            }, 3000);
            setCurrentPage(1);
            window.scroll(0, 500);
            ModifySearchStore({
              modifyStatus: false,
            });
            setOpenDetailsIndex(null);
          }
          if (response.hop2WsError) {
            setErrorMessage(response.hop2WsError?.errors[0].message as string);
          }
        }
      } else if (type === "oneway") {
        if (req.departureDate) {
          const response = await FlightSearchResult(req);
          if (response.success) {
            setdata(response);
            setTimeout(() => {
              setloading(false);
            }, 3000);
            setCurrentPage(1);
            window.scroll(0, 500);
            ModifySearchStore({
              modifyStatus: false,
            });

            setOpenDetailsIndex(null);
          }
          if (response.hop2WsError) {
            setErrorMessage(response.hop2WsError?.errors[0].message as string);
          }
        }
      } else if (type === "multicities") {
        if (req.trips) {
          const response = await FlightSearchResult(req);
          if (response.success) {
            setdata(response);
            setTimeout(() => {
              setloading(false);
            }, 3000);
            setCurrentPage(1);
            window.scroll(0, 500);
            ModifySearchStore({
              modifyStatus: false,
            });
            setOpenDetailsIndex(null);
          }
          if (response.hop2WsError) {
            setErrorMessage(response.hop2WsError?.errors[0].message as string);
          }
        }
      }
    } catch (error) {
      setloading(false);
      console.error("Flight search failed:", error);
      // You can handle the error here, e.g., show a notification to the user
      throw error; // Rethrow the error so that the caller can handle it if needed
    }
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

  const goToPage = (pageNumber: number) => {
    window.scroll(0, 500);
    setCurrentPage(pageNumber);
    setOpenDetailsIndex(null);
  };

  const goToPreviousPage = () => {
    window.scroll(0, 500);
    setCurrentPage((prevPage) => prevPage - 1);
    setOpenDetailsIndex(null);
  };

  const goToNextPage = () => {
    window.scroll(0, 500);
    setCurrentPage((prevPage) => prevPage + 1);
    setOpenDetailsIndex(null);
  };
  const goToFirstPage = () => {
    window.scroll(0, 500);
    setCurrentPage(1);
    setOpenDetailsIndex(null);
  };

  const goToLastPage = () => {
    window.scroll(0, 500);
    setCurrentPage(totalPages);
    setOpenDetailsIndex(null);
  };
  const convertMinutesToHours = (minutes: number): string => {
    if (minutes >= 1440) {
      // If duration is 24 hours or more
      const days = Math.floor(minutes / 1440); // Calculate days
      const remainingHours = Math.floor((minutes % 1440) / 60); // Calculate remaining hours
      const remainingMinutes = minutes % 60; // Calculate remaining minutes
      return `${days} days ${remainingHours} hours ${remainingMinutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hours ${remainingMinutes} min`;
    }
  };

  const renderItems = () => {
    const itemsToRender: ItemType[] | undefined =
      data?.airTicketListResponse?.routings;

    const stop = SearchParams.get("stop") as string;

    let filteredItems = itemsToRender;

    if (modifyStatus) {
      if (stop === "non-stop") {
        filteredItems = itemsToRender?.filter((routing) =>
          routing.trips.every(
            (trip: { segments: any }) => trip?.segments.length === 1
          )
        );
      } else if (stop === "1-stop") {
        filteredItems = itemsToRender?.filter((routing) =>
          routing.trips.some(
            (trip: { segments: any }) => trip?.segments.length === 2
          )
        );
      } else if (stop === "2-stop-more") {
        filteredItems = itemsToRender?.filter((routing) =>
          routing.trips.some(
            (trip: { segments: any }) => trip?.segments.length > 2
          )
        );
      } else if (stop === null) {
        // If stop is null, display all items without filtering
        filteredItems = itemsToRender;
      }
    }
    const price = SearchParams.get("price") as string;

    if (price === null) {
      filteredItems = filteredItems?.sort(
        (a, b) => a.totalPrice - b.totalPrice
      );
    } else if (price === "Higher") {
      filteredItems = filteredItems?.sort(
        (a, b) => b.totalPrice - a.totalPrice
      );
    }

    const startIndex: number = (currentPage - 1) * ItemsPerPage;
    const endIndex: number = Math.min(startIndex + ItemsPerPage, totalItems);
    const renderPriceLabel = () => {
      let priceLabel = "Lower Price";

      const price = SearchParams.get("price");

      if (price === "Higher") {
        priceLabel = "Highest Price";
      } else if (price === "Best") {
        priceLabel = "best Price";
      } else {
        priceLabel = "Lowest Price";
      }

      return priceLabel;
    };

    const toggleDetails = (index: number) => {
      if (openDetailsIndex === index) {
        setOpenDetailsIndex(null); // Close details if already open
      } else {
        setOpenDetailsIndex(index); // Open details for the clicked item
      }
    };
    const renderDetailsSection = (routing: ItemType, index: number) => {
      if (openDetailsIndex === index) {
        return (
          <div className="grid grid-cols-12 shadow-custom mt-[-13px] mx-[20px] mb-3  border  p-6">
            <div className="col-span-12 md:col-span-12 border-r-[2px]  border-r-[#DDDDDD]">
              {routing.trips?.map((trip: TripType) =>
                trip?.segments?.map((Segment: SegmentsType, index: number) => (
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
                      {/* <div className="col-span-12 md:col-span-2">
                        <h1 className="text-[15px] md:text-[16px] text-customBlue">
                          Flight :{Segment.airlineCode} {""}
                          {Segment.flightNumber}
                        </h1>
                        <h4 className="flex font-semibold items-center gap-2 capitalize text-customBlue  ">
                          {cabin === "E"
                            ? "Economy"
                            : cabin === "F"
                            ? "First Class"
                            : "Business"}
                        </h4>
                      </div> */}
                      <div className="col-span-12 md:col-span-3 flex mx-2">
                        <div className="flex flex-col ">
                          <h4 className="text-[14px] md:text-[15px]">
                            {formatDate(Segment.departureTime)}
                          </h4>
                          <h4 className="text-[14px] md:text-[15px]">
                            {formatTime(Segment.departureTime)}
                          </h4>
                          <p className="text-[12px]">
                            {/* {Segment.departureAirportCode} */}
                            {
                              airports.find(
                                (airport) =>
                                  airport.iata === Segment.departureAirportCode
                              )?.name
                            }
                            {/* [{Segment.departureAirportCode}] */}
                            {/* {airports.find(
                              (airport) =>
                                airport.iata === Segment.departureAirportCode
                            )?.city === "Angeles City"
                              ? "Pampanga (Clark)"
                              : airports.find(
                                  (airport) =>
                                    airport.iata ===
                                    Segment.departureAirportCode
                                )?.city === "Madras"
                              ? "Chennai"
                              : airports.find(
                                  (airport) =>
                                    airport.iata ===
                                    Segment.departureAirportCode
                                )?.city} */}
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
                            {/* <h1 className="text-[#BDBDBD] text-[12px] md:text-[16px]">
                              {trip?.segments.length.toString() === "1"
                                ? "Non-stop"
                                : trip?.segments.length.toString() === "2"
                                ? "1 Stop"
                                : "2 Stops or More"}
                            </h1> */}
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
                            {/* {Segment.arrivalAirportCode} */}
                            {/* {
                              airports.find(
                                (airport) =>
                                  airport.iata === Segment.arrivalAirportCode
                              )?.city
                            } */}
                            {/* {airports.find(
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
                                )?.city} */}
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
                          trip?.segments[index + 1]?.departureTime
                        ).getTime() -
                          new Date(Segment.arrivalTime).getTime()) /
                          (1000 * 60)
                      ) === "NaN hours NaN min" ? (
                        <div></div>
                      ) : (
                        <>
                          {(destinationAirport ===
                            Segment.arrivalAirportCode) ===
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
                                      airport.iata ===
                                      Segment.arrivalAirportCode
                                  )?.city === "Madras"
                                ? "Chennai"
                                : airports.find(
                                    (airport) =>
                                      airport.iata ===
                                      Segment.arrivalAirportCode
                                  )?.city}{" "}
                              {convertMinutesToHours(
                                (new Date(
                                  trip?.segments[index + 1]?.departureTime
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
                ))
              )}
              <hr />
              {routing?.rules?.baggages !== null ? (
                routing.rules.baggages[0]?.weightSpecified === true && (
                  <div className="flex pt-[5px] md:pt-[13px]">
                    <div>
                      <Image
                        src={baggageIcon}
                        alt="baggage-icon"
                        width={1000}
                        height={100}
                        className="w-[100px] h-auto filter brightness-50"
                      />
                    </div>

                    <div className="flex flex-col pl-[20px] items-center">
                      {/* <h6>
                        Weight Specified:
                        {routing.rules.baggages[0]?.weightSpecified === true
                          ? "Yes"
                          : "No"}
                      </h6> */}
                      <h6>
                        Weight : {""}
                        {routing.rules.baggages[0]?.weight}
                        {routing.rules.baggages[0]?.unit}
                      </h6>
                      {/* <h6>Unit:{routing.rules.baggages[0]?.unit}</h6> */}
                    </div>

                    {/* <h6>Trip:{routing.rules.baggages[0]?.segments}</h6> */}
                  </div>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      }
      return null;
    };
    const formatNameAndCode = (input: string): Flight[] => {
      const segments = input?.split("|");
      const output = segments?.map((segment) => {
        const [departure, destination, dateStr] = segment.split(",");
        const year = dateStr?.substr(4, 4);
        const month = dateStr?.substr(0, 2);
        const day = dateStr?.substr(2, 2);
        const formattedDate = dateStr ? `${year}-${month}-${day}` : null;
        return {
          departure: `${
            airports.find((airport) => airport.iata === departure)?.name
          }[${departure}]`,
          destination: `${
            airports.find((airport) => airport.iata === destination)?.name
          }[${destination}]`,
          date: formattedDate,
        };
      });
      return output;
    };
    const numberWithCommas = (x: number) => {
      // Split the number into integer and decimal parts
      const parts = x.toString().split(".");
      // Add commas to the integer part
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // Join the parts back together with a decimal point
      return parts.join(".");
    };

    const tripsList = trips as string;
    const MulticityAirport = formatNameAndCode(tripsList);
    const RoundtripAirport = [
      {
        departure: `${
          airports.find((airport) => airport.iata === departure)?.name
        }[${departure}]`,
        destination: `${
          airports.find((airport) => airport.iata === destination)?.name
        }[${destination}]`,
      },
      {
        destination: `${
          airports.find((airport) => airport.iata === departure)?.name
        }[${departure}]`,
        departure: `${
          airports.find((airport) => airport.iata === destination)?.name
        }[${destination}]`,
      },
    ];
    const OnewaytripAirport = [
      {
        departure: `${
          airports.find((airport) => airport.iata === departure)?.name
        }[${departure}]`,
        destination: `${
          airports.find((airport) => airport.iata === destination)?.name
        }[${destination}]`,
      },
    ];

    return filteredItems?.slice(startIndex, endIndex)?.map((routing, index) => (
      <div key={index}>
        <>
          {type === "multicities" && (
            <div className="grid grid-cols-12 shadow-custom mb-3 w-full border rounded-lg p-6 mt-3 lg:mt-0">
              <div className="col-span-12 md:col-span-9 h-auto border-r-[2px]  border-r-[#DDDDDD] ">
                <h4 className="flex gap-2 mb-2 text-[#FF0000]">
                  {/* <MdFlightTakeoff /> */}
                  <FlightIconImage
                    fillColor="#FF0000"
                    CustomClass="w-[25px] h-[25px]"
                  />
                  <b>
                    {airlines
                      .findWhere({ iata: routing.mainAirlineCode })
                      .get("name")}
                  </b>
                </h4>
                {MulticityAirport?.map((item, index) => {
                  const trip = routing.trips[index] as TripType;

                  const firstSegment = trip?.segments[0];
                  const lastSegment = trip?.segments[trip?.segments.length - 1];
                  const totalDuration = trip?.segments.reduce(
                    (acc, segment) => acc + Number(segment.duration),
                    0
                  );

                  // Calculate total duration based on the length of trip.segments
                  let total: number;
                  if (trip?.segments.length <= 1) {
                    // If there is only one segment or no segments, calculate total directly from segments
                    total = trip?.segments.reduce(
                      (acc, segment) => acc + Number(segment.duration),
                      0
                    );
                  } else {
                    // If there are multiple segments, calculate sum of durations between consecutive segments
                    total = trip?.segments.reduce((acc, segment, index) => {
                      const nextSegment = trip.segments[index + 1];
                      if (nextSegment) {
                        const durationToNextSegment =
                          (new Date(nextSegment.departureTime).getTime() -
                            new Date(segment.arrivalTime).getTime()) /
                          (1000 * 60);
                        return acc + durationToNextSegment + totalDuration;
                      }
                      return acc;
                    }, 0);
                  }
                  return (
                    <>
                      <div className="grid grid-cols-12 mt-2" key={index}>
                        <div className="col-span-12 md:col-span-3 flex mx-2">
                          <div className="flex flex-col ">
                            <p className="text-[14px] md:text-[15px]">
                              {item.departure}
                            </p>
                            <p>{formatTime(firstSegment?.departureTime)}</p>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-5 flex">
                          <div className="flex justify-center items-center w-full">
                            <h1 className="text-[#BDBDBD] block  text-[15px] pr-1 whitespace-nowrap">
                              -------
                            </h1>
                            <div className="flex justify-center items-center flex-col">
                              <h1 className="mt-[10px] text-center md:mt-0 text-[13px] leading-[21.66px]">
                                {convertMinutesToHours(total)}
                                {/* brack */}
                              </h1>
                              <h1 className="mt-[10px] text-center md:mt-0 text-[13px] leading-[21.66px]">
                                {trip?.segments.length === 1
                                  ? "Non-stop"
                                  : trip?.segments.length === 2
                                  ? `1 Stop`
                                  : `2 Stops or More`}
                              </h1>
                            </div>
                            <div className="flex text-[#BDBDBD] text-[15px]  justify-center items-center gap-[1px]">
                              <h1 className="pl-1 whitespace-nowrap">
                                -------
                              </h1>
                              <MdOutlineFlight className="rotate-90 mt-[2px]" />
                            </div>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                          <div className="mx-2 flex flex-col justify-center ">
                            <p className="text-[14px] md:text-[15px]">
                              {/* {
                              airports.find(
                                (airport) => airport.iata === item.destination
                              )?.name
                            } */}
                              {item.destination}
                            </p>
                            <p>{formatTime(lastSegment?.arrivalTime)}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div>
                  <button
                    className="text-customBlue cursor-pointer mt-2 font-semibold hidden md:flex items-center"
                    // onClick={handleopen}
                    onClick={() => toggleDetails(index)}
                  >
                    {openDetailsIndex === index ? (
                      <FaCaretUp
                        className="ml-2"
                        onClick={() => toggleDetails(index)}
                      />
                    ) : (
                      <FaCaretDown
                        className="ml-2"
                        onClick={() => toggleDetails(index)}
                      />
                    )}
                    View Details
                  </button>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 h-auto ">
                <div className="flex flex-col h-full justify-center md:items-center mx-5">
                  <h1 className="text-[20px] md:text-[30px]  text-[#EC2719]">
                    ${numberWithCommas(routing.totalPrice)}*
                  </h1>
                  {startIndex === 0 && index < 3 ? (
                    <h1 className="text-customBlue">{renderPriceLabel()}</h1>
                  ) : null}
                  <CustomButton
                    type={`button`}
                    text={`Select`}
                    customclass="bg-[#152D54] !rounder-[6px] text-white border-none w-full"
                    routing={routing}
                  />
                  <button
                    className="text-customRed cursor-pointer  mt-2 font-semibold md:hidden flex items-center"
                    // onClick={handleopen}
                    onClick={() => toggleDetails(index)}
                  >
                    {openDetailsIndex === index ? (
                      <FaCaretUp
                        className="ml-2"
                        onClick={() => toggleDetails(index)}
                      />
                    ) : (
                      <FaCaretDown
                        className="ml-2"
                        onClick={() => toggleDetails(index)}
                      />
                    )}
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )}
          {type === "roundtrip" && (
            <div className="grid grid-cols-12 shadow-custom mb-3 w-full border rounded-lg p-6 mt-3 lg:mt-0">
              <div className="col-span-12 md:col-span-9 h-auto border-r-[2px]  border-r-[#DDDDDD]">
                <h4 className="flex gap-2 mb-2 text-[#FF0000]">
                  {/* <MdFlightTakeoff /> */}
                  <FlightIconImage
                    fillColor="#FF0000"
                    CustomClass="w-[25px] h-[25px]"
                  />
                  <b>
                    {airlines
                      .findWhere({ iata: routing.mainAirlineCode })
                      .get("name")}
                    {/* {routing.mainAirlineCode} */}
                  </b>
                </h4>
                {RoundtripAirport?.map((item, index) => {
                  const trip = routing.trips[index] as TripType;
                  // Initialize a Set to store unique departure airport codes
                  const uniqueDepartureAirportCodes: Set<string> = new Set();

                  // Iterate over each trip and its segments
                  routing.trips.forEach((trip: TripType) => {
                    trip?.segments.forEach((segment: SegmentsType) => {
                      // Extract departure airport code from each segment
                      const extractedDeparture: string =
                        segment.departureAirportCode;

                      // Add the departure airport code to the Set
                      uniqueDepartureAirportCodes.add(extractedDeparture);
                    });
                  });

                  // Convert the Set to an array
                  const departureAirportCodes: string[] = Array.from(
                    uniqueDepartureAirportCodes
                  );

                  const extractedDeparture: string =
                    item.departure.match(/\[(.*?)\]/)![1];
                  const extractedDestination: string =
                    item.destination.match(/\[(.*?)\]/)![1];
                  const filteredArray = departureAirportCodes.filter(
                    (code) =>
                      code !== extractedDeparture &&
                      code !== extractedDestination
                  );

                  const firstSegment = trip?.segments[0];
                  const lastSegment = trip?.segments[trip?.segments.length - 1];
                  const totalDuration = trip?.segments.reduce(
                    (acc, segment) => acc + Number(segment.duration),
                    0
                  );

                  // Calculate total duration based on the length of trip.segments
                  let total: number;
                  if (trip?.segments.length <= 1) {
                    // If there is only one segment or no segments, calculate total directly from segments
                    total = trip?.segments.reduce(
                      (acc, segment) => acc + Number(segment.duration),
                      0
                    );
                  } else {
                    // If there are multiple segments, calculate sum of durations between consecutive segments
                    total = trip?.segments.reduce((acc, segment, index) => {
                      const nextSegment = trip?.segments[index + 1];
                      if (nextSegment) {
                        const durationToNextSegment =
                          (new Date(nextSegment.departureTime).getTime() -
                            new Date(segment.arrivalTime).getTime()) /
                          (1000 * 60);
                        return acc + durationToNextSegment + totalDuration;
                      }
                      return acc;
                    }, 0);
                  }
                  return (
                    <>
                      <div className="grid grid-cols-12 mt-2" key={index}>
                        <div className="col-span-12 md:col-span-3 flex mx-2">
                          <div className="flex flex-col ">
                            <p className="text-[14px] md:text-[15px]">
                              {item.departure}
                            </p>
                            <p>{formatTime(firstSegment?.departureTime)}</p>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-5 flex">
                          <div className="flex justify-center items-center w-full">
                            <h1 className="text-[#BDBDBD] block  text-[15px] pr-1 whitespace-nowrap">
                              -------
                            </h1>
                            <div className="flex justify-center items-center flex-col">
                              <h1 className="mt-[10px] text-center md:mt-0 text-[13px] leading-[21.66px]">
                                {convertMinutesToHours(total)}
                                {/* brack */}
                              </h1>
                              <h1 className="mt-[10px] text-center  md:mt-0 text-[13px] leading-[21.66px]">
                                {trip?.segments.length === 1
                                  ? "Non-stop"
                                  : trip?.segments.length === 2
                                  ? `1 Stop `
                                  : `2 Stops or More`}
                              </h1>
                            </div>
                            <div className="flex text-[#BDBDBD] text-[15px]  justify-center items-center gap-[1px]">
                              <h1 className="pl-1 whitespace-nowrap">
                                -------
                              </h1>
                              <MdOutlineFlight className="rotate-90 mt-[2px]" />
                            </div>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                          <div className="mx-2 flex flex-col justify-center ">
                            <p className="text-[14px] md:text-[15px]">
                              {/* {
                              airports.find(
                                (airport) => airport.iata === item.destination
                              )?.name
                            } */}
                              {item.destination}
                            </p>
                            <p>{formatTime(lastSegment?.arrivalTime)}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div>
                  <button
                    className="text-customBlue cursor-pointer mt-2 font-semibold hidden md:flex items-center"
                    // onClick={handleopen}
                    onClick={() => toggleDetails(index)}
                  >
                    {openDetailsIndex === index ? (
                      <FaCaretUp
                        className="ml-2"
                        onClick={() => toggleDetails(index)}
                      />
                    ) : (
                      <FaCaretDown
                        className="ml-2"
                        onClick={() => toggleDetails(index)}
                      />
                    )}
                    View Details
                  </button>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 h-auto ">
                <div className="flex flex-col h-full justify-center md:items-center mx-5">
                  <h1 className="text-[20px] md:text-[30px]  text-[#EC2719]">
                    ${numberWithCommas(routing.totalPrice)}*
                  </h1>
                  {startIndex === 0 && index < 3 ? (
                    <h1 className="text-customBlue">{renderPriceLabel()}</h1>
                  ) : null}
                  <CustomButton
                    type={`button`}
                    text={`Select`}
                    customclass="bg-[#152D54] !rounder-[6px] text-white border-none w-full"
                    routing={routing}
                  />
                  <button
                    className="text-customRed cursor-pointer  mt-2 font-semibold md:hidden flex items-center"
                    // onClick={handleopen}
                    onClick={() => toggleDetails(index)}
                  >
                    {openDetailsIndex === index ? (
                      <FaCaretUp
                        className="ml-2"
                        onClick={() => toggleDetails(index)}
                      />
                    ) : (
                      <FaCaretDown
                        className="ml-2"
                        onClick={() => toggleDetails(index)}
                      />
                    )}
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )}
          {type === "oneway" && (
            <div className="grid grid-cols-12 shadow-custom mb-3 w-full border rounded-lg p-6 mt-3 lg:mt-0">
              <div className="col-span-12 md:col-span-9 h-auto border-r-[2px]  border-r-[#DDDDDD]">
                <h4 className="flex gap-2 mb-2 text-[#FF0000]">
                  {/* <MdFlightTakeoff /> */}
                  <FlightIconImage
                    fillColor="#FF0000"
                    CustomClass="w-[25px] h-[25px]"
                  />
                  <b>
                    {airlines
                      .findWhere({ iata: routing.mainAirlineCode })
                      .get("name")}
                    {/* {routing.mainAirlineCode} */}
                  </b>
                </h4>
                {OnewaytripAirport?.map((item, index) => {
                  const trip = routing.trips[index] as TripType;
                  // Initialize a Set to store unique departure airport codes
                  const uniqueDepartureAirportCodes: Set<string> = new Set();

                  // Iterate over each trip and its segments
                  routing.trips.forEach((trip: TripType) => {
                    trip?.segments.forEach((segment: SegmentsType) => {
                      // Extract departure airport code from each segment
                      const extractedDeparture: string =
                        segment.departureAirportCode;

                      // Add the departure airport code to the Set
                      uniqueDepartureAirportCodes.add(extractedDeparture);
                    });
                  });

                  // Convert the Set to an array
                  const departureAirportCodes: string[] = Array.from(
                    uniqueDepartureAirportCodes
                  );

                  const extractedDeparture: string =
                    item.departure.match(/\[(.*?)\]/)![1];
                  const extractedDestination: string =
                    item.destination.match(/\[(.*?)\]/)![1];
                  const filteredArray = departureAirportCodes.filter(
                    (code) =>
                      code !== extractedDeparture &&
                      code !== extractedDestination
                  );

                  const firstSegment = trip?.segments[0];
                  const lastSegment = trip?.segments[trip?.segments.length - 1];
                  const totalDuration = trip?.segments.reduce(
                    (acc, segment) => acc + Number(segment.duration),
                    0
                  );

                  // Calculate total duration based on the length of trip.segments
                  let total: number;
                  if (trip?.segments.length <= 1) {
                    // If there is only one segment or no segments, calculate total directly from segments
                    total = trip?.segments.reduce(
                      (acc, segment) => acc + Number(segment.duration),
                      0
                    );
                  } else {
                    // If there are multiple segments, calculate sum of durations between consecutive segments
                    total = trip?.segments.reduce((acc, segment, index) => {
                      const nextSegment = trip?.segments[index + 1];
                      if (nextSegment) {
                        const durationToNextSegment =
                          (new Date(nextSegment.departureTime).getTime() -
                            new Date(segment.arrivalTime).getTime()) /
                          (1000 * 60);
                        return acc + durationToNextSegment + totalDuration;
                      }
                      return acc;
                    }, 0);
                  }
                  return (
                    <>
                      <div className="grid grid-cols-12 mt-2" key={index}>
                        <div className="col-span-12 md:col-span-3 flex mx-2">
                          <div className="flex flex-col ">
                            <p className="text-[14px] md:text-[15px]">
                              {item.departure}
                            </p>
                            <p>{formatTime(firstSegment?.departureTime)}</p>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-5 flex">
                          <div className="flex justify-center items-center w-full">
                            <h1 className="text-[#BDBDBD] block   text-[15px] pr-1 whitespace-nowrap">
                              -------
                            </h1>
                            <div className="flex justify-center items-center flex-col">
                              <h1 className="mt-[10px] text-center md:mt-0 text-[13px] leading-[21.66px]">
                                {convertMinutesToHours(total)}
                                {/* brack */}
                              </h1>
                              <h1 className="mt-[10px] text-center md:mt-0 text-[13px] leading-[21.66px]">
                                {trip?.segments.length === 1
                                  ? "Non-stop"
                                  : trip?.segments.length === 2
                                  ? `1 Stop `
                                  : `2 Stops or More`}
                              </h1>
                            </div>
                            <div className="flex text-[#BDBDBD] text-[15px]  justify-center items-center gap-[1px] whitespace-nowrap">
                              <h1 className="pl-1 whitespace-nowrap">
                                -------
                              </h1>
                              <MdOutlineFlight className="rotate-90 mt-[2px]" />
                            </div>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                          <div className="mx-2 flex flex-col justify-center ">
                            <p className="text-[14px] md:text-[15px]">
                              {/* {
                              airports.find(
                                (airport) => airport.iata === item.destination
                              )?.name
                            } */}
                              {item.destination}
                            </p>
                            <p>{formatTime(lastSegment?.arrivalTime)}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div>
                  <button
                    className="text-customBlue cursor-pointer  mt-2 font-semibold hidden md:flex items-center"
                    // onClick={handleopen}
                    onClick={() => toggleDetails(index)}
                  >
                    {openDetailsIndex === index ? (
                      <FaCaretUp
                        className="ml-2"
                        onClick={() => toggleDetails(index)}
                      />
                    ) : (
                      <FaCaretDown
                        className="ml-2"
                        onClick={() => toggleDetails(index)}
                      />
                    )}
                    View Details
                  </button>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 h-auto ">
                <div className="flex flex-col h-full justify-center md:items-center mx-5">
                  <h1 className="text-[20px] md:text-[30px]  text-[#EC2719]">
                    ${numberWithCommas(routing.totalPrice)}*
                  </h1>
                  {startIndex === 0 && index < 3 ? (
                    <h1 className="text-customBlue">{renderPriceLabel()}</h1>
                  ) : null}
                  <CustomButton
                    type={`button`}
                    text={`Select`}
                    customclass="bg-[#152D54] !rounder-[6px] text-white border-none w-full"
                    routing={routing}
                  />
                  <div>
                    <button
                      className="text-customRed cursor-pointer  mt-2 font-semibold md:hidden flex items-center"
                      // onClick={handleopen}
                      onClick={() => toggleDetails(index)}
                    >
                      {openDetailsIndex === index ? (
                        <FaCaretUp
                          className="ml-2"
                          onClick={() => toggleDetails(index)}
                        />
                      ) : (
                        <FaCaretDown
                          className="ml-2"
                          onClick={() => toggleDetails(index)}
                        />
                      )}
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {renderDetailsSection(routing, index)}
        </>
      </div>
    ));
  };
  const handleModify = () => {
    router.push("/flight/search#GoModify");
  };

  const renderPagination = () => {
    const paginationItems: JSX.Element[] = [];
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > MaxVisiblePages) {
      const halfVisiblePages = Math.floor(MaxVisiblePages / 2);
      startPage = Math.max(1, currentPage - halfVisiblePages);
      endPage = Math.min(totalPages, startPage + MaxVisiblePages - 1);

      if (endPage - startPage < MaxVisiblePages - 1) {
        startPage = Math.max(1, endPage - MaxVisiblePages + 1);
      }

      if (startPage < 1) {
        // paginationItems.push(
        //   <button
        //     key="first"
        //     onClick={goToFirstPage}
        //     className="mx-1 px-3 py-1  rounded-[10px]  border-[#DCDCDC] border-[2px]"
        //   >
        //     1
        //   </button>
        // );
        if (startPage > 2) {
          paginationItems.push(
            <span
              key="ellipsis-start"
              className="mx-1 rounded-[10px]   md:px-3 md:py-1 w-[32px] md:w-auto  text-center  h-[30px] md:h-[44px]  border-[#DCDCDC] my-2 md:my-0 border-[2px]"
            >
              ...
            </span>
          );
        }
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`mx-1  rounded-[10px]  text-center  w-[30px] h-[30px] md:w-[44px] md:h-[44px]  border-[#DCDCDC] my-2 md:my-0 border-[2px] ${
            i === currentPage ? "bg-[#152D54] text-white" : "bg-white "
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationItems.push(
          <span
            key="ellipsis-end"
            className="mx-1 md:px-3 my-2 md:my-0 md:py-1 rounded-[10px]  border-[#DCDCDC] border-[2px] bg-white w-[32px] md:w-auto  text-center"
          >
            ...
          </span>
        );
      }
      paginationItems.push(
        <button
          key="last"
          onClick={goToLastPage}
          className="mx-1 my-2 md:my-0 text-center w-[30px] h-[30px] md:w-[44px] md:h-[44px] rounded-[10px]  border-[#DCDCDC] border-[2px]"
        >
          {totalPages}
        </button>
      );
    }
    return { paginationItems, endPage };
  };
  const { paginationItems, endPage } = renderPagination();
  const Price = SearchParams.get("price") as string;
  const handlePriceFilter = (priceValue: string) => {
    let newUrl;
    if (priceValue === "Lower") {
      newUrl = formUrlQuery({
        params: SearchParams.toString(),
        keysToRemove: ["price"],
      });
    } else {
      newUrl = formUrlQuery({
        params: SearchParams.toString(),
        key: "price",
        value: priceValue,
      });
    }

    router.push(newUrl, { scroll: false });
    setCurrentPage(1);
    // setTimeout(() => {
    //   ModifySearchStore({
    //     modifyStatus: true,
    //   });
    // }, 5000);
    // ModifySearchStore({
    //   modifyStatus: true,
    // });
  };
  return (
    <>
      {loading ? (
        <>
          <div className="h-[30vh] flex justify-center items-center shadow-custom">
            <Flightloader />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 w-[50%] border mb-5 mt-[10px] md:mt-0 rounded-[10px]">
            <div
              className={`p-2 font-semibold text-center text-[15px] md:text-[20px] rounded-[10px]   border-r cursor-pointer ${
                Price === null ? "bg-customBlue text-white" : ""
              }`}
              onClick={() => handlePriceFilter("Lower")}
            >
              Cheapest
            </div>
            <div
              className={`p-2  rounded-[10px] font-semibold text-center text-[15px] md:text-[20px] border-r cursor-pointer ${
                Price === "Higher" ? "bg-customBlue text-white" : ""
              }`}
              onClick={() => handlePriceFilter("Higher")}
            >
              Highest
            </div>
            {/* <div
              className={`p-3 font-semibold text-center text-[15px] md:text-[30px] border-r cursor-pointer ${
                Price === "Best" ? "bg-customBlue text-white" : ""
              }`}
              onClick={() => handlePriceFilter("Best")}
            >
              Best
            </div> */}
          </div>
          {renderItems()}
          {/* Render pagination buttons */}
          <div className=" flex flex-wrap gap-[0px] md:gap-0 justify-center mx-[10px] md:mx-0 my-[20px]">
            {totalPages > 1 && (
              <>
                <button
                  onClick={goToFirstPage}
                  className="mx-1 p-0 md:p-1 my-2 md:my-0 w-[30px] h-[30px] md:w-[44px] md:h-[44px] rounded-[10px] border-[#DCDCDC] border-[2px]"
                  disabled={currentPage === 1}
                >
                  <GotoFirstImage CustomClass="w-[26px] h-auto" />
                </button>
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="mx-1 my-2 md:my-0 p-0 md:p-1 w-[30px] h-[30px] md:w-[44px] md:h-[44px] rounded-[10px] border-[#DCDCDC] border-[2px]"
                >
                  <GotoBackImage CustomClass="w-[26px] h-auto" />
                </button>
                {paginationItems}
                <button
                  onClick={goToNextPage}
                  disabled={
                    currentPage === totalPages || currentPage === endPage
                  }
                  className="mx-1 p-0 md:p-1 w-[30px] my-2 md:my-0 h-[30px] md:w-[44px] md:h-[44px]  rounded-[10px] border-[#DCDCDC] border-[2px]"
                >
                  <div className="rotate-180">
                    <GotoBackImage CustomClass="w-[26px] h-auto" />
                  </div>
                </button>
                <button
                  onClick={goToLastPage}
                  disabled={
                    currentPage === totalPages || currentPage === endPage
                  }
                  className="mx-1 p-0 md:p-1 my-2 md:my-0 w-[30px] h-[30px] md:w-[44px] md:h-[44px] flex items-center rounded-[10px] border-[#DCDCDC] border-[2px]"
                >
                  <div className="rotate-180">
                    <GotoFirstImage CustomClass="w-[26px] h-auto" />
                  </div>
                </button>
              </>
            )}
          </div>
          {totalItems === 0 && (
            <>
              <>
                <div className="h-full flex flex-col justify-center items-center border p-5">
                  <Image
                    src={NotfoundImage}
                    alt="404 Image"
                    width={500}
                    height={100}
                    className="w-[200px] h-[200px]"
                  />
                  <h1 className="block uppcase text-red-600 text-[18px] text-center">
                    {" "}
                    {ErrorMessage === "No Tickets."
                      ? "No Available Flights "
                      : "No Available Flights "}
                  </h1>
                  <h1 className="block text-[15px] text-center max-w-md">
                    {" "}
                    {ErrorMessage === "No Tickets."
                      ? "Please double-check your information and attempt your search once more for available options."
                      : `Please double-check your information and attempt your search once more for available options.`}
                  </h1>

                  {ErrorMessage === "No Tickets." && (
                    <button
                      className={`w-auto text-[18px] rounded-[6px] font-semibold   font-main px-5 py-2 text-customBlue hover:underline hover:underline-offset-4  bg-white
                  `}
                      type="button"
                      onClick={handleModify}
                    >
                      Explore More
                    </button>
                  )}
                </div>
              </>
            </>
          )}
        </>
      )}
    </>
  );
};

export default FlightCard;

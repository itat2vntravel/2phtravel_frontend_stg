"use client";
import UseCityautoComplted from "@/components/AutoComplete/CityautoComplted";

import CustomMenu from "@/components/CustomMenu/CustomMenu";
import DateIconImage from "@/components/Images/DateIcon";
import FlightClassImage from "@/components/Images/FlightClass";
import FlightIconImage from "@/components/Images/FlightIcon";
import PassangerIconImage from "@/components/Images/PassangerIcon";
import useModifySearch from "@/store/ModifySearch";
import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  useMediaQuery,
} from "@mui/material";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import MultiCity from "../FlightSearch/Multicity/multicity";
import SearchFlights from "@/action/search flight/searchflight";
import UseModifyAutocomplete from "@/components/AutoComplete/Modifyautocomplete";
// import AirportJson from "../../components/AutoComplete/airports.json";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Styles from "./ModifySearch.module.css";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import useBookingQuote from "@/store/BookingQuote";
import airports from "@nwpr/airport-codes";
import Swal from "sweetalert2";
import { formUrlQuery } from "@/utils/formUrlQuery";
import ModifySearchButton from "./ModifySerachButton";
import useSearchFlight from "@/store/flightSearchStore";

interface Result {
  trips: Trip[];
  realIndexCount: number;
  tripsCount: number;
}
interface Trip {
  departure: string;
  destination: string;
  date: string | null;
}
interface Flight {
  departure: string;
  destination: string;
  date: Date | string | null | number;
}
interface ModifySearchProps {
  trips: string;
  cabin?: string;
  departureAirport?: string | undefined;
  destinationAirport?: string | undefined;
  adults: string | 0;
  childrenCount: string | 0;
  tripsmodify: string;
  cabinmodify?: string;
  departureAirportmodify?: string | undefined;
  typemodify?: string | undefined;
  departureDatemodify?: string | undefined;
  returnDatemodify?: string | undefined;
  destinationAirportmodify?: string | undefined;
  adultsmodify: string | 0;
  childrenmodify: string | 0;
  Infantsmodify: string | 0;
}
interface ItemType {
  totalPrice: number;
  mainAirlineCode: string;
  adultBasePrice: string;
  childBasePrice: string;
  privateFareType: string;
  duration: number;
  trips: [];
}
interface TripType {
  tripTime: string;
  duration: number;
  segments: [];
}
interface DataType {
  airTicketListResponse: {
    routings: any;
  };
}
interface SegmentsType {
  airlineCode: string;
  departureAirportCode: string;
  arrivalAirportCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  stop: number;
  cabin: string;
}
const ModifySearch: FC<ModifySearchProps> = ({
  trips,
  cabin,
  departureAirport,
  destinationAirport,
  adults,
  childrenCount,
  departureAirportmodify,
  destinationAirportmodify,
  adultsmodify,
  cabinmodify,
  childrenmodify,
  typemodify,
  departureDatemodify,
  returnDatemodify,
  Infantsmodify,
}) => {
  const {
    type,
    departure,
    destination,
    departure_date,
    return_date,
    Passenger,
  } = useModifySearch((state) => state);

  const SearchParams = useSearchParams();

  const { updateBookingStore } = useBookingQuote((state) => state);
  const [seletedtype, setseletedtype] = useState("roundtrip");
  const DropdownList = [
    {
      name: "First Class",
      code: "F",
    },
    {
      name: "Economy",
      code: "E",
    },
    {
      name: "Business",
      code: "B",
    },
  ];

  const filtereddestinationAirport = airports.find(
    (airport) => airport.iata === destinationAirport
  )?.name;
  // FlightList.find(
  //   (airport: FlightDataprops) => airport.iata === departure
  // )?.city_name;
  const filteredAirport = airports.find(
    (airport) => airport.iata === departureAirport
  )?.name;

  const currentDate = new Date();
  const ThreeDate = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const day1 = String(ThreeDate.getDate()).padStart(2, "0");
  const month1 = String(ThreeDate.getMonth() + 1).padStart(2, "0");
  const year1 = ThreeDate.getFullYear();

  const CurrentDateformattedDate = `${year}-${month}-${day}`;
  const ThreeDateformattedDate = `${year1}-${month1}-${day1}`;
  console.log("ThreeDateformattedDate", ThreeDateformattedDate);
  const [Datevalue, setDateValue] = useState<DateValueType>({
    startDate: departure_date,
    endDate: return_date,
  });
  console.log("Datevalue", Datevalue);
  const [SingleDatevalue, setSingleDateValue] = useState<DateValueType>({
    startDate: departure_date,
    endDate: new Date(new Date().getFullYear(), 11, 1), // December of the current year
  });
  useEffect(() => {
    setseletedtype(type);
    setDateValue({
      startDate: departure_date || CurrentDateformattedDate,
      endDate: return_date || ThreeDateformattedDate,
    });
    setSingleDateValue({
      startDate: departure_date || CurrentDateformattedDate,
      endDate: new Date(new Date().getFullYear(), 11, 1),
    });
  }, [type, departure_date, return_date]);

  const handleValueChange = (newValue: any) => {
    if (newValue.startDate !== newValue.endDate) {
      setDateValue(newValue);
    } else {
      // toast.error("startDate and endDate cannot be the same");
      // reactHotToast.error("startDate and endDate cannot be the same", {
      //   position: "top-right",
      //   duration: 3000,
      //   style: {
      //     fontWeight: 600,
      //   },
      // });
    }
  };
  const handleSingleValueChange = (newValue: any) => {
    setSingleDateValue(newValue);
  };
  const handleRemoveFlight = () => {
    if (flights.length > 1) {
      const updatedFlights = [...flights];
      updatedFlights.pop();

      setFlights(updatedFlights);
    }
  };
  const [flights, setFlights] = useState<Array<any>>([createNewFlight()]);

  // function createNewFlight() {
  //   return { departure: "", destination: "", date: null };
  // }
  function createNewFlight() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    return {
      departure: "",
      destination: "",
      date: null,
    };
  }

  // Function to format the input string
  const formatString = (input: string): Flight[] => {
    const segments = input?.split("|");
    const output = segments?.map((segment) => {
      const [departure, destination, dateStr] = segment.split(",");
      const year = dateStr.substr(4, 4);
      const month = dateStr.substr(0, 2);
      const day = dateStr.substr(2, 2);
      const formattedDate = dateStr ? `${year}-${month}-${day}` : null;
      return {
        departure: departure,
        destination: destination,
        date: formattedDate,
      };
    });
    return output;
  };
  const formatNameAndCode = (input: string): Flight[] => {
    const segments = input?.split("|");
    const output = segments?.map((segment) => {
      const [departure, destination, dateStr] = segment.split(",");
      const year = dateStr.substr(4, 4);
      const month = dateStr.substr(0, 2);
      const day = dateStr.substr(2, 2);
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
  useEffect(() => {
    if (trips) {
      setFlights(formatString(trips));
    }
    updateBookingStore({
      trip_info: formatNameAndCode(trips),
    });
  }, [trips, updateBookingStore]);

  function handleAddFlight() {
    setFlights([...flights, createNewFlight()]);
  }

  function handleFlightChange(index: number, key: string, value: any) {
    const updatedFlights = [...flights];
    updatedFlights[index][key] = value;
    setFlights(updatedFlights);
  }
  const matches = useMediaQuery("(max-width:767px)");
  const EconmyClass =
    cabin === "E" ? "Economy" : cabin === "F" ? "First Class" : "Business";
  const adultsCount = Passenger.adults as number;
  const children = Passenger.Children as number;
  const InfantsCount = Passenger.Infants as number;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ModifySearchStore } = useModifySearch((state) => state);

  const handlerouter = () => {
    // let newUrl;
    // newUrl = formUrlQuery({
    //   params: searchParams.toString(),
    //   keysToRemove: ["airline", "stop", "departtime"],
    // });
    // router.push(newUrl, { scroll: false });
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
  function formatTripDate(dateString: any) {
    if (dateString) {
      // const [year, month, day] = dateString.split("-");
      // const formattedDate = `${month}${day}${year}`;
      // return formattedDate;
      if (dateString?.includes("-")) {
        const [year, month, day] = dateString.split("-"); // Split the date string into year, month, and day
        return `${month}${day}${year}`;
      } else {
        return dateString; // Return the date string as is
      }
    }
  }
  function convertToTrips(formData: any) {
    if (formData.get("row-radio-buttons-group") == "multicities") {
      const trips = [];
      let index = 0;

      while (formData.get(`departureAirport ${index}`) !== null) {
        const departureAirport = formatAirport(
          formData.get(`departureAirport ${index}`)
        );
        const destinationAirport = formatAirport(
          formData.get(`destinationAirport ${index}`)
        );
        let departureDate;
        if (flights[index].date) {
          if (flights[index].date.startDate === undefined) {
            departureDate = formatTripDate(flights[index].date);
          } else {
            departureDate = formatTripDate(flights[index].date.startDate);
          }
        }
        const segment = `${departureAirport},${destinationAirport},${departureDate}`;
        trips.push(segment);
        index++;
      }

      const tripsString = trips.join("|");

      return tripsString;
    }
  }
  function convertToFlight(formData: FormData): Result {
    if (formData.get("row-radio-buttons-group") === "multicities") {
      const trips: Trip[] = [];
      const errorDepartureAirports: string[] = [];
      const errorDestinationAirports: string[] = [];
      let index = 0;
      let realIndexCount = 0;
      let tripsCount = 0;

      while (formData.get(`departureAirport ${index}`) !== null) {
        realIndexCount++;

        const departureAirport = formatAirport(
          formData.get(`departureAirport ${index}`)
        );
        const destinationAirport = formatAirport(
          formData.get(`destinationAirport ${index}`)
        );

        if (
          !departureAirport ||
          !destinationAirport ||
          departureAirport === destinationAirport
        ) {
          if (!departureAirport)
            errorDepartureAirports.push(`departureAirport ${index}`);
          if (!destinationAirport)
            errorDestinationAirports.push(`destinationAirport ${index}`);
          else if (departureAirport === destinationAirport) {
            errorDepartureAirports.push(`departureAirport ${index}`);
            errorDestinationAirports.push(`destinationAirport ${index}`);
          }
          index++;
          continue;
        }

        let departureDate: string | null = null;
        if (flights[index].date) {
          if (flights[index].date?.startDate === undefined) {
            departureDate = formatTripDate(flights[index].date);
          } else {
            departureDate = formatTripDate(flights[index].date.startDate);
          }
        }

        const trip: Trip = {
          departure: departureAirport,
          destination: destinationAirport,
          date: departureDate,
        };

        trips.push(trip);
        tripsCount++;
        index++;
      }

      if (errorDepartureAirports.length > 0) {
        const errorDepartureParams = errorDepartureAirports.join(",");
        const errorDestinationParams = errorDestinationAirports.join(",");

        const errorQueryParams = `?errordepartureAirport=${errorDepartureParams}&errordestinationAirport=${errorDestinationParams}`;

        router.push(errorQueryParams, { scroll: false });
      }

      return { trips, realIndexCount, tripsCount };
    }

    return { trips: [], realIndexCount: 0, tripsCount: 0 };
  }

  const formattedStartDate = Datevalue?.startDate
    ?.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/-/g, "/");
  const formattedOnewayStartDate = SingleDatevalue?.startDate
    ?.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/-/g, "/");

  const [CabinValue, setCabinValue] = useState("");
  const [destinationValue, setdestinationValue] = useState("");
  const [departureValue, setdepartureValue] = useState("");
  const { airlineCodesArry, updateUserStore } = useSearchFlight(
    (state) => state
  );
  const handleInputValueChange = (value: string) => {
    setCabinValue(value);
  };
  const handleDestinationValueChange = (value: string) => {
    setdestinationValue(value);
  };
  const handleDepartureValueChange = (value: string) => {
    setdepartureValue(value);
  };

  const CabinValueclass =
    CabinValue === "Economy" ? "E" : CabinValue === "First Class" ? "F" : "B";

  const depatureSplitValue = departureValue
    ? formatAirport(departureValue)
    : undefined;

  const destinationSplitValue = destinationValue
    ? formatAirport(destinationValue)
    : undefined;

  // const disbaledvalue = !trips
  //   ? departureAirportmodify == depatureSplitValue &&
  //     destinationAirportmodify == destinationSplitValue &&
  //     cabinmodify == CabinValueclass &&
  //     typemodify == seletedtype &&
  //     departureDatemodify == formattedStartDate &&
  //     departureDatemodify == formattedOnewayStartDate &&
  //     adultsmodify == adultsCount &&
  //     childrenmodify == children &&
  //     Infantsmodify == InfantsCount
  //   : null;
  const disbaledvalue = !trips
    ? departure == depatureSplitValue &&
      destination == destinationSplitValue &&
      cabin == CabinValueclass &&
      type == seletedtype &&
      departure_date == formattedStartDate &&
      departure_date == formattedOnewayStartDate &&
      adults == adultsCount &&
      childrenCount == children
    : // Infantsmodify == InfantsCount
      null;

  const formatDate = (dateString: any) => {
    if (dateString) {
      // Convert date string to yyyy-mm-dd format
      if (dateString.includes("-")) {
        const [year, month, day] = dateString.split("-"); // Split the date string into year, month, and day
        return `${month}/${day}/${year}`;
      } else {
        return dateString; // Return the date string as is
      }
    }
  };
  return (
    <>
      <div className="block mt-[10px]">
        <div className="border mx-5 my-5 p-4">
          <form
            action={async (formData) => {
              const departureAirport = formData.get("departureAirport")
                ? formatAirport(formData.get("departureAirport"))
                : undefined;

              const destinationAirport = formData.get("destinationAirport")
                ? formatAirport(formData.get("destinationAirport"))
                : undefined;
              const cabinclass =
                formData.get("cabin") === "Economy"
                  ? "E"
                  : formData.get("cabin") === "First Class"
                  ? "F"
                  : "B";
              setCabinValue(cabinclass);

              const trip =
                formData.get("row-radio-buttons-group") == "multicities"
                  ? convertToTrips(formData)
                  : undefined;

              if (!trip) {
                if (destinationAirport === departureAirport) {
                  const departureInput = document.querySelector(
                    'input[name="departureAirport"]'
                  ) as HTMLInputElement;
                  const destinationAirportInput = document.querySelector(
                    'input[name="destinationAirport"]'
                  ) as HTMLInputElement;
                  if (departureInput) {
                    departureInput.value = "."; // Reset the form
                    destinationAirportInput.value = ".";
                  }

                  router.push(
                    "?errordepartureAirport=departureAirport&errordestinationAirport=destinationAirport",
                    { scroll: false }
                  );
                  return;
                }

                // Validate departureAirport and destinationAirport
                if (!departureAirport) {
                  const departureInput = document.querySelector(
                    'input[name="departureAirport"]'
                  ) as HTMLInputElement;

                  if (departureInput) {
                    departureInput.value = "."; // Reset the form
                  }

                  router.push("?errordepartureAirport=departureAirport", {
                    scroll: false,
                  });
                  return; // Exit the function if validation fails
                }
                if (!destinationAirport) {
                  const destinationAirportInput = document.querySelector(
                    'input[name="destinationAirport"]'
                  ) as HTMLInputElement;
                  if (destinationAirportInput) {
                    destinationAirportInput.value = ".";
                  }

                  router.push("?errordestinationAirport=destinationAirport", {
                    scroll: false,
                  });
                  return; // Exit the function if validation fails
                }
              }
              if (seletedtype === "multicities") {
                const MultiCityData = convertToFlight(formData);

                if (MultiCityData.realIndexCount !== MultiCityData.tripsCount) {
                  return;
                }
              }
              const airline = SearchParams.get("airline") || ("" as string);
              const modifysearch = true;
              const formattedStartDate = Datevalue?.startDate?.toLocaleString(
                "en-US",
                {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                }
              );

              const formattedreturnDate = Datevalue?.endDate?.toLocaleString(
                "en-US",
                {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                }
              );
              const formattedOnewayStartDate =
                SingleDatevalue?.startDate?.toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                });
              const searchResult = await SearchFlights(
                formData,
                Datevalue,
                SingleDatevalue,
                flights,
                adultsCount,
                children,
                InfantsCount,
                airline,
                modifysearch
              );
              let newUrl = "";
              newUrl = formUrlQuery({
                params: searchParams.toString(),
                keysToRemove: [
                  "errordepartureAirport",
                  "errordestinationAirport",
                  "price",
                  "airline",
                  "departtime",
                ],
              });

              if (searchResult?.success) {
                if (searchResult?.hop2WsError) {
                  localStorage.setItem(
                    "guestuserid",
                    searchResult?.hop2WsError?.customerSessionId
                  );
                } else {
                  localStorage.setItem(
                    "guestuserid",
                    searchResult?.airTicketListResponse?.customerSessionId
                  );
                }
                router.push(newUrl, { scroll: false });

                setTimeout(() => {
                  ModifySearchStore({
                    departure: departureAirport,
                    destination: destinationAirport,
                    trips: trip,
                    cabinclass: cabin,
                    departure_date:
                      formData.get("row-radio-buttons-group") == "roundtrip"
                        ? formatDate(formattedStartDate)
                        : formData.get("row-radio-buttons-group") == "oneway"
                        ? formatDate(formattedOnewayStartDate)
                        : undefined,
                    return_date:
                      formData.get("row-radio-buttons-group") == "roundtrip"
                        ? formatDate(formattedreturnDate)
                        : undefined,
                    type: seletedtype,
                    modifyStatus: true,
                  });
                }, 5000);

                // router.push(`/flight/search?${filterairlineCodesString}`, {
                //   scroll: false,
                // });
              } else {
                localStorage.setItem(
                  "guestuserid",
                  searchResult?.customerSessionId
                );
              }
            }}
          >
            <div className="flex justify-between">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={seletedtype}
                onChange={(e) => setseletedtype(e.target.value)}
              >
                <FormControlLabel
                  value="roundtrip"
                  control={
                    <Radio
                      sx={{
                        // color: "red",
                        "&.Mui-checked": {
                          color: "red",
                        },
                      }}
                    />
                  }
                  sx={{ fontFamily: "Sen" }}
                  label="Round Trip"
                />
                <FormControlLabel
                  value="oneway"
                  control={
                    <Radio
                      sx={{
                        // color: "red",
                        "&.Mui-checked": {
                          color: "red",
                        },
                      }}
                    />
                  }
                  label="One Way"
                />
                <FormControlLabel
                  value="multicities"
                  control={
                    <Radio
                      sx={{
                        // color: "red",
                        "&.Mui-checked": {
                          color: "red",
                        },
                      }}
                    />
                  }
                  label="Multi city"
                />
              </RadioGroup>
            </div>
            {seletedtype === "multicities" ? (
              <>
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-[15px]">
                  {flights?.map((flight, index) => (
                    <>
                      <MultiCity
                        flight={flight}
                        flightsall={flights}
                        index={index}
                        onChange={(key, value) =>
                          handleFlightChange(index, key, value)
                        }
                        quote={false}
                      />
                    </>
                  ))}
                  {/* {flights.map((flight, index) => (
                    <>
                      <MultiCity
                        flight={flight}
                        flightsall={flights}
                        index={index}
                        onChange={(key, value) =>
                          handleFlightChange(index, key, value)
                        }
                      />{" "}
                    </>
                  ))} */}
                </div>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  lg={12}
                  md={12}
                  xl={12}
                  sx={{ marginTop: "10px" }}
                >
                  <button
                    type="button"
                    disabled={flights?.length < 3 ? false : true}
                  >
                    <AddIcon
                      style={{
                        color: "white",
                        background: flights?.length < 3 ? "red" : "grey",
                      }}
                      className="mr-3"
                      onClick={handleAddFlight}
                    />
                  </button>

                  <RemoveIcon
                    style={{
                      color: "white",
                      background: flights?.length > 1 ? "red" : "grey",
                    }}
                    onClick={handleRemoveFlight}
                  />
                </Grid>
                <div className="grid grid-cols-1 md:flex md:gap-2 mt-[15px]">
                  <div className="mr-3 mt-0">
                    <CustomMenu
                      type={"text"}
                      label={"Passenger"}
                      placeholder={"Passenger"}
                      name={"adults"}
                      icon={<PassangerIconImage />}
                      adults={adults}
                      childrenCount={childrenCount}
                    />
                  </div>
                  <div className="mr-3">
                    <UseModifyAutocomplete
                      label={"Cabin"}
                      placeholder={"Cabin"}
                      name={"cabin"}
                      AutocompleteOptions={DropdownList}
                      cabin={true}
                      required={false}
                      icon={<FlightClassImage />}
                      defaultValue={EconmyClass}
                      onInputValueChange={handleInputValueChange}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* <div className="md:grid md:grid-cols-2  md:gap-[10px]  lg:flex flex-wrap md:flex-wrap flex-col md:flex-row my-4 justify-start items-center"> */}
                <div className="md:grid md:grid-cols-12 lg:grid-cols-5 grid grid-cols-5 md:gap-[10px] ">
                  <div className="lg:col-span-1 md:col-span-6 col-span-5">
                    {departure && (
                      <UseCityautoComplted
                        label={"Departure"}
                        placeholder={"Airport / City Name"}
                        name={"departureAirport"}
                        required={true}
                        icon={<FlightIconImage />}
                        defaultValue={`${filteredAirport}[${departureAirport}]`}
                        onDepartureValueChange={handleDepartureValueChange}
                      />
                    )}
                    {!departure && (
                      <UseCityautoComplted
                        label={"Departure"}
                        placeholder={"Airport / City Name"}
                        name={"departureAirport"}
                        required={true}
                        icon={<FlightIconImage />}
                        onDepartureValueChange={handleDepartureValueChange}
                      />
                    )}
                  </div>
                  <div className="lg:col-span-1  md:col-span-6 col-span-5">
                    {destination && (
                      <UseCityautoComplted
                        label={"Destination"}
                        placeholder={"Airport / City Name"}
                        name={"destinationAirport"}
                        required={true}
                        icon={<FlightIconImage />}
                        defaultValue={`${filtereddestinationAirport}[${destinationAirport}]`}
                        onDestinationValueChange={handleDestinationValueChange}
                      />
                    )}
                    {!destination && (
                      <UseCityautoComplted
                        label={"Destination"}
                        placeholder={"Airport / City Name"}
                        name={"destinationAirport"}
                        required={true}
                        icon={<FlightIconImage />}
                        onDestinationValueChange={handleDestinationValueChange}
                      />
                    )}
                  </div>
                  <div className="lg:col-span-1  md:col-span-6 col-span-5">
                    {seletedtype === "oneway" && (
                      <div className={`mr-3 w-full `}>
                        <label className="text-[14px] md:text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                          <DateIconImage />
                          Depart
                        </label>
                        {departure_date && (
                          <Datepicker
                            readOnly
                            placeholder={"Select Date"}
                            minDate={new Date()}
                            asSingle={true}
                            showFooter={false}
                            primaryColor={"blue"}
                            inputClassName={`bg-[#F4F4F4] text-[14px] md:text-[15px] w-full rounded-[5px] p-3 focus:outline-none 
                            border border-[#DADADA] h-[40px] md:h-[40px] ${Styles.inputdatepicker}`}
                            value={SingleDatevalue}
                            onChange={handleSingleValueChange}
                            popoverDirection="down"
                            toggleClassName="hidden"
                            useRange={matches ? false : true}
                          />
                        )}
                        {!departure_date && (
                          <Datepicker
                            readOnly
                            placeholder={"Select Date"}
                            minDate={new Date()}
                            asSingle={true}
                            showFooter={true}
                            primaryColor={"blue"}
                            inputClassName={`bg-[#F4F4F4] text-[14px] md:text-[15px] w-full rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[40px] md:h-[40px] ${Styles.inputdatepicker}`}
                            value={SingleDatevalue}
                            onChange={handleSingleValueChange}
                            popoverDirection="down"
                            toggleClassName="hidden"
                            useRange={matches ? false : true}
                          />
                        )}
                      </div>
                    )}
                    {seletedtype === "roundtrip" && (
                      <div className={`mr-3 w-full ${Styles.datepciker}`}>
                        <label className=" text-[14px] md:text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                          <DateIconImage />
                          Depart & Return
                        </label>
                        {departure_date && (
                          <Datepicker
                            readOnly
                            placeholder={"Select Date"}
                            minDate={new Date()}
                            // showShortcuts={true}
                            showFooter={false}
                            primaryColor={"blue"}
                            inputClassName={`bg-[#F4F4F4] text-[14px] md:text-[15px] rounded-[5px]  p-3 focus:outline-none border border-[#DADADA]  h-[40px] md:h-[40px] w-full ${Styles.inputdatepicker}`}
                            // value={DateValue}
                            // onChange={handleValueChange}
                            value={Datevalue}
                            onChange={handleValueChange}
                            popoverDirection="down"
                            toggleClassName="hidden"
                            useRange={matches ? false : true}
                          />
                        )}
                        {!departure_date && (
                          <Datepicker
                            readOnly
                            placeholder={"Select Date"}
                            minDate={new Date()}
                            // showShortcuts={true}
                            showFooter={false}
                            primaryColor={"blue"}
                            inputClassName={`bg-[#F4F4F4] text-[14px] md:text-[15px] rounded-[5px]  p-3 focus:outline-none border border-[#DADADA]  h-[40px] md:h-[40px] w-full ${Styles.inputdatepicker}`}
                            // value={DateValue}
                            // onChange={handleValueChange}
                            value={Datevalue}
                            onChange={handleValueChange}
                            popoverDirection="down"
                            toggleClassName="hidden"
                            useRange={matches ? false : true}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="md:mt-0 mt-3 lg:col-span-1  md:col-span-6 col-span-5">
                    <CustomMenu
                      type={"text"}
                      label={"Passenger"}
                      placeholder={"Passenger"}
                      name={"adults"}
                      icon={<PassangerIconImage />}
                      adults={adults}
                      childrenCount={childrenCount}
                    />
                  </div>
                  <div className="mr-3 lg:col-span-1  col-span-5 md:col-span-6">
                    <UseModifyAutocomplete
                      label={"Cabin"}
                      placeholder={"Cabin"}
                      name={"cabin"}
                      AutocompleteOptions={DropdownList}
                      cabin={true}
                      required={false}
                      icon={<FlightClassImage />}
                      defaultValue={EconmyClass}
                      onInputValueChange={handleInputValueChange}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end gap-2 ">
              {/* <button
                className={`w-auto text-white text-[18px] rounded-[5px]  p-3 md:px-[15px] md:py-[1px] bg-[#142c51] font-normal`}
                onClick={handleModifyClose}
                type="button"
              >
                Close
              </button> */}
              <div onClick={handlerouter} className="mt-3">
                <ModifySearchButton
                  text={"Modify"}
                  type={"submit"}
                  loadingtext={"Searching..."}
                  disabled={disbaledvalue}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};
export default ModifySearch;

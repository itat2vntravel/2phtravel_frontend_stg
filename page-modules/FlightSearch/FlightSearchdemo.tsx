"use client";
import React, { FC, useEffect, useState } from "react";
import Styles from "./flightsearch.module.css";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useMediaQuery } from "@mui/material";
import SearchButton from "@/components/Button/SearchButton";
import SearchFlights from "@/action/search flight/searchflight";
import CustomMenu from "@/components/CustomMenu/CustomMenu";
import CustomField from "@/components/CustomTextField/customField";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import UseCityautoComplted from "@/components/AutoComplete/CityautoComplted";
import FlightIconImage from "@/components/Images/FlightIcon";
import FlightClassImage from "@/components/Images/FlightClass";
import DateIconImage from "@/components/Images/DateIcon";
import PassangerIconImage from "@/components/Images/PassangerIcon";
import UserIconImage from "@/components/Images/UserImage";
import EmailIconImage from "@/components/Images/EmailIcon";
import MobileIconImage from "@/components/Images/Mobileicon";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import MultiCity from "./Multicity/multicity";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useBookingQuote from "@/store/BookingQuote";
import { Toaster } from "react-hot-toast";
import useModifySearch from "@/store/ModifySearch";
import UseModifyAutocomplete from "@/components/AutoComplete/Modifyautocomplete";
import { formUrlQuery } from "@/utils/formUrlQuery";

export interface FlightSearchDemoProps {
  userid: string;
  accesstoken: string;
  FulluserId?: string;
}

interface Result {
  trips: Trip[];
  realIndexCount: number;
  tripsCount: number;
  missingFields?: any;
}
interface Trip {
  departure: string;
  destination: string;
  date: string | null;
}
interface DateRange {
  startDate: Date;
  endDate?: Date;
}
const FlightSearchDemo: FC<FlightSearchDemoProps> = ({
  userid,
  accesstoken,
  FulluserId,
}) => {
  const [seletedtype, setseletedtype] = useState("roundtrip");
  const { updateBookingStore } = useBookingQuote((state) => state);
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorPhoneNumber = searchParams.get("errorPhonenumber");

  const { Passenger, cabinclass, ModifySearchStore } = useModifySearch(
    (state) => state
  );
  const UserFullId = FulluserId as string;
  
  useEffect(() => {
    router.push("/", { scroll: false });
  }, [router]);
  useEffect(() => {
    updateBookingStore({
      userId: UserFullId,
    });
    ModifySearchStore({
      Passenger: {
        adults: 1,
        Children: 0,
        Infants: 0,
      },
    });
  }, [ModifySearchStore, UserFullId, updateBookingStore]);

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

  const [guestid, setguestid] = useState("");

  useEffect(() => {
    const storeduseid = String(localStorage.getItem("guestuserid"));
    setguestid(storeduseid);
  }, []);

  const [value, setValue] = useState<string>("");
  const handleChange = (phoneNumber: string) => {
    setValue(phoneNumber);
  };

  const [Datevalue, setDateValue] = useState<DateValueType>({
    startDate: new Date(),
    // endDate: new Date(new Date().getTime(), 11, 1), // December of the current year
    endDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from startDate
  });
  const [SingleDatevalue, setSingleDateValue] = useState<DateValueType>({
    startDate: new Date(),
    // endDate: null, // December of the current year
    endDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from startDate
  });

  const handleValueChange = (newValue: any) => {
    setDateValue(newValue);
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

  function createNewFlight() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    return {
      departure: "",
      destination: "",
      date: formattedDate,
    };
  }

  function handleAddFlight() {
    setFlights([...flights, createNewFlight()]);
  }

  function handleFlightChange(index: number, key: string, value: any) {
    const updatedFlights = [...flights];
    updatedFlights[index][key] = value;
    setFlights(updatedFlights);
  }
  const matches = useMediaQuery("(max-width:767px)");
  // const { Passenger } = useModifySearch((state) => state);
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
      if (typeof dateString === "string" && dateString.includes("-")) {
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

  function NonUserconvertToFlight(formData: FormData): Result {
    if (formData.get("row-radio-buttons-group") === "multicities") {
      const trips: Trip[] = [];
      const errorDepartureAirports: string[] = [];
      const errorDestinationAirports: string[] = [];
      let index = 0;
      let realIndexCount = 0;
      let tripsCount = 0;

      const FullName = formData.get("Name");
      const Email = formData.get("Email") as string;
      const mobile_number = formData.get("phonenumber");

      let missingFields = [];
      let invalidEmail = false;

      if (!FullName) {
        missingFields.push("Name");
      }
      if (!Email) {
        missingFields.push("Email");
      } else {
        // Email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
          invalidEmail = true;
        }
      }
      if (!mobile_number) {
        missingFields.push("Phonenumber");
      }
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
        // const errorQueryParams = `?errordepartureAirport=${errorDepartureParams}&errordestinationAirport=${errorDestinationParams}`;
        if (missingFields.length > 0) {
          const missingFieldsParams = missingFields
            .map((field) => `error${field}=${field}`)
            .join("&");

          const combinedErrorParams = `${errorQueryParams}&${missingFieldsParams}`;

          router.push(combinedErrorParams, { scroll: false });
        }

        // router.push(errorQueryParams, { scroll: false });
      }

      return { trips, realIndexCount, tripsCount };
    }

    return { trips: [], realIndexCount: 0, tripsCount: 0, missingFields: [] };
  }

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
      <div className={Styles.commoncard}>
        <form
          action={async (formData) => {
            const departureAirport = formData.get("departureAirport")
              ? formatAirport(formData.get("departureAirport"))
              : undefined;
            const destinationAirport = formData.get("destinationAirport")
              ? formatAirport(formData.get("destinationAirport"))
              : undefined;
            const trip =
              formData.get("row-radio-buttons-group") == "multicities"
                ? convertToTrips(formData)
                : undefined;
            const FullName = formData.get("Name");
            const Email = formData.get("Email") as string;
            const mobile_number = formData.get("phonenumber");

            if (!userid) {
              if (!guestid || guestid === "null") {
                if (seletedtype === "multicities") {
                  const MultiCityData = NonUserconvertToFlight(formData);
                  let missingFields = [];
                  let invalidEmail = false;

                  if (!FullName) {
                    missingFields.push("Name");
                  }
                  if (!Email) {
                    missingFields.push("Email");
                  } else {
                    // Email format check
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(Email)) {
                      invalidEmail = true;
                    }
                  }
                  if (!mobile_number) {
                    missingFields.push("Phonenumber");
                  }
                  if (
                    // missingFields.length == 0 &&
                    MultiCityData.realIndexCount !== MultiCityData.tripsCount
                  ) {
                    return;
                  }

                  if (missingFields.length > 0) {
                    let newUrl = "";
                    newUrl = formUrlQuery({
                      params: searchParams.toString(),
                      keysToRemove: [
                        "errordepartureAirport",
                        "errordestinationAirport",
                      ],
                    });

                    router.push(newUrl, { scroll: false });
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    return;
                  }
                } else {
                  let missingFields = [];
                  let invalidEmail = false;

                  if (!FullName) {
                    missingFields.push("Name");
                  }
                  if (!Email) {
                    missingFields.push("Email");
                  } else {
                    // Email format check
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(Email)) {
                      invalidEmail = true;
                    }
                  }
                  if (!mobile_number) {
                    missingFields.push("Phonenumber");
                  }
                  if (!trip) {
                    if (!departureAirport) {
                      missingFields.push("departureAirport");
                    }
                    if (!destinationAirport) {
                      missingFields.push("destinationAirport");
                    }
                  }

                  if (missingFields.length > 0) {
                    const errorQueryParams = missingFields
                      .map((field) => `error${field}=${field}`)
                      .join("&");
                    router.push(`?${errorQueryParams}`, {
                      scroll: false,
                    });

                    return;
                  }
                }
              }
            }

            if (!trip) {
              // Same Airport to Validate
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
            const airline = "";
            const modifysearch = false;
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
              Passenger.adults,
              Passenger.Children,
              Passenger.Infants,
              airline,
              modifysearch
            );
            updateBookingStore({
              trip_info: flights,
            });

            let newUrl = "";
            newUrl = formUrlQuery({
              params: searchParams.toString(),
              keysToRemove: [
                "errordepartureAirport",
                "errordestinationAirport",
              ],
            });
            ModifySearchStore({
              departure: departureAirport,
              destination: destinationAirport,
              trips: trip,
              cabinclass: cabinclass,
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
            router.push(newUrl, { scroll: false });
            if (searchResult?.success) {
              if (searchResult?.hop2WsError) {
                localStorage.setItem(
                  "guestuserid",
                  searchResult?.hop2WsError?.customerSessionId
                );

                redirect("/flight/search");
              } else {
                localStorage.setItem(
                  "guestuserid",
                  searchResult?.airTicketListResponse?.customerSessionId
                );
                redirect("/flight/search");
              }
            } else {
              localStorage.setItem(
                "guestuserid",
                searchResult?.customerSessionId
              );
              redirect("/flight/search");
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
          <Box>
            <Grid container spacing={3} direction="row">
              {seletedtype === "multicities" ? (
                <>
                  {flights.map((flight, index) => (
                    <>
                      <MultiCity
                        flight={flight}
                        flightsall={flights}
                        index={index}
                        onChange={(key, value) =>
                          handleFlightChange(index, key, value)
                        }
                        quote={false}
                      />{" "}
                    </>
                  ))}

                  <Grid item xs={12} sm={12} lg={12} md={12} xl={12}>
                    <button
                      type="button"
                      disabled={flights.length < 3 ? false : true}
                    >
                      <AddIcon
                        style={{
                          color: "white",
                          background: flights.length < 3 ? "red" : "grey",
                        }}
                        className="mr-3"
                        onClick={handleAddFlight}
                      />
                    </button>
                    <RemoveIcon
                      style={{
                        color: "white",
                        background: flights.length > 1 ? "red" : "grey",
                      }}
                      onClick={handleRemoveFlight}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} sm={6} lg={4} md={6} xl={4}>
                    <UseCityautoComplted
                      label={"Departure"}
                      placeholder={"Airport / City Name"}
                      name={"departureAirport"}
                      required={true}
                      icon={<FlightIconImage />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4} md={6} xl={4}>
                    <UseCityautoComplted
                      label={"Destination"}
                      placeholder={"Airport / City Name"}
                      name={"destinationAirport"}
                      required={true}
                      icon={<FlightIconImage />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4} md={6} xl={4}>
                    {seletedtype === "oneway" && (
                      <div className={`mr-3 w-full }`}>
                        <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                          <DateIconImage />
                          Depart
                        </label>
                        <Datepicker
                          placeholder={"Select Date"}
                          minDate={new Date()}
                          readOnly
                          asSingle={true}
                          showFooter={false}
                          primaryColor={"blue"}
                          inputClassName={`bg-[#F4F4F4] w-full rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[40px] md:h-[40px] ${Styles.inputdatepicker}`}
                          value={SingleDatevalue}
                          onChange={handleSingleValueChange}
                          // displayFormat={"MM/DD/YYYY"}
                          toggleClassName={`hidden`}
                          popoverDirection="down"
                          useRange={matches ? false : true}
                        />
                      </div>
                    )}
                    {seletedtype === "roundtrip" && (
                      <div className={`mr-3 w-full ${Styles.datepciker}`}>
                        <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                          <DateIconImage />
                          Depart & Return
                        </label>
                        <Datepicker
                          placeholder={"Select Date"}
                          minDate={new Date()}
                          // showShortcuts={true}
                          showFooter={false}
                          readOnly
                          primaryColor={"blue"}
                          inputClassName={`bg-[#F4F4F4] rounded-[5px]  p-3 focus:outline-none border border-[#DADADA]  h-[40px] md:h-[40px] w-full ${
                            matches ? "" : Styles.inputdatepicker
                          } `}
                          toggleClassName={`hidden`}
                          // value={DateValue}
                          // onChange={handleValueChange}
                          value={Datevalue}
                          onChange={handleValueChange}
                          popoverDirection="down"
                          useRange={matches ? false : true}
                        />
                      </div>
                    )}
                  </Grid>{" "}
                </>
              )}
              <Grid item xs={12} sm={6} lg={4} md={6} xl={4}>
                <CustomMenu
                  type={"text"}
                  label={"Passenger"}
                  placeholder={"Passenger"}
                  name={"adults"}
                  icon={<PassangerIconImage />}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4} md={6} xl={4}>
                <UseModifyAutocomplete
                  label={"Cabin"}
                  placeholder={"Cabin"}
                  name={"cabin"}
                  AutocompleteOptions={DropdownList}
                  cabin={true}
                  required={false}
                  icon={<FlightClassImage />}
                  defaultValue="Economy"
                />
              </Grid>
              {!userid ? (
                !guestid || guestid === "null" ? (
                  <>
                    <Grid item xs={12} sm={6} lg={4} md={6} xl={4}>
                      <CustomField
                        type={"text"}
                        label={"Full Name"}
                        placeholder={"Name"}
                        name={"Name"}
                        // required={true}
                        icon={<UserIconImage />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} md={6} xl={4}>
                      <CustomField
                        type={"email"}
                        label={"Email"}
                        placeholder={"Email"}
                        name={"Email"}
                        // required={true}
                        icon={<EmailIconImage />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} md={6} xl={4}>
                      <div>
                        <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                          <MobileIconImage />
                          Phone number
                        </label>
                        <div className={Styles.phonenumber}>
                          <PhoneInput
                            placeholder="Enter phone number"
                            value={value}
                            onChange={handleChange}
                            name={"phonenumber"}
                            className={`w-full bg-[#F4F4F4]  ${
                              errorPhoneNumber && " border border-red-500	"
                            }
                             rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[40px] `}
                            style={{
                              paddingTop: "20px",
                              position: "relative",
                              padding: "10px",
                            }}
                            // required={true}
                          />
                        </div>
                      </div>
                    </Grid>
                  </>
                ) : null
              ) : null}
            </Grid>
          </Box>

          <div className="flex justify-end mt-4 md:mt-2">
            <SearchButton
              text={"Search Now"}
              type={"submit"}
              loadingtext={"Searching..."}
            />
          </div>

        </form>
      </div>
      <Toaster />
    </>
  );
};

export default FlightSearchDemo;

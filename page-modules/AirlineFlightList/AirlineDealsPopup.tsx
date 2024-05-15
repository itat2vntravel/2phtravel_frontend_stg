"use client";
import React, { useEffect, useRef, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import CustomField from "@/components/CustomTextField/customField";
import FlightIconImage from "@/components/Images/FlightIcon";
import DateIconImage from "@/components/Images/DateIcon";
import UserIconImage from "@/components/Images/UserImage";
import EmailIconImage from "@/components/Images/EmailIcon";
import MobileIconImage from "@/components/Images/Mobileicon";
import Grid from "@mui/material/Grid";
import MultiCity from "@/page-modules/FlightSearch/Multicity/multicity";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "react-toastify/dist/ReactToastify.css";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useMediaQuery } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { IoClose } from "react-icons/io5";
import { formUrlQuery } from "@/utils/formUrlQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BookingFormApi from "@/action/booknow/booknow";
import { RadioGroup } from "@mui/material";
import UseCityautoComplted from "@/components/AutoComplete/CityautoComplted";
import GetQuoteButton from "@/components/QuotePopup/GetQuteButton";
import Styles from "./airlineflight.module.css";
import Swal from "sweetalert2";

interface AirlineDealsPopupProps {
  quotepopup: string;
  Airlinepopup?: string;
  userId: any;
}
export interface FlightSearchDemoProps {
  userid: string;
  accesstoken: string;
  FulluserId?: string;
}
interface FlightFormData {
  get: (key: string) => string | null;
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

export default function AirlineDealsPopup({
  quotepopup,
  Airlinepopup,
  userId,
}: AirlineDealsPopupProps) {
  const [seletedtype, setseletedtype] = useState("roundtrip");
  // const BookingQuote = sessionStorage.getItem("BookingQuote");
  const [errormessage, seterrormessage] = useState(false);
  const [flights, setFlights] = useState<Array<any>>([createNewFlight()]);
  const searchParams = useSearchParams();
  const errorPhoneNumber = searchParams.get("errorPhonenumber");

  const [value, setValue] = useState<string>("");
  const handleChange = (phoneNumber: string) => {
    setValue(phoneNumber);
  };
  const menuRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
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
      date: formattedDate,
    };
  }

  const currentDate = new Date();
  const endDate = new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days from startDate

  const formatDate = (date: any) => {
    return date.toISOString().split("T")[0]; // Extracting the date part
  };

  const [Datevalue, setDateValue] = useState<DateValueType>({
    startDate: formatDate(currentDate),

    endDate: formatDate(endDate),
  });

  const [SingleDatevalue, setSingleDateValue] = useState<DateValueType>({
    startDate: formatDate(currentDate),

    endDate: formatDate(endDate),
  });
  const [guestid, setguestid] = useState("");

  useEffect(() => {
    const storeduseid = String(localStorage.getItem("guestuserid"));
    setguestid(storeduseid);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        router.push("/airline-offers", { scroll: false });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, router, searchParams]);

  function handleAddFlight() {
    setFlights([...flights, createNewFlight()]);
  }
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
  function handleFlightChange(index: number, key: string, value: any) {
    const updatedFlights = [...flights];
    updatedFlights[index][key] = value;
    setFlights(updatedFlights);
  }
  const matches = useMediaQuery("(max-width:767px)");
  ("");

  const handleClose = () => {
    router.push("/airline-offers", { scroll: false });
  };
  useEffect(() => {
    if (quotepopup) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [quotepopup]);
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
        const errorQueryParams = `?errordepartureAirport=${errorDepartureParams}&errordestinationAirport=${errorDestinationParams}&quotepopup=open&airline=${Airlinepopup}`;

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

        const errorQueryParams = `errordepartureAirport=${errorDepartureParams}&errordestinationAirport=${errorDestinationParams}`;
        // const errorQueryParams = `?errordepartureAirport=${errorDepartureParams}&errordestinationAirport=${errorDestinationParams}`;
        if (missingFields.length > 0) {
          const missingFieldsParams = missingFields
            .map((field) => `error${field}=${field}`)
            .join("&");

          const combinedErrorParams = `?${errorQueryParams}&${missingFieldsParams}&quotepopup=open&airline=${Airlinepopup}`;
          router.push(combinedErrorParams, { scroll: false });
        }

      }

      return { trips, realIndexCount, tripsCount };
    }

    return { trips: [], realIndexCount: 0, tripsCount: 0, missingFields: [] };
  }

  const handleSumbit = async (formData: FormData) => {
    const departureAirport = formData.get("departureAirport")
      ? formatAirport(formData.get("departureAirport"))
      : undefined;
    const destinationAirport = formData.get("destinationAirport")
      ? formatAirport(formData.get("destinationAirport"))
      : undefined;
    const trips =
      formData.get("row-radio-buttons-group") == "multicities"
        ? convertToTrips(formData)
        : undefined;
    const FullName = formData.get("Name");
    const Email = formData.get("Email") as string;
    const mobile_number = formData.get("phonenumber");

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
        MultiCityData.realIndexCount !== MultiCityData.tripsCount
      ) {
        seterrormessage(true);

        return;
      }

      if (missingFields.length > 0) {
        let newUrl = "";
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["errordepartureAirport", "errordestinationAirport"],
        });

        router.push(newUrl, { scroll: false });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        seterrormessage(true);
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
      if (!trips) {
        if (!departureAirport) {
          missingFields.push("departureAirport");
        }
        if (!destinationAirport) {
          missingFields.push("destinationAirport");
        }
      }

      if (missingFields.length > 0) {
        const errorQueryParams = `quotepopup=open&airline=${Airlinepopup}&${missingFields
          .map((field) => `error${field}=${field}`)
          .join("&")}`;
        router.push(`?${errorQueryParams}`, {
          scroll: false,
        });
        seterrormessage(true);
        return;
      }
    }

    if (!trips) {
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
          `?errordepartureAirport=departureAirport&errordestinationAirport=destinationAirport&quotepopup=open&airline=${Airlinepopup}`,
          { scroll: false }
        );

        seterrormessage(true);
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

        router.push(
          `?errordepartureAirport=departureAirport&quotepopup=open&airline=${Airlinepopup}`,
          {
            scroll: false,
          }
        );

        seterrormessage(true);
        return; // Exit the function if validation fails
      }
      if (!destinationAirport) {
        const destinationAirportInput = document.querySelector(
          'input[name="destinationAirport"]'
        ) as HTMLInputElement;
        if (destinationAirportInput) {
          destinationAirportInput.value = ".";
        }

        router.push(
          `?errordestinationAirport=destinationAirport&quotepopup=open&airline=${Airlinepopup}`,
          {
            scroll: false,
          }
        );

        seterrormessage(true);
        return; // Exit the function if validation fails
      }
    }

    if (seletedtype === "multicities") {
      const MultiCityData = convertToFlight(formData);

      if (MultiCityData.realIndexCount !== MultiCityData.tripsCount) {
        seterrormessage(true);

        return;
      }
    }
    const trip: { departure: string; destination: string; date: string }[] = [];
    const req = {
      departureAirport: formData.get("departureAirport") as string,
      destinationAirport: formData.get("destinationAirport") as string,
      Name: formData.get("Name") as string,
      Email: formData.get("Email") as string,
      phonenumber: formData.get("phonenumber") as string,
      departure_date: Datevalue?.startDate as string,
      return_date: Datevalue?.endDate as string,
      user: userId || null,
      type: formData.get("row-radio-buttons-group") as string,
      trip: trip,
      page: "Best Airline deals",
      trip_type: formData.get("row-radio-buttons-group") as string,
      airline_name: Airlinepopup as string,
    };

    if (formData.get("row-radio-buttons-group") === "roundtrip") {
      trip.push(
        {
          departure: formData.get("departureAirport") as string,
          destination: formData.get("destinationAirport") as string,
          date: `${Datevalue?.startDate}`,
        },
        {
          departure: formData.get("departureAirport") as string,
          destination: formData.get("destinationAirport") as string,
          date: `${Datevalue?.endDate}`,
        }
      );
    } else if (formData.get("row-radio-buttons-group") === "oneway") {
      trip.push({
        departure: formData.get("departureAirport") as string,
        destination: formData.get("destinationAirport") as string,
        date: `${SingleDatevalue?.startDate}`,
      });
    } else {
      trip.push({
        departure: formData.get("departureAirport 0") as string,
        destination: formData.get("destinationAirport 0") as string,
        date:
          flights[0]?.date?.startDate &&
          flights[0]?.date?.startDate !== undefined
            ? `${flights[0]?.date?.startDate}`
            : `${flights[0]?.date}`,
      });

      if (formData.get("departureAirport 1")) {
        trip.push({
          departure: formData.get("departureAirport 1") as string,
          destination: formData.get("destinationAirport 1") as string,
          date:
            flights[1]?.date?.startDate &&
            flights[1]?.date?.startDate !== undefined
              ? `${flights[1]?.date?.startDate}`
              : `${flights[1]?.date}`,
        });
      }

      if (formData.get("departureAirport 2")) {
        trip.push({
          departure: formData.get("departureAirport 2") as string,
          destination: formData.get("destinationAirport 2") as string,
          date:
            flights[2]?.date?.startDate &&
            flights[2]?.date?.startDate !== undefined
              ? `${flights[2]?.date?.startDate}`
              : `${flights[2]?.date}`,
        });
      }
    }

    setLoading(true);
    seterrormessage(true);

    const response = await BookingFormApi(req);

    if (response.message) {
      setLoading(false);

      router.push("/airline-offers", { scroll: false });

      Swal.fire({
        icon: "success",
        title: response.message,

        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
        }
      });
    }

  };

  return (
    <>
      {quotepopup === "open" && (
        <>
          {" "}
          <div>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity overflow-hidden"></div>

            <div className="fixed inset-0 overflow-y-hidden   w-screen">
              <div className="flex h-screen   justify-center p-4 text-center items-center sm:p-0">
                <div
                  className={`rounded-lg z-50 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg  md:mt-[70px] lg:mt-[50px] 
                  ${Styles.quotepopupstyle}
                  ${
                    seletedtype === "multicities" &&
                    Styles.quotepopupMulticitystyle
                  }
                  `}
                  ref={menuRef}
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                    <div className="p-2 border-b-[2px] flex  items-center justify-between border-b-[#eedede]">
                      <h2 className="text-[18px]">Your Current Selection</h2>
                      <div onClick={handleClose} className="cursor-pointer">
                        <IoClose onClick={handleClose} />
                      </div>
                    </div>

                    <form action={(formdata) => handleSumbit(formdata)}>
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
                                    quote={true}
                                  />{" "}
                                </>
                              ))}

                              <Grid
                                item
                                xs={12}
                                sm={12}
                                lg={12}
                                md={12}
                                xl={12}
                              >
                                <button
                                  type="button"
                                  disabled={flights.length < 3 ? false : true}
                                >
                                  <AddIcon
                                    style={{
                                      color: "white",
                                      background:
                                        flights.length < 3 ? "red" : "grey",
                                    }}
                                    className="mr-3"
                                    onClick={handleAddFlight}
                                  />
                                </button>
                                <RemoveIcon
                                  style={{
                                    color: "white",
                                    background:
                                      flights.length > 1 ? "red" : "grey",
                                  }}
                                  onClick={handleRemoveFlight}
                                />
                              </Grid>
                            </>
                          ) : (
                            <>
                              <Grid item xs={12} sm={12} lg={6} md={6} xl={6}>
                                <UseCityautoComplted
                                  label={"Departure"}
                                  placeholder={"Airport / City Name"}
                                  name={"departureAirport"}
                                  required={true}
                                  icon={<FlightIconImage />}
                                />
                              </Grid>
                              <Grid item xs={12} sm={12} lg={6} md={6} xl={6}>
                                <UseCityautoComplted
                                  label={"Destination"}
                                  placeholder={"Airport / City Name"}
                                  name={"destinationAirport"}
                                  required={true}
                                  icon={<FlightIconImage />}
                                />
                              </Grid>
                              <Grid item xs={12} sm={12} lg={6} md={6} xl={6}>
                                {seletedtype === "oneway" && (
                                  <div className={`mr-3 w-full }`}>
                                    <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                                      <DateIconImage />
                                      Depart
                                    </label>
                                    <Datepicker
                                      placeholder={"Select Date"}
                                      minDate={new Date()}
                                      asSingle={true}
                                      showFooter={false}
                                      primaryColor={"blue"}
                                      inputClassName={`bg-[#F4F4F4] z-10 w-full rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[40px] md:h-[40px] }`}
                                      value={SingleDatevalue}
                                      onChange={handleSingleValueChange}
                                      popoverDirection="down"
                                      useRange={false}
                                    />
                                  </div>
                                )}
                                {seletedtype === "roundtrip" && (
                                  <div className={`mr-3 w-full `}>
                                    <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                                      <DateIconImage />
                                      Depart & Return
                                    </label>
                                    <Datepicker
                                      placeholder={"Select Date"}
                                      minDate={new Date()}
                                      // showShortcuts={true}
                                      showFooter={false}
                                      primaryColor={"blue"}
                                      inputClassName={`bg-[#F4F4F4] rounded-[5px]  p-3 focus:outline-none border border-[#DADADA]  h-[40px] md:h-[40px] w-full`}
                                      // value={DateValue}
                                      // onChange={handleValueChange}
                                      value={Datevalue}
                                      onChange={handleValueChange}
                                      popoverDirection="down"
                                      useRange={false}
                                    />
                                  </div>
                                )}
                              </Grid>{" "}
                            </>
                          )}
                          <Grid item xs={12} sm={12} lg={6} md={6} xl={6}>
                            <CustomField
                              type={"text"}
                              label={"Full Name"}
                              placeholder={"Name"}
                              name={"Name"}
                              // required={true}
                              icon={<UserIconImage />}
                            />
                          </Grid>{" "}
                          <Grid item xs={12} sm={12} lg={6} md={6} xl={6}>
                            <CustomField
                              type={"email"}
                              label={"Email"}
                              placeholder={"Email"}
                              name={"Email"}
                              // required={true}
                              icon={<EmailIconImage />}
                            />
                          </Grid>{" "}
                          <Grid item xs={12} sm={12} lg={6} md={6} xl={6}>
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
                                  className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[40px]  ${
                                    errorPhoneNumber && " border border-red-500	"
                                  }`}
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
                        </Grid>
                      </Box>

                      <div className="bg-gray-50 mt-10  w-full ">
                        <GetQuoteButton
                          loading={loading}
                          errormessage={errormessage}
                        >
                          Get a Quote
                        </GetQuoteButton>

                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
}

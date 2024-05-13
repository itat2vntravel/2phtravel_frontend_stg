"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DateValueType } from "react-tailwindcss-datepicker";

// interface DatevalueType {
//   startDate: Date;
//   endDate: Date;
// }
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

export default async function SearchFlights(
  formData: FormData,
  Datevalue: DateValueType,
  SingleDatevalue: DateValueType,
  flights: any,
  adults: number,
  Children: number,
  Infants: number,
  airline: string,
  modifysearch: boolean
) {
  const userid = cookies().get("user_id")?.value || "";
  const formattedStartDate = Datevalue?.startDate?.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const formattedreturnDate = Datevalue?.endDate?.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  const formattedOnewayStartDate = SingleDatevalue?.startDate?.toLocaleString(
    "en-US",
    {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }
  );

  const formatDate = (dateString: any) => {
    // if (dateString) {
    //   const [year, month, day] = dateString.split("-");
    //   // return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
    //   return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;

    // }
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
        if (flights[index].date?.startDate === undefined) {
          departureDate = formatTripDate(flights[index].date);
        } else {
          departureDate = formatTripDate(flights[index].date.startDate);
        }

        const segment = `${departureAirport},${destinationAirport},${departureDate}`;
        trips.push(segment);
        index++;
      }

      const tripsString = trips.join("|");

      return tripsString;
    }
  }

  const requestBody = {
    departureAirport: formData.get("departureAirport")
      ? formatAirport(formData.get("departureAirport"))
      : undefined,
    destinationAirport: formData.get("destinationAirport")
      ? formatAirport(formData.get("destinationAirport"))
      : undefined,
    type: formData.get("row-radio-buttons-group"),
    trips:
      formData.get("row-radio-buttons-group") == "multicities"
        ? convertToTrips(formData)
        : undefined,
    departureDate:
      formData.get("row-radio-buttons-group") == "roundtrip"
        ? formatDate(formattedStartDate)
        : formData.get("row-radio-buttons-group") == "oneway"
          ? formatDate(formattedOnewayStartDate)
          : undefined,
    adults: adults,
    children: Children,
    returnDate:
      formData.get("row-radio-buttons-group") == "roundtrip"
        ? formatDate(formattedreturnDate)
        : undefined,
    name: formData.get("Name"),
    email: formData.get("Email"),
    phone_no: formData.get("phonenumber"),
    id: userid || undefined,
    cabin:
      formData.get("cabin") === "Economy"
        ? "E"
        : formData.get("cabin") === "First Class"
          ? "F"
          : "B" || undefined,
  };

  cookies().set("searchResult", JSON.stringify(requestBody), {
    httpOnly: true,
  });
  //Full Airline and  Code
  cookies().set(
    "departureAirportAndCode",
    JSON.stringify(formData.get("departureAirport")),
    { httpOnly: true }
  );
  cookies().set(
    "destinationAirportAndCode",
    JSON.stringify(formData.get("destinationAirport")),
    { httpOnly: true }
  );

  ///
  cookies().set(
    "departureAirport",
    JSON.stringify(requestBody.departureAirport),
    {
      httpOnly: true,
    }
  );
  cookies().set(
    "destinationAirport",
    JSON.stringify(requestBody.destinationAirport),
    {
      httpOnly: true,
    }
  );
  cookies().set("type", JSON.stringify(requestBody.type), {
    httpOnly: true,
  });
  cookies().set("departureDate", JSON.stringify(requestBody.departureDate), {
    httpOnly: true,
  });
  cookies().set("returnDate", JSON.stringify(requestBody.returnDate), {
    httpOnly: true,
  });
  cookies().set("adults", adults.toString(), {
    httpOnly: true,
  });
  cookies().set("children", Children.toString(), {
    httpOnly: true,
  });
  cookies().set("Infants", Infants.toString(), {
    httpOnly: true,
  });
  cookies().set("cabin", JSON.stringify(requestBody.cabin), {
    httpOnly: true,
  });
  cookies().set("trips", JSON.stringify(requestBody.trips), {
    httpOnly: true,
  });
  if (!modifysearch) {
    cookies().set(
      "departureAirportmodify",
      JSON.stringify(requestBody.departureAirport),
      {
        httpOnly: true,
      }
    );
    cookies().set(
      "destinationAirportmodify",
      JSON.stringify(requestBody.destinationAirport),
      {
        httpOnly: true,
      }
    );
    cookies().set("typemodify", JSON.stringify(requestBody.type), {
      httpOnly: true,
    });
    cookies().set(
      "departureDatemodify",
      JSON.stringify(requestBody.departureDate),
      {
        httpOnly: true,
      }
    );
    cookies().set("returnDatemodify", JSON.stringify(requestBody.returnDate), {
      httpOnly: true,
    });
    cookies().set("adultsmodify", adults.toString(), {
      httpOnly: true,
    });
    cookies().set("childrenmodify", Children.toString(), {
      httpOnly: true,
    });
    cookies().set("Infantsmodify", Infants.toString(), {
      httpOnly: true,
    });
    cookies().set("cabinmodify", JSON.stringify(requestBody.cabin), {
      httpOnly: true,
    });
    cookies().set("tripsmodify", JSON.stringify(requestBody.trips), {
      httpOnly: true,
    });
  }
  if (!modifysearch) {
    cookies().set(
      "departureAirportmodify",
      JSON.stringify(requestBody.departureAirport),
      {
        httpOnly: true,
      }
    );
    cookies().set(
      "destinationAirportmodify",
      JSON.stringify(requestBody.destinationAirport),
      {
        httpOnly: true,
      }
    );
    cookies().set("typemodify", JSON.stringify(requestBody.type), {
      httpOnly: true,
    });
    cookies().set(
      "departureDatemodify",
      JSON.stringify(requestBody.departureDate),
      {
        httpOnly: true,
      }
    );
    cookies().set("returnDatemodify", JSON.stringify(requestBody.returnDate), {
      httpOnly: true,
    });
    cookies().set("adultsmodify", adults.toString(), {
      httpOnly: true,
    });
    cookies().set("childrenmodify", Children.toString(), {
      httpOnly: true,
    });
    cookies().set("Infantsmodify", Infants.toString(), {
      httpOnly: true,
    });
    cookies().set("cabinmodify", JSON.stringify(requestBody.cabin), {
      httpOnly: true,
    });
    cookies().set("tripsmodify", JSON.stringify(requestBody.trips), {
      httpOnly: true,
    });
  }
  if (!userid) {
    cookies().set("first_name", JSON.stringify(requestBody.name), {
      httpOnly: true,
    });
    cookies().set("phone_no", JSON.stringify(requestBody.phone_no), {
      httpOnly: true,
    });
    cookies().set("email", JSON.stringify(requestBody.email), {
      httpOnly: true,
    });
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}flight/search-flights/`,
      requestBody
    );

    const searchResult = response.data;

    if (searchResult?.success) {
      if (searchResult?.hop2WsError) {
        cookies().set("user_id", searchResult?.hop2WsError?.customerSessionId, {
          httpOnly: true,
        });
      } else {
        cookies().set(
          "user_id",
          searchResult?.airTicketListResponse?.customerSessionId,
          {
            httpOnly: true,
          }
        );
        const itemsToRender: ItemType[] | undefined =
          searchResult?.airTicketListResponse?.routings.slice();
        // const airlineCodes: string[] = [];
        // Initialize a Set to store unique airline codes
        const uniqueAirlineCodes: Set<string> = new Set();

        itemsToRender?.forEach((routing) => {
          // routing.trips.forEach((trip: TripType) => {
          //   trip.segments.forEach((segment: SegmentsType) => {
          // Collect airline codes
          uniqueAirlineCodes.add(routing.mainAirlineCode);
          // uniqueAirlineCodes.add(segment.airlineCode);
          //   });
          // });
        });

        // // Convert Set to array
        // const airlineCodes: string[] = Array.from(uniqueAirlineCodes);
        // if (airline === "") {
        //   cookies().set("airlineCodes", JSON.stringify(airlineCodes), {
        //     httpOnly: true,
        //   });
        // }
      }
    } else {
      cookies().set("user_id", searchResult?.customerSessionId, {
        httpOnly: true,
      });
    }

    return searchResult;
  } catch (error) {
    redirect("/");
  }
}

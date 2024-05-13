"use server";
import axios from "axios";
import { cookies } from "next/headers";

interface Request {
  departureAirport: string;
  destinationAirport: string | null | undefined;
  type: string;
  adults?: number; // Use lowercased 'number' instead of 'Number'
  children?: number; // Use lowercased 'number' instead of 'Number'
  depart_time?: string;
  airline?: string;
  cabin?: string;
  stop?: string;
  id?: string;
  name?: string;
  email?: string;
  phone_no?: string;
  trips?: string | undefined;
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
export default async function FlightSearchResult(req: Request) {
  // cookies().set("adults", JSON.stringify(req.adults), {
  //   httpOnly: true,
  // });
  // cookies().set("children", JSON.stringify(req.children), {
  //   httpOnly: true,
  // });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}flight/search-flights/`,
      req
    );

    const itemsToRender: ItemType[] | undefined =
      response?.data.airTicketListResponse?.routings.slice();
    // const airlineCodes: string[] = [];
    // Initialize a Set to store unique airline codes
    const uniqueAirlineCodes: Set<string> = new Set();

    itemsToRender?.forEach((routing) => {
      // routing.trips.forEach((trip: TripType) => {
      // trip.segments.forEach((segment: SegmentsType) => {
      // Collect airline codes
      uniqueAirlineCodes.add(routing.mainAirlineCode);
      //   });
      // });
    });

    // Convert Set to array
    const airlineCodes: string[] = Array.from(uniqueAirlineCodes);

    if (req.airline === "") {
      cookies().set("airlineCodes", JSON.stringify(airlineCodes), {
        httpOnly: true,
      });
    }

    return response.data;
  } catch (error) {
    return {
      error: "Failed to fetch flight data",
    };
  }
}

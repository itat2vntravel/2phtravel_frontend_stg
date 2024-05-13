"use server";
import axios from "axios";

interface Request {
  departureAirport?: string | null;
  destinationAirport?: string | null;
  Name: string;
  Email: string;
  phonenumber: string;
  page?: string;
  departure_date?: string | null;
  return_date?: string | null;
  airline_name?: string | null;
  trip_type?: string | null;
  user?: string | null;
  type?: string | null;
  trip?: object;
  price?: string;
}
export default async function BookingFormApi(req: Request) {
  var requestElement;
  if (req.type === "roundtrip") {
    requestElement = {
      contact_name: req.Name,
      contact_email: req.Email,
      contact_phone: req.phonenumber,
      from_location: req.type === "roundtrip" ? req.departureAirport : "",
      to_location: req.type === "roundtrip" ? req.destinationAirport : "",
      departure_date: req.type === "roundtrip" ? req.departure_date : "",
      return_date: req.type === "roundtrip" ? req.return_date : "",
      user: req.user || "",
      trip_info: req.trip,
      airline_name: req.airline_name,
      trip_type: req.trip_type,
      page: req.page,
      price: req.price || undefined,
    };
  } else if (req.type === "oneway") {
    requestElement = {
      contact_name: req.Name,
      contact_email: req.Email,
      contact_phone: req.phonenumber,
      from_location: req.departureAirport,
      to_location: req.destinationAirport,
      departure_date: req.departure_date,
      user: req.user || "",
      trip_info: req.trip,
      page: req.page,
      airline_name: req.airline_name,
      trip_type: req.trip_type,
      price: req.price || undefined,
    };
  } else {
    requestElement = {
      contact_name: req.Name,
      contact_email: req.Email,
      contact_phone: req.phonenumber,
      user: req.user || "",
      trip_info: req.trip,
      page: req.page,
      airline_name: req.airline_name,
      trip_type: req.trip_type,
      price: req.price || undefined,
    };
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}flight/booknow/`,
      requestElement
    );

    return response.data;
  } catch (error) {
    return {
      error: "Invalid ",
    };
  }
}

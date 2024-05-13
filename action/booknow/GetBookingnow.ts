"use server";
import axios from "axios";

export default async function GetBookingHistroy(page: number) {
  try {
    const response = await axios.get(
      `${
        page !== undefined
          ? `${process.env.REACT_APP_API_BASEURL}flight/booknow/?page=${page}`
          : `${process.env.REACT_APP_API_BASEURL}flight/booknow/`
      }`
    );

    return response.data;
  } catch (error) {
    console.error("error", error);
  }
}

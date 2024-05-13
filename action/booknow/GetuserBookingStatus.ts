"use server";
import axios from "axios";

interface Request {
  userId: string;
}
export default async function GetUserBookingStatus(req: Request) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASEURL}flight/booknow?user=${req.userId}`
    );
    return response.data;
  } catch (error) {
    console.error("error", error);
  }
}

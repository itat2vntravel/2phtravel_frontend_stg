"use server";
import axios from "axios";

interface Request {
  name: string;
  email: string;
  phone_number: string;
  msg: string | null;
}
export default async function EnquiryFormApi(req: Request) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}flight/enquiry/`,
      req
    );

    return response.data;
  } catch (error) {
    return {
      error: "Invalid ",
    };
  }
}

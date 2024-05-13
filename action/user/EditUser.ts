"use server";
import axios from "axios";
import { cookies } from "next/headers";

interface Request {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  gender: string;
  phone_number: string;
  address: string;
  districts: string;
  city: string;
}

export default async function EditUser(req: Request) {
  const token = cookies().get("access_token")?.value || "";
  const FulluserId = cookies().get("FulluserId")?.value || "";

  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_BASEURL}user/${FulluserId}/`,
      req,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return {
      error: "Failed to fetch flight data",
    };
  }
}

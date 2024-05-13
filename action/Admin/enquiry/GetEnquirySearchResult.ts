"use server";
import axios from "axios";
import { cookies } from "next/headers";

export default async function GetEnquirySearchResults(req: string) {
  const token = cookies().get("admin_access_token")?.value || "";
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASEURL}flight/enquiry/search?q=${req}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("error", error);
  }
}

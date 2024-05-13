"use server";
import axios from "axios";
import { cookies } from "next/headers";

export default async function GetNewsletterDetails(page: string) {
  const token = cookies().get("admin_access_token")?.value || "";
  try {
    const response = await axios.get(
      `
      ${
        page !== undefined
          ? `${process.env.REACT_APP_API_BASEURL}flight/news-letter/?page=${page}`
          : `${process.env.REACT_APP_API_BASEURL}flight/news-letter/`
      }
      
    `,

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

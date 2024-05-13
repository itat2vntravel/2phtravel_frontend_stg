"use server";
import axios from "axios";
import { cookies } from "next/headers";

export default async function GetPromotion(query: string) {
  const token =
    cookies().get("admin_access_token")?.value ||
    cookies().get("access_token")?.value ||
    "";

  let headers = {};

  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASEURL}admin/promotion/?q=${query}`,
      { headers }
    );

    const searchResult = response.data;

    return searchResult;
  } catch (error) {
    console.error("redirect", error);
  }
}

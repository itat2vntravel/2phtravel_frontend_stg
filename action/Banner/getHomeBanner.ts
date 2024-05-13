"use server";
import axios from "axios";

export default async function GetHomeBanner(page: string) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASEURL}admin/banner/?page=${page}`
    );
    const searchResult = response.data;

    return searchResult;
  } catch (error) {
    console.error("redirect", error);
  }
}

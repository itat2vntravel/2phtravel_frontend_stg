"use server";
import axios from "axios";

export default async function GetAllBanner() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASEURL}admin/banner/`
    );
    const searchResult = response.data;

    return searchResult;
  } catch (error) {
    console.error("redirect", error);
  }
}

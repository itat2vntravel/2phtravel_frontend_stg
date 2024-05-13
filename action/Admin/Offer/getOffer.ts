"use server";
import axios from "axios";

export default async function GetOffer() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASEURL}admin/offers/`
    );
    const searchResult = response.data;

    return searchResult;
  } catch (error) {
    console.error("redirect", error);
  }
}

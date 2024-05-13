"use server";
import axios from "axios";

export default async function GetAllDestinationDeals() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASEURL}admin/deals/`
    );

    return response.data;
  } catch (error) {
    console.error("error", error);
  }
}

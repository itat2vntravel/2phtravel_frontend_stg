"use server";
import axios from "axios";

export default async function DestinationDeals(id: string) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASEURL}admin/deals?destination=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("error", error);
  }
}

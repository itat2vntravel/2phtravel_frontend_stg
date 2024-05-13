"use server";
import axios from "axios";

export default async function GetCityName() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASEURL}admin/city/`
    );

    return response.data;
  } catch (error) {
    console.error("error", error);
  }
}

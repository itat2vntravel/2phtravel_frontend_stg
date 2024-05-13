"use server";
import axios from "axios";

export default async function ExcelExport() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASEURL}export/users/`
    );

    return response.data;
  } catch (error) {
    console.error("error", error);
  }
}

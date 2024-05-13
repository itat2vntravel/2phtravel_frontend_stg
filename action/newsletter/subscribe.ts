"use server";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function Subscribe(formData: FormData) {
  const requestBody = {
    email: formData.get("email"),
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}flight/news-letter/`,
      requestBody
    );
    const searchResult = response.data;

    return searchResult;
  } catch (error) {
    redirect("/");
  }
}

"use server";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function UnSubscribe(email: string) {
  const requestBody = {
    email: email,
    is_subscribed: 0,
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}flight/unsubscribe/`,
      requestBody
    );
    const searchResult = response.data;

    return searchResult;
  } catch (error) {
    redirect("/");
  }
}

"use server";
import { getUserIdAndToken } from "@/utils/utils";
import axios from "axios";
import { cookies } from "next/headers";

export default async function GetUserInfo() {
  const token = cookies().get("access_token")?.value || "";
  const FulluserId = cookies().get("FulluserId")?.value || "";

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASEURL}user/${FulluserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      error: "Failed to retrieve user data. Please check your credentials.",
    };
  }
}

"use server";
import axios from "axios";
import { cookies } from "next/headers";

interface Request {
  current_password: string;
  new_password: string;
}

export default async function UserUpdatePassword(req: Request) {
  const email = cookies().get("email")?.value || "";
  const token = cookies().get("access_token")?.value || "";

  const requestBody = {
    email: email,
    current_password: req.current_password,
    new_password: req.new_password,
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}update-password/`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      error: "Current password wrong",
    };
  }
}

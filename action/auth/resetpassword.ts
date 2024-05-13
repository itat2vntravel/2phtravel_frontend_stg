"use server";
import axios from "axios";

interface Request {
  request_type: string;
  email: string;
}

export default async function UserResetPassword(req: Request) {
  const requestBody = {
    email: req.email,
    request_type: req.request_type,
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}reset-password/`,
      requestBody
    );

    return {
      success: response.data.msg,
    };
  } catch (error) {
    return {
      error: "Invalid email and password",
    };
  }
}

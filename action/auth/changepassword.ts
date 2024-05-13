"use server";
import axios from "axios";

interface Request {
  request_type: string;
  token: string | null | undefined;
  password: string;
}

export default async function UserChangePassword(req: Request) {
  const requestBody = {
    request_type: req.request_type,
    token: req.token,
    password: req.password,
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

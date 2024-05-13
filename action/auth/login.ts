"use server";
import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function loginWithUsernameandPassword(formData: FormData) {
  const requestBody = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}login/`,
      requestBody
    );
    const session = response.data;
    const { authenticatedUser } = response.data;

    const { email, otp_token, phoneno } = authenticatedUser;
    cookies().set("email", JSON.stringify(email), {
      httpOnly: true,
    });
    cookies().set("phone_no", JSON.stringify(phoneno), {
      httpOnly: true,
    });
    cookies().set("otp_token", otp_token, {
      httpOnly: true,
    });
    return {
      success: session.message,
    };
  } catch (error) {
    return {
      error: "Invalid email and password",
    };
  }
}

export async function LoginWithGmail(auth_token?: string) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}oauth/`,
      { auth_token }
    );
    const { authenticatedUser, access_token, refresh_token } = response.data;
    const { user_id, first_name, last_name, provider } = authenticatedUser;
    const userId = user_id.split("-")[0];
    const FulluserId = user_id;
    const expires = new Date(Date.now() + 3000 * 1000);

    cookies().set("access_token", access_token, {
      httpOnly: true,
      expires,
    });
    cookies().set("refresh_token", refresh_token, {
      httpOnly: true,
      expires,
    });
    cookies().set("user_id", userId, {
      httpOnly: true,
      expires,
    });
    cookies().set("provider", provider, {
      httpOnly: true,
      expires,
    });
    cookies().set("FulluserId", FulluserId, {
      httpOnly: true,
      expires,
    });
    cookies().set("first_name", JSON.stringify(first_name), {
      httpOnly: true,
    });
    cookies().set("last_name", last_name, {
      httpOnly: true,
    });
  } catch (err: any) {
    return {
      error: err.response.data.detail,
    };
  }
  redirect("/");
}

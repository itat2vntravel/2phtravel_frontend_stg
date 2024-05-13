"use server";
import axios from "axios";
import { cookies } from "next/headers";

export default async function VerfiyOtp(formData: FormData) {
  const otp_token = cookies().get("otp_token")?.value as string;
  const otp = formData.get("otp");

  const requestBody = {
    otp_token: otp_token,
    otp: otp,
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}verify/`,
      requestBody
    );

    const { authenticatedUser, access_token, refresh_token } = response.data;

    const { user_id, first_name, last_name } = authenticatedUser;
    const FulluserId = user_id;
    const userId = user_id.split("-")[0];

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
    // cookies().set("first_name", first_name, {
    //     httpOnly: true,
    // });

    return {
      success: "Email Verified Successfully!",
    };
  } catch (error) {
    return {
      error: "Invalid email and password",
    };
  }
}

export async function resendOtp() {
  const email = cookies().get("email")?.value as string;

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}resend-otp/`,
      {
        email,
      }
    );
    const { otp_token } = response.data;
    cookies().set("otp_token", otp_token, {
      httpOnly: true,
    });
    return {
      success: "OTP has been sent to your email",
    };
  } catch (error) {
    return {
      error: "Invalid email",
    };
  }
}

"use server";
import axios from "axios";
import { cookies } from "next/headers";

export default async function SignupAccount(formData: FormData) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const password = formData.get("password") as string;
  const confirm_password = formData.get("confirm_password");

  const requestBody = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    phone_number: formData.get("mobile_number"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (password === confirm_password) {
    // Check if password meets regex criteria
    if (!regex.test(password)) {
      return {
        error:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one digit, and one special character",
      };
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASEURL}signup/`,
        requestBody
      );

      const expires = new Date(Date.now() + 3000 * 1000);

      const session = response.data;
      const { authenticatedUser } = response.data;

      const { email, otp_token } = authenticatedUser;
      // cookies().set('email', email, { expires, httpOnly: true })
      // cookies().set("email", JSON.stringify(email), {
      //     httpOnly: true,
      // });
      cookies().set("email", email, {
        httpOnly: true,
      });
      cookies().set("otp_token", otp_token, {
        httpOnly: true,
      });
      return response.data;
    } catch (error: any) {
      return {
        error: error.response.data.email[0],
      };
    }
  } else {
    return {
      error: "Password Mismatch.",
    };
  }
}

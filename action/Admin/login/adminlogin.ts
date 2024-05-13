"use server";
import axios from "axios";
import { cookies } from "next/headers";

export default async function ActionAdminLogin(formData: FormData) {
  const requestBody = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}admin/login/`,
      requestBody
    );
    const session = response.data;
    const { authenticatedUser } = response.data;

    const { email, first_name, last_name, superuser } = authenticatedUser;
    cookies().set("admin_first_name", first_name, {
      httpOnly: true,
    });
    cookies().set("admin_last_name", last_name, {
      httpOnly: true,
    });
    cookies().set("admin_email", email, {
      httpOnly: true,
    });
    cookies().set("admin_superuser", superuser, {
      httpOnly: true,
    });
    cookies().set("admin_access_token", response.data.access_token, {
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

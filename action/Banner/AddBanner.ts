"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function Addbanner(formData: FormData) {
  const token = cookies().get("admin_access_token")?.value || "";
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}admin/banner/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidatePath("/admin/homebanner");
    revalidatePath("/admin/airline-offers");
    return response.data;
  } catch (error) {
    console.error("error", error);
  }
}

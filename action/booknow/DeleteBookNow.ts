"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function DeleteBookNow(id: number) {
  const token = cookies().get("admin_access_token")?.value || "";
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_BASEURL}flight/booknow/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidatePath("/admin/dashboard");
    return response.data;
  } catch (error) {
    console.error("error", error);
  }
}

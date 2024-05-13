"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function UpdatePromotion(id: any, formData: FormData) {
  const token = cookies().get("admin_access_token")?.value || "";
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_BASEURL}admin/promotion/${id}/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidatePath("/admin/promotion");
    return response.data;
  } catch (error) {
    console.error("error", error);
  }
}

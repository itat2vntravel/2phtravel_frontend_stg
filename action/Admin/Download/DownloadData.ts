"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface RequestData {
  model: string;
}

interface QueryData {
  q: string;
}

export default async function DownloadData(
  request: RequestData,
  query: QueryData
) {
  const token = cookies().get("admin_access_token")?.value || "";
  const url =
    query.q === "all"
      ? `${process.env.REACT_APP_API_BASEURL}flight/download/`
      : `${process.env.REACT_APP_API_BASEURL}flight/download/?q=${query.q}`;
  try {
    const response = await axios.post(url, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // revalidatePath("/admin/dashboard");
    return response.data;
  } catch (error) {
    console.error("error", error);
  }
}

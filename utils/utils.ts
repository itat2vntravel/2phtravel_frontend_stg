"use server"
import { cookies } from "next/headers"

export const getUserIdAndToken = () => {
  const token = cookies().get("access_token")?.value || ""
  const userId = cookies().get("user_id")?.value || ""
  const firstName = cookies().get("first_name")?.value || ""
  const LastName = cookies().get("last_name")?.value || ""
  return { token, userId, firstName, LastName }
}

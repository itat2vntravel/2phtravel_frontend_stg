import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout() {
  // Destroy the session
  cookies().set("access_token", "", { expires: new Date(0) });
  cookies().set("refresh_token", "", { expires: new Date(0) });
  cookies().set("email", "", { expires: new Date(0) });
  cookies().set("first_name", "", { expires: new Date(0) });
  cookies().set("last_name", "", { expires: new Date(0) });
  cookies().set("user_id", "", { expires: new Date(0) });
  cookies().set("otp_token", "", { expires: new Date(0) });
  cookies().set("admin_first_name", "", { expires: new Date(0) });
  cookies().set("admin_last_name", "", { expires: new Date(0) });
  cookies().set("admin_email", "", { expires: new Date(0) });
  cookies().set("admin_superuser", "", { expires: new Date(0) });
  cookies().set("admin_access_token", "", { expires: new Date(0) });
  cookies().set("provider", "", { expires: new Date(0) });
  redirect("/");
}

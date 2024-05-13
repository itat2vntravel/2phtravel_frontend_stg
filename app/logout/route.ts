import { logout } from "@/action/auth/logout";

export async function GET() {
  await logout()
}

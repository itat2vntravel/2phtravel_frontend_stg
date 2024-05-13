"use server";
import axios from "axios";

export default async function Getbookflightnow(token: string) {
    //   const token = cookies().get("admin_access_token")?.value || "";
    const req = {
        token
    }
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_BASEURL}flight/booking-info/`, req

        );
        return response.data;
    } catch (error) {
        console.error("error", error);
    }
}

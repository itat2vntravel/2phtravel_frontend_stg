"use server";
import axios from "axios";


interface Request {
    booking: {
        contact_email: string,
        contact_phone: string,
        contact_name: string | undefined,
        user?: string,
        page?: string,
        payment_type: string,
        airline_name?: string,
        trip_type?: any,
        trip_info?: any,
        flight_info?: any,
    },
    passengers: any,
    card_info?: {
        card_holder_name: string,
        amount: number,
        card_number: string,
        expiry_date: string,
        security_code: string,
        billing_address: string,
        apt_unit: string,
        city: string,
        state: string,
        country: string,
        zip_code: string
    };
}
export default async function CreateBookFlight(req: Request) {

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_BASEURL}flight/book-flight-now/`, req

        );

        // console.log("response", response.data)
        return response.data;
    } catch (error) {
        console.error("error", error);
    }
}

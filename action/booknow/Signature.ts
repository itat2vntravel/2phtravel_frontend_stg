"use server";
import axios from "axios";


export default async function SignatureAPI(req: FormData) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_BASEURL}flight/signature/`,
            req
        );
        return response.data;
    } catch (error) {
        return {
            error: "Invalid Data ",
        };
    }
}

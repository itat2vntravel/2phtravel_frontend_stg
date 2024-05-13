"use server";
import axios from "axios";

interface Request {
  card_holder_name: string;
  contact_phone: string;
  contact_email: string;
  reservation_code: string;
  card_number: string;
  cvv: string;
  expiration: string;
  authorized_amount: number;
  billing_address: string;
  apt_unit: string;
  city: string;
  state: string;
  zip_code: string;
}
export default async function CardpaymentApi(req: FormData) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASEURL}admin/payment-info/`,
      req
    );
    return response.data;
  } catch (error) {
    return {
      error: "Invalid Data ",
    };
  }
}

"use client";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import Paymentandagree from "../FlightDetails/PaymentOptions/paymentandagree";

export default function Payandagree() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return (
    <>
      {token ? (
        <Container>
          <Paymentandagree />
        </Container>
      ) : (
        <div className="m-5 p-3 bg-red-100 rounded-[5px]">
          <p className=" text-customRed font-semibold text-[25px] flex gap-2 items-center justify-center px-10">
            <FiAlertTriangle />
            Invalid token
          </p>
        </div>
      )}
    </>
  );
}

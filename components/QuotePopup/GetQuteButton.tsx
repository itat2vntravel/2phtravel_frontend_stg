"use client";
import React from "react";
import { PulseLoader } from "react-spinners";

type FormButtonProps = {
  children: React.ReactNode;
  loading: boolean;
  errormessage?: Boolean;
};

function GetQuoteButton({ children, loading, errormessage }: FormButtonProps) {
  return (
    <button
      type="submit"
      className=" w-full justify-center rounded-md bg-[#142D53] px-3 py-2 text-sm font-semibold text-white shadow-sm "
      disabled={loading ? true : false}
    >
      {loading ? <PulseLoader color="#fff" /> : children}
    </button>
  );
}

export default GetQuoteButton;

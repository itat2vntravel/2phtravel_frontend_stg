"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { PulseLoader } from "react-spinners";

type FormButtonProps = {
  children: React.ReactNode;
};

function ResendButton({ children }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className=" text-customBlue font-semibold hover:text-customRed  w-full rounded-md"
      type="submit"
      disabled={pending ? true : false}
    >
      {pending ? <PulseLoader color="#fff" /> : children}
    </button>
  );
}

export default ResendButton;

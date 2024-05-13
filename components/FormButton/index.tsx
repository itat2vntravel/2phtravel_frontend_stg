"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { PulseLoader } from "react-spinners";

type FormButtonProps = {
  children: React.ReactNode;
};

function FormButton({ children }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-customBlue text-white p-2 mt-[20px] w-full rounded-md"
      type="submit"
      disabled={pending ? true : false}
    >
      {pending ? <PulseLoader color="#fff" /> : children}
    </button>
  );
}

export default FormButton;

"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { PulseLoader } from "react-spinners";

type FormButtonProps = {
  children: React.ReactNode;
};

function LoaderButton({ children }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className=" w-full justify-center rounded-md bg-[#EC2719] px-3 py-2 text-sm font-semibold text-white shadow-sm "
      type="submit"
      disabled={pending ? true : false}
    >
      {pending ? <PulseLoader color="#fff" /> : children}
    </button>
  );
}

export default LoaderButton;

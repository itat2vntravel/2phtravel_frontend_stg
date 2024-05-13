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
      className=" bg-[#142B51] h-10 flex gap-[5px] justify-center rounded-md items-center text-white border-none md:w-[20%] w-[35%]"
      type="submit"
      disabled={pending ? true : false}
    >
      {pending ? <PulseLoader color="#fff" /> : children}
    </button>
  );
}

export default LoaderButton;

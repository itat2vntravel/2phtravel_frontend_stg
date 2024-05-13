"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { PulseLoader } from "react-spinners";

type NewsletterButtonProps = {
  children: React.ReactNode;
};

function NewsletterButton({ children }: NewsletterButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className={`h-[40x] px-0 md:px-5 py-1 w-[28vw] md:w-fit bg-[#EC2719]`}
      style={{
        borderRadius: "0 10px 10px 0",
        color: "white",
        right: "0px",
      }}
      type="submit"
      disabled={pending ? true : false}
    >
      {pending ? <PulseLoader color="#fff" /> : children}
    </button>
  );
}

export default NewsletterButton;

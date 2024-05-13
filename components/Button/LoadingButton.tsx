"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface LoadingButtonProps {
  onClick?: () => void;
  text: string;
  routerpathName: string;
  routering: boolean;
  //   custom?: string;
  type?: "submit" | "reset" | "button";
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  text,
  routering,
  routerpathName,
  //   onClick,
  //   custom,
  type,

  ...otherprops
}) => {
  const router = useRouter();
  return (
    <button
      className={`w-auto text-white text-[18px] rounded-[5px]  p-3 my-3 bg-[#EC2719] font-normal`}
      type={type}
      //   style={style}
      onClick={() => (routering ? router.push(routerpathName) : undefined)}
    >
      {text}
    </button>
  );
};

export default LoadingButton;

"use client";

import UnSubscribe from "@/action/newsletter/unsubscribe";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";

interface UnsubscribeButtonProps {
  email: string;
}

const UnsubscribeButton: React.FC<UnsubscribeButtonProps> = ({
  email,
  ...otherprops
}) => {
  const [Unsubsribe, setUnsubscribed] = useState(false);

  const router = useRouter();

  const handleclick = async () => {
    setUnsubscribed(true);
    const Unsubscribe = await UnSubscribe(email);

    if (Unsubscribe) {
      Swal.fire({
        icon: "success",
        title: Unsubscribe.msg,
        text: "You are now unsubscribed",
      });
      setUnsubscribed(false);
      router.push("/unsubscribe");
    }
  };
  return (
    <button
      className="bg-[#ec2719] flex gap-2 justify-center items-center p-2 rounded-[5px] text-white "
      type="button"
      onClick={() => handleclick()}
      disabled={Unsubsribe ? true : false}
    >
      {Unsubsribe ? <PulseLoader color="white" /> : "Unsubscribe"}
    </button>
  );
};

export default UnsubscribeButton;

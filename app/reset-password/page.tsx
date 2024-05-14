import Image from "next/image";
import React, { Suspense } from "react";
import Logo from "../../public/logo1.jpg";
import ResetpasswordPage from "@/components/Forgetpassword/Resetpassword";

export default function Resetpasswordpage() {
  return (
    <>
      <div className="h-screen items-center flex justify-center bg-cover">
        <div className="bg-[#ffffffd2]  lg:w-2/5 h-fit  m-5 rounded-md  p-5 border-2 border-[#182c51]">
          <div className="flex justify-center">
            <Image
              src={Logo}
              alt="Logo"
              width={200}
              height={55}
              priority
              className="mix-blend-multiply	"
              quality={100}
            />
          </div>
          <Suspense>
            <ResetpasswordPage />
          </Suspense>
        </div>
      </div>
    </>
  );
}

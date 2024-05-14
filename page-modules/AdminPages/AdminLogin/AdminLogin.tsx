import Image from "next/image";
import React from "react";
import Logo from "@/public/logo1.jpg";
import AdminFormData from "./AdminFormData";

const AdminLogin = () => {
  return (
    <div>
      <div className="h-screen  flex justify-center bg-center items-center  bg-cover">
        <div className="bg-[#ffffffd2]  items-center  lg:w-2/5 w-full 2xl:h-fit	 m-5 rounded-md  p-5 border-2 border-[#182c51]">
          <div className="flex justify-center items-center flex-col">
            <Image
              src={Logo}
              alt="Logo"
              width={200}
              height={55}
              priority
              quality={100}
              className="mt-3 mix-blend-multiply"
            />
            <h1 className="mt-3 text-center">Admin Login</h1>
          </div>
          <AdminFormData />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

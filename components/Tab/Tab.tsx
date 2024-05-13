"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { TbPasswordUser } from "react-icons/tb";
import { MdBookmarkBorder } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

interface TabProps {
  children: ReactNode;
  provider?: string;
}

export default function Tab({ children, provider }: TabProps) {
  const pathname = usePathname();
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-[100%] md:w-2/6 2xl:px-5 px-2 ">
          <div className="my-2 md:my-0 md:m-3 flex gap-[10px] flex-wrap text-xl text-gray-500 border">
            <Link
              href="/profile"
              className={`flex items-center gap-2 cursor-pointer md:justify-start justify-center md:px-6 w-[40px] md:w-full py-2 ${
                pathname === "/profile" ? "bg-[#142d53] text-white " : ""
              }`}
            >
              <FaUser />
              <h1 className="md:block hidden text-lg font-semibold">Profile</h1>
            </Link>
            <Link
              href="/profile/user-manage"
              className={`flex items-center gap-2 cursor-pointer md:justify-start justify-center md:px-6 py-2 w-[40px] md:w-full  ${
                pathname === "/profile/user-manage"
                  ? "bg-[#142d53] text-white"
                  : ""
              }`}
            >
              <MdBookmarkBorder />
              <h1 className="md:block hidden text-lg font-semibold leading-6">
                Order Information
              </h1>
            </Link>
            {provider === "GOOGLE" ? (
              <></>
            ) : (
              <Link
                href="/profile/change-password"
                className={`flex items-center gap-2 cursor-pointer md:justify-start justify-center md:px-6 py-2 w-[40px] md:w-full  ${
                  pathname === "/profile/change-password"
                    ? "bg-[#142d53] text-white"
                    : ""
                }`}
              >
                <TbPasswordUser />
                <h1 className="md:block  hidden text-lg font-semibold leading-6">
                  Change Password
                </h1>
              </Link>
            )}
            <Link
              href="/logout"
              className={`flex items-center gap-2 cursor-pointer  md:justify-start justify-center md:px-6 py-2 w-[40px] md:w-full  ${
                pathname === "/settings" ? "bg-[#142d53] text-white" : ""
              }`}
            >
              <IoLogOut />
              <p className="md:block hidden text-lg font-semibold leading-6">
                Logout
              </p>
            </Link>
          </div>
        </div>
        <div className="w-[100%] md:w-4/6">{children}</div>
      </div>
    </>
  );
}

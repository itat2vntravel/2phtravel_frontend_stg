"use client";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

export interface FooterProps {}

const FooterMessage: FC<FooterProps> = () => {
  const pathname = usePathname();

  const searchflight = pathname === "/flight/search" ? true : false;
  const summary = pathname === "/flight/summary" ? true : false;
  const booknow = pathname === "/booknow" ? true : false;

  const filterPathname = searchflight || summary || booknow;

  return (
    <>
      {filterPathname && (
        <div className="text-center  m-2">
          {" "}
          <p className="text-gray-500">
            *Prices are displayed for reference, contact our team to get better
            prices via email or wire.
          </p>
        </div>
      )}
    </>
  );
};

export default FooterMessage;

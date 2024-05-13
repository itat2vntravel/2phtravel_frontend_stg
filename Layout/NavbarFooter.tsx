import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { cookies } from "next/headers";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const NavbarFooter: React.FC<LayoutProps> = ({ children }) => {
  const accesstoken = cookies().get("access_token")?.value || "";
  return (
    <>
      <Header
        firstName=""
        isMobileView=""
        userId=""
        accesstoken={accesstoken}
      />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default NavbarFooter;

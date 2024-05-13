import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import BookNowDetails from "@/page-modules/FlightDetails/BookNowDetails";
import { cookies } from "next/headers";
import React from "react";

export interface BookNowInterface {
  searchParams: {
    open: string;
  };
}

const BookNow: React.FC<BookNowInterface> = ({ searchParams }) => {
  const UserLoginId = cookies().get("user_id")?.value || "";
  const firstName = cookies().get("first_name")?.value || "";
  const accesstoken = cookies().get("access_token")?.value || "";

  return (
    <>
      <Header
        isMobileView={searchParams.open}
        userId={UserLoginId}
        firstName={firstName}
        accesstoken={accesstoken}
      />
      <BookNowDetails />
      <Footer />
    </>
  );
};

export default BookNow;

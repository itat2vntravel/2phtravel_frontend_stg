import React from "react";
import FilghtDetails from "./FilghtDetails";

import PaymentOptions from "./PaymentOptions/PaymentOptions";
import Summery from "./Summary/Summery";
import Styles from "./flightdetails.module.css";
import { cookies } from "next/headers";
import { Card } from "@mui/material";
import ContactInfoForm from "./ContanctInfoForm";
import PassengerDetails from "./PassengerDetails/PassengerDetails";

const BookNowDetails = () => {

  const type = JSON.parse(cookies().get("type")?.value || "");
  const adultscount = cookies().get("adults")?.value || 0;
  const childrencount = cookies().get("children")?.value || 0;
  const InfantsCount = cookies().get("Infants")?.value || 0;

  const cabin = cookies().get("cabin")?.value
    ? JSON.parse(cookies().get("cabin")?.value || "")
    : undefined;

  const departureDate = cookies().get("departureDate")?.value
    ? JSON.parse(cookies().get("departureDate")?.value || "")
    : undefined;

  const destinationAirportAndCode = cookies().get("destinationAirportAndCode")
    ?.value
    ? JSON.parse(cookies().get("destinationAirportAndCode")?.value || "")
    : undefined;
  const departureAirportAndCode = cookies().get("departureAirportAndCode")
    ?.value
    ? JSON.parse(cookies().get("departureAirportAndCode")?.value || "")
    : undefined;
  const returnDate = cookies().get("returnDate")?.value
    ? JSON.parse(cookies().get("returnDate")?.value || "")
    : undefined;
  const FulluserId = cookies().get("FulluserId")?.value || "";
  const Name = cookies().get("first_name")?.value || "";
  const Email = cookies().get("email")?.value || "";
  const PhoneNo = cookies().get("phone_no")?.value || "";

  const departureAirport = cookies().get("departureAirport")?.value
    ? JSON.parse(cookies().get("departureAirport")?.value || "")
    : undefined;

  const destinationAirport = cookies().get("destinationAirport")?.value
    ? JSON.parse(cookies().get("destinationAirport")?.value || "")
    : undefined;

  return (
    <div className={`container mx-auto ${Styles.paddingcontainer}`}>
      <div className="mt-6">
        <div className="grid grid-cols-12 gap-4 ">
          <div className=" lg:col-span-8  md:col-span-12 col-span-12">
            <FilghtDetails
              departureAirport={departureAirport}
              destinationAirport={destinationAirport}
              cabin={cabin}
            />
            {/* <ContactDetails /> */}
            <div className="mt-6">
              <Card className={`${Styles.cardShadow} p-5`}>
                <h1 style={{ color: "red" }}>CONTACT INFORMATION</h1>
                <div className="flex justify-around p-3 flex-wrap">
                  <ContactInfoForm
                    departureAirport={departureAirportAndCode}
                    destinationAirport={destinationAirportAndCode}
                    departureDate={departureDate}
                    returnDate={returnDate}
                    type={type}
                    UserName={Name}
                    Useremail={Email}
                    Userphone={PhoneNo}
                  />
                </div>
              </Card>
            </div>
            <PassengerDetails
              adults={adultscount}
              childrenCount={childrencount}
              InfantsCount={InfantsCount}
            />
            <PaymentOptions type={type} userId={FulluserId} />
            {/* <Agreement /> */}
          </div>
          <div className=" lg:col-span-4  md:col-span-12  col-span-12">
            <Summery
              type={type}
              cabin={cabin}
              // adultscount={adultscount}
              adults={adultscount}
              childrenCount={childrencount}
              InfantsCount={InfantsCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNowDetails;

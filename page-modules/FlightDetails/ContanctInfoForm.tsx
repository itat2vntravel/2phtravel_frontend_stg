"use client";
import useBookingQuote from "@/store/BookingQuote";
import useBookingInfo from "@/store/FlightBooking";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface DataType {
  departureAirport: string;
  destinationAirport: string;
  departureDate: string;
  returnDate: string;
  type: string;
  UserName: string;
  Useremail: string;
  Userphone: string;
}

const ContactInfoForm: React.FC<DataType> = ({
  departureAirport,
  destinationAirport,
  departureDate,
  returnDate,
  type,
  UserName,
  Useremail,
  Userphone,
}) => {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const formData = departureDate;
  const ToDate = returnDate;
  const parts = formData?.split("/");
  const parts1 = ToDate?.split("/");
  var FormDataformat = "";
  var ToDataformat = "";
  if (departureDate) {
    FormDataformat = parts[2] + "-" + parts[0] + "-" + parts[1];
  }
  if (returnDate) {
    ToDataformat = parts1[2] + "-" + parts1[0] + "-" + parts1[1];
  } else {
    console.error("no return");
  }

  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("errorMessage");

  const { Username, contact_email, contact_phone, updateBookingInfoStore } =
    useBookingInfo((state) => state);
  const { updateBookingStore } = useBookingQuote((state) => state);

  useEffect(() => {
    TripInformation();
  }, []);

  useEffect(() => {
    updateBookingInfoStore({
      contact_email: contact_email ? contact_email : JSON.parse(Useremail),
      contact_phone: contact_phone ? contact_phone : JSON.parse(Userphone),
      Username: Username ? Username : JSON.parse(UserName),
    });
  }, [UserName, Useremail, Userphone, Username, contact_email, contact_phone]);

  const TripInformation = () => {
    if (type === "oneway") {
      updateBookingStore({
        trip_info: [
          {
            departure: departureAirport,
            destination: destinationAirport,
            date: FormDataformat,
          },
        ],
      });
    } else if (type === "roundtrip") {
      updateBookingStore({
        trip_info: [
          {
            departure: departureAirport,
            destination: destinationAirport,
            date: `${FormDataformat}-${ToDataformat}`,
          },
        ],
      });
    } else {
      console.error("error");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBookingInfoStore({
      contact_email: e.target.value,
      departure: departureAirport,
      departure_date: FormDataformat,
      return_date: ToDataformat,
      destination: destinationAirport,
    });
    if (type === "oneway") {
      updateBookingStore({
        trip_info: [
          {
            departure: departureAirport,
            destination: destinationAirport,
            date: FormDataformat,
          },
        ],
      });
    } else if (type === "roundtrip") {
      updateBookingStore({
        trip_info: [
          {
            departure: departureAirport,
            destination: destinationAirport,
            date: `${FormDataformat}-${ToDataformat}`,
          },
        ],
      });
    } else {
      console.error("error");
    }
    setEmail(e.target.value);
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBookingInfoStore({
      contact_phone: e.target.value,
    });
    setMobileNumber(e.target.value);
  };
  const handlenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBookingInfoStore({
      Username: e.target.value,
    });
    setname(e.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-[20px]">
      <div>
        <div>
          <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
            Name
          </label>
          <div>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={name || JSON.parse(UserName)}
              onChange={handlenameChange}
              required
              className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
              style={{
                paddingTop: "20px",
                position: "relative",
                padding: "10px",
              }}
            />
          </div>
        </div>
        {errorMessage && !UserName && (
          <p className="text-red-600">Please Enter name</p>
        )}
      </div>

      <div>
        <div>
          <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
            Email
          </label>
          <div>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={email || JSON.parse(Useremail)}
              onChange={handleEmailChange}
              required
              className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
              style={{
                paddingTop: "20px",
                position: "relative",
                padding: "10px",
              }}
            />
          </div>
        </div>
        {errorMessage && !Useremail && (
          <p className="text-red-600">Please Enter email</p>
        )}
      </div>
      <div>
        <div>
          <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
            Mobile Number
          </label>
          <div>
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={mobileNumber || Userphone ? JSON?.parse(Userphone) : ""}
              onChange={handleMobileNumberChange}
              required
              className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
              style={{
                paddingTop: "20px",
                position: "relative",
                padding: "10px",
              }}
            />
          </div>
        </div>
        {errorMessage && !Userphone && (
          <p className="text-red-600">Please Enter Mobile number</p>
        )}
      </div>
    </div>
  );
};

export default ContactInfoForm;

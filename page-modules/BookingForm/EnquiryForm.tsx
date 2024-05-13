"use client";

import CustomField from "@/components/CustomTextField/customField";
import React, { useState } from "react";
import UserIconImage from "@/components/Images/UserImage";
import EmailIconImage from "@/components/Images/EmailIcon";
import MobileIconImage from "@/components/Images/Mobileicon";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Styles from "./Booking.module.css";
import LoaderButton from "./FormButton";
import { useRef } from "react";
import Swal from "sweetalert2";
import EnquiryFormApi from "@/action/booknow/enquirynow";
import { FiSend } from "react-icons/fi";
import { Card } from "@mui/material";
export interface BookingQuoteInterface {}

const EnquiryForm: React.FC<BookingQuoteInterface> = () => {
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLFormElement>(null);

  const handleChange = (phoneNumber: string) => {
    setValue(phoneNumber);
  };

  const handleSumbit = async (formData: FormData) => {
    const req = {
      name: formData.get("Name") as string,
      email: formData.get("Email") as string,
      phone_number: formData.get("phonenumber") as string,
      msg: formData.get("msg") as string,
    };

    const response = await EnquiryFormApi(req);

    if (response.enquiry_id) {
      Swal.fire({
        icon: "success",
        title: "Thank You",
        text: "Thank you for reaching out. Your message has been received, and a member of our team will be in touch with you shortly.",
      });
      setValue("");
      ref.current?.reset();
    }
  };

  return (
    <Card className="p-4 ">
      <div>
        <h1 className="text-[30px] md:text-[30px] text-center  text-[#142d53] ">
          {" "}
          {"Enquiry Now"}{" "}
        </h1>
        {/* <p className="text-center">{" We are happy to help you 24/7!!"} </p> */}
      </div>
      <form ref={ref} action={(formdata) => handleSumbit(formdata)}>
        <div className="grid grid-cols-2 gap-[20px]">
          <div className="mt-6">
            <CustomField
              type={"text"}
              label={"Full Name"}
              placeholder={"Name"}
              name={"Name"}
              required={true}
              icon={<UserIconImage />}
              Customclassname="!w-full"
            />
          </div>
          <div className="mt-6">
            <CustomField
              type={"email"}
              label={"Email"}
              placeholder={"Email"}
              name={"Email"}
              required={true}
              icon={<EmailIconImage />}
              Customclassname="!w-full"
            />
          </div>
        </div>
        <div className="mt-6 border-none outline-none  w-full">
          <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
            <MobileIconImage />
            Phone number
          </label>
          <div className={Styles.phonenumber}>
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={handleChange}
              name={"phonenumber"}
              className={`w-[100%] md:w-[100%] !bg-[#F4F4F4] mb-4 rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[40px] `}
              style={{
                paddingTop: "20px",
                position: "relative",

                padding: "10px",
              }}
              required={true}
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="text-[15px]  flex items-center  gap-[5px] my-[5px] leading-[18.05px] font-bold">
            <FiSend />
            Query Description
          </label>
          <textarea
            name={"msg"}
            className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[40px] md:h-[40px] ${Styles.changestextarea}`}
            placeholder={"Enter Query description"}
            rows={4}
            cols={50}
            maxLength={700}
          ></textarea>
        </div>

        <div className="bg-gray-50  w-full mt-4">
          <LoaderButton>{"Submit"}</LoaderButton>
        </div>
      </form>
      <ToastContainer />
    </Card>
  );
};
export default EnquiryForm;

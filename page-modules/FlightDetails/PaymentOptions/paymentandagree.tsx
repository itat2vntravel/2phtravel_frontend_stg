"use client";
import React, { FC, useEffect, useState } from "react";
import { Card, Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Styles from "./paymentoption.module.css";
import Image from "next/image";
import FooterpPayment from "@/public/FooterpPayment1.png";
import CardpaymentApi from "@/action/booknow/Cardpayment";
import useBookingInfo from "@/store/FlightBooking";
import { PulseLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import SignaturePad from "@/components/SignaturePad/SignaturePad";
import SigngoImage from "@/public/payment/signgo.png";
import Logo from "@/public/logo1.jpg";
import Getbookflightnow from "@/action/booknow/bookflightnow";
import LoadImage from "../../../public/load2.gif";
import SignatureAPI from "@/action/booknow/Signature";

interface CustomTextFieldProps {
  labeltext: string;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  readonly?: boolean;
  value?: string | number; // Add value prop
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface DataType {
  //   type: string;
  userId?: string;
}
interface CardInfo {
  amount: string;
  invoice_no: string;
  card_number: string;
  card_holder_name: string;
  expiry_date: string;
  security_code: string;
  billing_address: string;
  apt_unit: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  payment_info_id: string;
  booking: string;
  cvv: string;
}
interface PassengerInfo {
  title: string;
  first_name: string;
  last_name: string;
  passenger_type: string;
}
interface BookingInfo {
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  status: string;
  booking_code: string;
  trip_info: Tripinfoprops[];
}
interface Tripinfoprops {
  date: string;
  departure: string;
  destination: string;
}
const CustomTextField: FC<CustomTextFieldProps> = ({
  labeltext,
  type,
  name,
  placeholder,
  required,
  value,
  readonly,
  onChange,
}) => {
  return (
    <>
      <div>
        <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
          {labeltext}{" "}
          {required ? (
            <span className="text-red-600 text-[19px]">*</span>
          ) : (
            <span className="text-red-600 text-[19px]"> </span>
          )}
        </label>
        <div className={Styles.phonenumber}>
          <input
            type={type}
            name={name}
            autoComplete="off"
            // className="bg-white mb-4 rounded-lg p-3 focus:outline-none border border-gray-500"
            placeholder={placeholder}
            required={required}
            disabled={readonly}
            value={value} // Set value prop
            onChange={onChange} // Set onChange prop
            className={`w-full bg-[#F4F4F4]  rounded-[5px]  p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
            style={{
              paddingTop: "20px",
              position: "relative",
              padding: "10px",
            }}
            readOnly
            // placeholder={"Cardholder name"}
            // required
          />
        </div>
      </div>
    </>
  );
};
const Paymentandagree: FC<DataType> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [CardInfoData, setCardInfoData] = useState<CardInfo>();
  const [PassengerInfoData, setPassengerInfoData] = useState<PassengerInfo[]>(
    []
  );
  const [BookingInfoData, setBookingInfoData] = useState<BookingInfo>();

  useEffect(() => {
    const bookflightnowAPI = async () => {
      const booktoken = searchParams.get("token") as string;
      try {
        const response = await Getbookflightnow(booktoken);
        // console.log("booking_info", response.booking_info.flight_info);

        setCardInfoData(response.card_info);
        setBookingInfoData(response.booking_info);
        setPassengerInfoData(response.passenger_info);
        setloading(false);
        // setData(response.)
        // return response;
      } catch (error) {
        console.error("Booking search failed:", error);

        throw error;
      }
    };
    bookflightnowAPI();
  }, [searchParams]);

  const handleSave = (dataUrl: File) => {
    setSignatureFile(dataUrl);
  };

  const handlesubmit = () => {
    setloading(true);

    if (isChecked) {
      if (signatureFile) {
        CardPayment();
      } else {
        // Swal.fire({
        //   icon: "error",
        //   title: "Signature/Signature Text",
        //   text: "You prefer credit card payments with a signature required or Enter the Signature Text",
        // });

        setloading(false);
      }
    } else {
      // Swal.fire({
      //   icon: "error",
      //   title: "Terms and Condition",
      //   text: "Please make sure  agree to the terms and conditions by checking the checkbox ",
      // });

      setloading(false);
    }
  };
  const CardPayment = async () => {
    const formData = new FormData();

    formData.append("booking", CardInfoData?.booking as string);
    formData.append("card", CardInfoData?.payment_info_id as string);

    if (signatureFile) {
      formData.append("signature", signatureFile);
    }

    const response = await SignatureAPI(formData);
    // console.log("response", response);
    if (response.message) {
      setloading(false);

      Swal.fire({
        icon: "success",
        title: response.message,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
        }
      });
    }

    // if (response.error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: response.error,
    //   });
    // }
  };
  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      {CardInfoData ? (
        <>
          <div className="bg-[#142d5311] p-3 mx-3">
            <p>
              Hello, {BookingInfoData?.contact_name}, you &apos; re almost done.
              Review your flight details and complete your booking by making the
              payment and authorizing the charge.
            </p>
          </div>
          <div className=" bg-customBlue text-customWhite p-3 m-3">
            <h1 className=" flex justify-center items-center">
              PAYMENT AUTHORIZATION FOR TICKET
            </h1>
          </div>
          <div className="mt-3">
            <Card className="p-5  rounded-[5px] shadow-custom ">
              <div className="flex flex-col w-full justify-end items-end">
                <p>Invoice No: {CardInfoData?.invoice_no}</p>
                <Image
                  src={SigngoImage}
                  alt="Sign&go"
                  width={1000}
                  height={100}
                  className="w-[200px] h-auto cursor-pointer"
                />
              </div>
              <div className="flex justify-center">
                <Image
                  src={Logo}
                  alt="logo"
                  width={1000}
                  height={100}
                  className="w-[200px]  h-auto"
                />
              </div>
              <div className="flex flex-col ">
                <h2 className="md:text-[25px]  text-center my-5">
                  Credit Card Payment Authorization Form
                </h2>
                <p>
                  Please complete and sign this form to authorize 2PH Travel to
                  charge you credit card listed below.
                </p>
                <div className="flex gap-2 flex-wrap items-center my-5">
                  <p>I.</p>

                  <input
                    type="text"
                    value={BookingInfoData?.contact_name}
                    className="p-2 w-[200px] border-[2px]"
                    readOnly
                  />
                  <p>
                    authorize 2PH Travel to charge my credit card account
                    specified below for USD {CardInfoData?.amount}*. This
                    payment id for
                  </p>
                  <p> {BookingInfoData?.booking_code}.</p>
                </div>
                <div>
                  <p>Name of traveller(s) using this card</p>
                  <ul className="px-5">
                    {PassengerInfoData.map((item, index) => (
                      <div key={index}>
                        <li className="list-disc" key={index}>
                          {/* {item.title} */}
                          {""} {item.first_name},{item.passenger_type}.
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>

              <>
                <div className="mt-6 border-2 border-[#e3e3e3] ">
                  <div className={`${Styles.passengerheading}`}>
                    <h4>CREDIT CARD DETAILS</h4>
                  </div>
                  <div className="p-10">
                    <div className="grid grid-cols-12 gap-4 ">
                      <div className="md:col-span-6 sm:col-span-6 col-span-12">
                        <CustomTextField
                          labeltext="Card No."
                          type="text"
                          name="Debit/Credit Card No"
                          placeholder="Debit/Credit Card No"
                          required={true}
                          // value={CardInfoData?.card_number}

                          value={
                            (CardInfoData?.card_number &&
                              CardInfoData.card_number.replace(
                                /(.{4})(?!$)/g,
                                "$1-"
                              )) ||
                            ""
                          }
                        />
                      </div>
                      <div className="md:col-span-6 sm:col-span-6 col-span-12">
                        <div className="flex justify-end gap-1">
                          <Image
                            src={FooterpPayment}
                            alt="payment"
                            width={190}
                            height={10}
                          />
                        </div>
                      </div>
                      <div className="md:col-span-6 sm:col-span-6 col-span-12">
                        <CustomTextField
                          labeltext="cvv"
                          type="text"
                          name="cvv"
                          placeholder="cvv"
                          required={true}
                          value={CardInfoData?.security_code}
                        />
                      </div>
                      <div className="md:col-span-6 sm:col-span-6 col-span-12">
                        <div>
                          <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                            Expiration
                            <span className="text-red-600 text-[19px]">*</span>
                          </label>
                          <div>
                            <input
                              type={"text"}
                              name={"Expiration"}
                              autoComplete="off"
                              className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                              style={{
                                paddingTop: "20px",
                                position: "relative",
                                padding: "10px",
                              }}
                              placeholder="MM/YY"
                              maxLength={5}
                              value={CardInfoData?.expiry_date}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-6 sm:col-span-6 col-span-12">
                        <CustomTextField
                          labeltext="Name"
                          type="text"
                          name="Card Holder Name"
                          placeholder="Card Holder Name"
                          required={true}
                          value={CardInfoData?.card_holder_name}
                        />
                        {/* {errorMessage && !card_holder_name && (
                      <p className="text-red-600">
                        Please Enter Card Holder Name
                      </p>
                    )} */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 border-2 border-[#e3e3e3]  ">
                  <div className={`${Styles.passengerheading}`}>
                    <h4>BILLING DETAILS</h4>
                  </div>
                  <div className="px-10 py-6">
                    <div className="grid grid-cols-12 gap-4 ">
                      {/* <div className="  md:col-span-4 col-span-12">
                  <CustomTextField
                    labeltext="Customer ID"
                    type="text"
                    name="Customer ID"
                    placeholder="Customer ID"
                    required={true}
                    value="GTg112"
                  />
                  
                </div> */}

                      <div className="    md:col-span-4 col-span-12">
                        <CustomTextField
                          labeltext="authorized_amount"
                          type="number"
                          name="authorized_amount"
                          placeholder="authorized_amount"
                          required={true}
                          readonly={true}
                          value={CardInfoData?.amount}
                        />
                      </div>
                      <div className="    md:col-span-4 col-span-12">
                        <CustomTextField
                          labeltext="apt_unit"
                          type="text"
                          name="apt_unit"
                          placeholder="apt_unit"
                          required={true}
                          value={CardInfoData?.apt_unit}
                        />
                      </div>

                      <div className="    md:col-span-4 col-span-12">
                        <CustomTextField
                          labeltext="Address 1"
                          type="text"
                          name="Address 1"
                          placeholder="Address 1"
                          required={true}
                          value={CardInfoData?.billing_address}
                        />
                      </div>

                      <div className=" md:col-span-4 col-span-12">
                        <CustomTextField
                          labeltext="Address 2"
                          type="text"
                          name="Address 2"
                          placeholder="Address 2"
                        />
                      </div>

                      <div className="  md:col-span-4 col-span-12">
                        <CustomTextField
                          labeltext="Country"
                          type="text"
                          name="country"
                          placeholder="Country"
                          value={CardInfoData?.country}
                          required={true}
                        />
                      </div>
                      <div className="  md:col-span-4 col-span-12">
                        <CustomTextField
                          labeltext="City"
                          type="text"
                          name="City"
                          placeholder="City"
                          required={true}
                          value={CardInfoData?.city}
                        />
                      </div>
                      <div className=" md:col-span-4 col-span-12">
                        <CustomTextField
                          labeltext="State"
                          type="text"
                          name="State"
                          placeholder="State"
                          required={true}
                          value={CardInfoData?.state}
                        />
                      </div>
                      <div className="  md:col-span-4 col-span-12">
                        <CustomTextField
                          labeltext="Zipcode"
                          type="text"
                          name="Zipcode"
                          placeholder="Zipcode"
                          required={true}
                          value={CardInfoData?.zip_code}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h1 className=" uppercase text-customBlue">
                    Payment Authorization:
                  </h1>
                  <p>
                    Complete your booking securely through our trusted payment
                    authorization process. Simply provide your payment details
                    during checkout, and rest assured, your information is
                    safeguarded with the latest encryption technology. Once your
                    payment is confirmed, you&apos;ll receive a confirmation
                    email with all the necessary details for your trip.
                  </p>
                </div>
                <div className="mt-4">
                  <h1 className=" uppercase text-customBlue">
                    {" "}
                    Passenger Information:
                  </h1>
                  <p>
                    Provide essential details about yourself and your fellow
                    travelers to ensure a smooth journey. Fill out the passenger
                    information form accurately, including names, contact
                    information, and any special requirements. This helps us
                    tailor your experience to your preferences and ensures
                    seamless communication throughout your trip.
                  </p>
                </div>
                <div className="mt-4">
                  <h1 className=" uppercase text-customBlue">
                    {" "}
                    Acknowledements:
                  </h1>
                  <p>
                    Your booking has been confirmed, and we look forward to
                    providing you with an exceptional travel experience. Should
                    you have any questions or need further assistance, feel free
                    to reach out to our dedicated support team.
                  </p>
                </div>
                <div className="mt-4">
                  <h1 className="uppercase text-customBlue">
                    Cancellation and Refund:
                  </h1>
                  <p>
                    Need to change or cancel your booking? Learn about our
                    flexible policies here. We&apos;re here to help you if your
                    plans change, offering easy options for cancellations or
                    modifications to your reservation.
                  </p>
                </div>

                <div className="mt-4">
                  <h1 className="uppercase text-customBlue">Rebooking:</h1>
                  <p>
                    Want to change your travel dates? Find out how to do it
                    hassle-free. Whether it&apos;s a different schedule or
                    destination, we&apos;ll assist you in adjusting your plans
                    smoothly.
                  </p>
                </div>

                <div className="mt-4">
                  <h1 className="uppercase text-customBlue">
                    Authorized Amount / Charges on Card Statements:
                  </h1>
                  <p>
                    Confused about the charges on your card? Get clarity on the
                    authorized amount and billing details related to your
                    booking. Any temporary holds or charges will be explained,
                    and our support team is available to address any concerns
                    you may have.
                  </p>
                </div>
                <div className="my-4">
                  <FormControlLabel
                    required
                    control={
                      <Checkbox
                        sx={{
                          // color: "red",
                          "&.Mui-checked": {
                            color: "red",
                          },
                        }}
                      />
                    }
                    onChange={handleChange}
                    name="checkboxstatus"
                    label={`I have read and agreed to the Terms and Conditions, Fare Rules and Restrictions of this booking engine. International flights require special Travel documentation for each traveler. I hereby authorize the total amount USD ${CardInfoData?.amount}* be applied to the credit card. I understand that this serves as my legal signature.`}
                  />
                </div>

                <div className="flex justify-between">
                  <div>
                    <h1 className="flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                      Signature of Card Holder
                    </h1>
                    <SignaturePad onSave={handleSave} />
                  </div>
                </div>

                {/* <div className="  md:col-span-6 col-span-12 mt-6 mb-3">
              <CustomTextField
                labeltext="Card Holder Signature (Click on other Signature options to type Sign): 
                "
                type="text"
                name="signatureText"
                placeholder="Enter Signature"
                value={formData.signatureText || signatureText}
                onChange={handleInputChange("signatureText")}
              />
              {errorMessage && !signatureText && (
                <p className="text-red-600">Please Enter signatureText</p>
              )}
            </div> */}
                {/* <p>
              <b>Note:</b> The airline may need certain papers from us for
              security and authentication reasons. If these papers are not
              submitted, the reservation may be automatically canceled. Any
              modifications or cancellations after the trip has been paid for
              may incur fees.
            </p> */}

                {/* <div className="mt-6 mb-6">
              <h1 style={{ color: "red" }}>
                DISCLAIMER, CANCELLATION AND AMENDMENT
              </h1>
              <div className="p-5">
                <ol style={{ listStyle: "auto" }}>
                  <li>
                    {" "}
                    Fares are not guaranteed until tickets have been issued.
                  </li>
                  <li>Ticket is non-transferable.</li>
                  <li>Name correction is subject to airline’s policy.</li>
                  <li>Penalty and fees apply to the following:</li>
                  <ol style={{ listStyle: "auto", marginLeft: "20px" }}>
                    <li>
                      Change in travel date(s) based on flight availability at
                      the time of change;
                    </li>
                    <li>
                      Change in travel date(s) after departure, which must be
                      done by the airline directly (airline penalty plus any
                      fare difference will apply and is based on availability of
                      flight at the time of change);
                    </li>
                    <li>
                      The majority of airlines have a no-show fee, applies for
                      confirmed bookings not cancelled 24 hours prior original
                      flight departure
                    </li>
                  </ol>
                  <li>If seats are selected</li>
                  <ol style={{ listStyle: "auto", marginLeft: "20px" }}>
                    <li>
                      Seats are non-refundable, non-rebookable and
                      non-transferable.
                    </li>
                    <li>
                      For voluntary seat changes, the current seats paid for
                      will automatically be forfeited
                    </li>
                    <li>
                      If flight schedule/aircraft changes, seat position is
                      subject for displacement
                    </li>
                  </ol>
                  <li>
                    For necessary changes in your flight details, contact our
                    24/7 customer .
                  </li>
                  <li>
                    Before agreeing to our Terms and Conditions, don’t forget to
                    review our service fees for exchanges, changes, refunds, and
                    cancellations.
                  </li>
                </ol>
              </div>
              <h3 className="flex justify-center">
                <b>Terms and Conditions and Credit Card Authorization</b>
              </h3>
              <FormControlLabel
                required
                control={<Checkbox />}
                onChange={handleChange}
                name="checkboxstatus"
                label={`I have read and agreed to the Terms and Conditions, Fare Rules and Restrictions of this booking engine. International flights require special Travel documentation for each traveler. I hereby authorize the total amount USD ${totalPrice}* be applied to the credit card. I understand that this serves as my legal signature.`}
              />
            </div> */}
                <div>
                  <button
                    className="bg-customBlue text-white p-2 mt-[20px] w-full rounded-md"
                    type="submit"
                    onClick={handlesubmit}
                    disabled={loading ? true : false}
                  >
                    {/* Submit and Book */}
                    {loading ? (
                      <PulseLoader color="#fff" />
                    ) : (
                      " Submit and Book"
                    )}
                  </button>
                  {/* <FormButton>Submit and Book</FormButton> */}
                </div>
              </>
            </Card>
          </div>
        </>
      ) : (
        <div className=" flex justify-center">
          <Image
            src={LoadImage}
            width={100}
            height={100}
            alt="loader"
            className="w-auto md:w-[500px] h-auto mix-blend-multiply "
          />
        </div>
      )}
    </>
  );
};

export default Paymentandagree;

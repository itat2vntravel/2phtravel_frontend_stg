"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { Card, Checkbox } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Styles from "./paymentoption.module.css";
import Image from "next/image";
import amex from "@/public/Footerlogo/amex.png";
import discover from "@/public/Footerlogo/discover.png";
import mastercard from "@/public/Footerlogo/mastercard.png";
import visa from "@/public/Footerlogo/visa.png";
import CardpaymentApi from "@/action/booknow/Cardpayment";
import useBookingInfo from "@/store/FlightBooking";
import useSearchFlight from "@/store/flightSearchStore";
import BookingFormApi from "@/action/booknow/booknow";
import { PulseLoader } from "react-spinners";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import useBookingQuote from "@/store/BookingQuote";
import CreateBookFlight from "@/action/booknow/Createbookflightnow";

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
  type: string;
  userId?: string;
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
            placeholder={placeholder}
            required={required}
            disabled={readonly}
            value={value} // Set value prop
            onChange={onChange} // Set onChange prop
            className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
            style={{
              paddingTop: "20px",
              position: "relative",
              padding: "10px",
            }}
          />
        </div>
      </div>
    </>
  );
};
const PaymentOptions: FC<DataType> = ({ type, userId }) => {
  const { trip_info } = useBookingQuote((state) => state);

  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("errorMessage");
  const [value, setValue] = useState("Credit/Debit");
  const [loading, setloading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedeerror, setcheckederror] = useState(false);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileImage, setfileImage] = useState("");
  const [filePath, setFilePath] = useState([]);
  const { totalPrice, PassengerList, trips } = useSearchFlight(
    (state) => state
  );
  const MAX_IMAGE_SIZE_MB = 10;
  const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
  const {
    card_holder_name,
    card_number,
    contact_email,
    contact_phone,

    cvv,
    authorized_amount,
    apt_unit,
    billing_address,
    city,
    country,
    state,
    zip_code,
    expiration,
    payment_method,
    departure,
    departure_date,
    destination,
    return_date,
    Username,
    customer_id,
    signatureText,
    updateBookingInfoStore,
  } = useBookingInfo((state) => state);
  const [formData, setFormData] = useState({
    card_holder_name: "",
    contact_phone: "",
    contact_email: "",
    reservation_code: "",
    card_number: "",
    cvv: cvv,
    authorized_amount: 0,
    billing_address: "",
    apt_unit: "",
    city: "",
    country: "",
    state: "",
    zip_code: "",
    expiration: "",
    customer_id: "",
    signatureText: "",
  });
  const logoimages = [
    {
      image: visa,
      name: "Visa payement",
    },
    {
      image: discover,
      name: "Discover payment",
    },
    {
      image: mastercard,
      name: "mastercard payment",
    },
    {
      image: amex,
      name: "amex payment",
    },
  ];
  const handleSave = (dataUrl: File) => {
    setSignatureFile(dataUrl);
  };

  useEffect(() => {
    updateBookingInfoStore({
      card_holder_name: formData.card_holder_name,
      reservation_code: formData.reservation_code,
      card_number: formData.card_number,
      cvv: formData.cvv,
      payment_method: value,
      authorized_amount: formData.authorized_amount,
      apt_unit: formData.apt_unit,
      billing_address: formData.billing_address,
      state: formData.state,
      city: formData.city,
      country: formData.country,
      zip_code: formData.zip_code,
      customer_id: formData.customer_id,
      signatureText: formData.signatureText,
      checked: isChecked,
    });
  }, [
    formData.apt_unit,
    formData.authorized_amount,
    formData.billing_address,
    formData.card_holder_name,
    formData.card_number,
    formData.city,
    formData.country,
    formData.contact_email,
    formData.contact_phone,
    formData.cvv,
    formData.customer_id,
    formData.reservation_code,
    formData.state,
    formData.zip_code,
    formData.signatureText,
    updateBookingInfoStore,
    value,
    isChecked,
  ]);
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const formatExpirationDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-numeric characters
    let value = event.target.value.replace(/\D/g, "");

    // Ensure the input doesn't exceed 4 characters
    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    // Format the value as MM/YY
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2);
    }

    // Update the input value
    event.target.value = value;
    updateBookingInfoStore({
      expiration: value,
    });
  };

  const handleInputChange =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      // Apply specific validations based on the field name
      switch (fieldName) {
        case "reservation_code":
          // Apply validation for reservation_code
          // For example, check if the length exceeds 180 characters
          if (value.length > 180) return;
          break;
        case "card_number":
          // Apply validation for card_number
          // For example, check if the length exceeds 12 characters
          if (value.length > 16) return;
          break;
        case "cvv":
          // Apply validation for cvv
          // For example, check if the length exceeds 10 characters
          if (value.length > 3) return;
          break;
        case "zip_code":
          // Apply validation for zip_code
          // For example, check if the length exceeds 100 characters
          if (value.length > 10) return;
          break;
        case "contact_phone":
          // Apply validation for contact_phone
          // For example, check if the length exceeds 20 characters
          if (value.length > 20) return;
          break;
        // Add more cases for other fields if needed
        default:
          break;
      }

      // Update the form data
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    };

  const handlesubmit = () => {
    setloading(true);
    const filteredPassengerList = PassengerList.filter(
      (passenger) => passenger !== undefined
    );
    const isEmptyOrNull = filteredPassengerList.some(
      (obj) =>
        !obj?.title || !obj?.first_name || !obj?.last_name || !obj?.birthday
    );
    console.log(isChecked, "isChecked");
    if (payment_method === "Credit/Debit") {
      if (
        card_holder_name &&
        card_number &&
        contact_email &&
        contact_phone &&
        cvv &&
        apt_unit &&
        billing_address &&
        city &&
        country &&
        // customer_id &&
        state &&
        zip_code &&
        expiration &&
        isChecked &&
        !isEmptyOrNull
      ) {
        if (isChecked) {
          // BookUserInfo();
          // CardPayment()
          BookingCardPayment();
        } else {
          setloading(false);
          setcheckederror(true);
        }

        // toast.success("Add Success");
      } else {
        router.push(`?errorMessage="true"`, { scroll: false });
        setcheckederror(true);
        setloading(false);
      }
    } else {
      if (
        !isEmptyOrNull &&
        Username &&
        contact_phone &&
        contact_email
      ) {
        // BookUserInfo();
        BookingCardPayment();
      } else {
        // toast.error("Please fill all values");
        setcheckederror(true);
        router.push(`?errorMessage="true"`, { scroll: false });

        setloading(false);
      }
    }
  };

  const BookingCardPayment = async () => {
    const authorizedAmount = parseInt(totalPrice);
    const filteredPassengerList = PassengerList.filter(
      (passenger) => passenger !== undefined
    );

    var req;
    if (payment_method === "FreeFareHold") {
      req = {
        booking: {
          contact_email: contact_email,
          contact_phone: contact_phone,
          contact_name: Username,
          user: userId === "None" ? "" : userId,
          page: "booknow",
          payment_type: "Free Fare Hold",
          trip_type: type,
          airline_name: "",
          trip_info: trip_info,
          flight_info: trips,
        },
        passengers: filteredPassengerList,
      };
    } else {
      req = {
        booking: {
          contact_email: contact_email,
          contact_phone: contact_phone,
          contact_name: Username,
          // user: userId || "",
          user: userId === "None" ? "" : userId,
          page: "booknow",
          payment_type: "Card",
          trip_type: type,
          airline_name: "",
          trip_info: trip_info,
          flight_info: trips,
        },
        passengers: filteredPassengerList,
        card_info: {
          card_holder_name: card_holder_name,
          amount: authorizedAmount,
          card_number: card_number,
          expiry_date: expiration,
          security_code: cvv,
          billing_address: billing_address,
          apt_unit: apt_unit,
          city: city,
          state: state,
          country: country,
          zip_code: zip_code,
        },
      };
    }
    console.log(req, "booking req");
    const response = await CreateBookFlight(req);
    // console.log("response", response);
    setloading(false);
    if (response?.message) {
      setloading(false);

      Swal.fire({
        icon: "success",
        title: response.message,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.replace(`/previewpage?token=${response.token}`);
        }
      });
      updateBookingInfoStore({
        expiration: "",
        card_holder_name: "",
        contact_phone: "",
        contact_email: "",
        reservation_code: "",
        card_number: "",
        cvv: "",
        authorized_amount: 0,
        billing_address: "",
        apt_unit: "",
        city: "",
        state: "",
        zip_code: "",
        Signature: "",
        payment_method: "Credit/Debit",
        checked: false,
      });
    }
  };

  const CardPayment = async () => {
    const authorizedAmount = authorized_amount as number;

    const formData = new FormData();
    formData.append("card_holder_name", card_holder_name);
    formData.append("contact_phone", contact_phone);
    formData.append("contact_email", contact_email);

    formData.append("card_number", card_number);
    formData.append("cvv", cvv);
    formData.append("expiration", expiration);
    formData.append("authorized_amount", String(authorizedAmount));
    formData.append("billing_address", billing_address);
    formData.append("customer_id", customer_id);
    formData.append("apt_unit", apt_unit);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("zip_code", zip_code);

    const response = await CardpaymentApi(formData);

    if (response.message) {
      setloading(false);
      updateBookingInfoStore({
        expiration: "",
        card_holder_name: "",
        contact_phone: "",
        contact_email: "",
        reservation_code: "",
        card_number: "",
        cvv: "",
        authorized_amount: 0,
        billing_address: "",
        apt_unit: "",
        city: "",
        state: "",
        zip_code: "",
        Signature: "",
        payment_method: "Credit/Debit",
        checked: false,
      });
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

    if (response.error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.error,
      });
    }
  };
  const BookUserInfo = async () => {
    const req = {
      departureAirport: departure,
      destinationAirport: destination,
      Name: Username as string,
      Email: contact_email,
      phonenumber: contact_phone,
      departure_date: departure_date,
      return_date: return_date,

      type: type,
      user: userId,
      trip: trip_info,
      page: "Flight reservation",
    };
    const response = await BookingFormApi(req);
    if (payment_method === "FreeFareHold") {
      if (response.message) {
        setloading(false);

        updateBookingInfoStore({
          departure: "",
          destination: "",
          departure_date: "",
          return_date: "",
          Username: "",
          contact_phone: "",
          contact_email: "",
        });

        Swal.fire({
          icon: "success",
          title: response.message,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/");
          }
        });
      } else {
        setloading(false);
      }
    }
  };

  const handleChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      setcheckederror(false);
    }
  };

  return (
    <div className="mt-6">
      <Card className={`p-5 ${Styles.cardShadow}`}>
        <h1 style={{ color: "red" }} className="mb-[20px] md:mb-0">
          PAYMENT OPTIONS
        </h1>
        <FormControl style={{ width: "100%" }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={value}
            onChange={handleRadioChange}
          >
            <div className="flex justify-between">
              <FormControlLabel
                value="Credit/Debit"
                control={<Radio />}
                label="Credit/Debit Card"
              />
              <div
                style={{
                  display: "flex",
                  columnGap: "5px",
                  height: "20px",
                }}
              >

                {logoimages?.map((res, index) => (
                  <Image
                    key={index}
                    src={res.image}
                    alt={`2ph Travel ${res.name}`}
                    width={230}
                    height={20}
                    className="h-[30px] mr-1 w-[50px]"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-[14px]">
              <FormControlLabel
                value="FreeFareHold"
                control={<Radio />}
                label="Free Fare Hold"
              />
              <p>For up to 24 hours, lock this low price.</p>
            </div>
          </RadioGroup>
        </FormControl>
        {value === "Credit/Debit" ? (
          <>
            <div className="mt-6 border-2 border-[#e3e3e3] ">
              <div className={`${Styles.passengerheading}`}>
                <h4>CREDIT CARD DETAILS</h4>
              </div>
              <div className="p-10">
                <div className="grid grid-cols-12 gap-4 ">
                  <div className="  xl:col-spn-6 lg:col-span-6  md:col-span-6 sm:col-span-6 col-span-12">
                    <CustomTextField
                      labeltext="Card No."
                      type="text"
                      name="Debit/Credit Card No"
                      placeholder="Debit/Credit Card No"
                      required={true}
                      value={formData.card_number || card_number}
                      onChange={handleInputChange("card_number")}
                    />
                    {errorMessage && !card_number && (
                      <p className="text-red-600">Please Enter Card Number</p>
                    )}
                  </div>
                  <div className="  xl:col-spn-6 lg:col-span-6  md:col-span-6 sm:col-span-6 col-span-12">
                    <div className="flex justify-end gap-1">
                      {/* <Image
                        src={FooterpPayment}
                        alt="payment"
                        width={190}
                        height={10}
                      /> */}
                      {logoimages?.map((res, index) => (
                        <Image
                          key={index}
                          src={res.image}
                          alt={`2ph Travel ${res.name}`}
                          width={230}
                          height={20}
                          className="h-[30px] mr-1 w-[50px]"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="  xl:col-spn-6 lg:col-span-6  md:col-span-6 sm:col-span-6 col-span-12">
                    <CustomTextField
                      labeltext="cvv"
                      type="text"
                      name="cvv"
                      placeholder="cvv"
                      required={true}
                      value={formData.cvv || cvv}
                      onChange={handleInputChange("cvv")}
                    />
                    {errorMessage && !cvv && (
                      <p className="text-red-600">Please Enter Cvv Number</p>
                    )}
                  </div>
                  <div className="  xl:col-spn-6 lg:col-span-6  md:col-span-6 sm:col-span-6 col-span-12">
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
                          value={expiration}
                          onChange={formatExpirationDate}
                        />
                      </div>
                    </div>
                    {errorMessage && !expiration && (
                      <p className="text-red-600">
                        Select Enter expiration Date
                      </p>
                    )}
                  </div>
                  <div className="  xl:col-spn-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                    <CustomTextField
                      labeltext="Name"
                      type="text"
                      name="Card Holder Name"
                      placeholder="Card Holder Name"
                      required={true}
                      value={formData.card_holder_name || card_holder_name}
                      onChange={handleInputChange("card_holder_name")}
                    />
                    {errorMessage && !card_holder_name && (
                      <p className="text-red-600">
                        Please Enter Card Holder Name
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 border-2 border-[#e3e3e3]  ">
              <div className={`${Styles.passengerheading}`}>
                <h4>BILLING DETAILS</h4>
              </div>
              <div style={{ padding: "10px" }}>
                <div className="grid grid-cols-12 gap-4 ">
                  <div className="    md:col-span-6 col-span-12">
                    <CustomTextField
                      labeltext="authorized_amount"
                      type="number"
                      name="authorized_amount"
                      placeholder="authorized_amount"
                      required={true}
                      readonly={true}
                      value={formData.authorized_amount || totalPrice}
                      onChange={handleInputChange("authorized_amount")}
                    />
                    {errorMessage && !totalPrice && (
                      <p className="text-red-600">
                        Please Enter Authorized Amount
                      </p>
                    )}
                  </div>
                  <div className="    md:col-span-6 col-span-12">
                    <CustomTextField
                      labeltext="apt_unit"
                      type="text"
                      name="apt_unit"
                      placeholder="apt_unit"
                      required={true}
                      value={formData.apt_unit || apt_unit}
                      onChange={handleInputChange("apt_unit")}
                    />
                    {errorMessage && !apt_unit && (
                      <p className="text-red-600">
                        Please Enter Apt Unit number
                      </p>
                    )}
                  </div>
                  <div className="    md:col-span-6 col-span-12">
                    <CustomTextField
                      labeltext="Address 1"
                      type="text"
                      name="Address 1"
                      placeholder="Address 1"
                      required={true}
                      value={formData.billing_address || billing_address}
                      onChange={handleInputChange("billing_address")}
                    />
                    {errorMessage && !billing_address && (
                      <p className="text-red-600">
                        Please Enter Billing Address
                      </p>
                    )}
                  </div>

                  <div className=" md:col-span-6 col-span-12">
                    <CustomTextField
                      labeltext="Address 2"
                      type="text"
                      name="Address 2"
                      placeholder="Address 2"
                    />
                  </div>

                  <div className="  md:col-span-6 col-span-12">
                    <CustomTextField
                      labeltext="Country"
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange("country")}
                      required={true}
                    />
                    {errorMessage && !country && (
                      <p className="text-red-600">Please Enter country name</p>
                    )}
                  </div>
                  <div className="  md:col-span-6 col-span-12">
                    <CustomTextField
                      labeltext="City"
                      type="text"
                      name="City"
                      placeholder="City"
                      required={true}
                      value={formData.city || city}
                      onChange={handleInputChange("city")}
                    />
                    {errorMessage && !city && (
                      <p className="text-red-600">Please Enter city name</p>
                    )}
                  </div>

                  <div className="  md:col-span-6 col-span-12">
                    <CustomTextField
                      labeltext="Zipcode"
                      type="text"
                      name="Zipcode"
                      placeholder="Zipcode"
                      required={true}
                      value={formData.zip_code || zip_code}
                      onChange={handleInputChange("zip_code")}
                    />
                    {errorMessage && !zip_code && (
                      <p className="text-red-600">Please Enter zip_code</p>
                    )}
                  </div>

                  <div className=" md:col-span-6 col-span-12">
                    <CustomTextField
                      labeltext="State"
                      type="text"
                      name="State"
                      placeholder="State"
                      required={true}
                      value={formData.state || state}
                      onChange={handleInputChange("state")}
                    />
                    {errorMessage && !state && (
                      <p className="text-red-600">Please Enter state name</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 mb-6">
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
              {checkedeerror && (
                <p className="text-red-600 mt-2">
                  Please accept terms and conditions
                </p>
              )}
            </div>
            <div>
              <button
                className="bg-customBlue text-white p-2 mt-[20px] w-full rounded-md"
                type="submit"
                onClick={handlesubmit}
                disabled={loading ? true : false}
              >
                {/* Submit and Book */}
                {loading ? <PulseLoader color="#fff" /> : " Submit and Book"}
              </button>
              {/* <FormButton>Submit and Book</FormButton> */}
            </div>
          </>
        ) : (
          <>
            <p>
              Free 24-Hour Fare Hold applies to flights departing 72 hours or
              later from the time of reservation. Flights flying sooner are
              subject to the airlines fare hold rules. 2PH Travel will not be
              held liable if the airline cancels the flight before the 24-hour
              hold period. Reservations on hold will automatically be canceled
              if left unpaid after 24 hours from the time of reservation.
            </p>
            <button
              className="bg-customBlue text-white p-2 mt-10 w-full rounded-md"
              type="submit"
              onClick={handlesubmit}
              disabled={loading ? true : false}
            >
              {loading ? <PulseLoader color="#fff" /> : " Submit and Book"}
            </button>
          </>
        )}
      </Card>
    </div>
  );
};

export default PaymentOptions;

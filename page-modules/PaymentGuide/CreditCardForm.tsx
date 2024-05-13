"use client";
import React, { useRef, useState } from "react";
import { Card } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Styles from "./CreditCardForm.module.css";
import CardpaymentApi from "@/action/booknow/Cardpayment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import CustomButton from "@/components/Button/Button";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import LoaderButton from "./LoadingButton";
import SignaturePad from "@/components/SignaturePad/SignaturePad";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const CreditCardForm = () => {
  const router = useRouter();
  const [value, setValue] = useState("Visa");
  const ref = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [PhoneNumber, setPhoneNumber] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [SingleDatevalue, setSingleDatevalue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: null,
  });
  const [fileImage, setfileImage] = useState("");
  const [filePath, setFilePath] = useState([]);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const MAX_IMAGE_SIZE_MB = 10;
  const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

  const card =
    /(?<!\d)\d{16}(?!\d)|(?<!\d[ _-])(?<!\d)\d{4}(?:[_ -]\d{4}){3}(?![_ -]?\d)/gm;

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handlesubmit = async (formData: FormData) => {
    setLoading(true);
    const amout = formData.get("amount") as string;
    const amount = JSON.parse(amout);

    const date = new Date(SingleDatevalue?.startDate as string);

    const month = (date?.getMonth() + 1).toString().padStart(2, "0");
    const day = date?.getDate().toString().padStart(2, "0");
    const formattedDate = `${month}/${day}`;

    const formData1 = new FormData();
    formData1.append("card_holder_name", formData.get("holdername") as string);
    formData1.append("contact_phone", formData.get("contact_phone") as string);
    formData1.append("contact_email", formData.get("contact_email") as string);
    formData1.append("reservation_code", formData.get("reservation") as string);
    formData1.append("card_number", formData.get("cardnumber") as string);
    formData1.append("cvv", formData.get("cvv") as string);
    formData1.append("expiration", formattedDate as string);
    formData1.append("authorized_amount", String(amout));
    formData1.append("billing_address", formData.get("address") as string);
    formData1.append("apt_unit", formData.get("unit") as string);
    formData1.append("city", formData.get("town") as string);
    formData1.append("state", formData.get("state") as string);
    formData1.append("country", formData.get("country") as string);
    formData1.append("zip_code", formData.get("zipcode") as string);
    // formData1.append("signature", signatureFile as File);
    formData1.append("driving_license", filePath[0]);
    formData1.append("customer_id", formData.get("customerId") as string);

    if (signatureFile) {
      formData.append("signature", signatureFile);
    }
    const response = await CardpaymentApi(formData1);
    if (response.message) {
      setLoading(false);
      // toast.success(response.message);
      ref.current?.reset();
      setSingleDatevalue({
        startDate: null,
        endDate: null,
      });
      setFilePath([]);
      setfileImage("");
      setSignatureFile(null);
      setPhoneNumber("");
    }
    // router.push("/BookingStatus");

    Swal.fire({
      icon: "success",
      title: response.message,

      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/");
      }
    });
  };

  const handleSingleValueChange = (newValue: any) => {
    setSingleDatevalue(newValue);
  };

  const handleChange = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber);
  };

  const handleSave = (dataUrl: File) => {
    // const formData = fileToFormData(dataUrl);
    setSignatureFile(dataUrl);
  };
  // Function to convert File to FormData
  const fileToFormData = (file: File): FormData => {
    const formData = new FormData();
    formData.append("file", file);
    return formData;
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files;
    const filesdata = event.target.files[0];
    if (file) {
      if (filesdata?.size <= MAX_IMAGE_SIZE_BYTES) {
        const objectURL = URL.createObjectURL(file[0]);
        setfileImage(objectURL);
        setFilePath(file);
      } else {
        toast.error("Image size exceeds 10MB limit");

        event.target.value = null;
      }
    } else {
      setFilePath([]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      setFilePath(files[0]);
    } else {
      setFilePath([]);
    }
  };

  function formatCardNumber(input: any) {
    let cardNumber = input.value.replace(/\D/g, "");
    cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1-");
    cardNumber = cardNumber.slice(0, 19);
    input.value = cardNumber;
  }
  return (
    <div className="mt-6">
      <Card className={`p-5 shadow-md lg:w-[70%] w-[100%]`}>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={value}
            onChange={handleRadioChange}
          >
            <div className="flex justify-between flex-wrap">
              <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
              <FormControlLabel
                value="Master"
                control={<Radio />}
                label="Master"
              />
              <FormControlLabel value="Amex" control={<Radio />} label="Amex" />
              <FormControlLabel
                value="Discover"
                control={<Radio />}
                label="Discover"
              />
            </div>
          </RadioGroup>
        </FormControl>
        <form ref={ref} action={(formData) => handlesubmit(formData)}>
          <div className="grid grid-cols-12 gap-4 ">
            <div className="md:col-span-6 col-span-12">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  Reservation code
                </label>
                <div className={Styles.phonenumber}>
                  <input
                    type={"text"}
                    name="reservation"
                    className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                    style={{
                      paddingTop: "20px",
                      position: "relative",
                      padding: "10px",
                    }}
                    placeholder={"Reservation code"}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-6 col-span-12">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  Cardholder name (as on card)
                </label>
                <div className={Styles.phonenumber}>
                  <input
                    type={"text"}
                    name="holdername"
                    className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                    style={{
                      paddingTop: "20px",
                      position: "relative",
                      padding: "10px",
                    }}
                    placeholder={"Cardholder name"}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-12 col-span-12">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  Customer ID
                </label>
                <div className={Styles.phonenumber}>
                  <input
                    type={"text"}
                    name="customerId"
                    className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                    style={{
                      paddingTop: "20px",
                      position: "relative",
                      padding: "10px",
                    }}
                    placeholder={"Customer ID"}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-6 col-span-12">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  Card number
                </label>
                <div className={Styles.phonenumber}>
                  <input
                    type="text"
                    name="cardnumber"
                    className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                    style={{
                      paddingTop: "20px",
                      position: "relative",
                      padding: "10px",
                    }}
                    onInput={(e) => formatCardNumber(e.target)}
                    placeholder={"Card number"}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-6 col-span-12">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  CVV#(3 digits for Visa/MC, 4 digits for AE)
                </label>
                <div className={Styles.phonenumber}>
                  <input
                    type="text"
                    name="cvv"
                    pattern="[0-9]*"
                    maxLength={3}
                    className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                    style={{
                      paddingTop: "20px",
                      position: "relative",
                      padding: "10px",
                    }}
                    placeholder={"CVV"}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-6 col-span-12">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  Expiration date of the card used
                </label>
                <div className={Styles.phonenumber}>
                  <Datepicker
                    placeholder={"Expiration date"}
                    minDate={new Date()}
                    asSingle={true}
                    showFooter={false}
                    displayFormat="MM/YY"
                    primaryColor={"blue"}
                    inputClassName={`bg-[#F4F4F4] w-full rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] md:h-[50px] ${Styles.inputdatepicker}`}
                    value={SingleDatevalue}
                    onChange={handleSingleValueChange}
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-6 col-span-12">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  Amount
                </label>
                <div className={Styles.phonenumber}>
                  <input
                    type={"text"}
                    name="amount"
                    className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                    style={{
                      paddingTop: "20px",
                      position: "relative",
                      padding: "10px",
                    }}
                    placeholder={"Amount"}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-6 col-span-12">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  Card billing address
                </label>
                <div className={Styles.phonenumber}>
                  <input
                    type={"text"}
                    name="address"
                    className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                    style={{
                      paddingTop: "20px",
                      position: "relative",
                      padding: "10px",
                    }}
                    placeholder={"Address"}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-6 col-span-12">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  Apt/Unit
                </label>
                <div className={Styles.phonenumber}>
                  <input
                    type={"text"}
                    name="unit"
                    className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                    style={{
                      paddingTop: "20px",
                      position: "relative",
                      padding: "10px",
                    }}
                    placeholder={"Apt/Unit"}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  Town city
                </label>
                <div className={Styles.phonenumber}>
                  <input
                    type={"text"}
                    name="town"
                    className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                    style={{
                      paddingTop: "20px",
                      position: "relative",
                      padding: "10px",
                    }}
                    placeholder={"Town city"}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  State
                </label>
                <div className={Styles.phonenumber}>
                  <input
                    type={"text"}
                    name="state"
                    className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                    style={{
                      paddingTop: "20px",
                      position: "relative",
                      padding: "10px",
                    }}
                    placeholder={"State"}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  Country
                </label>
                <div className={Styles.phonenumber}>
                  <input
                    type={"text"}
                    name="country"
                    className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                    style={{
                      paddingTop: "20px",
                      position: "relative",
                      padding: "10px",
                    }}
                    placeholder={"Country"}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  ZIP code
                </label>
                <div className={Styles.phonenumber}>
                  <input
                    type={"text"}
                    name="zipcode"
                    pattern="[0-9]*"
                    maxLength={6}
                    className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                    style={{
                      paddingTop: "20px",
                      position: "relative",
                      padding: "10px",
                    }}
                    placeholder={"ZIP code"}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-6 col-span-12">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  Contact phone
                </label>
                <div className={Styles.phonenumber}>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={PhoneNumber}
                    onChange={handleChange}
                    name="contact_phone"
                    international={true}
                    limitMaxLength={true}
                    className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                    style={{
                      paddingTop: "20px",
                      position: "relative",
                      padding: "10px",
                    }}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-6 col-span-12">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  Email
                </label>
                <div className={Styles.phonenumber}>
                  <input
                    type={"email"}
                    name="contact_email"
                    className={`w-full bg-[#F4F4F4]  rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[50px] `}
                    style={{
                      paddingTop: "20px",
                      position: "relative",
                      padding: "10px",
                    }}
                    placeholder={"Email"}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-12 col-span-12">
              <div>
                <label className="text-[15px] flex gap-[5px] my-[5px] leading-[18.05px] font-bold">
                  Driving Licence
                </label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div
                    className=" col-span-1 rounded-md border-dashed border-black border-2 mb-3 p-20 text-center"
                    onDrop={handleFileDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => handleClick()}
                  >
                    <p>Drag & Drop files here or click to select</p>
                    <p className="text-[12px]">
                      *For better website quality we suggest to use images with
                      below 10Mb*
                    </p>
                    <input
                      type="file"
                      id="fileInput"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>

                  <div className="col-span-1">
                    {fileImage && (
                      <>
                        <p className="font-bold">Preview:</p>
                        <Image
                          src={fileImage}
                          alt="Selected File"
                          width={300}
                          height={500}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <SignaturePad onSave={handleSave} />
            <div className="col-span-12">
              {" "}
              {/* <CustomButton
                type="submit"
                colored="true"
                customclass="w-full"
                loading={loading}
                text="Submit"
              /> */}
              <LoaderButton>Submit</LoaderButton>
            </div>
          </div>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default CreditCardForm;

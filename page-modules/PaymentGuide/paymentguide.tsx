"use client";
import VNBank from "@/public/payment/Bank-of-America-Emblem.png";
import Bank from "@/public/payment/bank.png";
import Check from "@/public/payment/check1.png";
import PayPal from "@/public/payment/paypal.png";
import Zelle from "@/public/payment/zelle.png";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IoLocationSharp } from "react-icons/io5";
import CreditCardForm from "./CreditCardForm";

const Paymentguide = () => {
  const SearchParams = useSearchParams();

  const paymentoptions = SearchParams.get("payment") || "Cash";

  const PaymentGateways = [
    {
      title: "Cash",
    },
    {
      title: "Wire Transfer",
    },
    {
      title: "Zelle",
    },
    {
      title: "PayPal",
    },
    {
      title: "Check",
    },
    // {
    //   title: "Bank Transfer",
    // },
    {
      title: "Credit Card",
    },
  ];

  return (
    <>
      <div className="bg-[url('/Maskgroup.png')] h-[50vh] lg:bg-cover bg-cover bg-center bg-no-repeat	 relative flex items-center ">
        <div className="md:text-[30px] text-[20px] container font-bold lg:ml-[150px] ml-[30px] leading-[57px] text-black xl:w-[35%] lg:w-[50%] w-[100%] h-fit ">
          Complying with 2PH Travel “Guidelines on Payment Aggregators and
          Payment Gateways”.
        </div>
      </div>

      <div className="flex flex-wrap p-5 container mx-auto mt-3  ">
        <div className="block w-full">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap gap-6" aria-label="Tabs">
              {PaymentGateways.map((res, index) => (
                <Link
                  href={`?payment=${res.title}`}
                  key={index}
                  className={`shrink-0 border-b-2 hover:border-red-600 px-1 pb-4 font-bold text-base hover:text-red-600 ${
                    paymentoptions === res.title
                      ? "border-red-600 text-red-600"
                      : ""
                  }`}
                >
                  {res.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-5 container mx-auto mb-10">
        {paymentoptions === "Cash" ? (
          <>
            {" "}
            <div className="">
              <div className="flex flex-col  mb-4">
                <h1 className="text-lg mb-2">Cash</h1>

                <p>
                  You can walk directly to our office and Pay by Cash. <br></br>
                  Prior appointment is required, and cash payments are accepted
                  securely.
                </p>
              </div>

              <h1 className="mt-6 mb-4 text-[#152D54]">
                2PH Travel - Prestige, Dedication, Professionalism
              </h1>

              <div className="flex gap-6   flex-wrap">
                <div className="flex border rounded-2xl shadow-md p-4 w-fit">
                  <div className="pr-4 ">
                    <div className="flex items-center mb-1">
                      <IoLocationSharp className="text-base mr-1 text-[red] " />
                      <b>US Office Address:</b>
                    </div>
                    9636 Garden Grove Blvd, Suite 22, Garden Grove,<br></br> CA
                    92844
                    <br></br> Hotline:
                    <a
                      href={`tel: 855-767-7778`}
                      className="hover:text-customRed"
                    >
                      855-767-7778
                    </a>
                    <br></br>Open: Mon-Fri (9am-3pm)
                  </div>
                </div>
              </div>
            </div>{" "}
          </>
        ) : paymentoptions === "Wire Transfer" ? (
          <>
            {" "}
            <div className="">
              <div className="flex flex-col  mb-4">
                <h1 className="text-lg mb-2">Wire Transfer</h1>

                <p>
                  You can Deposit cash directly into our bank account or
                  <br></br>
                  transfer funds using the information provided below
                </p>
              </div>
              <div className=" border rounded-2xl shadow-md p-5 leading-8 w-fit">
                <div className="flex items-center justify-center">
                  <Image
                    src={VNBank}
                    alt="bank"
                    className="mb-4"
                    width={150}
                    height={30}
                  />
                </div>
                <p>
                  <b>Account name :</b> 2PH Travel
                </p>
                <p>
                  <b>Account number :</b> 325193558539
                </p>

                <p>
                  <b>Bank name: </b> Bank of America
                </p>
                {/* <p>
                  <b>Bank address:</b> TECHCOMBANK (TCB) - <br></br>THU DUC
                  BRANCH - 117 Dan Chu,<br></br> Binh Tho Ward, Thu Duc,
                  <br></br> Ho Chi Minh City
                </p> */}
                <p>
                  <b> Routing number: </b> 121000358
                </p>
              </div>

              <h1 className="mt-6 mb-4 text-[#152D54]">
                2PH Travel - Prestige, Dedication, Professionalism:
              </h1>

              <div className="flex gap-6 flex-wrap">
                <div className="flex border shadow-md rounded-2xl p-4 w-fit">
                  <div className="pr-4 ">
                    <div className="flex items-center mb-1">
                      <IoLocationSharp className="text-base mr-1 text-[red] " />
                      <b>US Office Address:</b>
                    </div>
                    9636 Garden Grove Blvd, Suite 22, Garden <br></br> Suite CA
                    92844<br></br> Hotline:{" "}
                    <a
                      href={`tel: 855-767-7778`}
                      className="hover:text-customRed"
                    >
                      855-767-7778
                    </a>
                    <br></br>Open: Mon-Fri (9am-3pm)
                  </div>
                </div>
              </div>
            </div>{" "}
          </>
        ) : paymentoptions === "Zelle" ? (
          <>
            {" "}
            <div className="">
              <div className="flex flex-col  mb-4">
                <h1 className="text-lg mb-2">Zelle</h1>

                <p>
                  Customers have the flexibility to make payments using Zelle.
                </p>
              </div>
              <div className=" border rounded-2xl shadow-md p-5 pt-2 leading-8 w-fit">
                <Image
                  src={Zelle}
                  alt="bank"
                  className=" h-[50px] w-[95px] mix-blend-multiply"
                  width={200}
                  height={30}
                />
                <p>
                  <b>Zelle account :</b> accounting@2phtravel.com
                </p>

                {/* <p>
                  <b>Account name :</b> Nguyen Thi Ha
                </p>
                <p>
                  <b>Account number :</b> 1903 9005 1570 18 (pay in VND)
                </p>
                <p>
                  <b>INC Bank account:</b> 325093904814
                </p>
                <p>
                  <b>Routing number :</b> 121000358
                </p> */}
              </div>

              <h1 className="mt-6 mb-4 text-[#152D54]">
                2PH Travel - Prestige, Dedication, Professionalism :
              </h1>
              <div className="flex gap-6 flex-wrap">
                <div className="flex border shadow-md rounded-2xl p-4 w-fit">
                  <div className="pr-4 ">
                    <div className="flex items-center mb-1">
                      <IoLocationSharp className="text-base mr-1 text-[red] " />
                      <b>US Office Address:</b>
                    </div>
                    9636 Garden Grove Blvd, Suite 22, Garden <br></br> Suite CA
                    92844<br></br> Hotline:{" "}
                    <a
                      href={`tel: 855-767-7778`}
                      className="hover:text-customRed"
                    >
                      855-767-7778
                    </a>{" "}
                    <br></br>
                    Open: Mon-Fri (9am-3pm)
                  </div>
                </div>
              </div>
            </div>{" "}
          </>
        ) : paymentoptions === "PayPal" ? (
          <>
            {" "}
            <div className="">
              <div className="flex flex-col  mb-4">
                <h1 className="text-lg mb-2">PayPal</h1>

                <p>
                  Customers have the flexibility to make payments using PayPal.
                </p>
              </div>
              <div className=" border rounded-2xl shadow-md p-5 pt-2 leading-8 w-fit">
                <Image
                  src={PayPal}
                  alt="bank"
                  className=" h-[50px] w-[95px]"
                  width={200}
                  height={30}
                />
                <p>
                  <b>Paypal account :</b> accounting@2phtravel.com
                </p>

                {/* <p>
                  <b>Account name :</b> Nguyen Thi Ha
                </p>
                <p>
                  <b>Account number :</b> 1903 9005 1570 18 (pay in VND)
                </p>
                <p>
                  <b>INC Bank account:</b> 325093904814
                </p>
                <p>
                  <b>Routing number :</b> 121000358
                </p> */}
              </div>

              <h1 className="mt-6 mb-4 text-[#152D54]">
                2PH Travel - Prestige, Dedication, Professionalism :
              </h1>
              <div className="flex gap-6 flex-wrap">
                <div className="flex border shadow-md rounded-2xl p-4 w-fit">
                  <div className="pr-4 ">
                    <div className="flex items-center mb-1">
                      <IoLocationSharp className="text-base mr-1 text-[red] " />
                      <b>US Office Address:</b>
                    </div>
                    9636 Garden Grove Blvd, Suite 22, Garden <br></br> Suite CA
                    92844<br></br> Hotline:{" "}
                    <a
                      href={`tel: 855-767-7778`}
                      className="hover:text-customRed"
                    >
                      855-767-7778
                    </a>{" "}
                    <br></br>
                    Open: Mon-Fri (9am-3pm)
                  </div>
                </div>
              </div>
            </div>{" "}
          </>
        ) : paymentoptions === "Check" ? (
          <>
            {" "}
            <div className="">
              <div className="flex flex-col mb-4 ">
                <h1 className="text-lg mb-2">Check</h1>

                <p>
                  Please take square photos of the 4 corners of the front and
                  back of the check.Send to
                </p>
                <p className="mt-2">
                  <b>Cell Phone number : </b>{" "}
                  <a
                    href={`tel: 626-628-6794`}
                    className=" hover:text-customRed flex-1"
                    style={{ fontSize: "15px" }}
                  >
                    <a href={`tel:  626-628-6794`}>+1 626-628-6794</a>
                  </a>{" "}
                  or <b>Email : </b>
                  <a
                    href={`mailto:billing@2phtravel.com`}
                    className=" hover:text-customRed flex-1"
                    style={{ fontSize: "15px" }}
                  >
                    billing@2phtravel.com
                  </a>
                </p>
              </div>
              <div className=" border rounded-2xl  p-5 pt-2  leading-8 w-fit">
                {/* <p>Customers can see the test sample below:</p> */}
                <p>Customers can see the Check sample below:</p>
                <Image
                  src={Check}
                  alt="bank"
                  // className=" h-[50px] w-[95px]"
                  width={700}
                  height={30}
                />
              </div>

              <h1 className="mt-6 mb-4 text-[#152D54]">
                2PH Travel - Prestige, Dedication, Professionalism :
              </h1>
              <div className="flex gap-6 flex-wrap">
                <div className="flex border shadow-md rounded-2xl p-4 w-fit">
                  <div className="pr-4 ">
                    <div className="flex items-center mb-1">
                      <IoLocationSharp className="text-base mr-1 text-[red] " />
                      <b>US Office Address:</b>
                    </div>
                    9636 Garden Grove Blvd, Suite 22, Garden <br></br> Suite CA
                    92844<br></br> Hotline:{" "}
                    <a
                      href={`tel: 855-767-7778`}
                      className="hover:text-customRed"
                    >
                      855-767-7778
                    </a>{" "}
                    <br></br>
                    Open: Mon-Fri (9am-3pm)
                  </div>
                </div>
              </div>
            </div>{" "}
          </>
        ) : // : paymentoptions === "Bank Transfer" ? (
        //   <>
        //     {" "}
        //     <div className="">
        //       <div className="flex flex-col  mb-4">
        //         <h1 className="text-lg mb-2">Bank Transfer</h1>

        //         <p>
        //           You have the option to choose Bank Transfer as your method of
        //           payment.<br></br> Please transfer the funds to the following
        //           account details provided below:
        //         </p>
        //       </div>
        //       <div className=" border rounded-2xl shadow-md p-5 pt-1 leading-8 w-fit">
        //         <Image
        //           src={Bank}
        //           alt="bank"
        //           className="h-[110px] w-[125px]"
        //           width={200}
        //           height={30}
        //         />
        //         <h4 className="mb-2">
        //           <b>TECHCOMBANK (TCB) - HO CHI MINH CITY BRANCH</b>
        //         </h4>
        //         <p>
        //           <b>Name :</b>2PH Travel COMPANY LIMITED
        //         </p>
        //         <p>
        //           <b>Account number :</b> 1903 8995 3068 81
        //         </p>
        //         <p>
        //           <b>Bank :</b> Techcombank Saigon (TCB SAI GON)
        //         </p>
        //       </div>

        //       <h1 className="mt-6 mb-4 text-[#152D54]">
        //         2PH Travel - Prestige, Dedication, Professionalism Address:
        //       </h1>
        //       <div className="flex gap-6 flex-wrap">
        //         <div className="flex border shadow-md rounded-2xl p-4 w-fit">
        //           <div className="pr-4 ">
        //             <div className="flex items-center mb-1">
        //               <IoLocationSharp className="text-base mr-1 text-[red] " />
        //               <b>US Office:</b>
        //             </div>
        //             9636 Garden Grove Blvd, Suite 22, Garden <br></br> Suite CA
        //             92844<br></br> Hotline +1 <a href={`tel: 855-767-7778`}>855-767-7778</a> <br></br>
        //             Open: Mon-Fri (9am-3pm)
        //           </div>
        //         </div>
        //       </div>
        //     </div>{" "}
        //   </>
        // )
        paymentoptions === "Credit Card" ? (
          <>
            {" "}
            <div className="">
              <div className="flex flex-col  mb-4">
                <h1 className="text-lg mb-2">Credit Card</h1>

                <p>
                  Applicable to customers who want to pay with Visa, Master,
                  America Express cards...<br></br>
                  Please provide card information to 2PH Travel staff including
                  both side of the card and ID of credit card holder.
                </p>

                <h1 className="text-lg mt-4">Credit Authorization</h1>
                <h1 className="mt-4 mb-4 text-[#152D54]">
                  Customer Payment Form
                </h1>
                <p className="mb-3 leading-7">
                  For our mutual protection, this is the authorization to charge
                  your travel arrangements from your debit/credit card. For our
                  mutual protection, this is the authorization to charge your
                  travel arrangements. Arrange your trip from your debit/credit
                  card
                </p>
                <p className="mb-3 leading-7">
                  This is to confirm that in compliance with all applicable
                  laws, I authorize 2PH Travel INC to purchase travel using the
                  credit/Debit mentioned above. Furthermore, I understand that I
                  authorize this transaction and will hold 2PH Travel INC
                  harmless with respect to these instructions.
                </p>
                <p className="mb-3 leading-7">
                  I understand that 2PH Travel INC will charge the card after
                  reconfirming the itinerary over the phone. Additionally, there
                  may be multiple fees for the above equivalent transaction up
                  to the amount authorized for the booking.
                </p>
              </div>
              <h1>Credit/Debit card type:</h1>
              <CreditCardForm />
            </div>{" "}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Paymentguide;

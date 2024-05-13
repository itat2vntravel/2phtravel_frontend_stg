"use client";
import CustomButton from "@/components/Button/Button";
import ContactusComponent from "@/components/Contactus/Contactus";
import ContainerComponent from "@/components/container/Container";
import ContactsIcon from "@mui/icons-material/Contacts";
import EmailIcon from "@mui/icons-material/Email";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Card } from "@mui/material";
import EnquiryForm from "../BookingForm/EnquiryForm";
import Styles from "./contact.module.css";

interface ContactAddress {
  place: string;
  address: string;
  url: string;
}

const Contactus = () => {
  const LocationAddress: ContactAddress[] = [
    {
      place: "2PH Travel USA Office",
      address:
        "9636 Garden Grove Blvd, <br>Unit 22, Garden Grove, <br>Ca 92844",
      url: "https://www.google.com/maps/place/2vntravel+Usa+Office/@33.7732289,-117.964412,18.78z/data=!4m10!1m2!2m1!1s2pztravel+Usa+Office++9636+Garden+Grove+Blvd+Suite+22,+Garden+Grove,+CA+92844,+United+States!3m6!1s0x80dd29609a47c389:0x36c64e64edf68126!8m2!3d33.7733428!4d-117.9638446!15sClwycHp0cmF2ZWwgVXNhIE9mZmljZSAgOTYzNiBHYXJkZW4gR3JvdmUgQmx2ZCBTdWl0ZSAyMiwgR2FyZGVuIEdyb3ZlLCBDQSA5Mjg0NCwgVW5pdGVkIFN0YXRlc5IBDXRyYXZlbF9hZ2VuY3ngAQA!16s%2Fg%2F11s8c7f2nq?entry=ttu",
    },
  ];

  const handleButtonClick = (url: string) => {
    window.open(url, "_blank");
  };

  const handlePhoneCall = () => {
    window.location.href = "tel:855-767-7778";
  };
  return (
    <>
      <ContainerComponent>
        <div
          className={`container mx-auto px-4 !important ${Styles.paddingcontainer}`}
        >
          <div className="mt-6">
            <div className="grid grid-cols-12 md:gap-8 gap-3 ">
              <div className="  xl:col-span-7 lg:col-span-7  md:col-span-12 sm:col-span-12 col-span-12">
                <h1 className="mb-3">Contact Us</h1>
                <div className="bg-[#F5F5F5] flex items-center p-5 rounded-lg">
                  <LabelImportantIcon className="mr-4 text-red-500" />
                  <p style={{ fontSize: "13px" }}>
                    Have a question about your booking? Our agents are available
                    24/7 to provide assistance by phone or email.
                  </p>
                </div>
                <div className="mt-3">
                  <h2 className="mb-4">Contact our Support Team Via</h2>
                  <div className="rounded-lg ">
                    <div className="grid grid-cols-2  gap-6  h-full ">
                      <Card className="bg-[#F5F5F5] col-span-1 flex flex-col p-5">
                        <div
                          className="col-span-1 flex flex-col"
                          style={{ wordBreak: "break-word" }}
                        >
                          <b className="mb-2 flex items-center gap-3">
                            <LocalPhoneIcon className=" text-red-500" />
                            Call us
                          </b>

                          <a
                            href={`tel:855-767-7778}`}
                            className="lg:text-[16px] text-[13px]"
                          >
                            855-767-7778
                          </a>
                        </div>
                      </Card>
                      <Card className="bg-[#F5F5F5] col-span-1 flex flex-col p-5">
                        <div
                          className="col-span-1 flex flex-col"
                          style={{ wordBreak: "break-word" }}
                        >
                          <b className="mb-2 flex items-center gap-3">
                            <EmailIcon className=" text-red-500 " />
                            Email
                          </b>
                          <a
                            href={`mailto:support@2phtravel.com`}
                            className="lg:text-[16px] text-[13px]"
                          >
                            support@2phtravel.com
                          </a>
                        </div>
                      </Card>
                      <Card className="bg-[#F5F5F5] col-span-2 ">
                        <div
                          className="col-span-2 p-5"
                          style={{ wordBreak: "break-word" }}
                        >
                          <b className="flex items-center gap-3">
                            <ContactsIcon className=" text-red-500" />
                            Address
                          </b>
                          <p className="mt-3 lg:text-[16px] text-[13px]">
                            {" "}
                            <b>2PH Travel USA Office</b>
                            <br></br> 9636 Garden Grove Blvd,<br></br>
                            Unit 22, Garden Grove,Ca 92844
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="xl:col-span-5 lg:col-span-5  md:col-span-12 sm:col-span-12 col-span-12 "
                // style={{ boxShadow: " 0px 0px 10px rgba(0, 0, 0, 0.2)" }}
              >
                <EnquiryForm />
              </div>
            </div>
            <div className="mb-5">
              <ContactusComponent />
            </div>
            <div>
              <h1 className="mb-3 mt-3">Get Location</h1>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.5093456635886!2d-117.96642488771327!3d33.77334277315193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd287bc5100001%3A0x5dd7a79fcb4a4f58!2s9636%20Garden%20Grove%20Blvd%20Suite%2022%2C%20Garden%20Grove%2C%20CA%2092844%2C%20USA!5e0!3m2!1sen!2sin!4v1712311830120!5m2!1sen!2sin"
                width="100%"
                height="600"
                loading="lazy"
              ></iframe>
            </div>
            <div className="mt-9 mb-5">
              <h1 className="mb-3">Get Directions</h1>
              {LocationAddress.map((res, index) => (
                <div
                  className="rounded-lg border-2 p-5 mb-3 mx-2 border-[#76AAFF]"
                  key={index}
                >
                  <div className="grid grid-cols-2 gap-4 ">
                    <div className="lg:col-span-1 col-span-2">
                      <h3>
                        <b>{res.place}</b>
                      </h3>
                      <div
                        className="mt-3"
                        dangerouslySetInnerHTML={{
                          __html: res?.address,
                        }}
                      ></div>
                    </div>
                    <div className="lg:col-span-1 col-span-2 flex flex-col  justify-end items-end">
                      <CustomButton
                        text=" Make a Call"
                        customclass="lg:w-[30%] w-[100%]"
                        onClick={handlePhoneCall}
                        icon={
                          <LocalPhoneIcon
                            style={{ fontSize: "16px", marginRight: "5px" }}
                          />
                        }
                      />
                      <CustomButton
                        text=" Get Direction"
                        customclass="lg:w-[30%] w-[100%]"
                        colored="true"
                        onClick={() => {
                          handleButtonClick(res.url);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContainerComponent>
    </>
  );
};

export default Contactus;

import ContactusComponent from "@/components/Contactus/Contactus";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Styles from "@/page-modules/TermsandConditions/terms.module.css";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import BannerImage from "../../public/about/cebu/5.jpg";
import VisionImage from "../../public/vision.png";
import MissionImage from "../../public/target.png";
import supportImage from "../../public/support.jpg";
import telephoneImage from "../../public/telephone.png";
import PlaceImage from "../../public/about/cebu/6.jpg";
export interface PrivacyInterface {
  searchParams: {
    open: string;
  };
}
export const metadata = {
  title: "2PH Travel |About Us - Your Trusted Travel Partner",
  description:
    "Study up on 2phIt's All About Us on Travel. Plans do alter, and we are available to provide further information on our services.",
  authors: [
    {
      name: "2PH Travel",
    },
  ],

  keywords: [
    "philippines airlines flight attendant",
    "us to philippines flight time",
    "philippine airlines stewardess",
    "filipino flight attendant",
    "filipino flight attendants",
  ],
};

const AboutUs: React.FC<PrivacyInterface> = ({ searchParams }) => {
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

      <div
        className={`h-[30vh] md:h-[60vh] lg:bg-cover bg-cover bg-center bg-no-repeat relative `}
      >
        <div className="top-0 h-[30vh] md:h-[60vh] absolute bg-cover bg-center bg-no-repeat z-[-1] opacity-[0.5] w-full">
          <Image
            src={BannerImage}
            alt="BannerImage"
            width={1000}
            height={100}
            className="w-full h-full"
          />
        </div>
        <div className="flex w-full h-full md:items-center justify-center mx-5 md:mx-0  pt-3 md:pt-0 ">
          <div className="z-9999">
            {/* <p className="mb-1 text-sm text-customBlue">About Us</p> */}
            <h1 className="text-customBlue lg:text-4xl text-[20px]  font-semibold ">
              FOR A SAFE TRAVEL EXPERIENCE, KNOW US MORE!
            </h1>
          </div>
        </div>
      </div>

      <div className={`container mx-auto   ${Styles.paddingcontainer}`}>
        <div className="md:m-6 text-justify">
          <h1 className="flex justify-center mb-4 md:text-[35px]">
            About 2PH Travel
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-5">
            <div>
              <p>
                2PH Travel is a comprehensive travel agency under the ownership
                and operation of 2VN Travel Inc, based in Garden Grove,
                California.
              </p>
              <p className="mt-2">
                Our agency is dedicated to bringing your travel dreams to life,
                offering specialized services to ensure a seamless journey. We
                excel in securing the best deals on economical flights and
                providing continuous assistance via 24/7 phone consultations.
                Our portfolio includes exclusive offers on airfares and visas,
                unmatched elsewhere in the market. With a wide-ranging network
                encompassing over 200 airlines, we deliver discounted airfares
                tailored to your preferences.
              </p>
              <p className="mt-2">
                Driven by a team of travel enthusiasts, we possess in-depth
                industry knowledge and expertise to navigate the complexities of
                travel arrangements. Our customer-centric approach sets us apart
                as the most dependable travel agents serving the Philippines and
                the USA. Through our unwavering commitment to excellence, we
                have garnered the trust and appreciation of travelers worldwide,
                establishing ourselves as a beacon of quality service in the
                industry.
              </p>
            </div>

            <div>
              <Image
                src={PlaceImage}
                alt="MissionImage"
                width={1000}
                height={100}
                className="w-full h-auto rounded-[5px"
              />
            </div>
          </div>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
              <div className="bg-gray-100 shadow-custom  p-3 rounded-[5px]">
                <div className="flex flex-col justify-center items-center ">
                  <Image
                    src={VisionImage}
                    alt="Vision"
                    width={1000}
                    height={100}
                    className="w-[50px] h-[50px]"
                  />
                  <h1>Vision</h1>
                </div>
                <div>
                  <p>
                    Our main vision at 2PH Travel is ticket services and visa
                    services. We become the premier choice for travelers seeking
                    visa services in the Philippines. We envision a future where
                    obtaining a visa is not just a bureaucratic process but an
                    effortless and seamless experience.
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 shadow-custom  p-3 rounded-[5px]">
                <div className="flex flex-col justify-center items-center ">
                  <Image
                    src={MissionImage}
                    alt="MissionImage"
                    width={1000}
                    height={100}
                    className="w-[50px] h-[50px]"
                  />
                  <h1>Mission</h1>
                </div>
                <div>
                  <p>
                    Our main mission at 2PH Travel is ticket services and
                    provide visa service with the atmost convenience and quality
                    visa services through our Philippines branch. We prioritize
                    legitimacy, reliability, prompt responses, and a
                    customer-focused approach in all our endeavors.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-row gap-3 mt-10">
            <div className="w-[50%]">
              <h6 className="text-customRed">Our Story</h6>
              <h1 className="mt-1 text-customBlue">
                Why our Customers loves us?
              </h1>

              <p className="text-sm mt-3">
                <b>Ease of Use:</b> Our platform is designed with simplicity in
                mind. Booking flights, accommodations, and activities is quick
                and intuitive, saving our customers time and hassle. Our
                platform is designed with simplicity in mind.
              </p>
              <p className="text-sm mt-3">
                <b>Customer Service:</b> At 2PH Travel, customer satisfaction is
                our top priority. Our dedicated support team is available around
                the clock to assist with any inquiries or concerns, ensuring
                that our customers feel supported every step of the way.
              </p>
              <p className="text-sm mt-3">
                <b>Personalization:</b> We understand that every traveler is
                unique. That&rsquo;s why we offer personalized recommendations
                and tailored experiences to match our customers preferences and
                interests.
              </p>
              <p className="text-sm mt-3">
                <b>Reliability:</b> Our extensive network of trusted partners
                ensures that our customers can travel with confidence. From
                flights to accommodations, we only work with reputable providers
                to guarantee a seamless experience.
              </p>
            </div>
            <div>
              <Image src={AboutImage} alt="about-us" width={700} height={700} />
            </div>
          </div> */}

          <div className="mb-5 my-5">
            <div className=" hidden md:block">
              <ContactusComponent />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
              <div>
                <div className="flex justify-center items-center ">
                  <Image
                    src={telephoneImage}
                    alt="telephoneImage"
                    width={1000}
                    height={100}
                    className="w-[50px] h-[50px]"
                  />
                  <h1
                    className=" flex justify-center items-center 
            md:text-[35px] text-customBlue my-5 "
                  >
                    24/7 Phone Customer Support
                  </h1>
                </div>
                <p>
                  At 2PH Travel, we understand the importance of our customers
                  {"'"} time and continuously strive to enhance their travel
                  experiences. Our committed customer support team is readily
                  available round the clock to assist with any concerns, be it
                  booking a flight, modifying an itinerary, or seeking general
                  information. Equipped with extensive knowledge and tools, our
                  team ensures prompt and efficient resolution of any issues,
                  allowing you to focus on enjoying your travels. Whether it
                  {"'"}s booking assistance, itinerary adjustments, or
                  inquiries, our 24/7 phone support guarantees professional
                  assistance for our valued customers.
                </p>
                <p>
                  {" "}
                  Turning your travel dreams into reality requires
                  determination, planning, and sometimes stepping out of your
                  comfort zone. But the rewards of exploring new places and
                  cultures are priceless!
                </p>
                <p>Welcome to the Philippines!</p>
              </div>
              <div>
                <Image
                  src={supportImage}
                  alt="supportImage"
                  width={1000}
                  height={100}
                  className="w-[300px] h-[300px]"
                />
              </div>
            </div>
          </div>

          {/* <div className="container mx-auto">
            <div className={` flex justify-around items-center flex-wrap`}>
              <div className="flex flex-col items-center justify-center lg:flex-1 flex-wrap">
                <div
                  className="text-3xl md:text-3xl  lg:text-5xl my-5 font-bold"
                  style={{ width: "81%" }}
                >
                  What people say
                  <br />
                  <span style={{ color: " rgb(187, 20, 15)" }}> about us.</span>
                </div>
                <div
                  className="text-lg md:text-lg lg:text-xl my-5 text-[14px]"
                  style={{ color: "#666666", width: "80%" }}
                >
                  Our Clients send us bunch of smilies with our services and we
                  love them.
                </div>
              </div>

              <Review />
            </div>
          </div> */}

          {/* <Card className={`${Styles.cardShadow} p-5`}>
            
          </Card> */}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;

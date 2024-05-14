import Image from "next/image";
import Link from "next/link";
import Styles from "../../app/home.module.css";
import HomeTitle from "@/components/Title/HomeTitle";

import ArrowUp from "@/public/ArrowUp.png";
import ArrowDown from "@/public/ArrowDown.png";


import { PiNumberSquareOneFill } from "react-icons/pi";
import { PiNumberSquareTwoFill } from "react-icons/pi";
import { PiNumberSquareThreeFill } from "react-icons/pi";

function Discover (){
    return(
        <>
              <div className={` ${Styles.bgcolor} p-5 md:p-10`}>
        <div
          className={`${Styles.headingName} ${Styles.textcenter} uppercase mb-2`}
        >
          <HomeTitle title="Discover How It Works!" />


        </div>

        <div className={`${Styles.textcenter} ${Styles.grey} text-[14px] px-8`}>
          We Protect Your Data and Sensitive Details.
        </div>
        <div className="flex justify-center items-center">
          <div className="flex w-full h-full items-center justify-center">
            <div className="flex justify-center items-center py-4 flex-wrap lg:flex-nowrap">
              <div
                className={`${Styles.discover} flex flex-col items-center justify-center md:w-1/2`}
              >
                <PiNumberSquareOneFill className="text-customBlue text-5xl" />
                <h2 className="text-center m-2 lg:w-3/4 md:1/2">
                  Instant Discounts: Call Now for Affordable Flights!
                </h2>
                <div
                  className={`text-center m-2  text-[14px] lg:w-3/4 md:1/2 ${Styles.grey} mb-4`}
                >
                  2PH Travel has special contracts with airlines and offers
                  exclusive fares not found online
                </div>
              </div>
              <div>
                <Image
                  src={ArrowUp}
                  alt="ArrowUp Image"
                  width={200}
                  height={10}
                  priority
                  className="hidden lg:block"
                />
              </div>
              <div
                className={`${Styles.discover} flex flex-col items-center justify-center md:w-1/2 `}
              >
                <PiNumberSquareTwoFill className="text-customBlue text-5xl" />

                <h2 className="text-center m-2 lg:w-3/4 md:1/2">
                  Plan Your Trip Your Way: Get Free Quotes!
                </h2>
                <div
                  className={`text-center text-[14px] m-2 lg:w-3/4 md:1/2 ${Styles.grey}`}
                >
                  We offer free trip planning and personalized itineraries
                  around the clock. Chat with your dedicated travel agent for
                  all your travel needs.
                </div>
              </div>
              <div>
                <Image
                  src={ArrowDown}
                  alt="ArrowDown Image"
                  width={200}
                  height={10}
                  priority
                  className="hidden lg:block"
                />
              </div>
              <div
                className={`${Styles.discover} flex flex-col items-center justify-center md:w-1/2`}
              >
                <PiNumberSquareThreeFill className="text-customBlue text-5xl" />
                <h2 className="text-center m-2 lg:w-3/4 md:1/2">
                  Your Security, Our Priority: Pay with Confidence!
                </h2>
                <div
                  className={`text-center m-2 lg:w-3/4 md:1/2 ${Styles.grey} text-[14px]`}
                >
                  Securely confirm your travel plans at 2PH Travel. Choose from
                  a range of safe payment methods
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}
export default Discover;
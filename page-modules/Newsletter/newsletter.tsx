"use client";

import Subscribe from "@/action/newsletter/subscribe";
import Styles from "./newsletter.module.css";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import NewsletterButton from "./NewsLetterButton";
import Swal from "sweetalert2";

const Newsletter = () => {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <>
          <div
        // className={`${Styles.backgroundimageremember} ${Styles.bgimagefull} p-3`}
        className="bg-customBlue p-3"
      >
        <div className="flex flex-col justify-center items-center p-0 md:p-10">
          <div className="text-white font-bold text-center text-md md:text-4xl my-5">
            Are You Ready To Travel? Remember Us !!{" "}
          </div>
          <div className=" text-white text-center max-w-2xl  text-xs md:text-base">
            {`We're committed to making your travel experience seamless and unforgettable. So, buckle up and let's embark on this journey together. Don't miss out on exclusive offers, travel deals, and updates by subscribing to our newsletter on our website. Follow us on social media for daily travel inspiration, tips, and giveaways.`}
          </div>
         
     
      <form
        ref={ref}
        action={async (formData) => {
          const searchResult = await Subscribe(formData);
          if (searchResult) {
            Swal.fire({
              icon: "success",
              title: "Successfully Subscribed",
              text: "Thanks for subscribing to our newsletter",
            });
            ref.current?.reset();
          }
        }}
      >
        <div className={`${Styles.couponcodebtn}`}>
          <input
            type="email"
            placeholder="Enter email id"
            name="email"
            className={` bg-[#F4F4F4] mb-4 mt-4  p-2 w-[50vw] md:w-auto focus:outline-none border border-[#DADADA] h-[40px] md:h-[40px] pl-2`}
            required={true}
          />

          <NewsletterButton>Subscribe Us</NewsletterButton>
        </div>
      </form>
      </div>
      </div>
    </>
  );
};

export default Newsletter;

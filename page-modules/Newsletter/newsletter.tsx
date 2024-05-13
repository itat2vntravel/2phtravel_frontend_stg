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
    </>
  );
};

export default Newsletter;

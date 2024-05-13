"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import GoogleAnalytics from "../GoogleAnalytics";

function CookieBanner() {
  const [consent, setConsent] = useState("");

  useEffect(() => {
    const storedConsent = String(localStorage.getItem("cookieConsent"));
    setConsent(storedConsent);
  }, []);

  if (!consent || consent === "null") {
    // rendering the cookie banner if no value found in nextjs cookie
    return (
      <div
        className={`my-10 mx-auto max-w-sm md:max-w-screen-sm
          fixed bottom-0 left-0 right-0 
          flex px-3 md:px-4 py-3 justify-between items-center flex-col md:flex-row gap-4  
           bg-[#142D53] rounded-lg shadow z-[99999]`}
      >
        <div className="text-start md:flex-8">
          <Link href="/cookie-policy">
            <p className="text-white text-[14px]">
              Cookies help us maintain compliance with industry standards.
              <span>
                {" "}
                By clicking &apos;Accept&apos;, you agree to our Cookies Policy{" "}
              </span>
              {/* <span className="font-bold text-sky-400">cookies</span> on our
              site. */}
            </p>
          </Link>
        </div>

        <div className="flex gap-2 md:flex-1">
          <button
            onClick={() => {
              localStorage.setItem("cookieConsent", "denied");
              setConsent("denied");
            }}
            className="px-5 py-2 text-gray-300 rounded-md border-gray-900"
          >
            Decline
          </button>

          <button
            onClick={() => {
              localStorage.setItem("cookieConsent", "granted");
              setConsent("granted");
            }}
            className="bg-gray-500 px-5 py-2 text-white rounded-lg w-max "
          >
            Accept
          </button>
        </div>
      </div>
    );
  }

  return <GoogleAnalytics consent={consent} />;
}

export default CookieBanner;

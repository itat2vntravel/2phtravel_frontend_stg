import { Card } from "@mui/material";
import React from "react";
import Styles from "./cookies.module.css";

const CookiesPolicy = () => {
  return (
    <>
      <div className="bg-[#f3f3f3]">
        <div className={`container mx-auto ${Styles.paddingcontainer} `}>
          <div className="m-3 md:m-6">
            <Card className={`${Styles.cardShadow} p-5`}>
              <h1 className="flex justify-center">Cookies Policy</h1>
              <div>
                <h4>
                  <b>Introduction</b>
                </h4>
                <br></br>
                <p>
                  This Cookie Policy outlines the various types of cookies
                  utilized across our Websites and Apps. All capitalized terms
                  not defined herein shall carry the same meanings as outlined
                  in our Privacy Policy.
                </p>
              </div>
              <br></br>
              <div>
                <h4>
                  <b>Definition of Cookies:</b>
                </h4>
                <br></br>
                <p>
                  A cookie refers to a small text file stored by a web server on
                  your computer or mobile device when you visit a website. It
                  allows the website to remember your actions and preferences,
                  such as login details, language, and font size, enhancing your
                  user experience and functionality upon returning to the site.
                  Cookies may also be used for analytics and marketing purposes,
                  such as generating traffic analytics, tracking site visits, or
                  retargeting visitors through advertisements.
                </p>
              </div>
              <br></br>

              <div>
                <h4>
                  <b>Types of Cookies and Their Usage:</b>
                </h4>
                <br></br>
                <p>We utilize the following types of cookies on 2PH Travel:</p>
                <br></br>
                <ul className="list-decimal ml-4">
                  <li className="underline">First-Party Cookies:</li>

                  <div className="list-disc ml-4 mt-2">
                    {" "}
                    These are set by 2PH Travel for users on its website.
                  </div>

                  <li className="underline">Session Cookies:</li>
                  <div className="list-disc ml-4 mt-2">
                    Temporary cookies that persist until you close your web
                    browser, essential for proper functioning of 2PH Travel,
                    including browsing, searching, and booking facilities.
                  </div>
                  <li className="underline">Persistent Cookies:</li>
                  <div className="list-disc ml-4 mt-2">
                    Remain on your device longer or until manually deleted,
                    recognizing returning users for smoother website access and
                    functionality, aiding in user identification, browsing habit
                    tracking, and service provision.
                  </div>
                  <li className="underline">Strictly Necessary Cookies:</li>
                  <div className="list-disc ml-4 mt-2">
                    Essential for correct functioning, ensuring all services are
                    accessible, including login functionality, load balancing,
                    page navigation, and form filling.
                  </div>
                  <li className="underline"> Performance Cookies:</li>
                  <div className="list-disc ml-4 mt-2">
                    Track metrics like visit count, page popularity, and traffic
                    sources to optimize user experience and website performance.
                  </div>
                  <li className="underline"> Functional Cookies:</li>
                  <div className="list-disc ml-4 mt-2">
                    Enhance website features based on previous visits and
                    preferences, such as language choice, booking preferences,
                    and user settings.
                  </div>
                  <li className="underline"> Advertising Cookies:</li>
                  <div className="list-disc ml-4 mt-2">
                    Show relevant advertisements across 2PH Travel and related
                    websites, analyzing marketing campaign performance and
                    limiting advertisement views.
                  </div>
                  <li className="underline">
                    {" "}
                    Analytics and Personalization Cookies:
                  </li>
                  <div className="list-disc ml-4 mt-2">
                    Analyze user behavior and preferences for seamless online
                    experiences, providing personalized travel itineraries,
                    offers, and deals based on booking history and previous
                    searches.
                  </div>
                </ul>
              </div>
              <br></br>
              <div>
                <h4>
                  <b>Managing Your Cookies:</b>
                </h4>
                <br></br>
                <p>
                  While we use cookies to personalize user experience and
                  functionality, you have control options. Third-party platforms
                  may assist in analytics and targeted advertisements based on
                  your interactions. Opt-out options for behavioral or targeted
                  advertisements are available from some providers. You can also
                  update browser settings and manage cookie preferences or
                  manually delete saved cookie data. Note that certain website
                  features may be inaccessible without cookies.
                </p>
              </div>
              <br></br>
              <div>
                <h4>
                  <b>Acceptance of Policy:</b>
                </h4>
                <br></br>
                <p>
                  By browsing our website and using our services, you agree to
                  this Cookies Policy. For more information on privacy settings
                  and personal data use, please refer to our Privacy Policy
                  page.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiesPolicy;

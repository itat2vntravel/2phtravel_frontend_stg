import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import { cookies } from "next/headers";
import { Card } from "@mui/material";
import Styles from "@/page-modules/TermsandConditions/terms.module.css";
import Accordion from "@/components/Accordion/Accordion";

export interface PrivacyInterface {
  searchParams: {
    open: string;
  };
}
export const metadata = {
  title: "2PH Travel |Refund Terms - Your Trusted Travel Partner",
  description:
    "Learn about 2PH Travel's refund policy for flight bookings. We understand plans change, and we're here to assist you with cancellations and refunds.",
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

interface FAQItem {
  question: string;
  answer: string;
}

const RefundPolicy: React.FC<PrivacyInterface> = ({ searchParams }) => {
  const UserLoginId = cookies().get("user_id")?.value || "";
  const firstName = cookies().get("first_name")?.value || "";
  const accesstoken = cookies().get("access_token")?.value || "";
  const faqData: FAQItem[] = [
    {
      question: "Till when can I Cancel/ Refund my booking online?",
      answer:
        "You can Cancel/Refund by contacting our team directly through Phone.",
    },
    {
      question: "When can I reach your travel agents?",
      answer:
        "Our travel agents at 2PH Travel Tickets are available for assistance via phone and email around the clock, every day of the week, including Mondays through Sundays.",
    },
    {
      question: "What is the procedure to cancel my flight?",
      answer:
        "The customers booking can be cancelled/ changed before the scheduled time of departure by contacting 2PH Travel Call Centre.",
    },

    {
      question:
        "Is it possible to make alterations to the ticket once it has been issued?",
      answer:
        "Once the ticket has been issued, modifications are not allowed. It is essential to review all details on the ticket before finalizing the booking. It is your responsibility to ensure that all information is correct and without errors. For verification, please consult our agent during the reservation process.",
    },
  ];
  return (
    <>
      <Header
        isMobileView={searchParams.open}
        userId={UserLoginId}
        firstName={firstName}
        accesstoken={accesstoken}
      />

      <div className={`container mx-auto ${Styles.paddingcontainer}`}>
        <div className="m-3 md:m-6">
          <Card className={`${Styles.cardShadow} p-5`}>
            <h1 className="flex justify-center">Refund Policy</h1>
            <div>
              <h4>
                <b>Refund Documentation</b>
              </h4>
              <br></br>
              {/* <p>
                Tickets or any travel services purchased from 2PH Travel are
                subject for refund approval. All refund requests are subject to
                certain rules and conditions. Fees or penalties may apply to the
                refund. For credit card payments, processing of refund may take
                six to eight weeks from the date of notice. The amount will be
                refunded to the credit card used for the transaction. For cash
                payments, processing of refund may take at least 30 days from
                the date of notice. Once the refund is processed, the client’s
                itinerary will be cancelled.{" "}
              </p> */}
              <p>
                After the tickets are issued, any charges or refunds are subject
                to the restriction of the fares used. Fee or penalties may apply
                and charged on per ticket per person in basis.
              </p>
              <br />
              <p>
                The refund entire process may take six to eight weeks from
                receipt of your request. The amount will be refund via same
                source (For credit card payment will be refund to the credit
                card used for the transaction).{" "}
              </p>
              <br />
              <p>
                Please contact 2PH Travel Customer Support Team at
                <a
                  href={`tel:855-767-7778}`}
                  className=" hover:text-customRed pl-1"
                >
                  +1 855 767 7778
                </a>{" "}
                (Toll Free) or email to{" "}
                <a
                  href={`mailto:support@2phtravel.com`}
                  className=" hover:text-customRed"
                >
                  support@2phtravel.com
                </a>{" "}
              </p>
            </div>
            <br></br>

            <div>
              <h4>
                <b>Frequently Asked Question</b>
              </h4>
              <br></br>
              <Accordion faqData={faqData} />
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RefundPolicy;

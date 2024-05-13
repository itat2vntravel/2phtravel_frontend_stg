import Accordion from "@/components/Accordion/Accordion";
import Styles from "./faq.module.css";
interface FAQItem {
  question: string;
  answer: string;
}
const Faq = () => {
  const faqData: FAQItem[] = [
    {
      question: "Can I make a ticket reservation online?",
      answer:
        "Please contact our team to assist you with booking your tickets over the phone.",
    },
    {
      question: "When can I reach your travel agents?",
      answer:
        "Our travel agents at 2PH Travel Tickets are available for assistance via phone and email around the clock, every day of the week, including Mondays through Sundays.",
    },
    {
      question: "What documents are necessary for airport security clearance?",
      answer:
        "When traveling domestically, you'll need a boarding pass, a valid government-issued photo ID, and your flight itinerary. For international travel, make sure to have your passport and any required visa permits as per the destination country's regulations.",
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
      <div
        className={` h-[50vh] lg:bg-cover bg-cover bg-center bg-no-repeat	 relative  ${Styles.bgimage}`}
      >
        <div className="bg-[url('/Login/faqimage.jpg')] top-0 h-[50vh] absolute bg-cover bg-center bg-no-repeat z-[-1] opacity-[0.5] w-full"></div>
        <div className="flex w-full h-full justify-center md:items-center ml-0 pt-3 md:pt-0 pl-5 md:pl-10">
          {/* <h1 className="text-white text-3xl">Common Inquiry</h1> */}
        </div>
      </div>

      <div className="container mx-auto mb-5" style={{ padding: "8px 20px" }}>
        <div className="z-9999">
          <h1 className="my-3 text-xl">Why Choose 2PH Travel?</h1>
          <p>
            Our exclusive airfares discount with partner airlines are
            unavailable online. Your privacy and data security are always our
            top priority. Travel worry-free, knowing that our team of ticket
            experts is available around the clock to assist you.
          </p>
        </div>
        <div className="mt-6">
          <h1 className="mb-4">FREQUENTLY ASKED QUESTION</h1>
          <div className="space-y-4">
            <Accordion faqData={faqData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;

import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  faqData: FAQItem[];
}

const Accordion: React.FC<Props> = ({ faqData }) => {
  return (
    <>
      {faqData.map((res, index) => (
        <details
          key={index}
          className="group mt-5 [&_summary::-webkit-details-marker]:hidden bg-gray-50 shadow-md border-s-4 border-[#142D53] "
        >
          <summary className=" flex cursor-pointer items-center justify-between gap-1.5 rounded-lg  bg-gray-50 p-4 text-gray-900 hover:text-blue-800 hover:bg-blue-100 active:border-blue-600">
            <h2 className="font-semibold">{res.question}</h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180 "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="mt-4 px-4 pb-4 leading-relaxed text-gray-700">
            {res.answer}
          </p>
        </details>
      ))}
    </>
  );
};

export default Accordion;

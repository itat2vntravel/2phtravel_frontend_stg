"use client";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface optionheaderDataItem {
  title: string;
  url: string;
  city_name?: string;
}

interface Props {
  optionheaderData: optionheaderDataItem[];
  accordion: string;
}

const HeaderAccordion: React.FC<Props> = ({ accordion, optionheaderData }) => {
  const router = usePathname();
  const selectedDestination = router.includes("/bookflights")
    ? "#EC2719"
    : "white";

  const selectedHelpSupport = router.includes("/guidance")
    ? "#EC2719"
    : "white";
  return (
    <>
      <Accordion
        style={{ background: "#142D53", color: "white", boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={
            <ArrowDropDownIcon
              style={{
                color: "white",
              }}
            />
          }
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography
            className="!text-[14px] !font-semibold"
            style={{
              color:
                accordion == "Journey By Venue"
                  ? selectedDestination
                  : accordion == "Guidance"
                  ? selectedHelpSupport
                  : "white",
            }}
          >
            {accordion}
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ paddingBottom: "0px", paddingLeft: "40px" }}>
          {optionheaderData?.map((data, index) => (
            <>
              {data.title === "" ? (
                <></>
              ) : (
                <Typography key={index} className="py-3 px-2">
                  <Link
                    href={`${
                      data.city_name !== undefined
                        ? `/bookflights/${data.city_name}`
                        : `${data.url}`
                    }`}
                    className={`text-[14px] font-semibold
                      
                    ${
                      router ===
                      `/bookflights/${data.city_name?.replace(/\s/g, "%20")}`
                        ? "!text-customRed"
                        : "text-customWhite"
                    }
                    ${
                      router === `${data.url}` || router === `${data.url}`
                        ? "!text-customRed"
                        : "text-customWhite"
                    }
                    `}
                  >
                    {" "}
                    {data.title || data.city_name}
                  </Link>
                </Typography>
              )}
            </>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default HeaderAccordion;

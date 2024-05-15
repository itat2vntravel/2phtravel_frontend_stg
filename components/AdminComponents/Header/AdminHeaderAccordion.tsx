import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

interface optionheaderDataItem {
  title: string;
  url: string;
  icon?: React.ReactNode;
  city_name?: string;
}

interface Props {
  optionheaderData: optionheaderDataItem[];
  accordion: string;
  accordionicon: React.ReactNode;
  pathname: string;
}

const AdminHeaderAccordion: React.FC<Props> = ({
  accordion,
  optionheaderData,
  accordionicon,
  pathname,
}) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  useEffect(() => {
    setExpanded(
      accordion === "Banner" &&
        (pathname === "/admin/homebanner" ||
          pathname === "/admin/homeoffer" ||
          pathname === "/admin/airline-offers")
        ? accordion
        : accordion === "Destination" &&
          (pathname === "/admin/flight-deals" ||
            pathname === "/admin/flight-deals-city")
        ? accordion
        : false
    );
  }, [accordion, pathname]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(
        newExpanded
          ? panel &&
            (pathname === "/admin/homebanner" ||
              pathname === "/admin/homeoffer" ||
              pathname === "/admin/airline-offers")
            ? panel
            : panel &&
              (pathname === "/admin/flight-deals" ||
                pathname === "/admin/flight-deals-city")
            ? panel
            : false
          : panel
      );
    };
  return (
    <Accordion
      style={{
        backgroundColor: "transparent",
        color: "white",
        boxShadow: "none",
        padding: "0px",
      }}
    >
      <AccordionSummary
        expandIcon={
          <MdOutlineArrowDropDown
            className="text-xl"
            style={{ color: "white" }}
          />
        }
        style={{
          padding: "0px",
        }}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography className="flex gap-2">
          {accordionicon}
          {accordion}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        style={{ paddingBottom: "0px", paddingTop: "0px", paddingLeft: "20px" }}
      >
        {optionheaderData?.map((data, index) => (
          <>
            {data.title === "" ? (
              <></>
            ) : (
              <Typography
                key={index}
                className={`py-3 px-2 ${
                  accordion === "Banner" && data.url === pathname
                    ? " bg-blue-50 px-4 py-3 rounded-lg text-[#142B51]"
                    : accordion === "Destination" && data.url === pathname
                    ? "bg-blue-50 px-4 py-3 rounded-lg text-[#142B51]"
                    : ""
                }`}
              >
                <Link href={`${data.url}`} className="flex gap-2">
                  {" "}
                  {data.icon} {data.title}
                </Link>
              </Typography>
            )}
          </>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default AdminHeaderAccordion;

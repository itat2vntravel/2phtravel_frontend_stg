"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { formUrlQuery } from "@/utils/formUrlQuery";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Style from "./RadioButton.module.css";

import useModifySearch from "@/store/ModifySearch";

export default function Departtimeradio() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const departtimesearch = searchParams.get("departtime");
  const [selectedDepartTime, setSelectedDepartTime] = useState<string | null>(
    null
  );
  const { modifyStatus, ModifySearchStore } = useModifySearch((state) => state);
  // Set the default selectedDepartTime based on departtimesearch
  useEffect(() => {
    setSelectedDepartTime(departtimesearch || "");
  }, [departtimesearch]);
  const handleDeparttimeChange = (Departtime: string) => {
    let newUrl;
    if (Departtime === "") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["departtime"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "departtime",
        value: Departtime,
      });
    }
    router.push(newUrl, { scroll: false });
    // ModifySearchStore({
    //   modifyStatus: true,
    //   departureTime: Departtime,
    // });
    // setTimeout(() => {

    // }, 5000);
  };
  const HandleSearching = () => {
    window.scroll(0, 500);
    ModifySearchStore({
      modifyStatus: true,
    });
  };
  return (
    <>
      <RadioGroup
        aria-label="departtime"
        name="departtime"
        value={selectedDepartTime}
        onChange={(event) => handleDeparttimeChange(event.target.value)}
      >
        {[
          { id: "", label: "None" },
          { id: "morning", label: "Morning" },
          { id: "afternoon", label: "AfterNoon" },
          { id: "evening", label: "Evening" },
          { id: "night", label: "Night" },
        ].map((option) => (
          <FormControlLabel
            key={option.id}
            value={option.id}
            className={Style.labelfontSize}
            control={
              <Radio
                sx={{
                  // color: "red",
                  "&.Mui-checked": {
                    color: "red",
                  },
                }}
                disabled={modifyStatus}
                className={Style.FlightPageRadioButton}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
      {/* <button>Apply Depart Time</button> */}

      <button
        className={`w-full my-3 pl-3  rounded-[6px] font-normal	cursor-pointer font-main px-5 py-2 text-white ${
          modifyStatus ? "bg-[#ec2719] opacity-40" : "bg-[#ec2719]"
        }  `}
        type="button"
        onClick={HandleSearching}
        disabled={modifyStatus ? true : false}
      >
        {modifyStatus ? "Searching" : "Search"}
      </button>
    </>
  );
}

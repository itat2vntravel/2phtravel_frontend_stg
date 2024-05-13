"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { formUrlQuery } from "@/utils/formUrlQuery";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import airlines from "airline-codes";
import Style from "./RadioButton.module.css";
import useModifySearch from "@/store/ModifySearch";

export default function Airlinesradio({ airlineCodes }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const PathName = usePathname();
  // const airlinesearch = searchParams.get("airline");
  const { modifyStatus, ModifySearchStore } = useModifySearch((state) => state);
  // const [checkedAirlines, setCheckedAirlines] = useState<string[]>([]);
  const [checkedAirlines, setCheckedAirlines] = useState<string[]>([]);
  const [uncheckedAirlines, setUncheckedAirlines] = useState<string[]>([]);

  useEffect(() => {
    const airlinesearch = searchParams.get("airline")?.split(",") || [];
    if (airlinesearch.length > 0) {
      setCheckedAirlines(airlinesearch);
      setUncheckedAirlines(
        airlineCodes.filter((code: string) => !airlinesearch.includes(code))
      );
    } else {
      setCheckedAirlines([]);
      setUncheckedAirlines([]);
    }
  }, [airlineCodes, searchParams]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const airlineCode = event.target.value;
    const isChecked = event.target.checked;

    let updatedCheckedAirlines = [...checkedAirlines];
    let updatedUncheckedAirlines = [...uncheckedAirlines];

    if (isChecked) {
      updatedCheckedAirlines.push(airlineCode);
      updatedUncheckedAirlines = updatedUncheckedAirlines.filter(
        (code) => code !== airlineCode
      );
    } else {
      updatedCheckedAirlines = updatedCheckedAirlines.filter(
        (code) => code !== airlineCode
      );
      updatedUncheckedAirlines.push(airlineCode);
    }

    // Prevent unchecking the last checked checkbox
    // if (
    //   updatedCheckedAirlines.length === 0 &&
    //   airlineCode !== "All" &&
    //   !isChecked
    // ) {
    //   return;
    // }

    setCheckedAirlines(updatedCheckedAirlines);
    setUncheckedAirlines(updatedUncheckedAirlines);

    let newUrl;

    // If "All" checkbox is checked or unchecked
    if (airlineCode === "All" || updatedCheckedAirlines.length === 0) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["airline"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "airline",
        value: updatedCheckedAirlines.join(","),
      });
    }
    router.push(newUrl, { scroll: false });

    // setTimeout(() => {
    //   ModifySearchStore({
    //     modifyStatus: true,
    //   });
    // }, 5000);
  };

  return (
    <>
      <FormGroup>
        {/* <FormControlLabel
          key="All"
          value="All"
          className={Style.labelfontSize}
          control={
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "red",
                },
              }}
              value={"All"}
              checked={checkedAirlines?.length === airlineCodes?.length}
              onChange={handleCheckboxChange}
              className={Style.FlightPageRadioButton}
            />
          }
          label="All"
        /> */}
        {/* Dynamically generated options from airlineCodesArry */}
        {airlineCodes &&
          airlineCodes?.map((airlineCode: string) => (
            <FormControlLabel
              key={airlineCode}
              value={airlineCode}
              className={Style.labelfontSize}
              control={
                <Checkbox
                  sx={{
                    // color: "red",
                    "&.Mui-checked": {
                      color: "red",
                    },
                  }}
                  value={airlineCode}
                  disabled={modifyStatus}
                  checked={checkedAirlines.includes(airlineCode)}
                  className={Style.FlightPageRadioButton}
                  onChange={handleCheckboxChange}
                />
              }
              label={airlines.findWhere({ iata: airlineCode }).get("name")}
            />
          ))}
      </FormGroup>
    </>
  );
}

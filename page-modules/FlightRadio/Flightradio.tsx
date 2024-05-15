"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import qs from "query-string";
import { formUrlQuery } from "@/utils/formUrlQuery";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import useSearchFlight from "@/store/flightSearchStore";
import Style from "./RadioButton.module.css";
import useModifySearch from "@/store/ModifySearch";
export default function Flightradio() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { airlineCodesArry } = useSearchFlight((state) => state);
  const { modifyStatus, ModifySearchStore } = useModifySearch((state) => state);
  const stopsearch = searchParams.get("stop");

  const [selectedstop, setSelectedstop] = useState<string | null>(null);

  useEffect(() => {
    setSelectedstop(stopsearch || "any");
  }, [stopsearch]);
  const handleStopChange = (stopCount: string) => {
    let newUrl;
    if (stopCount === "any") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["stop"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "stop",
        value: stopCount,
      });
    }
    router.push(newUrl, { scroll: false });
  };
  return (
    <>
      <RadioGroup
        aria-label="stop"
        name="stop"
        value={selectedstop}
        onChange={(event) => handleStopChange(event.target.value)}
      >
        {[
          { id: "any", label: "Any" },
          { id: "non-stop", label: "Nonstop" },
          { id: "1-stop", label: "1 Stop Only" },
          { id: "2-stop-more", label: "2 Stops or More" },
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
    </>
  );
}

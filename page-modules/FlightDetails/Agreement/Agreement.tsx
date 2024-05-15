"use client";
import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import useSearchFlight from "@/store/flightSearchStore";

const Agreement = () => {
  const { totalPrice } = useSearchFlight((state) => state);

  return (
    <div className="mt-6 mb-6">
      <h1 style={{ color: "red" }}>DISCLAIMER, CANCELLATION AND AMENDMENT</h1>
      <div className="p-5">
        <ol style={{ listStyle: "auto" }}>
          <li> Fares are not guaranteed until tickets have been issued.</li>
          <li>Ticket is non-transferable.</li>
          <li>Name correction is subject to airline’s policy.</li>
          <li>Penalty and fees apply to the following:</li>
          <ol style={{ listStyle: "auto", marginLeft: "20px" }}>
            <li>
              Change in travel date(s) based on flight availability at the time
              of change;
            </li>
            <li>
              Change in travel date(s) after departure, which must be done by
              the airline directly (airline penalty plus any fare difference
              will apply and is based on availability of flight at the time of
              change);
            </li>
            <li>
              The majority of airlines have a no-show fee, applies for confirmed
              bookings not cancelled 24 hours prior original flight departure
            </li>
          </ol>
          <li>If seats are selected</li>
          <ol style={{ listStyle: "auto", marginLeft: "20px" }}>
            <li>
              Seats are non-refundable, non-rebookable and non-transferable.
            </li>
            <li>
              For voluntary seat changes, the current seats paid for will
              automatically be forfeited
            </li>
            <li>
              If flight schedule/aircraft changes, seat position is subject for
              displacement
            </li>
          </ol>
          <li>
            For necessary changes in your flight details, contact our 24/7
            customer .
          </li>
          <li>
            Before agreeing to our Terms and Conditions, don’t forget to review
            our service fees for exchanges, changes, refunds, and cancellations.
          </li>
        </ol>
      </div>
      <h3 className="flex justify-center">
        <b>Terms and Conditions and Credit Card Authorization</b>
      </h3>
      <FormControlLabel
        required
        control={<Checkbox />}
        label={`I have read and agreed to the Terms and Conditions, Fare Rules and Restrictions of this booking engine. International flights require special Travel documentation for each traveler. I hereby authorize the total amount USD ${totalPrice} be applied to the credit card. I understand that this serves as my legal signature.`}
      />
    </div>
  );
};

export default Agreement;

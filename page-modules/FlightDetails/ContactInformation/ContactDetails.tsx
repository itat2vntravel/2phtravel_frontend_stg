import { Card, TextField } from "@mui/material";
import React from "react";
import Styles from "../flightdetails.module.css";
import CustomTextField from "@/components/CustomTextField/CustomTextField";

const ContactDetails = () => {
  return (
    <div className="mt-6">
      <Card className={`${Styles.cardShadow} p-5`}>
        <h1 style={{ color: "red" }}>CONTACT INFORMATION</h1>
        <div className="flex justify-around p-3 flex-wrap">
          <CustomTextField
            labeltext="Email"
            type="email"
            name="email"
            placeholder="email"
            required={true}
          />
          <CustomTextField
            labeltext="mobile-number"
            type="text"
            name="mobile-number"
            placeholder="mobile-number"
            required={true}
          />
          <CustomTextField
            labeltext="mobile-number"
            type="text"
            name="mobile-number"
            placeholder="mobile-number"
            required={true}
          />
        </div>
      </Card>
    </div>
  );
};

export default ContactDetails;

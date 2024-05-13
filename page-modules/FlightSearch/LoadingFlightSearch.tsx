"use client";
import React, { FC } from "react";
import Styles from "./flightsearch.module.css";
import { Skeleton } from "@mui/material";
import "react-phone-number-input/style.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export interface LoadingFlightSearchProps {}

const LoadingFlightSearch: FC<LoadingFlightSearchProps> = ({}) => {
  return (
    <>
      <div className={Styles.commoncardLoader}>
        <Skeleton
          animation="wave"
          height={30}
          width="45%"
          style={{ marginBottom: "20px" }}
        />
        <Box>
          <Grid container spacing={3} direction="row">
            <>
              <Grid item xs={12} sm={6} lg={4} md={6} xl={4}>
                <Skeleton animation="wave" height={30} width="50%" />
                <Skeleton animation="wave" height={60} width="100%" />
              </Grid>
              <Grid item xs={12} sm={6} lg={4} md={6} xl={4}>
                <Skeleton animation="wave" height={30} width="50%" />
                <Skeleton animation="wave" height={60} width="100%" />
              </Grid>
              <Grid item xs={12} sm={6} lg={4} md={6} xl={4}>
                <Skeleton animation="wave" height={30} width="50%" />
                <Skeleton animation="wave" height={60} width="100%" />
              </Grid>{" "}
            </>

            <Grid item xs={12} sm={6} lg={4} md={6} xl={4}>
              <Skeleton animation="wave" height={30} width="50%" />
              <Skeleton animation="wave" height={60} width="100%" />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} md={6} xl={4}>
              <Skeleton animation="wave" height={30} width="50%" />
              <Skeleton animation="wave" height={60} width="100%" />
            </Grid>
          </Grid>
        </Box>
        <div className="flex justify-end mt-4 md:mt-2">
          <Skeleton
            animation="wave"
            height={70}
            width="20%"
            style={{ marginBottom: "20px" }}
          />
        </div>
      </div>
    </>
  );
};

export default LoadingFlightSearch;

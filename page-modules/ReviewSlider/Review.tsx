"use client";
import React, { FC } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/ArrowBack";
import KeyboardArrowRight from "@mui/icons-material/ArrowForward";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import DefaultProfileImage03 from "@/public/testimonial/persons4.jpeg";
import DefaultProfileImage01 from "@/public/testimonial/persons1.jpeg";
import DefaultProfileImage02 from "@/public/testimonial/persons3.jpg";

import { Card } from "@mui/material";
import Image from "next/image";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath:
      "Booking my flight with 2PH Travel was an absolute breeze! From seamless navigation on their user-friendly platform.Their response time for ticket calls was quicker . The team was courteous, helpful, and I'd use their services again for future flights. Thanks to 2PH Travel, my travel plans took off without a hitch!",
    user: "user 3",
    place: "Lahore",
    image: DefaultProfileImage01,
  },
  {
    imgPath:
      "When it comes to booking flights, 2PH Travel is my go-to choice. Their extensive selection of airlines and routes ensures that I can always find the most convenient option for my travels. Plus, their commitment to customer satisfaction shines through their responsive support team, who are always ready to assist.",
    user: "user 2",
    place: "Lahore",
    image: DefaultProfileImage02,
  },
  {
    imgPath:
      "I've tried many flight booking platforms, but none compare to the experience I've had with 2PH Travel. Their streamlined booking process makes planning my trips a breeze, and their competitive prices mean I never have to compromise on quality. Whether it's a spontaneous getaway or a meticulously planned adventure",
    user: "user 3",
    place: "Lahore",
    image: DefaultProfileImage03,
  },
];

export interface ReviewProps {}

const Review: FC<ReviewProps> = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
  return (
    <Card className="lg:flex-1 m-0 md:m-10  relative  ">
      <div>
        <Box>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step: any, index) => (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="h3"
                    className="text-md relative" // Ensure the relative positioning
                    sx={{
                      display: "block",
                      overflow: "hidden",
                      width: "100%",
                      padding: "10px",
                      fontSize: "16px",
                    }}
                  >
                    <div>
                      {" "}
                      <div className="flex flex-col items-center justify-center flex-wrap lg:flex-nowrap ">
                        <Image
                          src={step.image.src}
                          alt={step.place}
                          width={100}
                          height={30}
                          className="rounded-[10px] border"
                        />
                        <h5 className="mx-5 mt-5 ">{`"${step.imgPath}"`}</h5>
                      </div>
                    </div>
                  </Box>
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                style={
                  {
                    // borderRadius: "50%",
                    // height: "60px",
                  }
                }
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft
                    style={{
                      color:
                        activeStep === maxSteps - 1 ? undefined : "#F1241E",
                    }}
                  />
                ) : (
                  <KeyboardArrowRight
                    style={{
                      color:
                        activeStep === maxSteps - 1 ? undefined : "#F1241E",
                    }}
                  />
                )}
              </Button>
            }
            backButton={
              <Button
                // size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
                style={
                  {
                    // background: "#F1241E",
                    // borderRadius: "50%",
                    // height: "60px",
                  }
                }
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight
                    style={{
                      color: activeStep === 0 ? undefined : "#F1241E",
                    }}
                  />
                ) : (
                  <KeyboardArrowLeft
                    style={{
                      color: activeStep === 0 ? undefined : "#F1241E",
                    }}
                  />
                )}
              </Button>
            }
          />
        </Box>
      </div>
    </Card>
  );
};

export default Review;

import React, { FC } from "react";

interface GotoBackImageProps {
  fillColor?: string;
  CustomClass?: string;
}
const GotoBackImage: FC<GotoBackImageProps> = ({
  fillColor = "#6D6D6D",
  CustomClass,
}) => {
  return (
    <>
      <svg
        width="39"
        height="39"
        viewBox="0 0 39 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={CustomClass}
      >
        <path
          d="M24.3453 29.04L26.6201 26.7652L19.231 19.36L26.6201 11.9548L24.3453 9.68004L14.6653 19.36L24.3453 29.04Z"
          fill={fillColor}
        />
      </svg>
    </>
  );
};

export default GotoBackImage;

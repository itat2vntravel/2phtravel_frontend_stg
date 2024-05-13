import React, { FC } from "react";

interface GotoFirstImageProps {
  fillColor?: string;
  CustomClass?: string;
}
const GotoFirstImage: FC<GotoFirstImageProps> = ({
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
          d="M28.3795 29.04L30.6543 26.7652L23.2652 19.36L30.6543 11.9548L28.3795 9.68004L18.6995 19.36L28.3795 29.04Z"
          fill={fillColor}
        />
        <path
          d="M17.7467 29.04L20.0215 26.7652L12.6324 19.36L20.0215 11.9548L17.7467 9.68004L8.06668 19.36L17.7467 29.04Z"
          fill={fillColor}
        />
      </svg>
    </>
  );
};

export default GotoFirstImage;

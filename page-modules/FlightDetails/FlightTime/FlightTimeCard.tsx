import React, { FC } from "react";
import { RiFlightTakeoffLine } from "react-icons/ri";

export interface FlightCardProps {
  departureAirport: string;
  destinationAirport: string;
}
const FlightTimeCard: FC<FlightCardProps> = async ({
  departureAirport,
  destinationAirport,
}) => {
  const duration = "535";
  const lastTicketDate = "03/25/2024";

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex justify-between items-center p-4 rounded-lg">
        <div className="flex flex-col items-center">
          <h2 className="text-[#3966AF] uppercase">{departureAirport}</h2>
          <h2 className="text-[#3966AF] uppercase">International Airport</h2>
        </div>
        <div className="flex items-center">
          <div className="items-center text-[#3966AF]  mx-5">
            <RiFlightTakeoffLine size={30} />

          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-[#3966AF] uppercase">{destinationAirport} </h2>
          <h2 className="text-[#3966AF] uppercase">International Airport</h2>
        </div>
      </div>
    </div>
  );
};
export default FlightTimeCard;

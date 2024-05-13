"use client";
import GetUserBookingStatus from "@/action/booknow/GetuserBookingStatus";
import React, { useEffect, useState } from "react";
import airports from "@nwpr/airport-codes";
import GotoBackImage from "@/components/Images/GotoBackImage";
import GotoFirstImage from "@/components/Images/GotoFirstImage";

export interface BookingStatusSectionprops {
  userId: string;
}
interface FlightDataprops {
  airport_name: string;
  iata: string;
  country_code: string;
  city_name: string;
  location: string;
  continent: string;
}

interface TripInfo {
  date: string;
  departure: string;
  destination: string;
}
interface ItemType {
  booking_code: string;
  created_at: string;
  status: string;
  trip_info: [];
}
const BookingStatusSection: React.FC<BookingStatusSectionprops> = ({
  userId,
}) => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const ItemsPerPage = 5;
  const MaxVisiblePages = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalItems: number = data?.length || 0;
  const totalPages: number = Math.ceil(totalItems / ItemsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const goToFirstPage = () => {
    setCurrentPage(1);
  };
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  useEffect(() => {
    GetUserBookingStatusApi(userId);
  }, [userId]);
  const GetUserBookingStatusApi = async (userId: string) => {
    const req = {
      userId: userId,
    };
    try {
      const response = await GetUserBookingStatus(req);

      setData(response.results);
      setloading(false);
      // return response;
    } catch (error) {
      console.error("Banner API request failed:", error);
      throw error;
    }
  };
  const renderItems = () => {
    const startIndex: number = (currentPage - 1) * ItemsPerPage;
    const endIndex: number = Math.min(startIndex + ItemsPerPage, totalItems);
    const itemsToRender: ItemType[] | undefined = data?.slice(
      startIndex,
      endIndex
    );

    return itemsToRender?.map((item, index: number) => (
      <div key={index}>
        <>
          <div className="flex w-fit	 mx-2" key={index}>
            <p className="text-lg p-2 col-span-1 w-[50px] ">
              {startIndex + index + 1}
            </p>
            <p className="text-lg text-start p-2 col-span-2 w-[300px] ">
              {item.booking_code}
            </p>
            <p className="text-lg p-2  col-span-2 w-[200px] ">
              {item.created_at.slice(0, 10)}
            </p>
            <p className="text-lg p-2  col-span-2 w-[200px] data">
              {item.trip_info.map((trip: TripInfo, index: number) => (
                <p className="text-lg p-2 col-span-2 w-[200px]" key={index}>
                  {
                    airports.find(
                      (airport) =>
                        airport.iata ===
                        trip.departure?.split("[")[1]?.replace("]", "")
                    )?.city
                  }
                </p>
              ))}
            </p>
            <p className="text-lg p-2  col-span-2 w-[200px] data">
              {item.trip_info.map((trip: TripInfo, index: number) => (
                <p className="text-lg p-2 col-span-2 w-[200px]" key={index}>
                  {
                    airports.find(
                      (airport) =>
                        airport.iata ===
                        trip.destination?.split("[")[1]?.replace("]", "")
                    )?.city
                  }
                </p>
              ))}
            </p>
            <p className="text-lg p-2  col-span-2 w-[200px] data">
              {item.trip_info.map((trip: TripInfo, index: number) => (
                <p className="text-lg p-2 col-span-2 w-[250px]" key={index}>
                  {trip.date}
                </p>
              ))}
            </p>

            <p className="text-lg p-2  col-span-2 w-[200px] ">
              <button
                className={`p-2 ${
                  item.status === "Pending"
                    ? "bg-[#F9F871]"
                    : item.status === "Completed"
                    ? "bg-[#83DA7E]"
                    : item.status === "Confirmed"
                    ? "bg-[#142D53] text-white"
                    : item.status === "Canceled"
                    ? "bg-[#ec2719] text-white"
                    : "bg-[#877555] text-white "
                }  rounded-md`}
              >
                {" "}
                {item.status}
              </button>
            </p>
          </div>
        </>
      </div>
    ));
  };
  const renderPagination = () => {
    const paginationItems: JSX.Element[] = [];
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > MaxVisiblePages) {
      const halfVisiblePages = Math.floor(MaxVisiblePages / 2);
      startPage = Math.max(1, currentPage - halfVisiblePages);
      endPage = Math.min(totalPages, startPage + MaxVisiblePages - 1);

      if (endPage - startPage < MaxVisiblePages - 1) {
        startPage = Math.max(1, endPage - MaxVisiblePages + 1);
      }

      if (startPage < 1) {
        // paginationItems.push(
        //   <button
        //     key="first"
        //     onClick={goToFirstPage}
        //     className="mx-1 px-3 py-1  rounded-[10px]  border-[#DCDCDC] border-[2px]"
        //   >
        //     1
        //   </button>
        // );
        if (startPage > 2) {
          paginationItems.push(
            <span
              key="ellipsis-start"
              className="mx-1 px-3 py-1 rounded-[10px]  border-[#DCDCDC] border-[2px]"
            >
              ...
            </span>
          );
        }
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`mx-1 px-3 py-1 rounded-[10px] w-[44px] h-[44px]  border-[#DCDCDC] border-[2px] ${
            i === currentPage ? "bg-[#152D54] text-white" : "bg-white "
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationItems.push(
          <span
            key="ellipsis-end"
            className="mx-1 px-3 py-1 rounded-[10px]  border-[#DCDCDC] border-[2px] bg-white"
          >
            ...
          </span>
        );
      }
      paginationItems.push(
        <button
          key="last"
          onClick={goToLastPage}
          className="mx-1 px-3 py-1 rounded-[10px]  border-[#DCDCDC] border-[2px]"
        >
          {totalPages}
        </button>
      );
    }
    return { paginationItems, endPage };
  };
  const { paginationItems, endPage } = renderPagination();

  return (
    <>
      <div className=" bg-white shadow-md rounded-lg overflow-hidden">
        <div className=" bg-[url(/Login/clip16.png)] h-[30vh] bg-cover   text-white px-4 py-5 sm:px-6">
          <div className="flex flex-col justify-end h-full ">
            <h3 className="text-lg font-semibold leading-6">
              Order Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm">
              Booking Status of the user.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 overflow-x-auto">
          <div className="flex w-fit	 mx-2  bg-gray-100 ">
            <p className="text-lg p-2 col-span-1 w-[50px] ">NO</p>
            <p className="text-lg text-start p-2 col-span-2 w-[300px] ">
              Book code
            </p>
            <p className="text-lg p-2  col-span-2 w-[200px] ">Booking date</p>
            <p className="text-lg p-2  col-span-2 w-[200px] ">Departure</p>
            <p className="text-lg p-2  col-span-2 w-[200px] ">Destination</p>
            <p className="text-lg p-2  col-span-2 w-[250px] ">Date</p>
            <p className="text-lg p-2  col-span-2 w-[200px] ">Status</p>
          </div>
          {loading ? (
            "Kindly wait for the data to load."
          ) : (
            <>
              {renderItems()}

              {data.length == 0 && (
                <h2 className="p-3 text-lg">
                  No Booking results available at the moment.{" "}
                </h2>
              )}
            </>
          )}
        </div>
      </div>
      <div className=" flex flex-wrap gap-[8px] md:gap-0 justify-center mx-[10px] md:mx-0 my-[20px]">
        {totalPages > 1 && (
          <>
            <button
              onClick={goToFirstPage}
              className="mx-1 p-1 w-[44px] h-[44px] rounded-[10px] border-[#DCDCDC] border-[2px]"
              disabled={currentPage === 1}
            >
              <GotoFirstImage CustomClass="w-[26px] h-auto" />
            </button>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="mx-1 p-1 w-[44px] h-[44px] rounded-[10px] border-[#DCDCDC] border-[2px]"
            >
              <GotoBackImage CustomClass="w-[26px] h-auto" />
            </button>
            {paginationItems}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || currentPage === endPage}
              className="mx-1 p-1 w-[44px] h-[44px]  rounded-[10px] border-[#DCDCDC] border-[2px]"
            >
              <div className="rotate-180">
                <GotoBackImage CustomClass="w-[26px] h-auto" />
              </div>
            </button>
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages || currentPage === endPage}
              className="mx-1 p-1 w-[44px] h-[44px] flex items-center rounded-[10px] border-[#DCDCDC] border-[2px]"
            >
              <div className="rotate-180">
                <GotoFirstImage CustomClass="w-[26px] h-auto" />
              </div>
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default BookingStatusSection;

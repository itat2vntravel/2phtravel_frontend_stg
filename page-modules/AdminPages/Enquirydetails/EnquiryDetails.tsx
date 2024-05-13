"use client";
import React, { useEffect, useState } from "react";
// import ClearIcon from "@mui/icons-material/Clear";
import GotoBackImage from "@/components/Images/GotoBackImage";
import GotoFirstImage from "@/components/Images/GotoFirstImage";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import { MdClear } from "react-icons/md";
import ModalPopup from "@/components/Modal/deletepopup";
import DeleteEnquriy from "@/action/Admin/enquiry/DeleteEnquiry";
import GetEnquirySearchResults from "@/action/Admin/enquiry/GetEnquirySearchResult";
import Image from "next/image";
import load from "@/public/gif/AWCGptH8JE.gif";
import { useMediaQuery } from "@mui/material";
import { formUrlQuery } from "@/utils/formUrlQuery";
interface BookingInterace {
  userdata: {
    count: number;
    next: string;
    previous: string;
    results: [
      {
        enquiry_id: number;
        name: string;
        phone_number: string;
        msg: string;

        email: string;

        created_at: string;
        updated_at: string;
      }
    ];
  };
}

const EnquiryDetails: React.FC<BookingInterace> = ({ userdata }) => {
  const [searchinputValue, setSearchInputValue] = useState<string>("");
  const ItemsPerPage = 10;
  const MaxVisiblePages = 3;
  const SearchParams = useSearchParams();
  const pagecount = SearchParams.get("page" || "1");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [Deleteopen, setDeleteopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const id = SearchParams.get("id") || "";
  const [filterdCount, setFilteredCount] = useState(0);
  const [filteredData, setFilterData] = useState(userdata.results);
  const [DeleteData, setDeleteData] = useState<{
    enquiry_id: number;
    name: string;
    phone_number: string;
    msg: string;
    email: string;
  }>();
  const router = useRouter();

  useEffect(() => {
    setFilterData(userdata.results);
  }, [userdata]);

  const matches = useMediaQuery("(max-width:1025px)");
  // const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (matches === false) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["open"],
      });
      router.push(newUrl, { scroll: false });
    }
  }, [matches, router, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const totalItems: number = userdata.count;
  const totalPages: number = Math.ceil(totalItems / ItemsPerPage);
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    router.push(`?page=${pageNumber}`);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    router.push(`?page=${currentPage - 1}`);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    router.push(`?page=${currentPage + 1}`);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
    router.push("/admin/enquiry-form");
  };

  const handleDeleteBanner = () => {
    setDeleteopen(true);
  };
  const startIndex: number = (currentPage - 1) * ItemsPerPage;
  const endIndex: number = Math.min(startIndex + ItemsPerPage, totalItems);

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
    return paginationItems;
  };

  // Delete Enquiry Api
  const DeleteBannerApi = async (deleteId: number) => {
    setLoading(true);
    const response = await DeleteEnquriy(deleteId);

    reactHotToast.success("Enquiry Deleted Successfully", {
      position: "top-right",
      duration: 1000,
    });

    setTimeout(() => {
      setLoading(false);
      setDeleteopen(false);
    }, 1000);
    router.push("/admin/enquiry-form");
  };

  const handleSearchApi = async () => {
    setLoading(true);
    if (searchinputValue === "") {
      setFilterData(userdata.results);
      setFilteredCount(userdata.count);
      setLoading(false);
    } else {
      const SearchFilterData = await GetEnquirySearchResults(searchinputValue);
      setFilteredCount(SearchFilterData.count);
      setFilterData(SearchFilterData.results);
      setLoading(false);
    }
  };

  return (
    <div className=" pt-16 xl:pl-16 lg:pl-4 pl-5 xl:pr-16 lg:pr-4 pr-5 w-full">
      <div>
        <div className="mb-8">
          <div className="flex justify-between items-center flex-wrap">
            <h1>Enquiry User Details</h1>
            <div className="relative flex items-center gap-3">
              <input
                type={"text"}
                name={"search"}
                className={`bg-white  text-black rounded-[5px] p-4 focus:outline-none border border-[#DADADA] h-[40px] md:h-[35px] md:w-[300px] w-[200px]`}
                placeholder={"Search Now"}
                value={searchinputValue}
                onChange={handleChange}
                autoComplete="off"
                // onChange={inputValue}
              />

              <IoIosSearch
                onClick={() => handleSearchApi()}
                className="absolute top-[8px] cursor-pointer right-9 left-30 text-xl"
              />
              {searchinputValue ? (
                <MdClear
                  className="text-customRed cursor-pointer "
                  onClick={() => {
                    setFilteredCount(0);
                    setFilterData(userdata.results);
                    setSearchInputValue("");
                  }}
                />
              ) : (
                <MdClear
                  className="text-customRed cursor-pointer invisible "
                  onClick={() => {
                    setFilteredCount(0);
                    setFilterData(userdata.results);
                    setSearchInputValue("");
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table
            className=" divide-y-2  divide-gray-200 shadow-md bg-white text-sm mb-10 w-full"
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead className=" bg-slate-400 ">
              <tr>
                <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Name
                </th>
                <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Submitted at
                </th>

                <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Email
                </th>

                <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Phone number
                </th>
                <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Description
                </th>
                <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            {filteredData && loading === false ? (
              filteredData.map((res, index) => (
                <tbody key={index}>
                  <tr key={index} className="leading-7">
                    <td className="text-left  px-4 py-2 ">
                      {res.name ? res.name : "-"}
                    </td>
                    <td className="text-left  px-4 py-2 ">
                      {`${res?.created_at.slice(8, 10)}-${res?.created_at.slice(
                        5,
                        7
                      )}-${res?.created_at.slice(0, 4)}`}
                    </td>

                    <td className="text-left  px-4 py-2 ">
                      {" "}
                      <a
                        href={`mailto:${res.email ? res.email : "-"}`}
                        className="cursor-pointer"
                      >
                        {res.email ? res.email : "-"}
                      </a>
                    </td>
                    <td className="text-left  px-4 py-2 ">
                      {res.phone_number ? res.phone_number : "-"}
                    </td>
                    <td
                      className="text-left max-w-md text-wrap px-4 py-2 "
                      style={{ overflowWrap: "break-word" }}
                    >
                      {res.msg ? res.msg : "-"}
                    </td>
                    <td className="text-left  px-4 py-2 ">
                      {" "}
                      <button
                        className="text-red-600 cursor-pointer "
                        onClick={() => {
                          handleDeleteBanner();
                          setDeleteData({
                            enquiry_id: res.enquiry_id,
                            name: res.name,
                            phone_number: res.phone_number,
                            msg: res.msg,
                            email: res.email,
                          });
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))
            ) : loading ? (
              <div className="h-full w-[100%] flex justify-center">
                <Image
                  src={load}
                  width={100}
                  height={100}
                  alt="loader"
                  className="w-[950px] h-[450px]  rounded-full"
                />
              </div>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={12} className="text-center py-4">
                    No data available
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>

      <div className="mt-3 mb-5 flex flex-wrap justify-center">
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
            className="mx-1 p-1 w-[44px] h-[44px] rounded-[10px] border-[#DCDCDC] border-[2px]"
            disabled={currentPage === 1}
          >
            <GotoBackImage CustomClass="w-[26px] h-auto" />
          </button>
          {renderPagination()}
          <button
            onClick={goToNextPage}
            className="mx-1 p-1 w-[44px] h-[44px] rounded-[10px] border-[#DCDCDC] border-[2px]"
            disabled={currentPage === totalPages}
          >
            <div className="rotate-180">
              <GotoBackImage CustomClass="w-[26px] h-auto" />
            </div>
          </button>
          <button
            onClick={goToLastPage}
            className="mx-1 p-1 w-[44px] h-[44px] flex items-center rounded-[10px] border-[#DCDCDC] border-[2px]"
            disabled={currentPage === totalPages}
          >
            <div className="rotate-180">
              <GotoFirstImage CustomClass="w-[26px] h-auto" />
            </div>
          </button>
        </>
      </div>
      {Deleteopen && DeleteData && (
        <ModalPopup
          open={Deleteopen}
          setopen={setDeleteopen}
          note={""}
          deletename={DeleteData.name}
          handleDelete={() => DeleteBannerApi(DeleteData.enquiry_id)}
          loading={loading}
        />
      )}
      <Toaster />
    </div>
  );
};

export default EnquiryDetails;

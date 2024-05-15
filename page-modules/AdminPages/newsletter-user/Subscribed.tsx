"use client";
import React, { useEffect, useState } from "react";
// import ClearIcon from "@mui/icons-material/Clear";
import GotoBackImage from "@/components/Images/GotoBackImage";
import GotoFirstImage from "@/components/Images/GotoFirstImage";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import ModalPopup from "@/components/Modal/deletepopup";
import DeleteNewsletter from "@/action/Admin/Newsletter/DeleteNewsletter";
import GetNewsLetterSearchResult from "@/action/Admin/Newsletter/SearchNewsletter";
import Image from "next/image";
import load from "@/public/gif/AWCGptH8JE.gif";
import { IoIosSearch } from "react-icons/io";
import { MdClear } from "react-icons/md";
import { useMediaQuery } from "@mui/material";
import { formUrlQuery } from "@/utils/formUrlQuery";
interface BookingInterace {
  userdata: {
    count: number;
    next: string;
    previous: string;
    results: [
      {
        newsletter_id: number;

        email: string;
        is_subscribed: string;

        created_at: string;
        updated_at: string;
      }
    ];
  };
}

const SubscribedDetails: React.FC<BookingInterace> = ({ userdata }) => {
  const [searchinputValue, setSearchInputValue] = useState<string>("");
  const ItemsPerPage = 10;
  const MaxVisiblePages = 3;
  const SearchParams = useSearchParams();
  const pagecount = SearchParams.get("page" || "");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [DeleteData, setDeleteData] = useState<{
    newsletter_id: number;
    email: string;
  }>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [Deleteopen, setDeleteopen] = useState(false);
  const [filterdCount, setFilteredCount] = useState(0);
  const [filteredData, setFilterData] = useState(userdata.results);

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

  useEffect(() => {
    setFilterData(userdata.results);
  }, [userdata]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const handleSearchApi = async () => {
    setLoading(true);
    if (searchinputValue === "") {
      setFilterData(userdata.results);
      setFilteredCount(userdata.count);
      setLoading(false);
    } else {
      const SearchFilterData = await GetNewsLetterSearchResult(
        searchinputValue
      );
      setFilteredCount(SearchFilterData.count);
      setFilterData(SearchFilterData.results);
      setLoading(false);
    }
  };
  const totalItems: number = filterdCount !== 0 ? filterdCount : userdata.count;
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
    router.push("/admin/subscribed-newsletter");
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

  const handleDeleteBanner = () => {
    setDeleteopen(true);
  };

  // Delete Enquiry Api
  const DeleteBannerApi = async (deleteId: number) => {
    setLoading(true);

    const response = await DeleteNewsletter(deleteId);

    reactHotToast.success("Newsletter details Deleted Successfully", {
      position: "top-right",
      duration: 1000,
    });

    setTimeout(() => {
      setLoading(false);
      setDeleteopen(false);
    }, 1000);

    router.push("/admin/subscribed-newsletter");
  };

  return (
    <div className=" pt-16 xl:pl-16 lg:pl-4 pl-5 xl:pr-16 lg:pr-4 pr-5 w-full">
      <div>
        <div className="mb-8">
          <div className="flex justify-between items-center flex-wrap">
            <h1>Newsletter Subscribed User Details</h1>
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
                  S.No
                </th>
                <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Subscription Date
                </th>

                <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Email
                </th>
                <th className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Subscribe
                </th>
                <th className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            {filteredData && loading === false ? (
              filteredData?.map((res, index) => (
                <tbody key={index}>
                  <tr key={index} className="leading-7">
                    <td className="text-left  px-4 py-2  ">{index + 1}</td>
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

                    <td className="text-center flex justify-center  px-4 py-2 ">
                      {JSON.stringify(res.is_subscribed) === "false" ? (
                        <p className="p-1 px-6 bg-[#FF7B7B] rounded-xl text-white w-fit">
                          UnSubscribed
                        </p>
                      ) : (
                        <p className="p-1 px-8 bg-[#BAFFD3] rounded-xl text-black w-fit">
                          Subscribed
                        </p>
                      )}
                    </td>
                    <td className="text-left  px-4 py-2 ">
                      {" "}
                      <button
                        className="text-red-600 cursor-pointer "
                        onClick={() => {
                          handleDeleteBanner();
                          setDeleteData({
                            newsletter_id: res.newsletter_id,

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
                  unoptimized
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
            disabled={currentPage === 1}
            className="mx-1 p-1 w-[44px] h-[44px] rounded-[10px] border-[#DCDCDC] border-[2px]"
          >
            <GotoBackImage CustomClass="w-[26px] h-auto" />
          </button>
          {renderPagination()}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="mx-1 p-1 w-[44px] h-[44px]  rounded-[10px] border-[#DCDCDC] border-[2px]"
          >
            <div className="rotate-180">
              <GotoBackImage CustomClass="w-[26px] h-auto" />
            </div>
          </button>
          <button
            onClick={goToLastPage}
            disabled={currentPage === totalPages}
            className="mx-1 p-1 w-[44px] h-[44px] flex items-center rounded-[10px] border-[#DCDCDC] border-[2px]"
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
          deletename={DeleteData.email}
          handleDelete={() => DeleteBannerApi(DeleteData.newsletter_id)}
          loading={loading}
        />
      )}
      <Toaster />
    </div>
  );
};

export default SubscribedDetails;

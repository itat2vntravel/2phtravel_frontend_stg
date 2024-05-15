"use client";
import React, { ChangeEvent, useState } from "react";
// import ClearIcon from "@mui/icons-material/Clear";
import { MdClear } from "react-icons/md";

import { PulseLoader } from "react-spinners";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import DeleteBookNow from "@/action/booknow/DeleteBookNow";
import { useRouter, useSearchParams } from "next/navigation";
import GotoBackImage from "@/components/Images/GotoBackImage";
import EditBookNow from "@/action/booknow/EditBookNow";
import DownLoadButton from "../DownloadButton/DownLoadButton";
import GotoFirstImage from "@/components/Images/GotoFirstImage";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
// import userdatas from "@/user.json";
import { BiLogoGmail } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import * as XLSX from "xlsx";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";
import ModalPopup from "@/components/Modal/deletepopup";

interface BookingInterace {
  bookingData: {
    count: number;
    next: string;
    previous: string;
    results: [
      {
        booking_id: number;
        booking_code: string;
        status: string;
        contact_email: string;
        contact_name: string;
        contact_phone: string;
        from_location: string;
        to_location: string;
        departure_date: string;
        return_date: string;
        trip_info: any;
      }
    ];
  };
  userdata: [
    {
      user_id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      gender: string;
      is_email_verified: string;
      auth_provider: string;
      districts: string;
      address: string;
      city: string;
      created_at: string;
      UserData: string;
    }
  ];
}

interface UserDataInfo {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  is_email_verified: string;
  auth_provider: string;
  districts: string;
  address: string;
  city: string;
  created_at: string;
}
interface TripInfo {
  date: string;
  departure: string;
  destination: string;
}
const columns: any = [
  {
    field: "id",
    headerName: "S.No",
    width: 70,
    headerClassName: "bg-slate-400 font-main font-semibold",
    cellClassName: "font-main",
  },
  {
    field: "CreateDate",
    headerName: "Create Date",
    width: 130,
    headerClassName: "bg-slate-400 font-main font-semibold",
    cellClassName: "font-main",
    sortable: false,
    menubar: true,
  },
  {
    field: "FirstName",
    headerName: "First Name",
    width: 130,
    headerClassName: "bg-slate-400 font-main font-semibold",
    cellClassName: "font-main",
    sortable: false,
    menubar: true,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 90,
    headerClassName: "bg-slate-400 font-main font-semibold",
    cellClassName: "font-main",
    sortable: false,
    menubar: true,
  },
  {
    field: "Email",
    headerName: "Email",
    type: "email",
    width: 250,
    cellClassName: "cursor-pointer font-main",
    headerClassName: "bg-slate-400 font-main font-semibold",
    renderCell: (params: any) => (
      <a href={`mailto:${params.value ? params.value : "-"}`} target="_blank">
        {/* {params.value} */}
        {params.value ? params.value : "-"}
        {/* {params.value ? params.value.split(':')[1].trim() : ""} */}
      </a>
    ),
  },
  {
    field: "PhoneNo",
    headerName: "Phone No",
    width: 200,
    headerClassName: "bg-slate-400 font-main font-semibold",
    cellClassName: "font-main",
    sortable: false,
    menubar: true,
  },
  {
    field: "Gender",
    headerName: "Gender",
    headerClassName: "bg-slate-400 font-main font-semibold",
    cellClassName: "font-main",
    sortable: false,
    menubar: true,
  },
  {
    field: "Address",
    headerName: "Address",
    headerClassName: "bg-slate-400 font-main font-semibold",
    cellClassName: "font-main",
    sortable: false,
    menubar: true,
  },
  {
    field: "Districts",
    headerName: "Districts",
    headerClassName: "bg-slate-400 font-main font-semibold",
    cellClassName: "font-main",
    sortable: false,
    menubar: true,
  },
  {
    field: "City",
    headerName: "City",
    headerClassName: "bg-slate-400 font-main font-semibold",
    cellClassName: "font-main",
    sortable: false,
    menubar: true,
  },
  {
    field: "LoginThrough",
    headerName: "Login Through",
    headerClassName: "bg-slate-400 font-main font-semibold",
    cellClassName: "font-main",
    sortable: false,
    menubar: true,
  },
];

const UserDashboard: React.FC<BookingInterace> = ({
  bookingData,
  userdata,
}) => {
  const [searchinputValue, setSearchInputValue] = useState<string>("");

  const SearchParams = useSearchParams();
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const id = SearchParams.get("id") || "";
  const [Status, setStatus] = useState("");
  const currentYear = new Date().getFullYear();
  const defaultStartDate = `${currentYear}-01-01`;
  const defaultEndDate = `${currentYear}-12-31`;

  const [Datevalue, setDateValue] = useState<DateValueType>({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });
  const [selectedAuthProvider, setSelectedAuthProvider] =
    useState<string>("All");

  const handleAuthProviderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAuthProvider(event.target.value);
  };
  const filteredData = userdata
    .filter(
      (user) =>
        user.first_name
          .toLowerCase()
          .includes(searchinputValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchinputValue.toLowerCase()) ||
        (user.city &&
          user.city.toLowerCase().includes(searchinputValue.toLowerCase()))
    )
    .filter(
      (user) =>
        (selectedAuthProvider === "Guess User" && !user.auth_provider) ||
        selectedAuthProvider === "All" ||
        (user.auth_provider &&
          user.auth_provider.toLowerCase() ===
            selectedAuthProvider.toLowerCase())
    )
    .filter(
      (user) =>
        user.first_name
          .toLowerCase()
          .includes(searchinputValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchinputValue.toLowerCase()) ||
        (user.city &&
          user.city.toLowerCase().includes(searchinputValue.toLowerCase()))
    )
    .filter((user) => {
      if (Datevalue?.startDate && Datevalue.endDate) {
        const userDate = new Date(user.created_at);
        const startDate = new Date(Datevalue.startDate);
        const endDate = new Date(Datevalue.endDate);
        // Set time of startDate and endDate to start and end of the day
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        return userDate >= startDate && userDate <= endDate;
      }
      return true; // If no date range is selected, include all data
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    });
  const ItemsPerPage = 10;
  const MaxVisiblePages = 4;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalItems: number = filteredData?.length || 0;
  const totalPages: number = Math.ceil(totalItems / ItemsPerPage);
  const startIndex: number = (currentPage - 1) * ItemsPerPage;
  const endIndex: number = Math.min(startIndex + ItemsPerPage, totalItems);
  const itemsToRender: UserDataInfo[] = filteredData.slice(
    startIndex,
    endIndex
  );

  const rows =
    itemsToRender?.length > 0
      ? itemsToRender.map((res, index) => ({
          id: startIndex + index + 1,
          CreateDate: res?.created_at?.slice(0, 10) || "-",
          FirstName: res.first_name || "-",
          lastName: res.last_name || "-",
          Email: res.email ? (
            <a
              href={`mailto:${res.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {res.email}
            </a>
          ) : (
            "-"
          ),
          PhoneNo: res.phone_number || "-",
          Gender: res.gender || "-",
          Address: res.address || "-",
          Districts: res.districts || "-",
          City: res.city || "-",
          LoginThrough: res.auth_provider || "-",
        }))
      : [
          {
            id: 0,
            CreateDate: "-",
            FirstName: "-",
            lastName: "-",
            Email: "No data available",
            PhoneNo: "-",
            Gender: "-",
            Address: "-",
            Districts: "-",
            City: "-",
            LoginThrough: "-",
          },
        ];

  // Delete Banner Api
  const DeleteBannerApi = async () => {
    setLoading(true);
    const deleteId = parseInt(id);
    const response = await DeleteBookNow(deleteId);
    reactHotToast.success("Booking Deleted Successfully", {
      position: "top-right",
      duration: 1000,
    });

    setTimeout(() => {
      setLoading(false);
      setDeleteOpen(false);
    }, 1000);
    router.push("/admin/dashboard");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleDeleteBanner = () => {
    setDeleteOpen(true);
  };

  const renderItems = () => {
    const startIndex: number = (currentPage - 1) * ItemsPerPage;
    const endIndex: number = Math.min(startIndex + ItemsPerPage, totalItems);
    const itemsToRender: UserDataInfo[] = filteredData.slice(
      startIndex,
      endIndex
    );

    return (
      <>
        {itemsToRender.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={12} className="text-center py-4">
                No data available
              </td>
            </tr>
          </tbody>
        ) : (
          itemsToRender?.map((res, index) => (
            <tbody key={index}>
              <tr key={index} className="leading-7">
                <td className="text-left  px-4 py-2  ">
                  {startIndex + index + 1}
                </td>
                <td className="text-left  px-4 py-2 ">
                  {res?.created_at.slice(0, 10)}
                </td>

                <td className="text-left  px-4 py-2 ">
                  {res.first_name ? res.first_name : "-"}
                </td>
                <td className="text-wrap break-words text-left  px-4 py-2  ">
                  {res.last_name ? res.last_name : "-"}
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
                <td className="text-left  px-4 py-2 w-[200px]">
                  {res.phone_number ? res.phone_number : "-"}
                </td>
                <td className="text-left  px-4 py-2 ">
                  {res.gender ? res.gender : "-"}
                </td>
                <td className="text-left  px-4 py-2 ">
                  {res.address ? res.address : "-"}
                </td>
                <td className="text-left  px-4 py-2 ">
                  {res.districts ? res.districts : "-"}
                </td>
                <td className="text-left  px-4 py-2 ">
                  {res.city ? res.city : "-"}
                </td>
                <td className="text-left  px-4 py-2 ">
                  {res.auth_provider ? res.auth_provider : "-"}
                </td>
              </tr>
            </tbody>
          ))
        )}
      </>
    );
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

  const handleStatus = async (e: any, booking_id: number) => {
    setStatus(e.target.value);
    const formData = new FormData();
    formData.append("status", e.target.value);
    const response = await EditBookNow(booking_id, formData);
    reactHotToast.success("Booking Status Updated Successfully", {
      position: "top-right",
      duration: 1000,
    });
  };

  const handleValueChange = (newValue: any) => {
    setDateValue(newValue);
  };

  const handleDownload = () => {
    setIsOpen(false);
    const typedUserdata: { [key: string]: string }[] = filteredData.filter(
      (res) => res.email !== "admin@2phtravels.com"
    );

    const header = Object.keys(typedUserdata[0]);
    const wsData: any[][] = [header];

    typedUserdata.forEach((user) => {
      const rowData = header.map((key) => user[key]);
      wsData.push(rowData);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    ws["!cols"] = header.map((_) => ({ wch: 38 }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Filterdata");

    XLSX.writeFile(wb, "Filterdata.xlsx");
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className=" pt-16 xl:pl-16 lg:pl-4 pl-5 xl:pr-16 lg:pr-4 pr-5 w-full">
      <div>
        <div className="mb-8">
          <div className="flex justify-between flex-wrap items-center">
            <h1 className="mb-7 md:mb-4"> User Details Histroy</h1>
            <div
              className="relative inline-block text-left"
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
            >
              <div>
                <button
                  type="button"
                  // onClick={toggleMenu}
                  className="inline-flex bg-[#142D53] justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-[#fff]  focus:outline-none focus:ring-2 "
                >
                  Download as Excel file
                  <span
                    className={`ml-2 transition-transform  ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    &#9660; {/* Down arrow character */}
                  </span>
                </button>
              </div>

              {isOpen && (
                <div
                  className="origin-top-right absolute right-0 z-[20]
                mt-0 w-42 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={handleDownload}
                    >
                      Filtered Data
                    </button>
                    <div onClick={() => setIsOpen(false)}>
                      <DownLoadButton
                        type="button"
                        text="All UserData"
                        userdata={userdata}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center">
            <div className="mt-[10px]">
              <input
                type={"text"}
                name={"search"}
                className={`bg-white  text-black rounded-[5px] p-4 focus:outline-none border border-[#DADADA] h-[40px] md:h-[35px] w-[300px]`}
                placeholder={"Search Now"}
                value={searchinputValue}
                onChange={handleChange}
                // onChange={inputValue}
              />
            </div>
            <div className="flex  items-center gap-[10px] ">
              <Datepicker
                placeholder={"Select Date"}
                showFooter={false}
                showShortcuts={true}
                primaryColor={"blue"}
                inputClassName={`bg-white w-full rounded-[5px] mt-[10px] p-3 focus:outline-none border border-[#DADADA] h-[40px] md:h-[40px] `}
                value={Datevalue}
                onChange={handleValueChange}
              />
              <div>
                {/* <label htmlFor="authProvider">Select Auth Provider:</label> */}
                <select
                  id="authProvider"
                  name="authProvider"
                  value={selectedAuthProvider}
                  onChange={handleAuthProviderChange}
                  className="block appearance-none w-[100px] mt-[10px] bg-white border border-gray-300 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="All">All</option>
                  <option value="Guess User">Guess User</option>
                  <option value="GOOGLE">GOOGLE</option>
                  <option value="EMAIL">EMAIL </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooterPagination
            hideFooter
          />
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
        </div>

        {deleteOpen && (
          <ModalPopup
            open={deleteOpen}
            setopen={setDeleteOpen}
            note={""}
            //   deletename={DeleteData.email}
            handleDelete={DeleteBannerApi}
            loading={loading}
          />
        )}
      </div>

      <Toaster />
    </div>
  );
};

export default UserDashboard;

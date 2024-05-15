"use client";
import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import GotoFirstImage from "@/components/Images/GotoFirstImage";
import GotoBackImage from "@/components/Images/GotoBackImage";
import CloseIcon from "@mui/icons-material/Close";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import { FaDownload } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

import {
  Dialog,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  useMediaQuery,
} from "@mui/material";
import DeleteBookNow from "@/action/booknow/DeleteBookNow";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { MdOutlineFlight } from "react-icons/md";
import EditBookNow from "@/action/booknow/EditBookNow";
import Image from "next/image";
import NotFoundImage from "@/public/notfound/pagenotfound.webp";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ModalPopup from "@/components/Modal/deletepopup";
import * as XLSX from "xlsx";
import DownloadData from "@/action/Admin/Download/DownloadData";
import { formUrlQuery } from "@/utils/formUrlQuery";
import BookingDetails from "./BookingDetails";
import useUserBookingData from "@/store/UserBookingData";

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
        trip_type: string;
        airline_name: string;
        contact_email: string;
        contact_name: string;
        contact_phone: string;
        from_location: string;
        to_location: string;
        departure_date: string;
        return_date: string;
        trip_info: any;
        card: any;
        passenger: any;
        payment_type: string;
        created_at: string;
        page: string;
      }
    ];
  };
}

interface Booking {
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
  created_at: string;
  page: string;
  trip_type: string;
  airline_name: string;
  payment_type: string;
  card: any;
  passenger: any;
}

const AdminDashborad: React.FC<BookingInterace> = ({ bookingData }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [DownloadanchorEl, setDownloadAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const Download = Boolean(DownloadanchorEl);
  const SearchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [TripInfo, setTripInfo] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedPage, setSelectedPage] = useState("");
  const [SelectedTrips, setSelectedTrips] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);
  const id = SearchParams.get("id") || "";
  const [filter, setFilter] = useState("all");

  const [filteredMembers, setFilteredMembers] = useState<Booking[]>([]);

  const [responseData, setResponseData] = useState<Booking | null>(null);
  const { UserBookingData } = useUserBookingData((state) => state);
  const ItemsPerPage = 10;
  const MaxVisiblePages = 3;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalItems: number = bookingData.count;
  const totalPages: number = Math.ceil(totalItems / ItemsPerPage);

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
    if (search === "") {
      setFilteredMembers(bookingData.results);
    }
  }, [search, bookingData]);
  useEffect(() => {
    setFilteredMembers(bookingData.results);
  }, [bookingData]);

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

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    router.push(
      `${
        filter === "all" && search === ""
          ? `?page=${pageNumber}`
          : `?page=${pageNumber}&q=${filter || search}`
      }`
    );
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    router.push(
      `${
        filter === "all" && search === ""
          ? `?page=${currentPage - 1}`
          : `?page=${currentPage - 1}&q=${filter || search}`
      }`
    );
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    router.push(
      `${
        filter === "all" && search === ""
          ? `?page=${currentPage + 1}`
          : `?page=${currentPage + 1}&q=${filter || search}`
      }`
    );
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
    setFilter("all");
    setSearch("");
    router.push("/admin/dashboard");
  };

  const handleDeleteBanner = () => {
    setDeleteOpen(true);
  };

  const handleInfoModal = () => {
    setTripInfo(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDownloadClick = (event: React.MouseEvent<HTMLElement>) => {
    setDownloadAnchorEl(event.currentTarget);
  };
  const handleDownloadClose = () => {
    setDownloadAnchorEl(null);
  };

  const handleFilterChange = async (event: any) => {
    setFilter(event.target.value);

    if (event.target.value === "all") {
      router.push("/admin/dashboard");
    } else {
      router.push(`?page=${currentPage}&q=${event.target.value}`);
    }
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
    return paginationItems;
  };

  const handleStatus = async (e: any, booking_id: number) => {
    const formData = new FormData();
    formData.append("status", e.target.value);
    const response = await EditBookNow(booking_id, formData);
    reactHotToast.success("Booking Status Updated Successfully", {
      position: "top-right",
      duration: 1000,
    });
  };

  const onhandleSearchChange = async (search: any) => {
    setSearch(search);
  };

  const handleSearchApi = () => {
    if (!search) {
      router.push("/admin/dashboard");
    } else {
      router.push(`?page=${currentPage}&q=${search}`);
    }
  };

  const handleDownload = async () => {
    const request = {
      model: "booking",
    };
    const query = {
      q: filter || search,
    };
    const dataArrays = await DownloadData(request, query);
    const header = Object.keys(dataArrays[0]) as (keyof typeof dataArrays)[];
    const wsData: any[][] = [header];

    dataArrays.forEach((user: any) => {
      const rowData = header.map((key) => user[key]);
      wsData.push(rowData);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    ws["!cols"] = header.map((_) => ({ wch: 38 }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "bookingHistroy");

    XLSX.writeFile(wb, "bookingHistroy.xlsx");
  };
  const handleFullDownload = async () => {
    const request = {
      model: "booking",
    };
    const query = {
      q: filter || search,
    };
    const dataArrays = await DownloadData(request, query);

    const typedUserdata: { [key: string]: string }[] = dataArrays;

    const header = Object.keys(typedUserdata[0]);
    const wsData: any[][] = [header];

    typedUserdata.forEach((user) => {
      const rowData = header.map((key) => user[key]);
      wsData.push(rowData);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    ws["!cols"] = header.map((_) => ({ wch: 38 }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BookingHistroy");

    XLSX.writeFile(wb, "BookingHistroy.xlsx");
  };
  const startIndex: number = (currentPage - 1) * ItemsPerPage;
  const endIndex: number = Math.min(startIndex + ItemsPerPage, totalItems);

  const maxLength = 20; // Change this value as needed

  // Function to add ellipsis if text exceeds maxLength
  const truncateText = (text: string) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <>
      <div className=" pt-16 xl:pl-16 lg:pl-4 pl-5 xl:pr-16 lg:pr-4 pr-5 w-full">
        <div className="flex justify-between">
          <h1> Booking Histroy</h1>
        </div>
        <div className="flex justify-between md:items-center items-start  mb-1 md:flex-row flex-col">
          <div className="flex items-center gap-2 ">
            <div className="relative flex items-center gap-3">
              <input
                type={"text"}
                name={"search"}
                className={`bg-white  text-black rounded-[5px] p-4 focus:outline-none border border-[#DADADA] h-[40px] md:h-[40px] md:w-[300px] w-[200px]`}
                placeholder={"Search Now"}
                value={search}
                onChange={(event) => onhandleSearchChange(event.target.value)}
                autoComplete="off"
              />

              <IoIosSearch
                onClick={() => handleSearchApi()}
                className="absolute top-[9px] cursor-pointer right-[10px] left-30 text-xl"
              />
            </div>
            {search !== "" ? (
              <ClearIcon
                className="text-red-600 cursor-pointer"
                onClick={() => {
                  setSearch("");
                  setFilter("all");
                  router.push("/admin/dashboard");
                  setFilteredMembers(bookingData.results);
                }}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="flex justify-end w-full">
            <IconButton
              onClick={handleDownloadClick}
              aria-controls={Download ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={Download ? "true" : undefined}
              className="hover:bg-transparent"
            >
              <p className="bg-[#142B51] text-sm md:p-4 h-[40px] p-1 text-white px-4 flex gap-2 items-center rounded-md">
                <FaDownload /> Download as Excel File
              </p>
            </IconButton>
            <IconButton
              onClick={handleClick}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <HiOutlineDotsVertical className="text-2xl " />
            </IconButton>
          </div>
        </div>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose} className="hover:bg-transparent">
            <div>
              <h3>Status</h3>

              <RadioGroup
                value={filter}
                onChange={handleFilterChange}
                className=""
              >
                <FormControlLabel value="all" control={<Radio />} label="All" />

                <FormControlLabel
                  value="Pending"
                  control={<Radio />}
                  label="Pending"
                />
                <FormControlLabel
                  value="Completed"
                  control={<Radio />}
                  label="Completed"
                />
                <FormControlLabel
                  value="Confirmed"
                  control={<Radio />}
                  label="Confirmed"
                />
                <FormControlLabel
                  value="Canceled"
                  control={<Radio />}
                  label="Canceled"
                />
                <FormControlLabel
                  value="Expired"
                  control={<Radio />}
                  label="Expired"
                />
              </RadioGroup>
            </div>
          </MenuItem>
        </Menu>
        <Menu
          anchorEl={DownloadanchorEl}
          id="account-menu"
          open={Download}
          onClose={handleDownloadClose}
          onClick={handleDownloadClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",

              padding: "0px !important",

              "& .MuiAvatar-root": {
                width: 42,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={handleDownloadClose}
            className="hover:bg-white !p-0 m-0"
          >
            <div className=" bg-white w-full hover:bg-white ">
              <button
                className=" text-sm text-gray-700 py-4 px-3 w-full hover:bg-gray-300"
                onClick={handleDownload}
              >
                Filtered Data
              </button>
              <div>
                <button
                  className=" text-sm py-4 px-3 text-gray-700 hover:bg-gray-300"
                  onClick={handleFullDownload}
                >
                  All Booking Data
                </button>
              </div>
            </div>
          </MenuItem>
        </Menu>

        <div className="overflow-x-auto">
          <table className=" divide-y-2  divide-gray-200 shadow-md bg-white text-sm mb-10 w-full">
            <thead className=" bg-slate-400 ">
              <tr>
                <th className="text-center  whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Booking Code
                </th>
                <th className="text-center  whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Booking At
                </th>

                <th className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Name
                </th>
                <th className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Email
                </th>
                <th className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Phone No.
                </th>

                <th className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            {filteredMembers.length !== 0 ? (
              <tbody className="divide-y divide-gray-200 w-full overflow-x-auto ">
                {filteredMembers?.map((res, index) => (
                  <tr key={index} className="leading-6">
                    <td className="p-4 text-center">{res.booking_code}</td>
                    <td className="p-4 text-center">
                      {`${res?.created_at.slice(8, 10)}-${res?.created_at.slice(
                        5,
                        7
                      )}-${res?.created_at.slice(0, 4)}`}
                    </td>

                    <td className="text-center">
                      <p className="w-[150px]  text-center line-clamp-1 break-words">
                        {res.contact_name}
                      </p>
                    </td>
                    <td className="text-center">
                      <p className="w-[150px]  text-center line-clamp-1 break-words">
                        {res.contact_email}
                      </p>
                    </td>
                    <td className="text-center">{res.contact_phone}</td>

                    <td className={`text-center `}>
                      <select
                        className={`w-fit px-1 py-2 rounded-sm ${
                          res.status === "Completed"
                            ? " bg-[#82DA7E] "
                            : res.status === "Pending"
                            ? " bg-[#FFC558]  "
                            : res.status === "Confirmed"
                            ? "bg-[#F9F871]  text-black"
                            : res.status === "Canceled"
                            ? "bg-[#FF4141] text-white"
                            : "bg-[#a0a0a0] text-white "
                        }`}
                        id="dropdown"
                        value={res.status}
                        onChange={(e) => handleStatus(e, res.booking_id)}
                      >
                        <option
                          value="Pending"
                          className="bg-white hover:bg-[#142D53] text-black"
                        >
                          Pending
                        </option>
                        <option
                          value="Confirmed"
                          className="bg-white hover:bg-[#142D53] text-black"
                        >
                          Confirmed
                        </option>
                        <option
                          value="Completed"
                          className="bg-white hover:bg-[#142D53] text-black"
                        >
                          Completed
                        </option>
                        <option
                          value="Canceled"
                          className="bg-white hover:bg-[#142D53] text-black"
                        >
                          Canceled
                        </option>
                        <option
                          value="Expired"
                          className="bg-white hover:bg-[#142D53] text-black"
                        >
                          Expired
                        </option>
                      </select>
                    </td>
                    <td className="flex pt-5 font pb-5 gap-4 text-center justify-center">
                      <Link
                        className="text-green-700 cursor-pointer "
                        onClick={() => {
                          UserBookingData({
                            booking_id: res.booking_id,
                            booking_code: res.booking_code,
                            status: res.status,
                            contact_email: res.contact_email,
                            contact_name: res.contact_name,
                            contact_phone: res.contact_phone,
                            from_location: res.from_location,
                            to_location: res.to_location,
                            departure_date: res.departure_date,
                            return_date: res.return_date,
                            trip_info: res.trip_info,
                            created_at: res.created_at,
                            page: res.page,
                            trip_type: res.trip_type,
                            airline_name: res.airline_name,
                            passenger: res.passenger,
                            card: res.card,
                            payment_type: res.payment_type,
                          });
                        }}
                        href={`/admin/bookingDetails/${res.booking_code}`}
                      >
                        Info
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={10}>
                    <div className="flex mb-8 flex-col items-center justify-center text-center">
                      <div>
                        <Image
                          src={NotFoundImage}
                          alt="404 Images"
                          height={100}
                          width={700}
                          className="h-[50vh] md:h-[55vh]"
                        />
                      </div>
                      <h1 className="text-2xl md:text-4xl text-center">
                        Oops... Data Not Found!
                      </h1>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
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
              disabled={startIndex === 0 ? true : false}
              className="mx-1 p-1 w-[44px] h-[44px] rounded-[10px] border-[#DCDCDC] border-[2px]"
            >
              <GotoBackImage CustomClass="w-[26px] h-auto" />
            </button>
            {renderPagination()}
            <button
              onClick={goToNextPage}
              disabled={endIndex === filteredMembers.length ? true : false}
              className="mx-1 p-1 w-[44px] h-[44px]  rounded-[10px] border-[#DCDCDC] border-[2px]"
            >
              <div className="rotate-180">
                <GotoBackImage CustomClass="w-[26px] h-auto" />
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
    </>
  );
};

export default AdminDashborad;

"use client";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CustomButton from "@/components/Button/Button";
import { PulseLoader } from "react-spinners";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import { MdAddToPhotos } from "react-icons/md";
import Addbanner from "@/action/Banner/AddBanner";
import Deletebanner from "@/action/Banner/DeleteBanner";
import Updatebanner from "@/action/Banner/EditBanner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ModalPopup from "@/components/Modal/deletepopup";
import { formUrlQuery } from "@/utils/formUrlQuery";

interface BannerDataInterface {
  bannerdata: [
    {
      image_url: string;
      banner_id: number;
      page: string;
      section: string;
      created_at: string;
      updated_at: string;
    }
  ];
}

interface Banner {
  banner_id: number;
  image_url: string;
  page: string;
  section: string;
}

const AdminBanner: FC<BannerDataInterface> = ({ bannerdata }) => {
  const SearchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const id = SearchParams.get("id") || "";
  const edit = SearchParams.get("edit") || "";
  const router = useRouter();
  // Add Modal and Seleted Image
  const [AddPopupOpen, setAddPopupOpen] = useState(false);
  const [Id, setId] = useState(0);
  // Update Popup Modal
  const [updateRecord, setUpdateRecord] = useState(false);
  const [apiImage, setApiImage] = useState("");

  // Image Zoom Modal and seleted Image
  const [Imageopen, setImageOpen] = useState(false);
  const [privewImage, setPreivewImage] = useState("");

  const [fileName, setFileName] = useState("");
  const [fileImage, setfileImage] = useState("");
  const [filePath, setFilePath] = useState([]);

  const [SectionValue, setSectionValue] = useState("Carousel");

  const [loading, setLoading] = useState(false);
  const arrayHeroSectionData = bannerdata.map((res) => res.section);
  // Delete Modal
  const [deleteOpen, setDeleteOpen] = useState(false);

  const MAX_IMAGE_SIZE_MB = 10;
  const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

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

  // Add Banner Api
  const handleAddBanner = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", filePath[0]);
      formData.append("section", SectionValue);
      formData.append("page", "Home");
      const response = await Addbanner(formData);
      reactHotToast.success("Banner Added Successfully", {
        position: "top-right",
        duration: 1000,
      });

      setSectionValue("Carousel");
      setAddPopupOpen(false);
    } catch (error) {
      reactHotToast.success("Banner Data failed", {
        position: "top-right",
        duration: 1000,
      });
      console.error("User Data failed:", error);
      setAddPopupOpen(false);
      throw error;
    }

    setTimeout(() => {
      setfileImage("");
      setFilePath([]);
      setLoading(false);
    }, 1000);
  };

  // Edit Banner
  const editBanner = async (res: any) => {
    setUpdateRecord(true);
  };

  const handleBannerImage = (event: any) => {
    const file = event.target.files;
    const filesdata = event.target.files[0];
    if (file) {
      if (filesdata?.size <= MAX_IMAGE_SIZE_BYTES) {
        const objectURL = URL.createObjectURL(file[0]);
        setfileImage(objectURL);
        setApiImage(file);
      } else {
        reactHotToast.error("Image size exceeds 10MB limit", {
          position: "top-right",
          duration: 3000,
        });

        event.target.value = null;
      }
    } else {
      setApiImage("");
    }
  };

  // Edit Banner Api
  const EditBannerApi = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", apiImage[0]);
    formData.append("section", SectionValue);
    const response = await Updatebanner(Id || edit, formData);
    reactHotToast.success("Banner Updated Successfully", {
      position: "top-right",
      duration: 1000,
    });
    setUpdateRecord(false);
    router.push("/admin/homebanner");

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Delete Banner
  const handleDeleteBanner = () => {
    setDeleteOpen(true);
  };

  // Delete Banner Api
  const DeleteBannerApi = async () => {
    setLoading(true);
    const deleteId = parseInt(id);
    const response = await Deletebanner(Id || deleteId);
    reactHotToast.success("Banner Deleted Successfully", {
      position: "top-right",
      duration: 1000,
    });

    setTimeout(() => {
      setLoading(false);
      setDeleteOpen(false);
    }, 1000);
    router.push("/admin/homebanner");
  };

  const handleFileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      setFilePath(files[0]);
      setFileName(files[0].name);
    } else {
      setFileName("");
      setFilePath([]);
    }
  };

  const handleSectionChange = (event: any) => {
    setSectionValue(event.target.value);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files;
    const filesdata = event.target.files[0];
    if (file) {
      if (filesdata?.size <= MAX_IMAGE_SIZE_BYTES) {
        const objectURL = URL.createObjectURL(file[0]);
        setfileImage(objectURL);
        setFilePath(file);
        setFileName(file[0].name);
      } else {
        reactHotToast.error("Image size exceeds 10MB limit", {
          position: "top-right",
          duration: 3000,
        });

        event.target.value = null;
      }
    } else {
      setFileName("");
      setFilePath([]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const groupedBanners: { [key: string]: Banner[] } = bannerdata.reduce(
    (acc, banner) => {
      const key = banner.section;
      acc[key] = [...(acc[key] || []), banner];
      return acc;
    },
    {} as { [key: string]: Banner[] }
  );

  return (
    <>
      <div className=" pt-16 xl:pl-16 lg:pl-4 pl-5 xl:pr-16 lg:pr-4 pr-5">
        <div className="flex justify-between items-center  mb-8">
          <h1></h1>

          <CustomButton
            text="Add Banner"
            icon={<MdAddToPhotos />}
            onClick={() => {
              setAddPopupOpen(true);
            }}
            customclass="bg-[#142B51] md:p-3 p-1 text-white px-4 flex gap-2 items-center rounded-md"
          />
        </div>

        {Object.entries(groupedBanners).map(([section, banners]) => (
          <div key={section}>
            <h2 className="mb-4 mt-4">{section}</h2>
            <div className="grid grid-cols-12 gap-4">
              {banners.map((res, index: number) => (
                <div
                  key={index}
                  className="p-7 lg:col-span-4 sm:col-span-6 col-span-12 items-center w-fit relative  border shadow-md "
                >
                  <Image
                    src={res.image_url}
                    alt="BannerDemo Image"
                    width={340}
                    height={40}
                    priority
                    className="cursor-zoom-in h-[115px]  "
                    onClick={() => {
                      setPreivewImage(res.image_url);
                      setImageOpen(true);
                    }}
                  />

                  <div className="flex w-full justify-around items-center mt-6">
                    <Link
                      className="mr-4 ml-6 flex gap-2 text-green-700 cursor-pointer"
                      onClick={() => {
                        setId(res.banner_id);
                        setSectionValue(res.section);
                        setfileImage(res.image_url);
                        editBanner(res);
                      }}
                      href={`?edit=${res.banner_id}`}
                    >
                      <MdEdit className="text-xl" /> Edit
                    </Link>
                    <Link
                      className="text-red-600 flex gap-2 cursor-pointer "
                      onClick={() => {
                        setId(res.banner_id);
                        handleDeleteBanner();
                      }}
                      href={`?id=${res.banner_id}`}
                    >
                      <MdDelete className="text-xl" /> Delete
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <hr className="mt-5" />

        {AddPopupOpen && (
          <Dialog
            open={AddPopupOpen}
            onClose={() => {
              setfileImage("");
              setFilePath([]);
              setAddPopupOpen(false);
            }}
          >
            <DialogTitle>Add Banner</DialogTitle>
            <DialogContent>
              <div
                className="rounded-md border-dashed border-black border-2 mb-3 p-20 text-center"
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => handleClick()}
              >
                <p>Drag & Drop files here or click to select</p>
                <p className="text-[12px]">
                  *For better website quality we suggest to use images with
                  1920x600 resolution (below 10Mb)*
                </p>
                <input
                  type="file"
                  id="fileInput"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              <p>Preview:</p>
              {fileImage && (
                <Image
                  src={fileImage}
                  alt="Selected File"
                  width={100}
                  height={200}
                />
              )}

              <div className="mt-5">
                <label htmlFor="dropdown">Select Section</label>
                <select
                  className="w-[100%] px-4 py-4 border rounded-2xl "
                  id="dropdown"
                  value={SectionValue}
                  onChange={handleSectionChange}
                >
                  <option value="Carousel">Carousel</option>
                  <option value="Banner">Banner</option>
                </select>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setfileImage("");
                  setFilePath([]);
                  setAddPopupOpen(false);
                }}
                color="error"
              >
                Cancel
              </Button>
              <CustomButton
                text={"Submit"}
                loading={loading}
                onClick={() => handleAddBanner()}
                disabled={fileImage === "" ? true : false}
                customclass="bg-[#142B51] flex gap-[5px] justify-center rounded-md items-center text-white border-none w-[20%]"
              />
            </DialogActions>
          </Dialog>
        )}

        {updateRecord && (
          <Dialog
            open={updateRecord}
            onClose={() => {
              setUpdateRecord(false);
              setfileImage("");
              setFilePath([]);
              router.push("/admin/homebanner");
            }}
            // maxWidth="md"
          >
            <div className="p-12">
              <h2 className="mb-5 mt-1">Select Banner Image:</h2>

              <div
                className="rounded-md border-dashed border-black border-2 mb-3 md:p-20 p-8 text-center"
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => handleClick()}
              >
                <p>Drag & Drop files here or click to select</p>
                <p className="text-[12px]">
                  *For better website quality we suggest to use images with
                  1920x600 resolution (below 10Mb)*
                </p>
                <input
                  type="file"
                  id="fileInput"
                  ref={fileInputRef}
                  onChange={handleBannerImage}
                  style={{ display: "none" }}
                />
              </div>
              <p>Preview:</p>
              {fileImage && (
                <Image
                  src={fileImage}
                  alt="Selected File"
                  width={100}
                  height={200}
                />
              )}

              <div className="mt-5">
                <label htmlFor="dropdown">Select Section</label>
                <select
                  className="w-[100%] px-4 py-4 border rounded-2xl "
                  id="dropdown"
                  value={SectionValue}
                  onChange={handleSectionChange}
                >
                  <option value="Carousel">Carousel</option>
                  <option value="Banner">Banner</option>
                </select>
              </div>

              <div className="flex gap-2 mt-6">
                <CustomButton
                  text="Cancel"
                  onClick={() => {
                    setfileImage("");
                    setFilePath([]);
                    setUpdateRecord(false);
                  }}
                  customclass="bg-[#EB2822] flex gap-[5px] justify-center rounded-md items-center text-white border-none w-[50%]"
                />
                <CustomButton
                  text={"Update"}
                  loading={loading}
                  onClick={EditBannerApi}
                  customclass="bg-[#142B51] flex gap-[5px] justify-center rounded-md items-center text-white border-none w-[50%]"
                />
              </div>
            </div>
          </Dialog>
        )}
        {Imageopen && (
          <Dialog
            open={Imageopen}
            keepMounted
            onClose={() => setImageOpen(false)}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="md"
          >
            <Image
              src={privewImage}
              alt="BannerDemo Image"
              width={140}
              height={10}
              priority
              layout="responsive"
              className="hidden lg:block h-full w-full "
            />
          </Dialog>
        )}
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

export default AdminBanner;

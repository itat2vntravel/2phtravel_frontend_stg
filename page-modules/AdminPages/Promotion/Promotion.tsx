"use client";
import ImagePreview from "@/components/AdminComponents/ImagePrivew/ImagePreview";
import CustomButton from "@/components/Button/Button";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { toast as reactHotToast, Toaster } from "react-hot-toast";
import React, { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";
import AddPromotion from "@/action/Admin/Promotion/AddPromotion";
import { useRouter, useSearchParams } from "next/navigation";
import DeletePromotion from "@/action/Admin/Promotion/DeletePromotion";
import ModalPopup from "@/components/Modal/deletepopup";
import UpdatePromotion from "@/action/Admin/Promotion/UpdatePromotion";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { IoCloseOutline } from "react-icons/io5";
import UseCityautoComplted from "@/components/AutoComplete/CityautoComplted";
import DestinationCityAutoComplete from "@/components/AutoComplete/DestinationCityAutoComplete";
import LoaderButton from "../DestinationDeals/Button";
import AvatarEditor from "react-avatar-editor";
import { saveAs } from "file-saver";
import { formUrlQuery } from "@/utils/formUrlQuery";

interface PromotionDataInterface {
  promotiondata: [
    {
      promotion_id: number;
      image_url: string;
      title: string;
      desc: string;
      from_place: string;
      to_place: string;
      date: string;
      price: string;
      is_active: boolean;
    }
  ];
  cityname: [
    {
      city_id: number;
      city_name: string;
      city_image_url: string;
    }
  ];
}
const PromotionPage: React.FC<PromotionDataInterface> = ({
  promotiondata,
  cityname,
}) => {
  const SearchParams = useSearchParams();
  const router = useRouter();

  const id = SearchParams.get("id") || "";
  const edit = SearchParams.get("edit") || "";

  // Update Popup Modal
  const [updateRecord, setUpdateRecord] = useState(false);
  const [apiImage, setApiImage] = useState([]);

  const [cropImage, setCropImage] = useState(false);
  const [editor, setEditor] = useState<any>(null); // Store the reference to the editor
  const [editedImage, setEditedImage] = useState<string | null>(null);

  const [AddPopupOpen, setAddPopupOpen] = useState(false);
  const [fileImage, setfileImage] = useState("");
  const [filePath, setFilePath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [requiredError, setRequiredError] = useState("");
  const [Id, setId] = useState(0);
  const [Datevalue, setDateValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: null,
  });
  const [price, setPrice] = useState("");
  const [departureAirport, setdepartureAirport] = useState("");
  const [destinationAirport, setdestinationAirport] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_IMAGE_SIZE_MB = 10;
  const MAX_IMAGE_WIDTH = 640;
  const MAX_IMAGE_HEIGHT = 640;
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

  // Add Promotion Api
  const handleAddPromotion = async (formData1: FormData) => {
    if (filePath.length !== 0) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("image", filePath[0]);
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append(
          "from_place",
          formData1.get("departureAirport") as string
        );
        formData.append(
          "to_place",
          formData1.get("destinationAirport") as string
        );
        formData.append(
          "date",
          `${Datevalue?.startDate as string}-${Datevalue?.endDate as string}  `
        );
        formData.append("price", formData1.get("price") as string);

        const response = await AddPromotion(formData);

        reactHotToast.success("Promotion Added Successfully", {
          position: "top-right",
          duration: 1000,
        });

        setAddPopupOpen(false);
      } catch (error) {
        reactHotToast.success("Promotion Data failed", {
          position: "top-right",
          duration: 1000,
        });
        console.error("User Data failed:", error);
        setAddPopupOpen(false);
        throw error;
      }
      setFilePath([]);
      setfileImage("");
      setDateValue({
        startDate: new Date(),
        endDate: null,
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setRequiredError("true");
    }
  };

  const handleFileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      setFilePath(files[0]);
    } else {
      setFilePath([]);
    }
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      reactHotToast.error("Image size exceeds 10MB limit", {
        position: "top-right",
        duration: 3000,
      });
      event.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = (event: any) => {
      const target = event.target;
      if (!(target instanceof FileReader)) return; // Type guard to ensure target is of type FileReader

      const img = document.createElement("img");
      img.onload = () => {
        if (img.width !== MAX_IMAGE_WIDTH && img.height !== MAX_IMAGE_HEIGHT) {
          reactHotToast.error(
            "Required image dimensions Lesser or Greater Dimensions (640x640) won't be allowed.",
            {
              position: "top-right",
              duration: 3000,
            }
          );
          event.target.value = null;
          return;
        }

        setfileImage(target.result as string);
        setFilePath([file] as any);
      };
      img.src = target.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Delete Promotion
  const handleDeletePromotion = () => {
    setDeleteOpen(true);
  };

  // Delete Promotion Api
  const DeletePromotionApi = async () => {
    setLoading(true);
    const deleteId = parseInt(id);
    const response = await DeletePromotion(Id || deleteId);
    reactHotToast.success("Promotion Deleted Successfully", {
      position: "top-right",
      duration: 1000,
    });

    setTimeout(() => {
      setLoading(false);
      setDeleteOpen(false);
    }, 1000);
    router.push("/admin/promotion");
  };

  // Edit Promotion Api
  const EditPromotionApi = async (formData1: FormData) => {
    setLoading(true);
    const formData = new FormData();
    if (filePath.length !== 0) {
      formData.append("image", filePath[0]);
    }
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("from_place", formData1.get("departureAirport") as string);
    formData.append("to_place", formData1.get("destinationAirport") as string);
    formData.append(
      "date",
      `${Datevalue?.startDate as string}-${Datevalue?.endDate as string} `
    );
    formData.append("price", formData1.get("price") as string);
    const response = await UpdatePromotion(Id || edit, formData);
    reactHotToast.success("Promotion Updated Successfully", {
      position: "top-right",
      duration: 1000,
    });
    setUpdateRecord(false);
    router.push("/admin/promotion");

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Edit Promotion
  const editPromotion = async (res: any) => {
    setUpdateRecord(true);
  };

  const handlePromotionImage = (event: any) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      reactHotToast.error("Image size exceeds 10MB limit", {
        position: "top-right",
        duration: 3000,
      });
      event.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = (event: any) => {
      const target = event.target;
      if (!(target instanceof FileReader)) return; // Type guard to ensure target is of type FileReader

      const img = document.createElement("img");
      img.onload = () => {
        if (img.width !== MAX_IMAGE_WIDTH && img.height !== MAX_IMAGE_HEIGHT) {
          reactHotToast.error(
            "Required image dimensions Lesser or Greater Dimensions (640x640) won't be allowed.",
            {
              position: "top-right",
              duration: 3000,
            }
          );
          event.target.value = null;
          return;
        }

        setfileImage(target.result as string);

        setFilePath(event.target.files);
      };
      img.src = target.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleValueChange = (newValue: any) => {
    setDateValue(newValue);
  };

  const handleCropFileChange = (event: any) => {
    const file = event.target.files;
    const filesdata = event.target.files[0];
    if (file) {
      if (filesdata?.size <= MAX_IMAGE_SIZE_BYTES) {
        const objectURL = URL.createObjectURL(file[0]);
        setfileImage(objectURL);
        setFilePath(file);
      } else {
        reactHotToast.error("Image size exceeds 10MB limit", {
          position: "top-right",
          duration: 3000,
        });

        event.target.value = null;
      }
    } else {
      setFilePath([]);
    }
  };

  const convertBase64ToFile = (base64String: any, fileName: string) => {
    let arr = base64String.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let uint8Array = new Uint8Array(n);
    while (n--) {
      uint8Array[n] = bstr.charCodeAt(n);
    }
    let file = new File([uint8Array], fileName, { type: mime });
    return file;
  };

  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const editedImageUrl = canvas.toDataURL();
      setEditedImage(editedImageUrl);
      let file = convertBase64ToFile(editedImageUrl, "fileName");
      saveAs(file, "fileName");
      setEditedImage("");
      setfileImage("");
      setFilePath([]);
      setCropImage(false);
    }
  };

  return (
    <div className="pt-16 xl:pl-16 lg:pl-4 pl-5 xl:pr-16 lg:pr-4 pr-5 pb-56">
      <div className="flex justify-between items-center  mb-8">
        <h1>Promotion</h1>
        <CustomButton
          text="Add Promotion"
          icon={<MdAddToPhotos />}
          onClick={() => {
            setAddPopupOpen(true);
          }}
          customclass="bg-[#142B51] md:p-3 p-1 text-white px-4 flex gap-2 items-center rounded-md"
        />
      </div>

      <div className="grid grid-cols-12 gap-4">
        {promotiondata.map((res, index: number) => (
          <div
            key={index}
            className="pt-4 pb-4 2xl:col-span-4 xl:col-span-6 lg:col-span-6 sm:col-span-6 col-span-12 items-center relative  border shadow-md "
          >
            <div className="flex justify-center flex-col items-center">
              <h1 className="mb-3 flex justify-center text-center w-full ">
                {res.title}
              </h1>
              <ImagePreview res={res} />
            </div>
            <p className="xl:h-24 md:h-36 pt-5 px-5 h-36 line-clamp-4  w-[100%] text-wrap break-words mt-3  ">
              {res.desc}
            </p>
            <div className="flex w-full justify-around items-center mt-6">
              <Link
                className="mr-4 ml-6 flex gap-2 text-green-700 cursor-pointer"
                onClick={() => {
                  setfileImage(res.image_url);
                  setTitle(res.title);
                  setDesc(res.desc);
                  setdestinationAirport(res.to_place);
                  setdepartureAirport(res.from_place || "");
                  setPrice(res.price);
                  setDateValue({
                    startDate: res.date.slice(0, 10),
                    endDate: res.date.slice(11, 21),
                  });
                  setId(res.promotion_id);
                  editPromotion(res);
                }}
                href={`?edit=${res.promotion_id}`}
              >
                <MdEdit className="text-xl" /> Edit
              </Link>
              <Link
                className="text-red-600 flex gap-2 cursor-pointer "
                onClick={() => {
                  setId(res.promotion_id);
                  handleDeletePromotion();
                }}
                href={`?id=${res.promotion_id}`}
              >
                <MdDelete className="text-xl" /> Delete
              </Link>
            </div>
          </div>
        ))}
      </div>

      {AddPopupOpen && (
        <Dialog
          open={AddPopupOpen}
          onClose={() => {
            setfileImage("");
            setFilePath([]);
            setDateValue({
              startDate: new Date(),
              endDate: null,
            });
            setAddPopupOpen(false);
          }}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md"
          // className="w-[500px]"
        >
          <DialogTitle className="flex justify-between items-center">
            Add Promotion{" "}
            <IoCloseOutline
              className="text-2xl cursor-pointer"
              onClick={() => {
                setfileImage("");
                setFilePath([]);
                setDateValue({
                  startDate: new Date(),
                  endDate: null,
                });
                setAddPopupOpen(false);
              }}
            />{" "}
          </DialogTitle>
          <hr></hr>
          <DialogContent>
            <form action={(formdata) => handleAddPromotion(formdata)}>
              <div className="w-full flex justify-end items-end mb-2">
                {" "}
                <button
                  onClick={() => {
                    setfileImage("");
                    setFilePath([]);
                    setDateValue({
                      startDate: new Date(),
                      endDate: null,
                    });
                    setAddPopupOpen(false);
                    setCropImage(true);
                  }}
                  className="text-customRed"
                >
                  Crop Image
                </button>
              </div>
              <div
                className="rounded-md border-dashed border-black border-2 mb-3 p-10 text-center"
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => handleClick()}
              >
                <p>Drag & Drop files here or click to select</p>
                <p className="text-[12px]">
                  *For better website quality we suggest to use images with
                  640x640 resolution (below 10Mb)*
                </p>
                <input
                  type="file"
                  id="fileInput"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              {requiredError && (
                <span className="text-customRed"> * Required</span>
              )}

              {fileImage && (
                <>
                  <p className="font-bold">Preview:</p>
                  <Image
                    src={fileImage}
                    alt="Selected File"
                    width={100}
                    height={200}
                  />
                </>
              )}

              <div className="mt-5">
                <label htmlFor="dropdown" className="font-bold">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  className={`w-full bg-[#F4F4F4] rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[60px]`}
                />
              </div>
              <div className="mt-5">
                <label htmlFor="dropdown" className="font-bold">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Description"
                  name="Description"
                  onChange={(event) => setDesc(event.target.value)}
                  required
                  className={`w-full bg-[#F4F4F4] rounded-[5px] p-3 focus:outline-none border border-[#DADADA] `}
                />
              </div>
              <div className="grid grid-cols-12 ">
                <div className="col-span-12 h-auto">
                  <>
                    <div className="grid grid-cols-2 h-full">
                      <div className="mr-3">
                        <UseCityautoComplted
                          label={"Departure"}
                          placeholder={"Airport / City Name"}
                          name={"departureAirport"}
                          required={true}
                        />
                      </div>

                      <div className="">
                        <DestinationCityAutoComplete
                          label={"Destination"}
                          placeholder={"Select City Name"}
                          name={"destinationAirport"}
                          required={true}
                          cityname={cityname}
                        />
                      </div>
                    </div>
                  </>
                </div>
              </div>

              <div className="mt-[10px]">
                <label className="text-[15px] font-bold flex gap-[5px] my-[5px] leading-[18.05px]">
                  Date
                </label>
                <Datepicker
                  placeholder={"Select Date"}
                  minDate={new Date()}
                  // showShortcuts={true}
                  // asSingle={true}
                  showFooter={false}
                  primaryColor={"blue"}
                  inputClassName={`bg-[#F4F4F4] p-3 rounded-[5px] focus:outline-none border border-[#DADADA]  h-[40px] md:h-[40px] w-full `}
                  value={Datevalue}
                  onChange={handleValueChange}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="dropdown" className="font-bold">
                  Enter Price
                </label>
                <input
                  type={"number"}
                  name={"price"}
                  className={`w-full bg-[#F4F4F4]  mb-4 rounded-[5px] p-4 focus:outline-none border border-[#DADADA] h-[40px] md:h-[50px]`}
                  placeholder={"Enter Price"}
                  required
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => {
                    setfileImage("");
                    setFilePath([]);
                    setDateValue({
                      startDate: new Date(),
                      endDate: null,
                    });
                    setAddPopupOpen(false);
                  }}
                  color="error"
                >
                  Cancel
                </Button>
                <LoaderButton>Submit</LoaderButton>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
      {cropImage && (
        <Dialog
          open={cropImage}
          onClose={() => {
            setCropImage(false);
            setfileImage("");
            setFilePath([]);
            setEditedImage("");
          }}
          maxWidth="lg"
        >
          <div className="w-fit">
            <DialogTitle className="flex justify-between items-center">
              Crop Image
              <IoCloseOutline
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setCropImage(false);
                  setfileImage("");
                  setFilePath([]);
                  setEditedImage("");
                }}
              />
            </DialogTitle>
            <DialogContent>
              <h1 className="mb-5">Select the Image to Crop</h1>
              <div
                className="mb-10 rounded-md border-dashed border-black border-2 p-10 text-center"
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => handleClick()}
              >
                <p>Drag & Drop files here or click to select</p>
                <input
                  type="file"
                  id="fileInput"
                  ref={fileInputRef}
                  onChange={handleCropFileChange}
                  style={{ display: "none" }}
                />
              </div>
              {fileImage && (
                <div className="flex flex-col justify-center">
                  <AvatarEditor
                    ref={(ref) => setEditor(ref)}
                    image={fileImage}
                    width={640}
                    height={640}
                    border={50}
                    color={[235, 236, 238]} // RGBA
                    scale={1}
                    rotate={0}
                  />
                  <CustomButton
                    text="Download Cropped Image"
                    icon={<MdAddToPhotos />}
                    onClick={handleSave}
                    customclass="bg-[#142B51] justify-center md:p-3 p-1 text-white px-4 flex gap-2 items-center rounded-md"
                  />
                </div>
              )}

              {editedImage && (
                <Image
                  src={editedImage}
                  alt="Edited"
                  width={100}
                  height={100}
                />
              )}
            </DialogContent>
          </div>
        </Dialog>
      )}
      {deleteOpen && (
        <ModalPopup
          open={deleteOpen}
          setopen={setDeleteOpen}
          note={""}
          //   deletename={DeleteData.email}
          handleDelete={DeletePromotionApi}
          loading={loading}
        />
      )}

      {updateRecord && (
        <Dialog
          open={updateRecord}
          onClose={() => {
            setUpdateRecord(false);
            setfileImage("");
            setFilePath([]);
            router.push("/admin/promotion");
          }}
        >
          <DialogTitle className="flex justify-between items-center">
            Update Promotion{" "}
            <IoCloseOutline
              className="text-2xl cursor-pointer"
              onClick={() => {
                setUpdateRecord(false);
                setfileImage("");
                setFilePath([]);
                router.push("/admin/promotion");
              }}
            />{" "}
          </DialogTitle>
          <hr></hr>
          <DialogContent>
            <form action={(formdata) => EditPromotionApi(formdata)}>
              <div className="w-full flex justify-end items-end mb-2">
                {" "}
                <button
                  onClick={() => {
                    setUpdateRecord(false);
                    setfileImage("");
                    setFilePath([]);
                    router.push("/admin/promotion");
                    setCropImage(true);
                  }}
                  className="text-customRed"
                >
                  Crop Image
                </button>
              </div>
              <div className="mb:p-12 p-4">
                <h2 className="mb-5 mt-1">Select Promotion Image:</h2>

                <div
                  className="rounded-md border-dashed border-black border-2 mb-3 p-10 text-center"
                  onDrop={handleFileDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => handleClick()}
                >
                  <p>Drag & Drop files here or click to select</p>
                  <p className="text-[12px]">
                    *For better website quality we suggest to use images with
                    640x640 resolution (below 10Mb)*
                  </p>
                  <input
                    type="file"
                    id="fileInput"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
                {requiredError && (
                  <span className="text-customRed"> * Required</span>
                )}

                {fileImage && (
                  <>
                    <p className="font-bold">Preview:</p>
                    <Image
                      src={fileImage}
                      alt="Selected File"
                      width={100}
                      height={200}
                    />
                  </>
                )}

                <div className="mt-5">
                  <label htmlFor="dropdown" className="font-bold">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                    className={`w-full bg-[#F4F4F4] rounded-[5px] p-3 focus:outline-none border border-[#DADADA] h-[60px]`}
                  />
                </div>
                <div className="mt-5">
                  <label htmlFor="dropdown" className="font-bold">
                    Description
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Description"
                    name="Description"
                    value={desc}
                    onChange={(event) => setDesc(event.target.value)}
                    required
                    className={`w-full bg-[#F4F4F4] rounded-[5px] p-3 focus:outline-none border border-[#DADADA] `}
                  />
                </div>
                <div className="grid grid-cols-12 ">
                  <div className="col-span-12 h-auto">
                    <>
                      <div className="grid grid-cols-2 h-full">
                        <div className="mr-3">
                          <UseCityautoComplted
                            label={"Departure"}
                            placeholder={"Airport / City Name"}
                            name={"departureAirport"}
                            required={true}
                            defaultValue={`${departureAirport}`}
                          />
                        </div>

                        <div className="">
                          <DestinationCityAutoComplete
                            label={"Destination"}
                            placeholder={"Select City Name"}
                            name={"destinationAirport"}
                            required={true}
                            cityname={cityname}
                            defaultValue={destinationAirport}
                          />
                        </div>
                      </div>
                    </>
                  </div>
                </div>

                <div className="mt-[10px]">
                  <label className="text-[15px] font-bold flex gap-[5px] my-[5px] leading-[18.05px]">
                    Date
                  </label>
                  <Datepicker
                    placeholder={"Select Date"}
                    minDate={new Date()}
                    // asSingle={true}
                    showFooter={false}
                    primaryColor={"blue"}
                    inputClassName={`bg-[#F4F4F4] rounded-[5px]  p-3 focus:outline-none border border-[#DADADA]  h-[40px] md:h-[40px] w-full `}
                    value={Datevalue}
                    onChange={handleValueChange}
                  />
                </div>
                <div className="mt-5">
                  <label htmlFor="dropdown" className="font-bold">
                    Enter Price
                  </label>
                  <input
                    type={"number"}
                    name={"price"}
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    className={`w-full bg-[#F4F4F4]  relative  mb-4 rounded-[5px] p-4 focus:outline-none border border-[#DADADA] h-[40px] md:h-[50px]`}
                    placeholder={"Enter Price"}
                    required
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => {
                      setfileImage("");
                      setFilePath([]);

                      setUpdateRecord(false);
                    }}
                    color="error"
                  >
                    Cancel
                  </Button>
                  <LoaderButton>Submit</LoaderButton>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
      <Toaster />
    </div>
  );
};

export default PromotionPage;

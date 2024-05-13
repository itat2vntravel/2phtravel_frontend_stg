"use client";
import useBookingInfo from "@/store/FlightBooking";
import Image from "next/image";
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

interface SignaturePadProps {
  initialDataUrl?: string;
  // onSave: (dataUrl: string) => void;
  // onSave: (blob: Blob) => void;
  onSave: (file: File) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({
  initialDataUrl,
  onSave,
}) => {
  const [signatureImage, setSignatureImage] = useState<string | undefined>(
    undefined
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const canvasRef = useRef<SignatureCanvas>(null);
  const { updateBookingInfoStore } = useBookingInfo((state) => state);
  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      setSignatureImage(undefined);
    }
  };

  const saveSignature = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      updateBookingInfoStore({
        Signature: dataUrl,
      });
      // Convert data URI to Blob
      const blob = dataURItoBlob(dataUrl);

      // Convert Blob to File
      const file = blobToFile(blob);

      onSave(file);
      setSignatureImage(dataUrl);
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to convert data URI to Blob
  const dataURItoBlob = (dataURI: string): Blob => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  // Function to convert Blob to File
  const blobToFile = (blob: Blob, fileName: string = "signature.png"): File => {
    return new File([blob], fileName, { type: blob.type });
  };
  return (
    <div className="w-[400px] ">
      <SignatureCanvas
        ref={canvasRef}
        canvasProps={{
          width: 400,
          height: 200,
          className: "border ",
          style: { display: isEditing ? "block" : "none" },
        }}
      />
      {!isEditing && (
        <div className="border mt-[10px]  rounded-[5px] p-5">
          <Image
            src={signatureImage || "/white.jpg"}
            alt="Signature"
            width={400}
            height={100}
            className=" w-[200px] h-[100px]  "
          />
        </div>
      )}
      <div>
        {isEditing ? (
          <div className="flex gap-2 mt-2 justify-end items-end">
            <button
              onClick={clearCanvas}
              type="button"
              className="rounded-[6px] font-normal text-[14px]	 font-main px-5 py-2 text-white bg-[#142D53] block"
            >
              Clear
            </button>
            <button
              onClick={saveSignature}
              type="button"
              className="rounded-[6px] font-normal text-[14px]	 font-main px-5 py-2 text-white bg-[#EC2719] block"
            >
              Confirm
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="rounded-[6px] mt-2 font-normal text-[14px]	 font-main px-5 py-2 text-white bg-[#142D53] block"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default SignaturePad;

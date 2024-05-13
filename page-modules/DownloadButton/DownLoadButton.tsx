"use client";
import React from "react";
import * as XLSX from "xlsx";

interface DownLoadButtonProps {
  onClick?: () => void;
  text: string;
  type?: "submit" | "reset" | "button";
  [key: string]: any;
  userdata: [
    {
      user_id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      gender: string;
    }
  ];
}

const DownLoadButton: React.FC<DownLoadButtonProps> = ({
  type,
  text,
  userdata,

  ...otherprops
}) => {
  const handleDownload = () => {
    const typedUserdata: { [key: string]: string }[] = userdata.filter(
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
    XLSX.utils.book_append_sheet(wb, ws, "UserData");

    XLSX.writeFile(wb, "userdata.xlsx");
  };

  return (
    <button
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      role="menuitem"
      type={type}
      onClick={handleDownload}
    >
      {text}
    </button>
  );
};

export default DownLoadButton;

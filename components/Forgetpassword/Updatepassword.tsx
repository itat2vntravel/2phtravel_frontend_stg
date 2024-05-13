"use client";
import UserUpdatePassword from "@/action/auth/Updatepassword";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormButton from "../FormButton";
import { PulseLoader } from "react-spinners";

export default function UpdatepasswordSection() {
  const [Currentpassword, setCurrentpassword] = useState<string>("");
  const [newpassword, setnewpassword] = useState<string>("");
  const [confirmpassword, setconfirmpassword] = useState<string>("");
  const [pending, setpending] = useState<boolean>(false);
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const handleUpdatePassword = async () => {
    setpending(true);

    if (!Currentpassword) {
      toast.error("Enter your Current Password");
      return;
    }
    if (newpassword === confirmpassword) {
      if (!regex.test(newpassword)) {
        toast.error(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one digit, and one special character"
        );
      } else {
        const req = {
          current_password: Currentpassword,
          new_password: newpassword,
        };
        const response = await UserUpdatePassword(req);

        if (response?.error) {
          toast.error(response.error);
          setpending(false);
        }
        if (response?.msg) {
          setpending(false);
          toast.success(response.msg);
          setCurrentpassword("");
          setconfirmpassword("");
          setnewpassword("");
        }
      }
    } else {
      toast.error("Password MisMatch");
    }
  };
  return (
    <>
      <div>
        <dl className="divide-y divide-gray-200">
          <div className="px-4 py-5 flex flex-col">
            <dt className="text-sm font-medium text-gray-500">
              Current password
            </dt>
            <input
              type="password"
              name="current_password"
              value={Currentpassword}
              onChange={(e) => setCurrentpassword(e.target.value)}
              required
              className="w-full bg-white border border-gray-500  rounded-md p-3 focus:outline-none"
            />
          </div>
        </dl>
        <dl className="divide-y divide-gray-200">
          <div className="px-4 py-5 flex flex-col">
            <dt className="text-sm font-medium text-gray-500">New password</dt>
            <input
              type="password"
              name="newpassword"
              value={newpassword}
              onChange={(e) => setnewpassword(e.target.value)}
              className="w-full bg-white border border-gray-500 mb-2 rounded-md p-3 focus:outline-none"
            />
          </div>
        </dl>
        <dl className="divide-y divide-gray-200">
          <div className="px-4 py-5 flex flex-col">
            <dt className="text-sm font-medium text-gray-500">
              Confirm password
            </dt>
            <input
              type="password"
              name="confirmpassword"
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
              className="w-full bg-white border border-gray-500 mb-2 rounded-md p-3 focus:outline-none"
            />
          </div>
        </dl>
        <dl className="divide-y divide-gray-200">
          <button
            type="submit"
            className=" p-2 bg-[#142d53] rounded-[5px] flex gap-[5px]  justify-center items-center text-white border-none w-[200px]"
            onClick={handleUpdatePassword}
            disabled={pending ? true : false}
          >
            {pending ? <PulseLoader color="#fff" /> : `  Change Password`}
          </button>
        </dl>
      </div>
      <ToastContainer />
    </>
  );
}

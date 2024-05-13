"use client";
import GetUserInfo from "@/action/user/Getuser";
import React, { useEffect, useState } from "react";
import CustomButton from "../Button/Button";
import { FaEdit } from "react-icons/fa";
import EditUser from "@/action/user/EditUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserData {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  address: string;
  city: string;
  districts: string;
}

const UserProfileCard: React.FC = () => {
  const [data, setData] = useState<UserData>({
    user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    address: "",
    city: "",
    districts: "",
  });
  const [editing, setEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserData>({
    user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    address: "",
    city: "",
    districts: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await GetUserInfo();
      setData(response);
    } catch (error) {
      console.error("User Data failed:", error);
      throw error;
    }
  };

  const handleEdit = () => {
    setFormData({ ...data });
    setEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const req = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: data.email,
      gender: formData.gender,
      phone_number: formData.phone_number,
      address: formData.address || "",
      districts: formData.districts || "",
      city: formData.city || "",
    };
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.city ||
      // !formData.email ||
      !formData.address ||
      !formData.districts ||
      !formData.phone_number
    ) {
      toast.error("Please fill All input value");
      return;
    }
    try {
      const response = await EditUser(req);
      toast.success("Edit User Profile Successfully!");
      setData(response);
      setEditing(false);
    } catch (error) {
      console.error("User Data failed:", error);
      throw error;
    }
  };
  const handleclose = () => {
    setEditing(false);
  };

  return (
    <>
      <div className=" bg-white shadow-md rounded-lg overflow-hidden">
        <div className=" bg-[url(/Login/clip16.png)] h-[30vh] bg-cover text-white px-4 py-5 sm:px-6">
          <div className="flex h-full flex-col justify-end ">
            <h3 className="text-[20px] md:text-[30px] font-semibold leading-6">
              User Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm">
              Personal details of the user.
            </p>{" "}
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">User ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {data.user_id}
              </dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">First Name</dt>
              {editing ? (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gray-500 mb-2 rounded-md p-3 focus:outline-none"
                  />
                </dd>
              ) : (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {data.first_name}
                </dd>
              )}
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Last Name</dt>
              {editing ? (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    className="w-full bg-white border border-gray-500 mb-2 rounded-md p-3 focus:outline-none"
                    onChange={handleInputChange}
                  />
                </dd>
              ) : (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {data.last_name}
                </dd>
              )}
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {data.email}
              </dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Mobile Number
              </dt>
              {editing ? (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    className="w-full bg-white border border-gray-500 mb-2 rounded-md p-3 focus:outline-none"
                    onChange={handleInputChange}
                  />
                </dd>
              ) : (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {data.phone_number}
                </dd>
              )}
            </div>

            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Gender</dt>
              {editing ? (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="male" className="mr-4">
                      Male
                    </label>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </dd>
              ) : (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {data.gender}
                </dd>
              )}
            </div>

            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              {editing ? (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gray-500 mb-2 rounded-md p-3 focus:outline-none"
                  />
                </dd>
              ) : (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {data.address}
                </dd>
              )}
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">City</dt>
              {editing ? (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gray-500 mb-2 rounded-md p-3 focus:outline-none"
                  />
                </dd>
              ) : (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {data.city}
                </dd>
              )}
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Districts</dt>
              {editing ? (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  <input
                    type="text"
                    name="districts"
                    value={formData.districts}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gray-500 mb-2 rounded-md p-3 focus:outline-none"
                  />
                </dd>
              ) : (
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {data.districts}
                </dd>
              )}
            </div>
          </dl>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        {editing ? (
          <>
            <CustomButton
              text="Cancel"
              onClick={handleclose}
              customclass="bg-[#EB2822] flex gap-[5px] justify-center items-center text-white border-none w-[200px]"
            />
            <CustomButton
              text="Update"
              onClick={handleUpdate}
              customclass="bg-[#173767] flex gap-[5px] justify-center items-center text-white border-none w-[200px]"
            />
          </>
        ) : (
          <CustomButton
            text="Edit Profile"
            onClick={handleEdit}
            icon={<FaEdit />}
            customclass="bg-[#173767] flex gap-[5px] justify-center items-center text-white border-none w-[200px]"
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default UserProfileCard;

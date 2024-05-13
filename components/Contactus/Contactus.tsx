import React from "react";
import Image from "next/image";

const ContactusComponent = () => {
  return (
    <div className=" lg:h-[12vh] h-[10vh] rounded-[10px] text-white lg:text-5xl text-2xl bg-[#142D53]  md:flex items-center justify-center bg-cover bg-right-bottom mt-6 lg:py-[20px] xl:py-[10px]">
      <div className="flex items-center justify-evenly lg:w-[82%] w-[100%] h-full">
        <h1 className="  text-3xl hidden md:block ">
          We are available 24/7 to help you
        </h1>

        <b className="flex justify-center items-center">
          <Image
            src="/gif/phone.gif"
            alt="Ring"
            className="w-[50px] text-white bg-white mr-4 rounded-[20px]"
            width={50}
            height={10}
          />

          {/* <LocalPhoneIcon className="lg:text-[48px] text-[22px]  mr-2 text-[#EC2719]" /> */}
          <a href={`tel:855-767-7778}`} className="text-3xl">
            855-767-7778
          </a>
        </b>
      </div>
    </div>
  );
};

export default ContactusComponent;

import Image from "next/image";
import Link from "next/link";
import Styles from "../../app/home.module.css";
import customerSupport from "@/public/customerservice.png";
import { MdCall } from "react-icons/md";

function TravelAgents(){
    return(
<>
<div className="relative  px-5 lg:px-20 py-10 bg-customBlue h-[30vh] md:h-[15vh]">
        <div
          className="absolute bottom-0 left-0 flex justify-around items-center flex-wrap md:flex-nowrap p-5 md:p-0 "
          style={{ width: "100%", height: "100%" }}
        >
          <Image
            src={customerSupport}
            alt="Customer Support Image"
            width={100}
            height={30}
            className={`abolsute bottom-0 left-0 md:block hidden`}
            style={{ width: "auto", height: "100%" }}
          />
          <div className="p-5 md:p-0">
            <h2 className=" text-white text-center md:text-start text-xs md:text-xl">
              {/* Want to get deals upto lower?  */}
              Call us for great deals and free quotes.
            </h2>
            <div className="text-[14px] text-white text-center md:text-start text-xs md:text-base">
              {/* Call our travel agents directly and get a free quotes */}
              Our travel agents make booking easy and affordable.
            </div>
          </div>
          <Link
            href={`tel:855-767-7778`}
            className={`${Styles.callbtn1} ${Styles.callbtn} rounded-[6px]`}
            style={{ fontSize: "14px" }}
          >
            <div className="flex items-center " style={{ fontWeight: "800" }}>
              <MdCall className="text-2xl" style={{ paddingRight: "5px" }} />
              Call Free: 855-767-7778
            </div>
          </Link>
        </div>
      </div>
</>

    )
}
export default TravelAgents;
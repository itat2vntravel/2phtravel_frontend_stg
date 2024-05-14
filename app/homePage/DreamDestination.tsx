import Styles from "../../app/home.module.css";
import Image from "next/image";
import Link from "next/link";
import Destination01 from "@/public/Place/pampanga.png";
import Destination03 from "@/public/Place/davao.png";
import Destination04 from "@/public/Place/manila.png";
import Destination05 from "@/public/Place/cebu.png";

function DreamDestination()
{
return(
    <>
     <div className="p-10">
        <div className={`${Styles.headingName} ${Styles.textcenter} mb-2`}>
          Discover Your Dream Destination
        </div>
        <div
          className={`text-center text-[grey] px-5 text-[14px]`}
          style={{ fontWeight: "600" }}
        >
          Embark on an unforgettable journey with us as we set sail towards our
          destination
        </div>
        <div className="container mx-auto ">
          <div className="items-center gap-5 mt-6 grid grid-cols-12">
            <Link
              href="/bookflights/Davao"
              className="xl:col-span-3 lg:col-span-3 flex md:col-span-6 gap-[20px] col-span-12 items-center justify-center"
            >
              <Image
                src={Destination03}
                alt="Destination Image 1"
                width={400}
                height={55}
                className="transition ease-in-out delay-150 hover:translate-y-[-15px] items-centers rounded-[10px] w-[300px] h-[300px] cursor-pointer  "
              />
            </Link>
            <Link
              href="/bookflights/Manila"
              className="xl:col-span-3 lg:col-span-3 flex md:col-span-6 gap-[20px] items-center col-span-12 justify-center"
            >
              <Image
                src={Destination04}
                alt="Destination Image 2"
                width={400}
                height={55}
                className="transition ease-in-out delay-150 hover:translate-y-[-15px] rounded-[10px] w-[300px] h-[300px] cursor-pointer "
              />
            </Link>
            <Link
              href="/bookflights/Cebu"
              className="xl:col-span-3 lg:col-span-3 md:col-span-6 flex items-center gap-[20px] col-span-12 justify-center"
            >
              <Image
                src={Destination05}
                alt="Destination Image 3"
                width={400}
                height={55}
                className="transition ease-in-out delay-150 hover:translate-y-[-15px] rounded-[10px] w-[300px] h-[300px] cursor-pointer "
              />
            </Link>
            <Link
              href="/bookflights/Angeles%20City"
              className="xl:col-span-3 lg:col-span-3 items-center flex md:col-span-6 gap-[20px] col-span-12 justify-center"
            >
              <Image
                src={Destination01}
                alt="Destination Image 4"
                width={400}
                height={55}
                className="transition ease-in-out delay-150 hover:translate-y-[-15px] rounded-[10px] w-[300px] h-[300px] cursor-pointer  "
              />
            </Link>
          </div>
        </div>
      </div>
    </>
)
}

export default DreamDestination;
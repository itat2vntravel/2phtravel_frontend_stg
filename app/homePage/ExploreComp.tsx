import Styles from "../../app/home.module.css";
import InsideMapImage01 from "@/public/InsideMapImage01.png";
import InsideMapImage02 from "@/public/InsideMapImage02.png";
import InsideMapImage03 from "@/public/InsideMapImage03.png";
import InsideMapImage04 from "@/public/InsideMapImage04.png";
import Image from 'next/image';
import HomeTitle from "@/components/Title/HomeTitle";
function ExploreComp()
{
return(
    <>
    

<div
className={`${Styles.bgimagefull} ${Styles.bgcolor} pb-10 ${Styles.bgimagemapfull}`}
>
<div className="flex justify-center items-start h-full w-full">
  <div>
    <div
      className="flex justify-center items-center  "
      style={{ width: "100%" }}
    >
      <Image
        src={InsideMapImage01}
        alt="Tourister Image 1"
        width={150}
        height={20}
        className={`${Styles.Insideimages} mx-0 md:mx-20`}
      />
      <Image
        src={InsideMapImage02}
        alt="Tourister Image 2"
        width={150}
        height={20}
        className={`${Styles.Insideimages} mx-0 md:mx-20`}
      />
      <Image
        src={InsideMapImage03}
        alt="Tourister Image 3"
        width={150}
        height={20}
        className={`${Styles.Insideimages} mx-0 md:mx-20`}
      />
    </div>
    <div
      className={`${Styles.bluetextcolor} font-bold text-center text-4xl my-5`}
    >
      {/* What makes us your best bet? */}
      <HomeTitle title="Why We're Your Best Choice?" />
      
    </div>
    <div className="text-center text-[14px] px-2">
      {/* We always provide optimal customer booking support services in
      terms of time and price! */}
      We offer top-notch customer support for your bookings, ensuring
      the best in time and price!
    </div>

    <div className="flex justify-start items-center">
      <div className="hidden lg:flex items-center justify-start ">
        <Image
          src={InsideMapImage04}
          alt="Clock Image"
          width={120}
          height={30}
          priority
          className="hidden lg:block"
        />
      </div>
      <div className="flex items-center justify-center my-5 w-full lg:w-[80%]">
        <div className="flex flex-col items-center justify-center">
          <div
            className={`${Styles.bluetextcolor} font-bold my-5 text-center`}
          >
            24/7 Customer Service
          </div>
          <div
            className="text-center text-[14px]"
            style={{ width: "50%", fontWeight: "600" }}
          >
            {/* Our team of skilled travel agents is always ready to assist
            you anytime, day or night */}
            Our skilled travel agents are here to help you 24/7, no
            matter the time.
          </div>
        </div>
      </div>
    </div>

    <div
      className="flex items-center justify-between flex-wrap md:flex-nowrap flex-col md:flex-row"
      style={{ width: "100%" }}
    >
      <div className="flex flex-col items-center justify-center">
        <div
          className={`${Styles.bluetextcolor} my-5 text-center font-bold`}
        >
          {/* Low Fares Guaranteed */}
          We Guarantee Low Fares
        </div>
        <div
          className="text-center text-[14px]"
          style={{ width: "50%", fontWeight: "600" }}
        >
          {/* Exclusive phone-only discounts on airfares with partner
          airlines cannot be found online */}
          {`Enjoy exclusive discounts on airfares with partner airlines
          that you won't find online`}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div
          className={`${Styles.bluetextcolor} text-center my-5 font-bold`}
        >
          {/* Secured and Trusted */}
          Secure and Reliable
        </div>
        <div
          className="text-center text-[14px]"
          style={{ width: "50%", fontWeight: "600" }}
        >
          {/* Ensuring your privacy and data security is always our top
          priority, and we are endorsed by ASTA, CST, BBB, ARC, and
          IATA. */}
          We prioritize your privacy and data security, backed by
          endorsements from ASTA, CST, BBB, ARC, and IATA
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</>
)
}

export default ExploreComp;
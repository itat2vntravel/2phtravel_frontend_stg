import Review from "@/page-modules/ReviewSlider/Review";


function PeopleReview()
{
return(
    <>
  
<div className="bg-[#f7f8fc]">
<div className="container mx-auto ">
  <div className={` flex justify-around items-center flex-wrap`}>
    <div className="flex flex-col items-center justify-center lg:flex-1 flex-wrap">
      <div
        className="text-3xl md:text-3xl  lg:text-4xl my-5 font-bold flex flex-row lg:flex-col justify-start items-start"
        style={{ width: "81%" }}
      >
        What people say
        {/* <br /> */}
        <p
          style={{ color: " rgb(187, 20, 15)" }}
          className="pl-2 lg:pl-0"
        >
          {" "}
          about us.
        </p>
      </div>
      <div
        className="text-lg md:text-lg lg:text-xl my-5 md:my-0 text-[14px]"
        style={{ color: "#666666", width: "80%" }}
      >
        Our clients share countless smiles with us due to our
        exceptional services, and we cherish each one.
      </div>
    </div>

    <Review />
  </div>
</div>
</div>
</>
)
}

export default PeopleReview;
import Image from "next/image";
import Link from "next/link";
import Styles from "../../app/home.module.css";
import HomeTitle from "@/components/Title/HomeTitle";
import HomeSliderComponent from "@/page-modules/Home/HomePageSlider";

import { Container } from "@mui/material";

function AmazingDeals(offerData:any){
  const offer = offerData["offer"]
    return(
        <>
        <div className={Styles.gap}>
        <HomeTitle title="Explore amazing flight deals for the Philippines" />
        { offer?.length >= 3 ? (
            <HomeSliderComponent>
              {offer?.map(
                (
                  res: {
                    offer_image_url: string;
                    offer_price: string;
                    city_name: string;
                  },
                  index: number
                ) => (
                  <Link
                    href={`/bookflights/${res.city_name}`}
                    key={index}
                    className="relative border-none transition ease-in-out delay-150 hover:translate-y-[-15px] p-5 "
                  >
                    <Image
                      src={res.offer_image_url}
                      alt={res.city_name}
                      width={350}
                      height={55}
                      priority
                      className=" w-[344px] h-[344px] cursor-pointer"
                      style={{ borderRadius: "10px 10px 0 0" }}
                    />
                    <div className="flex justify-center">
                      <div className="p-3 font-serif italic font-bold">
                        {res.city_name}
                      </div>
                    </div>
                    <div>
                      <div
                        className="p-3 font-bold bg-slate-100 text-center text-black"
                        style={{
                          borderRadius: "0px 0px 10px 10px",
                        }}
                      >
                        Starting From{" "}
                        <span className="text-red-600">
                          ${res.offer_price} *
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </HomeSliderComponent>
          ) : (
            <div className="p-5 slider-container">
              <Container>
                <div className="exploresilder flex items-center justify-center">
                  {offer?.map(
                    (
                      res: {
                        offer_image_url: string;
                        offer_price: string;
                        city_name: string;
                      },
                      index: number
                    ) => (
                      <Link
                        href={`/bookflights/${res.city_name}`}
                        key={index}
                        className="relative border-none transition ease-in-out delay-150 hover:translate-y-[-15px] p-5 "
                      >
                        <Image
                          src={res.offer_image_url}
                          alt={res.city_name}
                          width={350}
                          height={55}
                          priority
                          className=" w-[344px] h-[344px] cursor-pointer"
                          style={{ borderRadius: "10px 10px 0 0" }}
                        />
                        <div>
                          <div className="p-3 font-serif italic font-bold">
                            {res.city_name}
                          </div>
                        </div>
                        <div>
                          <div
                            className="p-3 w-[344px] font-bold bg-slate-100 text-center text-black"
                            style={{
                              borderRadius: "0px 0px 10px 10px",
                            }}
                          >
                            Starting From{" "}
                            <span className="text-red-600">
                              ${res.offer_price} *
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </Container>
            </div>
          )
        }
      </div>
        </>
    )
}
export default AmazingDeals
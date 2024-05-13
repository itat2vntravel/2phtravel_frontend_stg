"use client";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Image from "next/image";
import React, { FC, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

import TravelPhilipines from "@/public/Login/place1.jpg";
import ManilaPhilipines from "@/public/about/download.jpg";
import CebuPhilipines from "@/public/about/cebu.jpg";
import ClarkPhilipines from "@/public/about/clark.jpg";
import DaveoPhilipines from "@/public/about/davao.jpg";
import FoodPhilipines from "@/public/about/food.jpg";
import CulturePhilipines from "@/public/about/culture.jpg";

import MapPhilipines from "@/public/about/map.jpg";
// Manila
import FirstPhilipines from "@/public/about/manila/1.jpg";
import SecondPhilipines from "@/public/about/manila/2.jpg";
import ThirdPhilipines from "@/public/about/manila/3.jpg";

// Cebu
import FirstCebu from "@/public/about/cebu/1.jpg";
import SecondCebu from "@/public/about/cebu/2.jpg";
import ThirdCebu from "@/public/about/cebu/3.jpg";

// Clark
import Firstclark from "@/public/about/clark/1.jpg";
import Secondclark from "@/public/about/clark/2.jpg";
import Thirdclark from "@/public/about/clark/3.jpg";

// Davao
import Firstdavao from "@/public/about/davao/1.jpg";
import Seconddavao from "@/public/about/davao/2.jpg";
import Thirddavao from "@/public/about/davao/3.jpg";

// Culture
import Firstculture from "@/public/about/culture/1.jpg";
import Secondculture from "@/public/about/culture/2.jpg";
import Thirdculture from "@/public/about/culture/3.jpg";

interface TravelBlogInterface {
  Titletext?: string;
}

const TravelBlogButton: FC<TravelBlogInterface> = ({ Titletext }) => {
  const [selectedBlog, setSelectedBlog] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "white",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <>
      <button
        onClick={() => {
          setModalOpen(true);
          setSelectedBlog(Titletext || "");
        }}
        className="text-customRed cursor-pointer flex w-full justify-end"
      >
        Read More
      </button>

      {selectedBlog === "Philippines" && (
        <Dialog
          open={ModalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md"
          //   className="w-[500px]"
        >
          <DialogTitle className="flex justify-between items-center gap-4">
            About Philipines{" "}
            <IoCloseOutline
              className="text-2xl cursor-pointer"
              onClick={() => {
                setModalOpen(false);
              }}
            />{" "}
          </DialogTitle>
          <hr></hr>
          <DialogContent>
            <div className="flex flex-col gap-4 text-justify">
              <div className="flex justify-center w-full">
                <Image
                  src={TravelPhilipines}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[450px] h-[200px]"
                />
              </div>
              <p>
                The Philippines, officially the Republic of the Philippines, is
                an archipelagic country in Southeast Asia made up of over 7,100
                islands in the shape of a triangle between the South China Sea
                and the Pacific Ocean. The country is bordered by the Philippine
                Sea to the east, the Celebes Sea to the south, the Sulu Sea to
                the southwest, and the South China Sea to the west and north.
              </p>
              <h1 className="flex ">Geography:</h1>
              <div className="flex justify-center w-full">
                <Image
                  src={MapPhilipines}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[200px] h-[200px]"
                />
              </div>
              <p>
                The Philippines is an archipelago comprising 7,641 islands, with
                a total land area of approximately 300,000 square kilometers
                (115,831 square miles). It is divided into three main
                geographical divisions: Luzon, Visayas, and Mindanao.
              </p>
              <h1>Capital:</h1>
              <div className="flex justify-center w-full">
                <Image
                  src={ManilaPhilipines}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                The capital city of the Philippines is Manila, located on Luzon
                Island. It is one of the most densely populated cities in the
                world.
              </p>
              <h1>Culture:</h1>
              <div className="flex justify-center w-full">
                <Image
                  src={CulturePhilipines}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                The Philippines has a rich cultural heritage influenced by
                indigenous traditions, Spanish colonization, American
                occupation, and neighboring Asian countries. It is known for its
                festivals, cuisine, music, dance, and religious practices.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {selectedBlog === "Manila" && (
        <Dialog
          open={ModalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md"
          // className="w-[500px]"
        >
          <DialogTitle className="flex justify-between items-center gap-4">
            Welcome To Manila{" "}
            <IoCloseOutline
              className="text-2xl cursor-pointer"
              onClick={() => {
                setModalOpen(false);
              }}
            />{" "}
          </DialogTitle>
          <hr></hr>
          <DialogContent>
            <div className="flex flex-col gap-4 text-justify">
              <div className="flex justify-center w-full">
                <Image
                  src={ManilaPhilipines}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[450px] h-[200px]"
                />
              </div>
              <p>
                Manila is a vibrant and bustling city located in the
                Philippines. It serves as the capital and one of the major
                cultural, economic, and political hubs of the country.
              </p>
              <h1 className="flex underline mb-1">
                Some Famous Locations in Manila:
              </h1>
              <h3 className="text-customRed font-bold">Fort Santiago</h3>
              <div className="flex justify-center w-full">
                <Image
                  src={FirstPhilipines}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[200px] h-[200px]"
                />
              </div>
              <p>
                Fort Santiago, built in 1571, is a citadel built by Spanish
                navigator and governor Miguel López de Legazpi for the newly
                established city of Manila in the Philippines. The defense
                fortress is located in Intramuros, the walled city of Manila.
                The fort is one of the most important historical sites in
                Manila.
              </p>
              <h3 className="text-customRed font-bold">Frizal Park</h3>
              <div className="flex justify-center w-full">
                <Image
                  src={SecondPhilipines}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                Rizal Park, Luneta, also known as Luneta Park or simply Luneta,
                is a historic urban park located in Ermita, Manila. It is
                considered one of the largest urban parks in the Philippines,
                covering an area of 58 hectares.
              </p>
              <h3 className="text-customRed font-bold">Manila Ocean Park</h3>
              <div className="flex justify-center w-full">
                <Image
                  src={ThirdPhilipines}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                The Manila Ocean Park, also known as Ocean Park, is an
                oceanarium in Manila, Philippines. It is owned by China Oceanis
                Philippines Inc., a subsidiary of China Oceanis Inc., a
                Singaporean-registered firm. It is located behind the Quirino
                Grandstand at Rizal Park.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {selectedBlog === "Cebu" && (
        <Dialog
          open={ModalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md"
          // className="w-[500px]"
        >
          <DialogTitle className="flex justify-between items-center gap-4">
            Place To Visit in Cebu{" "}
            <IoCloseOutline
              className="text-2xl cursor-pointer"
              onClick={() => {
                setModalOpen(false);
              }}
            />{" "}
          </DialogTitle>
          <hr></hr>
          <DialogContent>
            <div className="flex flex-col gap-4 text-justify">
              <div className="flex justify-center w-full">
                <Image
                  src={CebuPhilipines}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[450px] h-[200px]"
                />
              </div>
              <p>
                Cebu is a province of the Philippines, in the country’s Central
                Visayas region, comprising Cebu Island and more than 150 smaller
                surrounding islands and islets. Its prosperous port capital,
                Cebu City, retains landmarks from its 16th-century Spanish
                colonial past, including the Basilica Minore del Santo Niño
                church and triangular Fort San Pedro. Tops, an observation deck
                on Mt. Busay, has sweeping views over the city.
              </p>
              <h1 className="flex underline mb-1">
                Some Famous Locations in Cebu:
              </h1>
              <h3 className="text-customRed font-bold">yCasa Gorordo Museum</h3>
              <div className="flex justify-center w-full">
                <Image
                  src={FirstCebu}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[200px] h-[200px]"
                />
              </div>
              <p>
                Casa Gorordo is a house museum located in the historic Parian
                district of Cebu, the oldest city in the Philippines. Built in
                the 1850&rsquo;s, it lived through several important social
                changes that shaped modern Filipino identity.
              </p>
              <h3 className="text-customRed font-bold">Kawasan Falls</h3>
              <div className="flex justify-center w-full">
                <Image
                  src={SecondCebu}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                The Kawasan Falls is a three-stage cascade of clear turquoise
                water from mountain springs located in the jungles of the Cebu
                island. The falls are part of the Kawasan River in Badian, Cebu,
                in the Philippines.
              </p>
              <h3 className="text-customRed font-bold">Cebu Taoist Temple</h3>
              <div className="flex justify-center w-full">
                <Image
                  src={ThirdCebu}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                Cebu Taoist Temple is a Taoist temple located in Beverly Hills
                Subdivision of Cebu City, Philippines.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {selectedBlog === "Clark" && (
        <Dialog
          open={ModalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md"
          // className="w-[500px]"
        >
          <DialogTitle className="flex justify-between items-center gap-4">
            Place To Visit in Clark{" "}
            <IoCloseOutline
              className="text-2xl cursor-pointer"
              onClick={() => {
                setModalOpen(false);
              }}
            />{" "}
          </DialogTitle>
          <hr></hr>
          <DialogContent>
            <div className="flex flex-col gap-4 text-justify">
              <div className="flex justify-center w-full">
                <Image
                  src={ClarkPhilipines}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[450px] h-[200px]"
                />
              </div>
              <p>
                Clark may refer to the following areas in the Philippines: Clark
                Air Base, a former American air base on Luzon Island, now used
                by the Philippine Air Force. Clark Freeport Zone, this former US
                airbase is a lively cosmopolitan hub with country clubs and
                theme parks, casinos and restaurants, hot springs and hiking,
                and malls galore.
              </p>
              <h1 className="flex underline mb-1">
                Some Famous Locations in Clark:
              </h1>
              <h3 className="text-customRed font-bold">Aqua Planet</h3>
              <div className="flex justify-center w-full">
                <Image
                  src={Firstclark}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                Aqua Planet is a water park at the Clark Freeport Zone in
                Pampanga, Philippines. It is the largest water park in the
                Philippines. It is an exciting water park in Clark Pampanga that
                provides a fun-filled day for visitors of all ages. It has
                thrilling water slides, lazy rivers
              </p>
              <h3 className="text-customRed font-bold">
                Philippine International Hot Air Balloon Fiesta
              </h3>
              <div className="flex justify-center w-full">
                <Image
                  src={Secondclark}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[300px] h-[200px]"
                />
              </div>
              <p>
                The Philippine International Hot Air Balloon Fiesta is an annual
                four-day air-sporting event held each year between January and
                February at the Clark Freeport Zone in Pampanga. This event was
                also invented by the late Nelson Mayo in the late 1900&apos;s.
              </p>
              <h3 className="text-customRed font-bold">Bayanihan Park</h3>
              <div className="flex justify-center w-full">
                <Image
                  src={Thirdclark}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                Bayanihan Park is a park in Clark Freeport Zone, Angeles City,
                Philippines.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {selectedBlog === "Davao" && (
        <Dialog
          open={ModalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md"
          // className="w-[500px]"
        >
          <DialogTitle className="flex justify-between items-center gap-4">
            Place To Visit in Davao{" "}
            <IoCloseOutline
              className="text-2xl cursor-pointer"
              onClick={() => {
                setModalOpen(false);
              }}
            />{" "}
          </DialogTitle>
          <hr></hr>
          <DialogContent>
            <div className="flex flex-col gap-4 text-justify">
              <div className="flex justify-center w-full">
                <Image
                  src={DaveoPhilipines}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[450px] h-[200px]"
                />
              </div>
              <p>
                Davao City, on the southern Philippine island of Mindanao, is a
                coastal commercial center near 2,954m-high Mount Apo, the
                country’s highest peak. In the city center, People’s Park is
                known for its colorful indigenous sculptures and lighted
                fountains. It&apos;s also home to Durian Dome, named after the
                pungent, spiky fruit that grows in abundance on Mindanao. The
                Davao River cuts through the city.
              </p>
              <h1 className="flex underline mb-1">
                Some Famous Locations in Daveo:
              </h1>
              <h3 className="text-customRed font-bold">SM Lanang Premier</h3>
              <div className="flex justify-center w-full">
                <Image
                  src={Firstdavao}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                SM Lanang, is an indoor four-story shopping mall in Lanang,
                Davao City, Philippines along Jose P. Laurel Avenue and within
                S.P Dakudao loop. It was the first SM Supermall to be called
                &quot;Premier&quot;. The mall is owned by Henry Sy, Sr. and
                managed by SM Prime Holdings.
              </p>
              <h3 className="text-customRed font-bold">
                Philippine Eagle Center
              </h3>
              <div className="flex justify-center w-full">
                <Image
                  src={Seconddavao}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[300px] h-[200px]"
                />
              </div>
              <p>
                Forest-like conservation center for endangered Philippine
                eagles, offering educational tours.
              </p>
              <h3 className="text-customRed font-bold">Mount Apo</h3>
              <div className="flex justify-center w-full">
                <Image
                  src={Thirddavao}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                Mount Apo, also known as Apo Sandawa, is a dormant, solfataric
                stratovolcano on the island of Mindanao in the Philippines. It
                the highest mountain in the Philippines, with an elevation of
                2,954 meters (9,692 feet) above sea level. It also the
                24th-highest peak of an island on Earth.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {selectedBlog === "food" && (
        <Dialog
          open={ModalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md"
          // className="w-[500px]"
        >
          <DialogTitle className="flex justify-between items-center gap-4">
            Must try meals in the Philippines
            <IoCloseOutline
              className="text-2xl cursor-pointer"
              onClick={() => {
                setModalOpen(false);
              }}
            />{" "}
          </DialogTitle>
          <hr></hr>
          <DialogContent>
            <div className="flex flex-col gap-4 text-justify">
              <div className="flex justify-center w-full">
                <Image
                  src={FoodPhilipines}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[450px] h-[200px]"
                />
              </div>
              <p>
                Filipino cuisine is composed of the cuisines of more than a
                hundred distinct ethnolinguistic groups found throughout the
                Philippine archipelago.Adobo is one of the most popular Filipino
                dishes and is considered unofficially by many as the national
                dish. It usually consists of pork or chicken, sometimes both,
                stewed or braised in a sauce usually made from vinegar, cooking
                oil, garlic, bay leaf, peppercorns, and soy sauce.
              </p>
              <h1 className="flex underline mb-1">
                Some Famous Dish in Philipines:
              </h1>
              <h3 className="text-customRed font-bold">Chicken Adobo</h3>
              <div className="flex justify-center w-full">
                <Image
                  src="/about/food/thirdfood.jpg"
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                This dish has the chicken marinated in vinegar, soy sauce, and
                garlic for several hours. The chicken is pan fried until it
                develops a nice brown crust, then the marinade is added into the
                pan to create a thick glaze before the chicken is served with
                rice. “Adobo” refers to the vinegar marinating process
                originally used for food preservation, and while many other
                cuisines have incorporated the technique in different ways, it’s
                believed to have originated in the Philippines.
              </p>
              <h3 className="text-customRed font-bold">Pancit bihon</h3>
              <div className="flex justify-center w-full">
                <Image
                  src="/about/food/twofood.jpg"
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[300px] h-[200px]"
                />
              </div>
              <p>
                “Pancit” refers to any type of Filipino noodle dish, but the
                most popular and common is pancit bihon. Bihon noodles are an
                especially thin rice noodle that’s stir fried with soy sauce, a
                citrus element, some fish sauce, a protein (chicken, shrimp,
                pork, and Chinese sausage are all very popular), and a mix of
                vegetables.
              </p>
              <h3 className="text-customRed font-bold">Sisig</h3>
              <div className="flex justify-center w-full">
                <Image
                  src="/about/food/thirdfood.jpg"
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                Also known as “sizzling sisig,” pork sisig features meat from
                the pig’s head (including the ears and snout) marinated in
                vinegar and served with chicken liver. This indulgent, fatty
                dish is often served on a sizzling plate and topped with a raw
                egg, making the egg whites cook right on top of the food. While
                pig’s head is traditional, you can get really creative with this
                dish. For instance, San Francisco’s Elena Una restaurant offers
                you a choice of oyster, tofu-mushroom, or bagnet (crispy pork
                belly) sisig!
              </p>
              <h3 className="text-customRed font-bold">Bibingka</h3>
              <div className="flex justify-center w-full">
                <Image
                  src="/about/food/fourthfood.jpg"
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                With the holidays upon us, it wouldn’t be right to leave off
                this holiday dessert. Traditionally served at Christmastime in
                the overwhelmingly Roman Catholic Philippines, the bibingka is a
                coconut rice cake that’s mildly sweet. While another tradition
                includes cooking the cakes in special terra cotta pots and
                banana leaves with hot coals surrounding it (giving the bibingka
                a pleasant charred crust), modern cooks can replicate that
                caramelization by placing a nearly done bibingka under the
                broiler.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {selectedBlog === "culture" && (
        <Dialog
          open={ModalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md"
          // className="w-[500px]"
        >
          <DialogTitle className="flex justify-between items-center gap-4">
            Philippines Cultures
            <IoCloseOutline
              className="text-2xl cursor-pointer"
              onClick={() => {
                setModalOpen(false);
              }}
            />{" "}
          </DialogTitle>
          <hr></hr>
          <DialogContent>
            <div className="flex flex-col gap-4 text-justify">
              <div className="flex justify-center w-full">
                <Image
                  src={CulturePhilipines}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[450px] h-[200px]"
                />
              </div>
              <p>
                Filipino values are, for the most part, centered around
                maintaining social harmony, motivated primarily by the desire to
                be accepted within a group. The main sanction against diverging
                from these values are the concepts of Hiya, roughly translated
                as a sense of shame, and Amor propio or self-esteem.
              </p>
              <h1 className="flex underline mb-1">
                Some Famous Dish in Philipines:
              </h1>
              <h3 className="text-customRed font-bold">
                Customs and Traditions
              </h3>
              <div className="flex justify-center w-full">
                <Image
                  src={Firstculture}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                Aside from the three-month Christmas celebrations, the Filipinos
                have a series of different customs and traditions. One of the
                long-standing Sunday tradition is cockfighting. Albeit it’s
                considered illegal or cruel in some nations, it is very normal
                for Filipinos. It is a common sight in the streets and involves
                gathering, betting, and feasting over Filipino dishes.
              </p>
              <h3 className="text-customRed font-bold">Religion</h3>
              <div className="flex justify-center w-full">
                <Image
                  src={Secondculture}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[300px] h-[200px]"
                />
              </div>
              <p>
                Filipinos take pride in their religion. While most Filipinos
                practise Christianity as their religion, Islam and other
                indigenous faiths are also seen in movement. Their religious
                spirit can be witnessed during festivals such as Ati-Atihan,
                Kaamulan, Panabenga, and the famous 3-month-celebration for
                Christmas. Jesus’ birthday is a massive fiesta in the
                Philippines. The celebrations start in October with decorations
                and music and peak in December with carols, mass, and midnight
                feasting.
              </p>
              <h3 className="text-customRed font-bold">Filipino Values</h3>
              <div className="flex justify-center w-full">
                <Image
                  src={Thirdculture}
                  alt="travelPhilipines"
                  width={600}
                  height={300}
                  className="w-[400px] h-[200px]"
                />
              </div>
              <p>
                Society norms and values are of utmost importance in the
                Philippines. Filipino values are primarily rooted in
                relationships and societal obligations. Children are taught to
                be respectful from the early stages of their life, by
                introducing phrases ‘po’ and ‘opo’ when talking to adults.
                Societal and group acceptance is very much sought after in
                Filipino society. Attending to what people think and respecting
                everyone is a vital part of Filipino values.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TravelBlogButton;

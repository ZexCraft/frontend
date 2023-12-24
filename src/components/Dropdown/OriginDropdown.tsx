import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
export default function OriginDropdown() {
  const [origin, setOrigin] = useState("");
  const [originDropdown, setOriginDropdown] = useState(false);
  return (
    <>
      <button
        className="text-white font-semibold text-xl text-left flex justify-between my-6 mx-1"
        onClick={() => {
          if (originDropdown) setOriginDropdown(false);
          else setOriginDropdown(true);
        }}
      >
        <p>Origin</p>
        <FontAwesomeIcon
          icon={faChevronDown}
          size="xs"
          className="my-auto"
          flip={originDropdown ? "vertical" : "horizontal"}
        ></FontAwesomeIcon>
      </button>
      {originDropdown && (
        <div className="flex flex-col">
          <button
            className={`flex mx-2 mb-2 text-left py-2 px-2 rounded-lg ${
              origin == "injective" ? "bg-[#d0d1d1] text-black" : "text-white"
            }`}
            onClick={() => {
              if (origin == "injective") {
                setOrigin("");
              } else {
                setOrigin("injective");
              }
            }}
          >
            <Image
              src={"/logo.png"}
              height={35}
              width={35}
              alt="punk"
              className="rounded-lg "
            />
            <p className="flex-1 ml-3 font-semibold text-lg my-auto">InCraft</p>
            <p className=" text-lg font-semibold my-auto">10</p>
          </button>
          <button
            className={`flex mx-2 mb-2 text-left py-2 px-2 rounded-lg ${
              origin == "bayc" ? "bg-[#d0d1d1] text-black" : "text-white"
            }`}
            onClick={() => {
              if (origin == "bayc") {
                setOrigin("");
              } else {
                setOrigin("bayc");
              }
            }}
          >
            <Image
              src={"/collections/bayc.png"}
              height={35}
              width={35}
              alt="bayc"
              className="rounded-lg"
            />
            <p className="flex-1 ml-3 font-semibold  text-lg my-auto">
              Bored Ape Yacht Club
            </p>
            <p className=" text-lg font-semibold my-auto">23</p>
          </button>
          <button
            className={`flex mx-2 mb-2 text-left py-2 px-2 rounded-lg ${
              origin == "punk" ? "bg-[#d0d1d1] text-black" : "text-white"
            }`}
            onClick={() => {
              if (origin == "punk") {
                setOrigin("");
              } else {
                setOrigin("punk");
              }
            }}
          >
            <Image
              src={"/collections/punk.png"}
              height={35}
              width={35}
              alt="punk"
              className="rounded-lg"
            />
            <p className="flex-1 ml-3 font-semibold text-lg my-auto">
              Crypto Punks
            </p>
            <p className=" text-lg font-semibold my-auto">3</p>
          </button>

          <button
            className={`flex mx-2 mb-2 text-left py-2 px-2 rounded-lg ${
              origin == "beanz" ? "bg-[#d0d1d1] text-black" : "text-white"
            }`}
            onClick={() => {
              if (origin == "beanz") {
                setOrigin("");
              } else {
                setOrigin("beanz");
              }
            }}
          >
            <Image
              src={"/collections/beanz.jpeg"}
              height={35}
              width={35}
              alt="beanz"
              className="rounded-lg"
            />
            <p className="flex-1 ml-3 font-semibold text-lg my-auto">Beanz</p>
            <p className=" text-lg font-semibold my-auto">89</p>
          </button>
          <button
            className={`flex mx-2 mb-2 text-left py-2 px-2 rounded-lg ${
              origin == "nouns" ? "bg-[#d0d1d1] text-black" : "text-white"
            }`}
            onClick={() => {
              if (origin == "nouns") {
                setOrigin("");
              } else {
                setOrigin("nouns");
              }
            }}
          >
            <Image
              src={"/collections/nouns.jpg"}
              height={35}
              width={35}
              alt="nouns"
              className="rounded-lg"
            />
            <p className="flex-1 ml-3 font-semibold  text-lg my-auto">Nouns</p>
            <p className=" text-lg font-semibold my-auto">12</p>
          </button>
          <button
            className={`flex mx-2 mb-2 text-left py-2 px-2 rounded-lg ${
              origin == "azuki" ? "bg-[#d0d1d1] text-black" : "text-white"
            }`}
            onClick={() => {
              if (origin == "azuki") {
                setOrigin("");
              } else {
                setOrigin("azuki");
              }
            }}
          >
            <Image
              src={"/collections/azuki.jpeg"}
              height={35}
              width={35}
              alt="azuki"
              className="rounded-lg"
            />
            <p className="flex-1 ml-3 font-semibold  text-lg my-auto">Azuki</p>
            <p className=" text-lg font-semibold my-auto">1</p>
          </button>
        </div>
      )}
    </>
  );
}

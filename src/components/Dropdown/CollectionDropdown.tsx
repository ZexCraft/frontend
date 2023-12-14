import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
export default function CollectionDropdown() {
  const [collection, setCollection] = useState("");
  const [collectionDropdown, setCollectionDropdown] = useState(false);
  return (
    <>
      <button
        className="text-white font-semibold text-xl text-left flex justify-between my-6 mx-1"
        onClick={() => {
          if (collectionDropdown) setCollectionDropdown(false);
          else setCollectionDropdown(true);
        }}
      >
        <p>Collection</p>
        <FontAwesomeIcon
          icon={faChevronDown}
          size="xs"
          className="my-auto"
          flip={collectionDropdown ? "vertical" : "horizontal"}
        ></FontAwesomeIcon>
      </button>
      {collectionDropdown && (
        <div className="flex flex-col">
          <button
            className={`flex mx-2 mb-2 text-left py-2 px-2 rounded-lg ${
              collection == "pego" ? "bg-[#d0d1d1] text-black" : "text-white"
            }`}
            onClick={() => {
              if (collection == "pego") {
                setCollection("");
              } else {
                setCollection("pego");
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
            <p className="flex-1 ml-3 font-semibold text-lg my-auto">
              PegoCraft
            </p>
            <p className=" text-lg font-semibold my-auto">10</p>
          </button>
          <button
            className={`flex mx-2 mb-2 text-left py-2 px-2 rounded-lg ${
              collection == "bayc" ? "bg-[#d0d1d1] text-black" : "text-white"
            }`}
            onClick={() => {
              if (collection == "bayc") {
                setCollection("");
              } else {
                setCollection("bayc");
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
              collection == "punk" ? "bg-[#d0d1d1] text-black" : "text-white"
            }`}
            onClick={() => {
              if (collection == "punk") {
                setCollection("");
              } else {
                setCollection("punk");
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
              collection == "beanz" ? "bg-[#d0d1d1] text-black" : "text-white"
            }`}
            onClick={() => {
              if (collection == "beanz") {
                setCollection("");
              } else {
                setCollection("beanz");
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
              collection == "nouns" ? "bg-[#d0d1d1] text-black" : "text-white"
            }`}
            onClick={() => {
              if (collection == "nouns") {
                setCollection("");
              } else {
                setCollection("nouns");
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
              collection == "azuki" ? "bg-[#d0d1d1] text-black" : "text-white"
            }`}
            onClick={() => {
              if (collection == "azuki") {
                setCollection("");
              } else {
                setCollection("azuki");
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

import { faChevronDown, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export default function Nfts() {
  const [search, setSearch] = useState("");
  const [blockchain, setBlockchain] = useState("all");
  const [blockchainDropdown, setBlockchainDropdown] = useState(false);
  const [mode, setMode] = useState("all");
  const [modeDropdown, setModeDropdown] = useState(false);
  const [origin, setOrigin] = useState("");
  const [originDropdown, setOriginDropdown] = useState(false);
  const [rarity, setRarity] = useState("");
  const [rarityDropdown, setRarityDropdown] = useState(false);
  const [powerup, setPowerup] = useState("");
  const [powerupDropdown, setPowerupDropdown] = useState(false);
  const [collection, setCollection] = useState("");
  const [collectionDropdown, setCollectionDropdown] = useState(false);

  return (
    <div className="min-h-[90vh]">
      <div className="flex  mt-20 font-theme ">
        <div className="flex w-full">
          <button className="bg-[#25272b] flex p-3 rounded-lg text-[#d0d1d1] hover:bg-[#303238]">
            <FontAwesomeIcon
              icon={faFilter}
              className="my-auto"
            ></FontAwesomeIcon>
            <p className="font-semibold pl-3">Filters</p>
          </button>
          <input
            type="text"
            placeholder={"Search by NFTs"}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="font-theme mx-5 placeholder:font-black font-bold placeholder:text-[#6c6f70] text-md  placeholder:text-md bg-[#25272b] pl-6 text-white  rounded-lg focus:outline-none  focus:border-black w-[50%] flex-1 "
          />
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <div className="flex flex-col border border-[#3c3f41] w-[20%] rounded-xl px-5 pt-4 ">
          <button
            className="text-white font-semibold text-xl text-left flex justify-between my-6 mx-1"
            onClick={() => {
              if (blockchainDropdown) setBlockchainDropdown(false);
              else setBlockchainDropdown(true);
            }}
          >
            <p>Blockchain</p>
            <FontAwesomeIcon
              icon={faChevronDown}
              size="xs"
              className="my-auto"
              flip={blockchainDropdown ? "vertical" : "horizontal"}
            ></FontAwesomeIcon>
          </button>
          {blockchainDropdown && (
            <div className="flex justify-around bg-[#25272b]  rounded-xl my-3">
              <button
                className={
                  blockchain == "all"
                    ? `bg-[#d0d1d1] w-full h-full p-3 flex justify-center rounded-xl`
                    : `w-full h-full p-3 flex justify-center rounded-xl`
                }
                onClick={() => {
                  setBlockchain("all");
                }}
              >
                <p
                  className={`font-semibold ${
                    blockchain == "all" ? `text-black` : "text-[#d0d1d1]"
                  }`}
                >
                  All
                </p>
              </button>
              <button
                className={
                  blockchain == "avalanche"
                    ? `bg-[#d0d1d1] w-full h-full p-3 flex justify-center rounded-xl`
                    : `w-full h-full p-3 flex justify-center rounded-xl`
                }
                onClick={() => {
                  setBlockchain("avalanche");
                }}
              >
                <Image
                  src={"/avalanche.png"}
                  height={20}
                  width={20}
                  alt="avalanche"
                />
              </button>
              <button
                className={
                  blockchain == "sepolia"
                    ? `bg-[#d0d1d1] w-full h-full p-3 flex justify-center rounded-xl`
                    : `w-full h-full p-3 flex justify-center rounded-xl`
                }
                onClick={() => {
                  setBlockchain("sepolia");
                }}
              >
                <Image
                  src={"/blue-ethereum.png"}
                  height={20}
                  width={20}
                  alt="sepolia"
                />
              </button>
              <button
                className={
                  blockchain == "polygon"
                    ? `bg-[#d0d1d1] w-full h-full p-3 flex justify-center rounded-xl`
                    : `w-full h-full p-3 flex justify-center rounded-xl`
                }
                onClick={() => {
                  setBlockchain("polygon");
                }}
              >
                <Image
                  src={"/polygon.png"}
                  height={20}
                  width={20}
                  alt="polygon"
                />
              </button>
            </div>
          )}
          <div className="h-[1px] bg-[#3c3f41]  "></div>
          <button
            className="text-white font-semibold text-xl text-left flex justify-between my-6 mx-1"
            onClick={() => {
              if (modeDropdown) setModeDropdown(false);
              else setModeDropdown(true);
            }}
          >
            <p>Mode</p>
            <FontAwesomeIcon
              icon={faChevronDown}
              size="xs"
              className="my-auto"
              flip={modeDropdown ? "vertical" : "horizontal"}
            ></FontAwesomeIcon>
          </button>
          {modeDropdown && (
            <div className="flex justify-around bg-[#25272b]  text-white rounded-xl my-3">
              <button
                className={
                  mode == "all"
                    ? `bg-[#d0d1d1] text-black w-full h-full p-3 flex justify-center rounded-xl`
                    : `w-full h-full p-3 flex justify-center rounded-xl`
                }
                onClick={() => {
                  setMode("all");
                }}
              >
                <p className=" font-semibold text-md">All</p>
              </button>
              <button
                className={
                  mode == "create"
                    ? `bg-[#d0d1d1] text-black w-full h-full p-3 flex justify-center rounded-xl`
                    : `w-full h-full p-3 flex justify-center rounded-xl`
                }
                onClick={() => {
                  setMode("create");
                }}
              >
                <p className=" font-semibold text-md">Create</p>
              </button>
              <button
                className={
                  mode == "breed"
                    ? `bg-[#d0d1d1] text-black w-full h-full p-3 flex justify-center rounded-xl`
                    : `w-full h-full p-3 flex justify-center rounded-xl`
                }
                onClick={() => {
                  setMode("breed");
                }}
              >
                <p className=" font-semibold text-md">Breed</p>
              </button>
              <button
                className={
                  mode == "import"
                    ? `bg-[#d0d1d1] text-black w-full h-full p-3 flex justify-center rounded-xl`
                    : `w-full h-full p-3 flex justify-center rounded-xl`
                }
                onClick={() => {
                  setMode("import");
                }}
              >
                <p className=" font-semibold text-md">Import</p>
              </button>
            </div>
          )}
          <div className="h-[1px] bg-[#3c3f41]  "></div>
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
                  origin == "bayc" ? "bg-[#d0d1d1] text-black" : "text-white"
                }`}
                onClick={() => {
                  setOrigin("bayc");
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
                  setOrigin("punk");
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
                  setOrigin("beanz");
                }}
              >
                <Image
                  src={"/collections/beanz.jpeg"}
                  height={35}
                  width={35}
                  alt="beanz"
                  className="rounded-lg"
                />
                <p className="flex-1 ml-3 font-semibold text-lg my-auto">
                  Beanz
                </p>
                <p className=" text-lg font-semibold my-auto">89</p>
              </button>
              <button
                className={`flex mx-2 mb-2 text-left py-2 px-2 rounded-lg ${
                  origin == "nouns" ? "bg-[#d0d1d1] text-black" : "text-white"
                }`}
                onClick={() => {
                  setOrigin("nouns");
                }}
              >
                <Image
                  src={"/collections/nouns.jpg"}
                  height={35}
                  width={35}
                  alt="nouns"
                  className="rounded-lg"
                />
                <p className="flex-1 ml-3 font-semibold  text-lg my-auto">
                  Nouns
                </p>
                <p className=" text-lg font-semibold my-auto">12</p>
              </button>
              <button
                className={`flex mx-2 mb-2 text-left py-2 px-2 rounded-lg ${
                  origin == "azuki" ? "bg-[#d0d1d1] text-black" : "text-white"
                }`}
                onClick={() => {
                  setOrigin("azuki");
                }}
              >
                <Image
                  src={"/collections/azuki.jpeg"}
                  height={35}
                  width={35}
                  alt="azuki"
                  className="rounded-lg"
                />
                <p className="flex-1 ml-3 font-semibold  text-lg my-auto">
                  Azuki
                </p>
                <p className=" text-lg font-semibold my-auto">1</p>
              </button>
            </div>
          )}
          <div className="h-[1px] bg-[#3c3f41]  "></div>
          <button
            className="text-white font-semibold text-xl text-left flex justify-between my-6 mx-1"
            onClick={() => {
              if (rarityDropdown) setRarityDropdown(false);
              else setRarityDropdown(true);
            }}
          >
            <p>Rarity</p>
            <FontAwesomeIcon
              icon={faChevronDown}
              size="xs"
              className="my-auto"
              flip={rarityDropdown ? "vertical" : "horizontal"}
            ></FontAwesomeIcon>
          </button>
          {rarityDropdown && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  rarity == "Uncommon"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setRarity("Uncommon");
                }}
              >
                Uncommon
              </button>
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  rarity == "Common"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setRarity("Common");
                }}
              >
                Common
              </button>
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  rarity == "Rare"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setRarity("Rare");
                }}
              >
                Rare
              </button>
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  rarity == "Epic"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setRarity("Epic");
                }}
              >
                Epic
              </button>
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  rarity == "Legendary"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setRarity("Legendary");
                }}
              >
                Legendary
              </button>
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  rarity == "ZexStar"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setRarity("ZexStar");
                }}
              >
                ZexStar
              </button>
            </div>
          )}
          <div className="h-[1px] bg-[#3c3f41]  "></div>
          <button
            className="text-white font-semibold text-xl text-left flex justify-between my-6 mx-1"
            onClick={() => {
              if (powerupDropdown) setPowerupDropdown(false);
              else setPowerupDropdown(true);
            }}
          >
            <p>Powerup</p>
            <FontAwesomeIcon
              icon={faChevronDown}
              size="xs"
              className="my-auto"
              flip={powerupDropdown ? "vertical" : "horizontal"}
            ></FontAwesomeIcon>
          </button>
          {powerupDropdown && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  powerup == "+1 Boost"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setPowerup("+1 Boost");
                }}
              >
                +1 Boost
              </button>
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  powerup == "+2 Boost"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setPowerup("+2 Boost");
                }}
              >
                +2 Boost
              </button>
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  powerup == "+5 Boost"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setPowerup("+5 Boost");
                }}
              >
                +5 Boost
              </button>
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  powerup == "+10 Boost"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setPowerup("+10 Boost");
                }}
              >
                +10 Boost
              </button>
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  powerup == "+1 Rare"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setPowerup("+1 Rare");
                }}
              >
                +1 Rare
              </button>
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  powerup == "+1 Epic"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setPowerup("+1 Epic");
                }}
              >
                +1 Epic
              </button>
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  powerup == "+1 Legend"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setPowerup("+1 Legend");
                }}
              >
                +1 Legend
              </button>
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  powerup == "+1 Star"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setPowerup("+1 Star");
                }}
              >
                +1 Star
              </button>
              <button
                className={` rounded-lg p-3  text-lg font-semibold ${
                  powerup == "+1 Twins"
                    ? "bg-[#d0d1d1] text-black"
                    : "bg-[#25272b] text-white"
                }`}
                onClick={() => {
                  setPowerup("Twins");
                }}
              >
                Twins
              </button>
            </div>
          )}
          <div className="h-[1px] bg-[#3c3f41]  "></div>
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
                  collection == "bayc"
                    ? "bg-[#d0d1d1] text-black"
                    : "text-white"
                }`}
                onClick={() => {
                  setCollection("bayc");
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
                  collection == "punk"
                    ? "bg-[#d0d1d1] text-black"
                    : "text-white"
                }`}
                onClick={() => {
                  setCollection("punk");
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
                  collection == "beanz"
                    ? "bg-[#d0d1d1] text-black"
                    : "text-white"
                }`}
                onClick={() => {
                  setCollection("beanz");
                }}
              >
                <Image
                  src={"/collections/beanz.jpeg"}
                  height={35}
                  width={35}
                  alt="beanz"
                  className="rounded-lg"
                />
                <p className="flex-1 ml-3 font-semibold text-lg my-auto">
                  Beanz
                </p>
                <p className=" text-lg font-semibold my-auto">89</p>
              </button>
              <button
                className={`flex mx-2 mb-2 text-left py-2 px-2 rounded-lg ${
                  collection == "nouns"
                    ? "bg-[#d0d1d1] text-black"
                    : "text-white"
                }`}
                onClick={() => {
                  setCollection("nouns");
                }}
              >
                <Image
                  src={"/collections/nouns.jpg"}
                  height={35}
                  width={35}
                  alt="nouns"
                  className="rounded-lg"
                />
                <p className="flex-1 ml-3 font-semibold  text-lg my-auto">
                  Nouns
                </p>
                <p className=" text-lg font-semibold my-auto">12</p>
              </button>
              <button
                className={`flex mx-2 mb-2 text-left py-2 px-2 rounded-lg ${
                  collection == "azuki"
                    ? "bg-[#d0d1d1] text-black"
                    : "text-white"
                }`}
                onClick={() => {
                  setCollection("azuki");
                }}
              >
                <Image
                  src={"/collections/azuki.jpeg"}
                  height={35}
                  width={35}
                  alt="azuki"
                  className="rounded-lg"
                />
                <p className="flex-1 ml-3 font-semibold  text-lg my-auto">
                  Azuki
                </p>
                <p className=" text-lg font-semibold my-auto">1</p>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <DropDown /> */}
    </div>
  );
}

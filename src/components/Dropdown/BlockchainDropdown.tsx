import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export default function BlockchainDropdown() {
  const [blockchain, setBlockchain] = useState("all");
  const [blockchainDropdown, setBlockchainDropdown] = useState(false);
  return (
    <>
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
            <Image src={"/polygon.png"} height={20} width={20} alt="polygon" />
          </button>
        </div>
      )}
    </>
  );
}

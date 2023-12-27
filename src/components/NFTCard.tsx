import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useNetwork } from "wagmi";

export default function NFTCard({
  image,
  owner,
  address,
  rarity,
  tokenId,
  mode,
  size,
  imageAlt,
}: {
  image: string;
  owner: string;
  address: string;
  rarity: string;
  tokenId: string;
  mode: string;
  imageAlt: string;
  size: number;
}) {
  const { chain } = useNetwork();
  useEffect(() => {
    console.log("Image ", image);
    console.log("ImageAlt ", imageAlt);
  }, []);
  return (
    <div
      className={`border-[1px] border-[#3c3f41] p-2 rounded-lg font-theme ${
        rarity == "Common"
          ? "bg-[#9C9C9C]"
          : rarity == "Uncommon"
          ? "bg-[#0CB520]"
          : rarity == "Rare"
          ? "bg-[#144FD6]"
          : rarity == "Epic"
          ? "bg-[#7214D6]"
          : rarity == "Legendary"
          ? "bg-[#C39700]"
          : "bg-[#E11B00]"
      }`}
    >
      <button
        onClick={() => {
          window.open(image, "_blank");
        }}
      >
        <Image
          src={imageAlt}
          width={size}
          height={size}
          alt="logo"
          className="bg-white rounded-lg"
        />
      </button>
      <p className="text-[#CCCCCC] font-semibold text-sm mt-2 mx-2 text-center">
        by {mode}
      </p>
      <Link
        href={"/nfts/" + address + (chain?.id == 88 ? "/mainnet" : "/testnet")}
        className="my-2"
      >
        <div className="flex justify-around mx-2">
          <div className="w-full">
            <p className="font-semibold text-center">Token Id</p>
          </div>
          <div className="w-full">
            <p className="font-semibold text-center">Rarity</p>
          </div>
        </div>
        <div className="flex justify-around mx-2">
          <div className="w-full">
            <p className=" text-center">#{tokenId}</p>
          </div>
          <div className="w-full">
            <p className="text-center">{rarity}</p>
          </div>
        </div>
      </Link>

      <div className="rounded-lg  bg-[#25272b] text-center  ">
        <div className="flex justify-around ">
          <div
            className="flex justify-center cursor-pointer"
            onClick={() => {
              if (chain?.id == 88) {
                window.open(`https://vicscan.xyz/address/${address}`);
              } else {
                window.open(`https://testnet.vicscan.xyz/address/${address}`);
              }
            }}
          >
            <p className="text-sm font-semibold text-[#9c9e9e] my-2 mr-2">
              Account
            </p>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="text-[#9c9e9e] text-sm font-normal my-auto"
            />
          </div>
          <div
            className="flex justify-center  cursor-pointer"
            onClick={() => {
              if (chain?.id == 88) {
                window.open(`https://vicscan.xyz/address/${owner}`);
              } else {
                window.open(`https://testnet.vicscan.xyz/address/${owner}`);
              }
            }}
          >
            <p className="text-sm font-semibold text-[#9c9e9e] my-2 mr-2">
              Creator
            </p>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="text-[#9c9e9e] text-sm font-normal my-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

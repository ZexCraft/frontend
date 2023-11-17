import Image from "next/image";
import Dropdown from "./Dropdown";
import { shortenEthereumAddress } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import NFTCard from "./NFTCard";

export default function Profile(props: { address: string }) {
  const { address } = props;
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex flex-col justify-start min-h-[90vh]  ">
      <div className="bg-[#25272b] w-full h-[25vh] mt-10 rounded-2xl"></div>
      <div className="relative">
        <div className="absolute bottom-24 left-10 w-full h-full">
          <Image
            src={"/collections/punk.png"}
            width={150}
            height={150}
            alt="pfp"
            className="rounded-full"
          ></Image>
        </div>
        <div className="mt-20 ml-10">
          <p className=" font-semibold text-4xl ">Gabrielaxy</p>
          <Link
            href={"https://etherscan.io/address/" + address}
            target="_blank"
            className="mt-1 ml-1 tracking-wide font-semibold text-[#9c9e9e]"
          >
            {shortenEthereumAddress(address)} &nbsp;
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Link>
        </div>
      </div>
      <div className="flex mt-16">
        <button
          onClick={() => {
            setSelected(0);
          }}
          className={`mx-2  ${
            selected == 0
              ? "bg-[#d0d1d1] text-black"
              : "hover:bg-[#25272b] text-white "
          } p-2 rounded-md font-semibold `}
        >
          Owned NFTs
        </button>
        <button
          onClick={() => {
            setSelected(1);
          }}
          className={`mx-2  ${
            selected == 1
              ? "bg-[#d0d1d1] text-black"
              : "hover:bg-[#25272b] text-white "
          } p-2 rounded-md font-semibold `}
        >
          Relationships
        </button>
        <button
          onClick={() => {
            setSelected(2);
          }}
          className={`mx-2  ${
            selected == 2
              ? "bg-[#d0d1d1] text-black"
              : "hover:bg-[#25272b] text-white "
          } p-2 rounded-md font-semibold `}
        >
          Family Trees
        </button>
        <button
          onClick={() => {
            setSelected(3);
          }}
          className={`mx-2  ${
            selected == 3
              ? "bg-[#d0d1d1] text-black"
              : "hover:bg-[#25272b] text-white "
          } p-2 rounded-md font-semibold `}
        >
          Powerups
        </button>
      </div>
      <div className="mx-6 h-[1px] bg-[#3c3f41] mt-6"></div>
      <div className="flex justify-between mt-10">
        <div className="w-[25%]">
          <Dropdown />
        </div>
        <div>
          <div className={`grid grid-cols-5 gap-3 mx-8`}>
            <NFTCard
              image={"/sample-generated/1.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/sample-generated/2.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"breed ❤️"}
            />
            <NFTCard
              image={"/sample-generated/3.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/sample-generated/4.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/sample-generated/5.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/sample-generated/1.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/sample-generated/2.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/sample-generated/3.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/sample-generated/4.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/sample-generated/5.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/sample-generated/4.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/sample-generated/5.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

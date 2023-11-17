import Dropdown from "@/components/Dropdown";
import NFTCard from "@/components/NFTCard";
import { faArrowRight, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Nfts() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(false);
  return (
    <div className="min-h-[90vh] ">
      <div className="flex  mt-20 font-theme ">
        <div className="flex w-full">
          <button
            className={`${
              filters
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-[#d0d1d1] hover:bg-[#303238]"
            } flex p-3 rounded-lg  `}
            onClick={() => {
              if (filters) setFilters(false);
              else setFilters(true);
            }}
          >
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
        {filters && (
          <div className="w-[30%]">
            <Dropdown />
          </div>
        )}
        <div>
          <div
            className={`grid ${
              filters ? "grid-cols-5" : "grid-cols-6"
            } gap-3 mx-8`}
          >
            <NFTCard
              image={"/1.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/2.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"breed ❤️"}
            />
            <NFTCard
              image={"/3.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/4.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/5.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/1.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/2.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/3.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/4.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/5.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/4.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
            <NFTCard
              image={"/5.png"}
              owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
              rarity={"ZexStar"}
              tokenId={"69"}
              mode={"create ✨"}
            />
          </div>
        </div>

        {/* <Link
          href={"/nfts"}
          className="bg-[#25272b] m-8 py-4 flex justify-center rounded-xl"
        >
          <p className="mr-2 font-semibold text-lg font-theme">
            View all ZexNFTs
          </p>
          <FontAwesomeIcon icon={faArrowRight} className="text-lg my-auto" />
        </Link> */}
      </div>
    </div>
  );
}

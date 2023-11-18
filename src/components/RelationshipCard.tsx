import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
type NFT = {
  image: string;
  rarity: string;
  tokenId: string;
  mode: string;
};
export default function RelationshipCard({
  nft1,
  nft2,
  relationship,
  family,
}: {
  nft1: NFT;
  nft2: NFT;
  relationship: string;
  family: string;
}) {
  return (
    <div className="border-[1px] border-[#3c3f41] p-2 rounded-lg font-theme">
      <div className="flex">
        <div>
          <Image
            src={nft1.image}
            width={200}
            height={200}
            alt="logo"
            className="bg-white rounded-l-lg"
          />
          <p className="text-[#9c9e9e] font-semibold text-sm mt-2 mx-2 text-center">
            by {nft1.mode}
          </p>
          <div className="my-2">
            <div className="flex justify-around mx-2">
              <div className="w-full">
                <p className="font-semibold text-center text-sm">Token Id</p>
              </div>
              <div className="w-full">
                <p className="font-semibold text-center text-sm">Rarity</p>
              </div>
            </div>
            <div className="flex justify-around mx-2">
              <div className="w-full">
                <p className=" text-center text-sm">#{nft1.tokenId}</p>
              </div>
              <div className="w-full">
                <p className="text-center text-sm">{nft1.rarity}</p>
              </div>
            </div>
          </div>
          <div className="rounded-l-lg  bg-[#25272b] text-center  ">
            <div
              className="flex justify-center  cursor-pointer"
              onClick={() => {
                window.open(
                  `https://sepolia.etherscan.io/address/${relationship}`
                );
              }}
            >
              <p className="text-xs font-semibold text-[#9c9e9e] my-2 mr-2">
                Relationship
              </p>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-[#9c9e9e] text-xs font-normal my-auto"
              />
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute top-16 right-[30px]  w-full h-full">
            <p className="text-5xl">❤️</p>
          </div>
        </div>
        <div>
          <Image
            src={nft2.image}
            width={200}
            height={200}
            alt="logo"
            className="bg-white rounded-r-lg"
          />
          <p className="text-[#9c9e9e] font-semibold text-sm mt-2 mx-2 text-center">
            by {nft2.mode}
          </p>
          <div className="my-2">
            <div className="flex justify-around mx-2">
              <div className="w-full">
                <p className="font-semibold text-center text-sm">Token Id</p>
              </div>
              <div className="w-full">
                <p className="font-semibold text-center text-sm">Rarity</p>
              </div>
            </div>
            <div className="flex justify-around mx-2">
              <div className="w-full">
                <p className=" text-center text-sm">#{nft2.tokenId}</p>
              </div>
              <div className="w-full">
                <p className="text-center text-sm">{nft2.rarity}</p>
              </div>
            </div>
          </div>

          <div className="rounded-r-lg  bg-[#25272b] text-center  ">
            <div
              className="flex justify-center cursor-pointer"
              onClick={() => {
                window.open(`https://sepolia.etherscan.io/address/${family}`);
              }}
            >
              <p className="text-xs font-semibold text-[#9c9e9e] my-2 mr-2">
                Family
              </p>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-[#9c9e9e] text-xs font-normal my-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

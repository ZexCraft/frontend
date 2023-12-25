import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
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
  return (
    <div className="border-[1px] border-[#3c3f41] p-2 rounded-lg font-theme ">
      <button
        onClick={() => {
          console.log(imageAlt);
          window.open(imageAlt, "_blank");
        }}
      >
        <Image
          src={image}
          width={size}
          height={size}
          alt="logo"
          className="bg-white rounded-lg"
        />
      </button>
      <p className="text-[#9c9e9e] font-semibold text-sm mt-2 mx-2 text-center">
        by {mode}
      </p>
      <Link href={"/nfts/" + address} className="my-2">
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
              window.open(`https://mumbai.polygonscan.com/address/${address}`);
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
              window.open(`https://mumbai.polygonscan.com/address/${owner}`);
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

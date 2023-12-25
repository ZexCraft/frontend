import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useNetwork } from "wagmi";

export default function TreeCard({
  nft1,
  nft2,
  family,
  race,
  count,
}: {
  nft1: string;
  nft2: string;
  family: string;
  race: string;
  count: string;
}) {
  const { chain } = useNetwork();
  return (
    <div className="border-[1px] border-[#3c3f41] p-2 rounded-lg font-theme">
      <div className="flex">
        <div>
          <Link href={"/trees/" + family}>
            <Image
              src={nft1}
              width={250}
              height={250}
              alt="logo"
              className="bg-white rounded-l-lg"
            />
          </Link>
          {/* <p className="text-[#9c9e9e] font-semibold text-sm mt-2 mx-2 text-center">
            by {nft1.mode}
          </p> */}
          <div className="my-2">
            <div className="w-full">
              <p className="font-semibold text-center text-sm">Race</p>
            </div>
            <div className="w-full">
              <p className=" text-center text-sm">{race}</p>
            </div>
          </div>
          <div className="rounded-l-lg  bg-[#25272b] text-center  ">
            <div
              className="flex justify-center  cursor-pointer"
              onClick={() => {
                window.open(`https://mumbai.polygonscan.com/${family}`);
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
          <Link href={"/trees/" + family}>
            <div className="absolute top-16 right-[30px]  w-full h-full">
              <p className="text-5xl">🌳</p>
            </div>
          </Link>
        </div>
        <div>
          <Link href={"/trees/" + family}>
            <Image
              src={nft2}
              width={250}
              height={250}
              alt="logo"
              className="bg-white rounded-r-lg"
            />
          </Link>
          {/* <p className="text-[#9c9e9e] font-semibold text-sm mt-2 mx-2 text-center">
            by {nft2.mode}
          </p> */}
          <div className="my-2">
            <div className="w-full">
              <p className="font-semibold text-center text-sm">Family Count</p>
            </div>
            <div className="w-full">
              <p className=" text-center text-sm">{count}</p>
            </div>
          </div>

          <div className="rounded-r-lg  bg-[#25272b] text-center  ">
            <div
              className="flex justify-center cursor-pointer"
              onClick={() => {
                window.open(`https://mumbai.polygonscan.com/${family}`);
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

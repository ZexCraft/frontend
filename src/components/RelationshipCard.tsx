import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useNetwork } from "wagmi";
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
}: {
  nft1: NFT;
  nft2: NFT;
  relationship: string;
}) {
  const { chain } = useNetwork();
  return (
    <div className="border-[1px] border-[#3c3f41] p-2 rounded-lg font-theme">
      <div className="flex">
        <div>
          <Link href={"/relations/" + relationship}>
            <Image
              src={nft1.image}
              width={200}
              height={200}
              alt="logo"
              className="bg-white rounded-l-lg"
            />
          </Link>
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
                if (chain?.name == "PEGO Mainnet")
                  window.open(
                    `https://scan.pego.network/address/${relationship}`
                  );
                if (chain?.name == "PEGO Testnet") {
                  window.open(
                    `https://scan.pegotest.net/address/${relationship}`
                  );
                }
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
          <Link href={"/relations/" + relationship}>
            <div className="absolute top-16 right-[30px]  w-full h-full">
              <p className="text-5xl">❤️</p>
            </div>
          </Link>
        </div>
        <div>
          <Link href={"/relations/" + relationship}>
            <Image
              src={nft2.image}
              width={200}
              height={200}
              alt="logo"
              className="bg-white rounded-r-lg"
            />
          </Link>

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
                if (chain?.name == "PEGO Mainnet")
                  window.open(
                    `https://scan.pego.network/address/${relationship}`
                  );
                if (chain?.name == "PEGO Testnet") {
                  window.open(
                    `https://scan.pegotest.net/address/${relationship}`
                  );
                }
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

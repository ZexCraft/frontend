import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNetwork } from "wagmi";

export default function TreeNodeElement({
  nodeDatum,
  toggleNode,
}: {
  nodeDatum: any;
  toggleNode: any;
}) {
  const { chain } = useNetwork();
  return (
    <>
      <div className="border-[1px] border-black p-2 rounded-t-lg font-theme">
        <div className="flex">
          <div>
            <a
              href={
                "/nfts/" +
                nodeDatum.attributes.nft1.tokenAddress +
                "-" +
                nodeDatum.attributes.nft1.tokenId
              }
            >
              <img
                src={nodeDatum.attributes.nft1.image}
                width={200}
                height={200}
                alt="logo"
                className="bg-white rounded-l-lg"
              />
            </a>
            <p className="text-[#9c9e9e] font-semibold text-sm mt-2 mx-2 text-center">
              by {nodeDatum.attributes.nft1.mode}
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
                  <p className=" text-center text-sm">
                    #{nodeDatum.attributes.nft1.tokenId}
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-center text-sm">
                    {nodeDatum.attributes.nft1.rarity}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-16 right-[30px]  w-full h-full">
              <p className="text-5xl">❤️</p>
            </div>
          </div>
          <div>
            <a
              href={
                "/nfts/" +
                nodeDatum.attributes.nft2.tokenAddress +
                "-" +
                nodeDatum.attributes.nft2.tokenId
              }
            >
              <img
                src={nodeDatum.attributes.nft2.image}
                width={200}
                height={200}
                alt="logo"
                className="bg-white rounded-r-lg"
              />
            </a>

            <p className="text-[#9c9e9e] font-semibold text-sm mt-2 mx-2 text-center">
              by {nodeDatum.attributes.nft2.mode}
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
                  <p className=" text-center text-sm">
                    #{nodeDatum.attributes.nft2.tokenId}
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-center text-sm">
                    {nodeDatum.attributes.nft2.rarity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg  bg-[#25272b] text-center  ">
          <div
            className="flex justify-center  cursor-pointer"
            onClick={() => {
              if (chain?.name == "PEGO Mainnet")
                window.open(
                  `https://scan.pego.network/address/${nodeDatum.attributes.relationship}`
                );
              if (chain?.name == "PEGO Testnet") {
                window.open(
                  `https://scan.pegotest.net/address/${nodeDatum.attributes.relationship}`
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
      {nodeDatum.children && (
        <div
          className={`rounded-b-lg ${
            nodeDatum.__rd3t.collapsed ? "bg-white" : "bg-black"
          }   text-center`}
        >
          <div
            className="flex justify-center  cursor-pointer"
            onClick={toggleNode}
          >
            <p
              className={`text-xs font-bold ${
                nodeDatum.__rd3t.collapsed ? "text-black" : "text-white"
              } my-2 mr-2`}
            >
              {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
            </p>
            {/* <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-[#9c9e9e] text-xs font-normal my-auto"
              /> */}
          </div>
        </div>
      )}
    </>
  );
}

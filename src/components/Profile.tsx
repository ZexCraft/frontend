import Image from "next/image";
import Dropdown from "./Dropdown";
import { shortenEthereumAddress } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import getNftsByOwner from "@/utils/supabase/get-nfts-by-owner";
import resolveRarity from "@/utils/resolveRarity";

export default function Profile(props: { address: string }) {
  const { address } = props;
  const [selected, setSelected] = useState(0);
  const [ownedNfts, setOwnedNfts] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [familyTrees, setFamilyTrees] = useState([]);
  const [powerups, setPowerups] = useState([]);

  useEffect(() => {
    console.log(selected);
    if (selected == 0) {
      (async function () {
        const nfts = await getNftsByOwner({ address: address });
        console.log(nfts.response);
        setOwnedNfts(nfts.response as any);
      })();
    }
    console.log("Owned NFTs");
    console.log(ownedNfts);
  }, [selected]);
  return (
    <div className="flex flex-col justify-start min-h-[90vh]  ">
      <Image
        src={"/cover.gif"}
        width={1000}
        height={600}
        alt="cover"
        style={{
          backgroundImage: 'url("/cover.gif")',
          backgroundSize: "cover",
        }}
        className="bg-[#25272b] w-full h-[35vh] mt-10 rounded-2xl"
      />
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
            {selected == 0 &&
              ownedNfts.length > 0 &&
              ownedNfts.map((nft: any) => {
                return (
                  <NFTCard
                    image={nft.image}
                    imageAlt={nft.image_alt}
                    owner={nft.parent}
                    address={nft.contract_address}
                    rarity={resolveRarity(nft.rarity)}
                    tokenId={nft.token_id}
                    mode={nft.type == 0 ? "create ✨" : "breed ❤️"}
                    size={300}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

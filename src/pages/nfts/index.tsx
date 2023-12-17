import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import NFTCard from "@/components/NFTCard";
import PageNavigation from "@/components/PageNavigation";
import resolveRarity from "@/utils/resolveRarity";
import getNfts from "@/utils/supabase/get-nfts";
import { faArrowRight, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useNetwork, useSignMessage, useWalletClient } from "wagmi";

import { WalletClient, encodePacked, keccak256, toBytes } from "viem";
import signMessage from "@/utils/sign/signMessage";
import getPermitSignature from "@/utils/getPermitSignature";

export default function Nfts() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(true);
  const { address } = useAccount();
  const [nfts, setNfts] = useState([]);
  const [tokenURI, setTokenURI] = useState("jeex");
  const [signData, setSignData] = useState("");
  const { data: walletClient } = useWalletClient();
  const [sig, setSig] = useState("");

  useEffect(() => {
    (async function () {
      const nfts = await getNfts();
      console.log(nfts.response);
      setNfts(nfts.response as any);
    })();
  }, []);

  useEffect(() => {
    const encodedData = keccak256(
      encodePacked(
        ["string", "string", "address"],
        ["INCRAFT_MINT", tokenURI, address as `0x${string}`]
      )
    );
    setSignData(encodedData);
    console.log("encodedData");
    console.log(encodedData);
  }, [tokenURI, address]);

  return (
    <Layout>
      <div className="min-h-[90vh] mt-20">
        <PageNavigation />
        <div className="flex   font-theme ">
          <div className="flex w-full">
            <button
              className={`${
                filters
                  ? "bg-[#d0d1d1] text-black"
                  : "bg-[#25272b] text-[#d0d1d1] hover:bg-[#303238]"
              } flex p-3 rounded-lg  `}
              onClick={async () => {
                console.log("Token URI: ", tokenURI);
                console.log("Addresss: ", address);
                try {
                  const { v, r, s } = await getPermitSignature({
                    walletClient: walletClient as WalletClient,
                    nonce: 0,
                    name: "CraftToken",
                    chainId: 80001,
                    tokenAddress: "0x5193326E0fFD65C4433C2589466071dd831cd838",
                    spender: "0x0429A2Da7884CA14E53142988D5845952fE4DF6a",
                    value: "1000000000000000000",
                    deadline:
                      "115792089237316195423570985008687907853269984665640564039457584007913129639935",
                  });
                  console.log("v: ", v);
                  console.log("r: ", r);
                  console.log("s: ", s);
                } catch (e) {
                  console.log(e);
                }
                //  setFilters(!filters);
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
              {nfts.length > 0 &&
                nfts.map((nft: any) => {
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
    </Layout>
  );
}

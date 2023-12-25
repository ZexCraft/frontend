import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import NFTCard from "@/components/NFTCard";
import PageNavigation from "@/components/PageNavigation";
import resolveRarity from "@/utils/resolveRarity";
import getNfts from "@/utils/supabase/get-nfts";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAccount, useNetwork, useWalletClient } from "wagmi";

export default function Nfts() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(true);
  const [nfts, setNfts] = useState([]);
  const { chain } = useNetwork();

  useEffect(() => {
    (async function () {
      const nfts = await getNfts({
        chainId: (chain?.id as number).toString(),
      });
      console.log(nfts.response);
      setNfts(nfts.response as any);
    })();
  }, []);

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
                setFilters(!filters);
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
                filters
                  ? "grid-cols-4 desktop:grid-cols-5"
                  : "grid-cols-5 desktop:grid-cols-6"
              } gap-3 mx-8`}
            >
              {nfts.length > 0 &&
                nfts.map((nft: any) => {
                  return (
                    <NFTCard
                      image={nft.image}
                      imageAlt={nft.image_alt}
                      owner={nft.parent}
                      address={nft.address}
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

import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import PageNavigation from "@/components/PageNavigation";
import RelationshipCard from "@/components/RelationshipCard";
import getRelationships from "@/utils/supabase/get-relationships";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Relations() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(true);
  const [relationships, setRelationships] = useState([]);

  useEffect(() => {
    (async function () {
      const rels = await getRelationships();
      console.log(rels.response);
      setRelationships(rels.response as any);
    })();
  }, []);
  return (
    <Layout>
      <div className="min-h-[90vh] mt-20 ">
        <PageNavigation />
        <div className="flex  font-theme ">
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
              placeholder={"Search by Relationships"}
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
              <RelationshipCard
                nft1={{
                  image: "/sample-generated/1.png",
                  rarity: "Rare",
                  mode: "create ✨",
                  tokenId: "69",
                }}
                nft2={{
                  image: "/sample-generated/2.png",
                  rarity: "Legend",
                  mode: "import ⬇️",
                  tokenId: "234",
                }}
                relationship="Siblings"
                family="PegoStar"
              />
              <RelationshipCard
                nft1={{
                  image: "/sample-generated/1.png",
                  rarity: "Rare",
                  mode: "create ✨",
                  tokenId: "69",
                }}
                nft2={{
                  image: "/sample-generated/2.png",
                  rarity: "Legend",
                  mode: "import ⬇️",
                  tokenId: "234",
                }}
                relationship="Siblings"
                family="PegoStar"
              />
              <RelationshipCard
                nft1={{
                  image: "/sample-generated/1.png",
                  rarity: "Rare",
                  mode: "create ✨",
                  tokenId: "69",
                }}
                nft2={{
                  image: "/sample-generated/2.png",
                  rarity: "Legend",
                  mode: "import ⬇️",
                  tokenId: "234",
                }}
                relationship="Siblings"
                family="PegoStar"
              />
              <RelationshipCard
                nft1={{
                  image: "/sample-generated/1.png",
                  rarity: "Rare",
                  mode: "create ✨",
                  tokenId: "69",
                }}
                nft2={{
                  image: "/sample-generated/2.png",
                  rarity: "Legend",
                  mode: "import ⬇️",
                  tokenId: "234",
                }}
                relationship="Siblings"
                family="PegoStar"
              />
              <RelationshipCard
                nft1={{
                  image: "/sample-generated/1.png",
                  rarity: "Rare",
                  mode: "create ✨",
                  tokenId: "69",
                }}
                nft2={{
                  image: "/sample-generated/2.png",
                  rarity: "Legend",
                  mode: "import ⬇️",
                  tokenId: "234",
                }}
                relationship="Siblings"
                family="PegoStar"
              />
              <RelationshipCard
                nft1={{
                  image: "/sample-generated/1.png",
                  rarity: "Rare",
                  mode: "create ✨",
                  tokenId: "69",
                }}
                nft2={{
                  image: "/sample-generated/2.png",
                  rarity: "Legend",
                  mode: "import ⬇️",
                  tokenId: "234",
                }}
                relationship="Siblings"
                family="PegoStar"
              />
              <RelationshipCard
                nft1={{
                  image: "/sample-generated/1.png",
                  rarity: "Rare",
                  mode: "create ✨",
                  tokenId: "69",
                }}
                nft2={{
                  image: "/sample-generated/2.png",
                  rarity: "Legend",
                  mode: "import ⬇️",
                  tokenId: "234",
                }}
                relationship="Siblings"
                family="PegoStar"
              />
              <RelationshipCard
                nft1={{
                  image: "/sample-generated/1.png",
                  rarity: "Rare",
                  mode: "create ✨",
                  tokenId: "69",
                }}
                nft2={{
                  image: "/sample-generated/2.png",
                  rarity: "Legend",
                  mode: "import ⬇️",
                  tokenId: "234",
                }}
                relationship="Siblings"
                family="PegoStar"
              />
            </div>
          </div>

          {/* <Link
          href={"/nfts"}
          className="bg-[#25272b] m-8 py-4 flex justify-center rounded-xl"
        >
          <p className="mr-2 font-semibold text-lg font-theme">
            View all CraftNFTs
          </p>
          <FontAwesomeIcon icon={faArrowRight} className="text-lg my-auto" />
        </Link> */}
        </div>
      </div>
    </Layout>
  );
}

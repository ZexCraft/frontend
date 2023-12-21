import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import PageNavigation from "@/components/PageNavigation";
import TreeCard from "@/components/TreeCard";
import getNft from "@/utils/supabase/get-nft";
import getRelationships from "@/utils/supabase/get-relationships";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";

export default function Trees() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(true);
  const { chain } = useNetwork();
  const [trees, setTrees] = useState<any>([]);

  useEffect(() => {
    (async function () {
      const rels = await getRelationships({
        chainId: (chain?.id as number).toString(),
      });
      console.log(rels.response);
      let tempRelationships = [];
      for (let i = 0; i < rels.response.length; i++) {
        const nft1 = await getNft({
          address: rels.response[i].parent1,
          chainId: (chain?.id as number).toString(),
        });
        const nft2 = await getNft({
          address: rels.response[i].parent2,
          chainId: (chain?.id as number).toString(),
        });
        tempRelationships.push({
          nft1: nft1.response,
          nft2: nft2.response,
          relationship: rels.response[i].address,
        });
      }
      setTrees(tempRelationships);
    })();
  }, []);
  return (
    <Layout>
      <div className="min-h-[90vh] mt-20 ">
        <PageNavigation />

        <div className="flex   font-theme ">
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
              placeholder={"Search by Family Trees"}
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
              {trees &&
                trees.map((tree: any) => (
                  <TreeCard
                    nft1={tree.nft1.image}
                    nft2={tree.nft2.image}
                    count="10"
                    family={tree.relationship}
                    race="BAYC / ZEX"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

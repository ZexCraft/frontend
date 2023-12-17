import Layout from "@/components/Layout";
import NFTCard from "@/components/NFTCard";
import LoadingSpinner from "@/components/Spinner";
import { shortenEthereumAddress } from "@/utils";
import {
  abi,
  mumbaiDeployments,
  injectiveDeployments,
} from "@/utils/constants";
import resolveRarity from "@/utils/resolveRarity";
import createNft from "@/utils/supabase/create-nft";
import createRelationship from "@/utils/supabase/create-relationship";
import getNft from "@/utils/supabase/get-nft";
import getNftsByOwner from "@/utils/supabase/get-nfts-by-owner";
import getRelationship from "@/utils/supabase/get-relationship";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { decodeEventLog } from "viem";
import {
  useAccount,
  useContractEvent,
  useContractWrite,
  useNetwork,
} from "wagmi";

export default function Relation() {
  const router = useRouter();
  const { address } = useAccount();
  const { nft } = router.query;
  const [nftData, setNftData] = useState<any>(null);
  const [ownedNfts, setOwnedNfts] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { chain } = useNetwork();
  const [state, setState] = useState(0);
  useEffect(() => {
    // Fetch relationship
    (async function () {
      if (nft == undefined) return;
      const fetchedNft = await getNft({ address: nft as string });
      console.log(fetchedNft.response);
      setNftData(fetchedNft.response);

      const data = await getNftsByOwner({ address: address as string });
      console.log("Owned NFTs");
      console.log(data);
      setOwnedNfts(data.response);
    })();
  }, [router.query]);

  const { writeAsync: createRelationshipFunction } = useContractWrite({
    address:
      chain?.id == 80001
        ? (mumbaiDeployments.relRegistry as `0x${string}`)
        : (injectiveDeployments.relRegistry as `0x${string}`),
    abi: abi.relRegistry,
    functionName: "createRelationship",
    onSuccess(data) {
      console.log("Hash: ", data.hash);
    },
  });
  useContractEvent({
    address:
      chain?.id == 80001
        ? (mumbaiDeployments.relRegistry as `0x${string}`)
        : (injectiveDeployments.relRegistry as `0x${string}`),
    abi: abi.relRegistry,
    eventName: "RelationshipCreated",
    listener(log) {
      const event = decodeEventLog({
        abi: abi.relRegistry,
        data: log[0].data,
        topics: log[0].topics,
      });
      console.log(event.args);
      const args = event.args as {
        nft1: string;
        nft2: string;
        relationship: string;
      };
      createRelationship({
        address: args.relationship,
        parent1: args.nft1,
        parent2: args.nft2,
        isRoot: true,
      });
      setState(2);
    },
  });

  return (
    <Layout>
      <div className="min-h-[90vh] mt-20 w-[80%]  mx-auto flex space-x-32 justify-between">
        <div>
          <p className="text-4xl font-bold mb-8">Your NFTs</p>
          <div className="grid grid-cols-3 space-x-8">
            {ownedNfts &&
              ownedNfts.length > 0 &&
              ownedNfts.map((nft: any, index: number) => {
                return (
                  <div className=" border-[#3c3f41] border-2">
                    <NFTCard
                      image={nft.image}
                      imageAlt={nft.image_alt}
                      owner={nft.parent}
                      address={nft.contract_address}
                      rarity={resolveRarity(nft.rarity)}
                      tokenId={nft.token_id}
                      mode={nft.type == 0 ? "create ✨" : "breed ❤️"}
                      size={200}
                    />
                    <div className="flex justify-center my-4">
                      <button
                        onClick={() => {
                          setSelectedIndex(index);
                        }}
                        className={`${
                          selectedIndex == index
                            ? "bg-[#25272b] text-[#5b5e5b]"
                            : "bg-white text-black"
                        }
            px-4 py-2 rounded-xl font-semibold max-w-fit  `}
                      >
                        {selectedIndex == index ? "Selected ✅" : "Select"}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-center">
            {nftData != null && (
              <NFTCard
                image={nftData.image}
                imageAlt={nftData.image_alt}
                owner={nftData.parent}
                address={nftData.address}
                rarity={resolveRarity(nftData.rarity)}
                tokenId={nftData.token_id}
                size={300}
                mode={nftData.type == 0 ? "create ✨" : "breed ❤️"}
              />
            )}
          </div>
          <button
            className={`${
              state != 0 ? "bg-[#25272b] text-[#5b5e5b]" : "bg-white text-black"
            } px-4 py-2 rounded-xl font-semibold max-w-fit mx-auto mt-14`}
            onClick={async () => {
              setState(1);
              try {
                await createRelationshipFunction({
                  args: [],
                });
              } catch (e) {
                console.log(e);
              }
            }}
          >
            {state == 0
              ? "Create Relationship 💘"
              : state == 1
              ? "Loading..."
              : "Done ✅"}
          </button>
        </div>
      </div>
    </Layout>
  );
}

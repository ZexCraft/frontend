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
import signCreateRelationship from "@/utils/sign/signCreateRelationship";
import createRelationship from "@/utils/supabase/create-relationship";
import getNft from "@/utils/supabase/get-nft";
import getNftsByOwner from "@/utils/supabase/get-nfts-by-owner";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { WalletClient, decodeEventLog } from "viem";
import {
  useAccount,
  useContractEvent,
  useNetwork,
  useWalletClient,
} from "wagmi";

export default function Relation() {
  const router = useRouter();
  const { address } = useAccount();
  const { nft } = router.query;
  const [nftData, setNftData] = useState<any>(null);
  const [ownedNfts, setOwnedNfts] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const [state, setState] = useState(0);

  useEffect(() => {
    // Check if the selected Index already sent breeding request
  }, [selectedIndex]);

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
          <div className="grid grid-cols-5 space-x-8">
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
                        disabled={
                          selectedIndex == index ||
                          nftData.address == nft.contract_address
                        }
                        className={`${
                          selectedIndex == index
                            ? "bg-[#25272b] text-[#5b5e5b]"
                            : nftData.address == nft.contract_address
                            ? "bg-[#7c7c7c] text-[#2e3136] font-bold"
                            : "bg-white text-black"
                        }
            px-4 py-2 rounded-xl font-semibold max-w-fit  `}
                      >
                        {nftData.address == nft.contract_address
                          ? "Disabled ⛔"
                          : selectedIndex == index
                          ? "Selected ✅"
                          : "Select"}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <p className="text-4xl font-bold mt-12 mb-8">Breeding Requests</p>
          <div className="grid grid-cols-5 space-x-8">
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
                        disabled={
                          selectedIndex == index ||
                          nftData.address == nft.contract_address
                        }
                        className={`${
                          selectedIndex == index
                            ? "bg-[#25272b] text-[#5b5e5b]"
                            : nftData.address == nft.contract_address
                            ? "bg-[#7c7c7c] text-[#2e3136] font-bold"
                            : "bg-white text-black"
                        }
            px-4 py-2 rounded-xl font-semibold max-w-fit  `}
                      >
                        {nftData.address == nft.contract_address
                          ? "Disabled ⛔"
                          : selectedIndex == index
                          ? "Selected ✅"
                          : "Select"}
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
              try {
                const sig = await signCreateRelationship({
                  walletClient: walletClient as WalletClient,
                  breedingAccount: ownedNfts[selectedIndex]
                    .contract_address as `0x${string}`,
                  otherAccount: nftData.address as `0x${string}`,
                });
                setState(1);

                // Send it to the backend
              } catch (e) {
                console.log(e);
              }
            }}
          >
            {state == 0 ? "Create Relationship 💘" : "Request Sent ✅"}
          </button>
        </div>
      </div>
    </Layout>
  );
}

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
import createBreedRequest from "@/utils/supabase/create-breed-request";
import createRelationship from "@/utils/supabase/create-relationship";
import getBreedRequest from "@/utils/supabase/get-breed-request";
import getBreedRequests from "@/utils/supabase/get-breed-requests";
import getNft from "@/utils/supabase/get-nft";
import getNftsByOwner from "@/utils/supabase/get-nfts-by-owner";
import Image from "next/image";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { WalletClient, decodeEventLog } from "viem";
import {
  useAccount,
  useContractEvent,
  useContractWrite,
  useNetwork,
  useWalletClient,
} from "wagmi";

export default function Relation() {
  const router = useRouter();
  const { address } = useAccount();
  const { nft } = router.query;
  const [nftData, setNftData] = useState<any>(null);
  const [ownedNfts, setOwnedNfts] = useState<any>(null);
  const [breedingRequests, setBreedingRequests] = useState<any>(null); // [nft1, nft2, relationship
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const [state, setState] = useState(0);

  const { writeAsync: createRelationshipFunction } = useContractWrite({
    address: nftData.address,
    abi: abi.account,
    functionName: "createRelationship",
    onSuccess(data) {
      console.log("Hash: ", data.hash);
    },
  });

  useEffect(() => {
    if (nftData == null) return;
    if (nftData.parent == address) {
      (async function () {
        const res = await getBreedRequests({ receiver: nftData.address });
        console.log(res.response);
        let reqs = [];
        for (let i = 0; i < res.response.length; i++) {
          const nft = await getNft({ address: res.response[i].requester });
          reqs.push({
            ...nft.response,
            signature: res.response[i].requester_sig,
          });
        }
        setBreedingRequests(reqs);
      })();
    }
  }, [nftData]);

  useEffect(() => {
    if (ownedNfts == null) return;
    if (nftData == null) return;
    const requester = ownedNfts[selectedIndex].address;
    const receiver = nftData.address;
    console.log("GETTING BREED REQUEST");
    console.log(requester);
    console.log(receiver);
    (async function () {
      const result = await getBreedRequest({
        requester,
        receiver,
      });
      console.log(result);
      if (result.response != null) {
        setState(1);
      } else {
        setState(0);
      }
    })();
    // Check if the selected Index already sent breeding request
  }, [selectedIndex, nftData, ownedNfts]);

  useEffect(() => {
    // Fetch relationship
    (async function () {
      if (nft == undefined) return;
      const fetchedNft = await getNft({ address: nft as string });
      console.log(fetchedNft.response);
      setNftData(fetchedNft.response);
      if (fetchedNft.response) {
        if (fetchedNft.response.parent == address) {
          setBreedingRequests([]);
        } else {
          const data = await getNftsByOwner({ address: address as string });
          console.log("Owned NFTs");
          console.log(data);
          setOwnedNfts(data.response);
        }
      }
    })();
  }, []);

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
          {nftData && nftData.parent != address && (
            <button
              className={`${
                state != 0
                  ? "bg-[#25272b] text-[#5b5e5b]"
                  : "bg-white text-black"
              } px-4 py-2 rounded-xl font-semibold max-w-fit mx-auto mt-10`}
              disabled={state != 0}
              onClick={async () => {
                try {
                  const sig = await signCreateRelationship({
                    walletClient: walletClient as WalletClient,
                    breedingAccount: ownedNfts[selectedIndex]
                      .address as `0x${string}`,
                    otherAccount: nftData.address as `0x${string}`,
                  });
                  setState(1);
                  createBreedRequest({
                    receiver: nftData.address,
                    requester: ownedNfts[selectedIndex].address,
                    signature: sig,
                  });
                  // Send it to the backend
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              {state == 0 ? "Create Relationship 💘" : "Request Sent ⏳"}
            </button>
          )}
        </div>
        <div className="min-w-[60%] text-center">
          {ownedNfts && <p className="text-4xl font-bold mb-8">Your NFTs</p>}
          <div className="grid grid-cols-4 space-x-8 space-y-8">
            {ownedNfts &&
              ownedNfts.length > 0 &&
              ownedNfts.map((nft: any, index: number) => {
                return (
                  <div className="my-8 mx-4">
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
                          : "Select 🧿"}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          {breedingRequests && (
            <p className="text-4xl font-bold mb-8">Breeding Requests</p>
          )}
          {breedingRequests && breedingRequests.length > 0 ? (
            <div className="grid grid-cols-3 space-x-8">
              {breedingRequests.map((req: any, index: number) => {
                return (
                  <div className="my-8 mx-4">
                    <NFTCard
                      image={req.image}
                      imageAlt={req.image_alt}
                      owner={req.parent}
                      address={req.address}
                      rarity={resolveRarity(req.rarity)}
                      tokenId={req.token_id}
                      mode={req.type == 0 ? "create ✨" : "breed ❤️"}
                      size={200}
                    />
                    <div className="flex justify-center my-4">
                      <button
                        onClick={async () => {
                          const tx = await createRelationshipFunction({
                            args: [
                              mumbaiDeployments.relRegistry,
                              req.address,
                              req.signature,
                            ],
                          });
                          console.log(tx);

                          // TODO: Create relationship in the backend and remove it from the requests
                        }}
                        disabled={false}
                        className={`
                          bg-white text-black px-4 py-2 rounded-xl font-semibold max-w-fit  `}
                      >
                        {"Accept 🥰"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            breedingRequests &&
            breedingRequests.length == 0 && (
              <div className="flex flex-col text-[#9c9c9e] justify-center items-center h-full">
                <Image
                  src="/animations/sad.gif"
                  width={350}
                  height={350}
                  alt="sad cat"
                  className="mb-16 rounded-xl"
                />
                <p className="font-semibold text-lg">
                  Your NFT does not have any breeding requests yet 🥲
                </p>
                <p className="font-semibold text-lg">
                  Purchase boosts and keep hustling 🚀
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}

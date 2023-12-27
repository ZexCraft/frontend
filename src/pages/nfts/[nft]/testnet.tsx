import Layout from "@/components/Layout";
import NFTCard from "@/components/NFTCard";
import LoadingSpinner from "@/components/Spinner";
import { abi, testnetDeployments, mainnetDeployments } from "@/utils/constants";
import Confetti from "react-confetti";
import resolveRarity from "@/utils/resolveRarity";
import signCreateRelationship from "@/utils/sign/signCreateRelationship";
import createBreedRequest from "@/utils/supabase/create-breed-request";
import createRelationship from "@/utils/supabase/create-relationship";
import endBreedingRequest from "@/utils/supabase/end-breeding-request";
import getBreedRequest from "@/utils/supabase/get-breed-request";
import getBreedRequests from "@/utils/supabase/get-breed-requests";
import getNft from "@/utils/supabase/get-nft";
import getNftsByOwner from "@/utils/supabase/get-nfts-by-owner";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import useWindowSize from "@/hooks/useWindowSize";

export default function Relation() {
  const router = useRouter();
  const { address } = useAccount();
  const { nft } = router.query;
  const [nftData, setNftData] = useState<any>(null);
  const { width, height } = useWindowSize();
  const [ownedNfts, setOwnedNfts] = useState<any>(null);
  const [breedingRequests, setBreedingRequests] = useState<any>(null); // [nft1, nft2, relationship
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const [state, setState] = useState(0);
  const [txHash, setTxHash] = useState("");
  const [pairBred, setPairBred] = useState("");

  const { writeAsync: createRelationshipFunction } = useContractWrite({
    address: nftData != null ? nftData.address : "",
    abi: abi.account,
    functionName: "createRelationship",
    onSuccess(data) {
      console.log("Transaction Sent");
      console.log("Hash: ", data.hash);
      setTxHash(data.hash);
    },
  });
  useEffect(() => {
    console.log(nft);
    if (nft == undefined) return;
    if (chain?.id == 88) router.push("/nfts/" + nft + "/testnet");
    else if (chain?.id != 89) router.push("/");
  }, [chain?.id, nft]);

  useEffect(() => {
    if (ownedNfts == null || ownedNfts.length == 0) {
      setSelectedIndex(-1);
      return;
    }
    if (nftData == null) return;
    console.log(ownedNfts);
    setSelectedIndex(0);
    const requester =
      ownedNfts[selectedIndex == -1 ? 0 : selectedIndex].address;
    const receiver = nftData.address;
    console.log("GETTING BREED REQUEST");
    console.log(requester);
    console.log(receiver);
    (async function () {
      const result = await getBreedRequest({
        requester,
        chainId: (chain?.id as number).toString(),
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
    (async function () {
      console.log(nft);
      if (nft == undefined) return;
      const fetchedNft = await getNft({
        address: nft as string,
        chainId: (chain?.id as number).toString(),
      });

      console.log(fetchedNft.response);
      setNftData(fetchedNft.response);
      if (fetchedNft.response) {
        if (fetchedNft.response.parent != address) {
          const data = await getNftsByOwner({
            address: address as string,
            chainId: (chain?.id as number).toString(),
          });
          console.log("Owned NFTs");
          console.log(data);
          setOwnedNfts(data.response);
          setBreedingRequests(null);
        } else {
          setOwnedNfts([]);
          (async function () {
            const res = await getBreedRequests({
              receiver: fetchedNft.response.address,
              chainId: (chain?.id as number).toString(),
            });
            console.log(res.response);
            if (res.response != null) {
              let reqs = [];

              for (let i = 0; i < res.response.length; i++) {
                const nft = await getNft({
                  address: res.response[i].requester,
                  chainId: (chain?.id as number).toString(),
                });
                reqs.push({
                  ...nft.response,
                  signature: res.response[i].requester_sig,
                });
              }
              setBreedingRequests(reqs);
            } else {
              setBreedingRequests([]);
            }
          })();
        }
      }
    })();
  }, [address]);

  useContractEvent({
    address: testnetDeployments.relRegistry as `0x${string}`,
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
        parent1: string;
        parent2: string;
        signer1: string;
        signer2: string;
        relationship: string;
      };
      createRelationship({
        address: args.relationship,
        parent1: args.parent1,
        parent2: args.parent2,
        isRoot: true,
        chainId: (chain?.id as number).toString(),
        actualParent1: args.signer1,
        actualParent2: args.signer2,
      });
      endBreedingRequest({
        id: args.parent1 + args.parent2,
        chainId: (chain?.id as number).toString(),
      });
      setPairBred(args.parent2);
      setState(2);
      // router.push(`/relations/${args.relationship}`)
    },
  });

  return (
    <Layout>
      {txHash != "" && pairBred != "" && (
        <Confetti width={width} height={height} />
      )}

      <div className="min-h-[90vh] mt-20 w-[80%]  mx-auto flex space-x-32 justify-between">
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-col justify-center items-center space-y-4">
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
            {txHash != "" && (
              <div className="flex flex-col justify-center items-center text-sm text-[#9c9e9e]">
                <p className="font-semibold text-white">Tx Hash</p>
                <a
                  href={
                    chain?.id == 88
                      ? "https://vicscan.xyz/tx/" + txHash
                      : "https://testnet.vicscan.xyz/tx/" + txHash
                  }
                  target={"_blank"}
                >
                  {" "}
                  {txHash.substring(0, 10) +
                    "...." +
                    txHash.substring(txHash.length - 10)}
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="ml-2"
                  />
                </a>
                <p className="mt-2 font-semibold  text-white ">Created with</p>
                <a
                  href={
                    chain?.id == 88
                      ? "https://vicscan.xyz/address/" + pairBred
                      : "https://testnet.vicscan.xyz/address/" + pairBred
                  }
                  target={"_blank"}
                >
                  {pairBred.substring(0, 10) +
                    "...." +
                    pairBred.substring(pairBred.length - 10)}
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="ml-2"
                  />
                </a>
              </div>
            )}
          </div>
          {nftData && nftData.parent != address && (
            <button
              className={`${
                state != 0 || selectedIndex == -1
                  ? "bg-[#25272b] text-[#5b5e5b]"
                  : "bg-white text-black"
              } px-4 py-2 rounded-xl font-semibold max-w-fit mx-auto mt-10`}
              disabled={state != 0 || selectedIndex == -1}
              onClick={async () => {
                try {
                  const sig = await signCreateRelationship({
                    walletClient: walletClient as WalletClient,
                    breedingAccount: ownedNfts[selectedIndex]
                      .address as `0x${string}`,
                    otherAccount: nftData.address as `0x${string}`,
                  });
                  setState(1);
                  const repsonse = await createBreedRequest({
                    receiver: nftData.address,
                    requester: ownedNfts[selectedIndex].address,
                    signature: sig,
                    chainId: (chain?.id as number).toString(),
                  });
                  console.log(repsonse);
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
          {ownedNfts && ownedNfts.length > 0 && (
            <p className="text-4xl font-bold mb-8">Your NFTs</p>
          )}
          <div className="grid grid-cols-3 space-x-8 space-y-8">
            {ownedNfts &&
              ownedNfts.length > 0 &&
              ownedNfts.map((nft: any, index: number) => {
                return (
                  <div className="my-8 mx-4">
                    <NFTCard
                      key={index}
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
                      key={index}
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
                              chain?.id == 88
                                ? mainnetDeployments.relRegistry
                                : testnetDeployments.relRegistry,
                              req.address,
                              req.signature,
                            ],
                          });
                          console.log(tx);
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
          ) : breedingRequests && breedingRequests.length == 0 ? (
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
          ) : (
            ownedNfts &&
            ownedNfts.length == 0 && (
              <div className="flex flex-col text-[#9c9c9e] justify-center items-center h-full">
                <Image
                  src="/animations/sad.gif"
                  width={350}
                  height={350}
                  alt="sad cat"
                  className="mb-16 rounded-xl"
                />
                <p className="font-semibold text-lg">
                  You don't own any NFTs 🫠
                </p>
                <p className="font-semibold text-lg">
                  Go to create and mint something NOWW 😡
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}

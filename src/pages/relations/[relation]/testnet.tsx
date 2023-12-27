import Layout from "@/components/Layout";
import NFTCard from "@/components/NFTCard";
import LoadingSpinner from "@/components/Spinner";
import useWindowSize from "@/hooks/useWindowSize";
import { shortenEthereumAddress } from "@/utils";
import { abi, testnetDeployments } from "@/utils/constants";
import resolveRarity from "@/utils/resolveRarity";
import signCreateBaby from "@/utils/sign/signCreateBaby";
import createBabyRequest from "@/utils/supabase/create-baby-request";
import createChild from "@/utils/supabase/create-child";
import createNft from "@/utils/supabase/create-nft";
import endBabyRequest from "@/utils/supabase/end-baby-request";
import getBabyRequest from "@/utils/supabase/get-baby-request";
import getNft from "@/utils/supabase/get-nft";
import getNftsByOwner from "@/utils/supabase/get-nfts-by-owner";
import getRelationship from "@/utils/supabase/get-relationship";
import updateBabyRequest from "@/utils/supabase/update-baby-request";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { decodeEventLog, formatUnits } from "viem";
import {
  WalletClient,
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWalletClient,
} from "wagmi";

export default function Relation() {
  const router = useRouter();
  const [selected, setSelected] = useState(1);
  const { relation } = router.query;
  const [relationship, setRelationship] = useState();
  const { width, height } = useWindowSize();
  const [mintDone, setMintDone] = useState(false);
  const [messageId, setMessageId] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [displayImage, setDisplayImage] = useState(false);
  const [count, setCount] = useState(0);
  const [isMinting, setIsMinting] = useState(false);
  const [doesNotExist, setDoesNotExist] = useState(false);
  const [isParent, setIsParent] = useState(false);
  const [babes, setBabes] = useState<any>([]);
  const [babyRequest, setBabyRequest] = useState<any>(null);
  const [refreshBabyRequest, setRefreshBabyRequest] = useState(false);
  const [txHash, setTxHash] = useState("");

  const [imageAlt, setImageAlt] = useState("");
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [nft1, setNft1] = useState<any>(null);
  const [nft2, setNft2] = useState<any>(null);

  const { data: nonce } = useContractRead({
    address: relation as `0x${string}`,
    abi: abi.relationship,
    functionName: "nonce",
  });

  const { write: mint } = useContractWrite({
    address: testnetDeployments.craftToken as `0x${string}`,
    abi: abi.craftToken,
    functionName: "mint",
    onSuccess(data) {
      console.log("Hash: ", data.hash);
    },
  });

  useEffect(() => {
    if (relation == undefined) return;
    if (chain?.id == 88) router.push("/nfts/" + relation + "/mainnet");
    else if (chain?.id != 89) router.push("/");
  }, [chain?.id, relation]);

  useEffect(() => {
    (async function () {
      const kids = await getNftsByOwner({
        address: relation as string,
        chainId: (chain?.id as number).toString(),
      });
      setBabes(kids.response);
    })();
  }, []);

  useEffect(() => {
    // Fetch relationship
    (async function () {
      console.log(relation);
      if (relation == undefined) return;
      const relationship = await getRelationship({
        address: relation as string,
        chainId: (chain?.id as number).toString(),
      });

      if (relationship.response == null) {
        setDoesNotExist(true);
      } else {
        setDoesNotExist(false);
        setRelationship(relationship.response);
        console.log("Relationship");
        console.log(relationship.response);
        if (
          relationship.response.actual_parent_1 == address ||
          relationship.response.actual_parent_2 == address
        ) {
          console.log("Parent");
        }
        const nft1 = await getNft({
          address: relationship.response.parent1,
          chainId: (chain?.id as number).toString(),
        });
        const nft2 = await getNft({
          address: relationship.response.parent2,
          chainId: (chain?.id as number).toString(),
        });
        setNft1({
          ...nft1.response,
          actualParent: relationship.response.actual_parent_1,
        });
        setNft2({
          ...nft2.response,
          actualParent: relationship.response.actual_parent_2,
        });

        const babyReq = await getBabyRequest({
          relationship: relation as string,
          chainId: (chain?.id as number).toString(),
        });
        console.log("Baby Request");
        console.log(babyReq);
        setBabyRequest(babyReq.response);
      }
    })();
    console.log("Relationship: ", relation);
    getBabyRequest({
      chainId: (chain?.id as number).toString(),
      relationship: relation as string,
    }).then((babyReq: any) => {
      console.log(babyReq);
      setBabyRequest(babyReq.response);
    });
  }, [router.query, address, relation]);

  useEffect(() => {
    console.log("Relationship: ", relation);
    getBabyRequest({
      chainId: (chain?.id as number).toString(),
      relationship: relation as string,
    }).then((babyReq: any) => {
      console.log(babyReq);
      setBabyRequest(babyReq.response);
    });
  }, [refreshBabyRequest]);

  const { data: balance, refetch: fetchBalance } = useContractRead({
    address: testnetDeployments.craftToken as `0x${string}`,
    abi: abi.craftToken,
    functionName: "balanceOf",
    args: [relation],
  });

  useContractEvent({
    address: testnetDeployments.craftToken as `0x${string}`,
    abi: abi.zexCraft,
    eventName: "Transfer",
    listener(log) {
      console.log(log);
      fetchBalance();
    },
  });

  useContractEvent({
    address: testnetDeployments.zexCraft as `0x${string}`,
    abi: abi.zexCraft,
    eventName: "ZexCraftNFTBred",
    listener(log) {
      console.log(log);
      const event = decodeEventLog({
        abi: abi.zexCraft,
        data: log[0].data,
        topics: log[0].topics,
      });
      console.log(event);
      const args = event.args as {
        tokenId: BigInt;
        tokenUri: string;
        altImage: string;
        owner: string;
        parent1: string;
        parent2: string;
        account: string;
        rarity: BigInt;
      };
      console.log(args);
      setDisplayImage(true);
      setMintDone(true);
      setIsMinting(false);
      setCount(2);

      createChild({
        address: args.account,
        image: args.tokenUri,
        imageAlt: args.altImage,
        parent: args.owner,
        contractAddress: args.account,
        chainId: (chain?.id as number).toString(),
        tokenId: args.tokenId.toString(),
        rarity: args.rarity.toString(),
      });

      endBabyRequest({
        relationship: relation as string,
        chainId: (chain?.id as number).toString(),
      });
    },
  });

  async function fetchImage(
    messageId: string
  ): Promise<{ image: string; progress: number; imageAlt: string }> {
    const data = await fetch("/api/get-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MIDJOURNEY_API_KEY}`,
      },
      body: JSON.stringify({
        messageId: messageId,
      }),
    });
    const imageData = await data.json();
    return imageData;
  }
  return (
    <Layout>
      {count == 2 && <Confetti width={width} height={height} />}

      <div className="min-h-[90vh] mt-20 w-[80%]  mx-auto flex space-x-32 justify-between text-center">
        <div className="flex flex-col justify-center">
          {nft1 != null && (
            <>
              <NFTCard
                image={nft1.image}
                imageAlt={nft1.image_alt}
                owner={nft1.parent}
                address={nft1.address}
                rarity={resolveRarity(nft1.rarity)}
                tokenId={nft1.token_id}
                size={200}
                mode={nft1.type == 0 ? "create ✨" : "breed ❤️"}
              />
              {relationship &&
                ((relationship as any).actual_parent_1 == address ||
                  (relationship as any).actual_parent_2 == address) && (
                  <div
                    className={`ml-2 border ${
                      (relationship &&
                        (relationship as any).actual_parent_1 != address) ||
                      babyRequest?.parent1_sig != null
                        ? "border-[#25272b]"
                        : "border-white"
                    } py-3  rounded-xl flex flex-col space-y-5 justify-between my-8`}
                  >
                    <p
                      className={`font-semibold my-auto  text-center ${
                        (relationship &&
                          (relationship as any).actual_parent_1 != address) ||
                        babyRequest?.parent1_sig != null
                          ? "text-[#5b5e5b]"
                          : "text-white"
                      }`}
                    >
                      Create Baby
                    </p>
                    <button
                      onClick={async () => {
                        try {
                          const signature = await signCreateBaby({
                            walletClient: walletClient as WalletClient,
                            relationship: relation as `0x${string}`,
                            nonce: nonce as bigint,
                          });
                          if (babyRequest) {
                            const update = await updateBabyRequest({
                              relationship: relation as `0x${string}`,
                              parentNumber: "1",
                              signature: signature,
                              chainId: (chain?.id as number).toString(),
                            });
                          } else {
                            const create = await createBabyRequest({
                              relationship: relation as string,
                              parentNumber: "1",
                              signature: signature,
                              chainId: (chain?.id as number).toString(),
                            });
                          }
                          setRefreshBabyRequest(!refreshBabyRequest);
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                      disabled={
                        (relationship &&
                          (relationship as any).actual_parent_1 != address) ||
                        babyRequest?.parent1_sig != null
                      }
                      className={`${
                        (relationship &&
                          (relationship as any).actual_parent_1 != address) ||
                        babyRequest?.parent1_sig != null
                          ? "bg-[#25272b] text-[#5b5e5b]"
                          : "bg-white text-black"
                      } px-4 py-2 mx-6 rounded-xl font-semibold `}
                    >
                      {babyRequest == null ||
                      (babyRequest as any).parent1_sig == null
                        ? relationship &&
                          (relationship as any).actual_parent_1 == address
                          ? "Sign 📝"
                          : (relationship as any).actual_parent_2 == address
                          ? "Waiting ⌛"
                          : ""
                        : "Done ✅"}
                    </button>
                  </div>
                )}
            </>
          )}
        </div>

        {!doesNotExist ? (
          <div className="flex-1 flex flex-col justify-start">
            <p className=" text-5xl font-semibold ">Relationship</p>
            <Link
              target="_blank"
              href={
                chain?.id == 88
                  ? `https://vicscan.xyz/address/${relation}`
                  : `https://testnet.vicscan.xyz/address/${relation}`
              }
              className="text-lg my-2 tracking-wider text-[#9c9e9e] font-semibold"
            >
              {shortenEthereumAddress(relation as string)}&nbsp;
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-[#9c9e9e] text-sm font-normal my-auto"
              />
            </Link>
            <p className="mt-4 font-semibold text-2xl">Balance</p>
            <p className="mt-1 text-[#9c9e9e] font-semibold text-lg">
              {formatUnits(
                balance != undefined ? (balance as bigint) : BigInt(0),
                18
              )}
              &nbsp;CFT
            </p>
            <div className=" flex justify-center mt-2">
              <button
                className="bg-white text-black p-2 rounded-lg font-semibold"
                onClick={() => {
                  mint({ args: [relation] });
                }}
              >
                Drip Tokens 💧
              </button>
            </div>

            <div className="flex justify-center mt-8">
              {relationship &&
                ((relationship as any).actual_parent_1 == address ||
                  (relationship as any).actual_parent_2 == address) && (
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
                    Breed
                  </button>
                )}
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
                Children
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
                Tree
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

            {selected == 0 && (
              <div className="">
                <div className=" border border-white border-dashed h-[500px] w-[500px] rounded-xl mx-auto mt-10">
                  {mintDone && displayImage ? (
                    <img src={image} alt="gen-image" className="rounded-xl" />
                  ) : (
                    messageId != "" && (
                      <div className="flex flex-col justify-center items-center h-full">
                        <p className="font-bold text-xl text-[#9c9e9e]">Seed</p>
                        <p className="font-semibold text-lg">{messageId}</p>
                        <p className="font-bold text-xl text-[#9c9e9e] mt-8">
                          Progress
                        </p>
                        <p className="font-semibold mb-8 text-lg">
                          {progress} / 100
                        </p>
                        <Image
                          src={"/mint.gif"}
                          width={200}
                          height={200}
                          alt="minting"
                        />
                      </div>
                    )
                  )}
                </div>
                {txHash != "" && (
                  <div className="flex flex-col justify-center items-center text-sm text-[#9c9e9e] mt-4">
                    <p className="font-semibold text-white">Tx Hash</p>
                    <a
                      href={
                        chain?.id == 88
                          ? "https://vicscan.xyz/tx/" + txHash
                          : "https://testnet.vicscan.xyz/tx/" + txHash
                      }
                      target={"_blank"}
                    >
                      {txHash.substring(0, 10) +
                        "...." +
                        txHash.substring(txHash.length - 10)}
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="ml-2"
                      />
                    </a>
                  </div>
                )}
                <div className="flex flex-col justify-center items-center">
                  <p className=" text-white text-xl font-semibold mb-2 mt-6">
                    Sigantures (
                    {babyRequest == null
                      ? 0
                      : babyRequest.parent1_sig != null &&
                        babyRequest.parent2_sig != null
                      ? 2
                      : 1}
                    /2)
                  </p>

                  <div
                    className={`ml-2 border ${
                      babyRequest != null &&
                      babyRequest.parent1_sig != null &&
                      babyRequest.parent2_sig != null
                        ? "border-white"
                        : "border-[#25272b]"
                    } py-3 px-5 rounded-xl flex justify-between my-2`}
                  >
                    <p
                      className={`font-semibold my-auto mr-16 ${
                        babyRequest != null &&
                        babyRequest.parent1_sig != null &&
                        babyRequest.parent2_sig != null
                          ? "text-white"
                          : "text-[#5b5e5b]"
                      }`}
                    >
                      Generate and Mint NFT
                    </p>
                    <button
                      onClick={async () => {
                        // trigeger
                        setProgress(0);
                        setIsMinting(true);
                        const gen = await fetch("/api/generate-image", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_MIDJOURNEY_API_KEY}`,
                          },
                          body: JSON.stringify({
                            prompt: nft1.image_alt + " " + nft2.image_alt,
                          }),
                        });
                        const generatedImage = await gen.json();
                        console.log(generatedImage);
                        setMessageId(generatedImage.messageId);
                        let fetchedImage: {
                          image: string;
                          progress: number;
                          imageAlt: string;
                        } = {
                          image: "",
                          progress: 0,
                          imageAlt: "",
                        };
                        while (fetchedImage.progress != 100) {
                          fetchedImage = await fetchImage(
                            generatedImage.messageId
                          );
                          setProgress(fetchedImage.progress);
                          setTimeout(() => {}, 5000);
                        }
                        console.log(fetchedImage.image);
                        setProgress(100);
                        setImage(fetchedImage.image);
                        setImageAlt(fetchedImage.imageAlt);
                        try {
                          console.log(fetchedImage.image);
                          console.log((relationship as any).address);
                          console.log((relationship as any).parent1);
                          console.log((relationship as any).parent2);
                          const relay = await fetch(
                            "/api/relayer/create-baby",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_MIDJOURNEY_API_KEY}`,
                              },
                              body: JSON.stringify({
                                tokenUri: fetchedImage.image,
                                altImage: fetchedImage.imageAlt,
                                relationship:
                                  relationship && (relationship as any).address,
                                nft1Signature:
                                  babyRequest.parent1_sig as string,
                                nft2Signature:
                                  babyRequest.parent2_sig as string,
                                chainId: chain?.id,
                              }),
                            }
                          );
                          const relayedTransaction = await relay.json();
                          console.log(relayedTransaction);
                          if (relayedTransaction.success == true) {
                            setTxHash(relayedTransaction.data as `0x${string}`);
                            setCount(1);
                          }
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                      className={`${
                        babyRequest == null ||
                        babyRequest.parent1_sig == null ||
                        babyRequest.parent2_sig == null ||
                        count != 0 ||
                        Number(formatUnits(balance as bigint, 18)) < 0.1
                          ? "bg-[#25272b] text-[#5b5e5b]"
                          : "bg-white text-black"
                      } px-4 py-2 rounded-xl font-semibold `}
                      disabled={
                        babyRequest == null ||
                        babyRequest.parent1_sig == null ||
                        babyRequest.parent2_sig == null ||
                        count != 0 ||
                        Number(formatUnits(balance as bigint, 18)) < 0.1
                      }
                    >
                      {isMinting
                        ? "Pending..."
                        : count != 2
                        ? "Mint 🪄"
                        : "Done ✅"}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {selected == 1 && (
              <div className="grid grid-cols-2 desktop:grid-cols-3 space-x-8 space-y-8">
                {babes &&
                  babes.length > 0 &&
                  babes.map((nft: any, index: number) => {
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
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        ) : (
          <p className=" text-center my-auto font0bold text-5xl text-white">
            Error 404: Relationship does not exist
          </p>
        )}

        <div className="flex flex-col justify-center">
          {nft2 != null && (
            <>
              <NFTCard
                image={nft2.image}
                imageAlt={nft2.image_alt}
                owner={nft2.parent}
                address={nft2.address}
                rarity={resolveRarity(nft2.rarity)}
                tokenId={nft2.token_id}
                size={200}
                mode={nft2.type == 0 ? "create ✨" : "breed ❤️"}
              />
              {relationship &&
                ((relationship as any).actual_parent_1 == address ||
                  (relationship as any).actual_parent_2 == address) && (
                  <div
                    className={`ml-2 border ${
                      (relationship &&
                        (relationship as any).actual_parent_2 != address) ||
                      babyRequest?.parent2_sig != null
                        ? "border-[#25272b]"
                        : "border-white"
                    } py-3  rounded-xl flex flex-col space-y-5 justify-between my-8`}
                  >
                    <p
                      className={`font-semibold my-auto  text-center ${
                        (relationship &&
                          (relationship as any).actual_parent_2 != address) ||
                        babyRequest?.parent2_sig != null
                          ? "text-[#5b5e5b]"
                          : "text-white"
                      }`}
                    >
                      Create Baby
                    </p>
                    <button
                      onClick={async () => {
                        const signature = await signCreateBaby({
                          walletClient: walletClient as WalletClient,
                          relationship: relation as `0x${string}`,
                          nonce: nonce as bigint,
                        });
                        if (babyRequest) {
                          const update = await updateBabyRequest({
                            relationship: relation as `0x${string}`,
                            parentNumber: "2",
                            signature: signature,
                            chainId: (chain?.id as number).toString(),
                          });
                          console.log(update);
                        } else {
                          const create = await createBabyRequest({
                            relationship: relation as string,
                            parentNumber: "2",
                            signature: signature,
                            chainId: (chain?.id as number).toString(),
                          });
                          console.log(create);
                        }
                        setRefreshBabyRequest(!refreshBabyRequest);
                      }}
                      disabled={
                        (relationship &&
                          (relationship as any).actual_parent_2 != address) ||
                        babyRequest?.parent2_sig != null
                      }
                      className={`${
                        (relationship &&
                          (relationship as any).actual_parent_2 != address) ||
                        babyRequest?.parent2_sig != null
                          ? "bg-[#25272b] text-[#5b5e5b]"
                          : "bg-white text-black"
                      } px-4 py-2 mx-6 rounded-xl font-semibold `}
                    >
                      {babyRequest == null ||
                      (babyRequest as any).parent2_sig == null
                        ? relationship &&
                          (relationship as any).actual_parent_2 == address
                          ? "Sign 📝"
                          : (relationship as any).actual_parent_1 == address
                          ? "Waiting ⌛"
                          : ""
                        : "Done ✅"}
                    </button>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

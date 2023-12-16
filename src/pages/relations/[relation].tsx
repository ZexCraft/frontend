import Layout from "@/components/Layout";
import NFTCard from "@/components/NFTCard";
import LoadingSpinner from "@/components/Spinner";
import { shortenEthereumAddress } from "@/utils";
import { abi, testnetDeployments, mainnetDeployments } from "@/utils/constants";
import resolveRarity from "@/utils/resolveRarity";
import createNft from "@/utils/supabase/create-nft";
import getNft from "@/utils/supabase/get-nft";
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
  const [selected, setSelected] = useState(0);
  const { relation } = router.query;
  const [relationship, setRelationship] = useState();
  const [mintDone, setMintDone] = useState(false);
  const [messageId, setMessageId] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [displayImage, setDisplayImage] = useState(false);
  const [count, setCount] = useState(0);
  const [isApproving, setIsApproving] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const [confettiAnimation, setConfettiAnimation] = useState(false);
  const [imageAlt, setImageAlt] = useState("");
  const { chain } = useNetwork();
  const { address } = useAccount();

  const [nft1, setNft1] = useState<any>(null);
  const [nft2, setNft2] = useState<any>(null);

  useEffect(() => {
    // Fetch relationship
    (async function () {
      if (relation == undefined) return;
      const relationship = await getRelationship({
        address: relation as string,
      });
      console.log(relationship.response);
      setRelationship(relationship.response);

      const nft1 = await getNft({ address: relationship.response.parent1 });
      const nft2 = await getNft({ address: relationship.response.parent2 });
      console.log(nft1.response);
      console.log(nft2.response);
      setNft1(nft1.response);
      setNft2(nft2.response);
    })();
  }, [router.query]);

  const { writeAsync: createNftFunction } = useContractWrite({
    address:
      chain?.id == 123456
        ? (testnetDeployments.pegoCraft as `0x${string}`)
        : (mainnetDeployments.pegoCraft as `0x${string}`),
    abi: abi.pegoCraft,
    functionName: "createNft",
  });
  const { writeAsync: approve } = useContractWrite({
    address:
      chain?.id == 123456
        ? (testnetDeployments.craftToken as `0x${string}`)
        : (mainnetDeployments.craftToken as `0x${string}`),
    abi: abi.pegoCraft,
    functionName: "approve",
  });

  useContractEvent({
    address:
      chain?.id == 123456
        ? (testnetDeployments.craftToken as `0x${string}`)
        : (mainnetDeployments.craftToken as `0x${string}`),
    abi: abi.craftToken,
    eventName: "Approval",
    listener(log) {
      const event = decodeEventLog({
        abi: abi.craftToken,
        data: log[0].data,
        topics: log[0].topics,
      });
      console.log(event);
      const args = event.args as {
        owner: string;
        spender: string;
        value: string;
      };
      if (args.owner == relation) {
        setIsApproving(false);
        setCount(1);
      }
    },
  });

  useContractEvent({
    address:
      chain?.id == 123456
        ? (testnetDeployments.pegoCraft as `0x${string}`)
        : (mainnetDeployments.pegoCraft as `0x${string}`),
    abi: abi.pegoCraft,
    eventName: "Transfer",
    listener(log) {
      const event = decodeEventLog({
        abi: abi.craftToken,
        data: log[0].data,
        topics: log[0].topics,
      });
      const args = event.args as {
        from: string;
        to: string;
        tokenId: string;
        account: string;
        rarity: string;
      };
      if (args.to == address) {
        setDisplayImage(true);
        setMintDone(true);
        setIsMinting(false);
        setCount(2);
        setConfettiAnimation(true);
        createNft({
          address: args.account,
          tokenId: Number(args.tokenId),
          image: image,
          imageAlt: imageAlt,
          contractAddress:
            chain?.id == 123456
              ? testnetDeployments.pegoCraft
              : mainnetDeployments.pegoCraft,
          parent: args.to,
          rarity: Number(args.rarity),
          type: 0,
        }).then((res) => {
          console.log(res);
        });
      }
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
      <div className="min-h-[90vh] mt-20 w-[80%]  mx-auto flex space-x-32 justify-between">
        <div className="flex flex-col justify-center">
          {nft1 != null && (
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
          )}
        </div>

        <div className="flex-1 flex flex-col justify-start">
          <p className=" text-5xl font-semibold ">Relationship</p>
          <Link
            target="_blank"
            href={
              chain?.name == "PEGO Mainnet"
                ? `https://scan.pego.network/address/${relation}`
                : `https://scan.pegotest.net/address/${address}`
            }
            className="text-lg my-2 tracking-wider text-[#9c9e9e] font-semibold"
          >
            {shortenEthereumAddress(relation as string)}&nbsp;
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="text-[#9c9e9e] text-sm font-normal my-auto"
            />
          </Link>
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
              Breed
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

          {selected == 0 ? (
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
                      <LoadingSpinner loading={true} />
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className=" text-white text-xl font-semibold mb-2 mt-6">
                  Transactions ({count}/2)
                </p>
                <div
                  className={`ml-2 border ${
                    count != 0 ? "border-[#25272b]" : "border-white"
                  } py-3 px-5 rounded-xl flex justify-between my-2`}
                >
                  <p
                    className={`font-semibold my-auto mr-10 ${
                      count != 0 ? "text-[#5b5e5b]" : "text-white"
                    }`}
                  >
                    Approve 0.1 CraftTokens
                  </p>
                  <button
                    onClick={async () => {
                      try {
                        await approve({
                          args: [
                            chain?.id == 123456
                              ? testnetDeployments.pegoCraft
                              : mainnetDeployments.pegoCraft,
                            "100000000000000000",
                          ],
                        });
                        setIsApproving(true);
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                    // trigger Transactoin

                    disabled={count != 0 || isApproving}
                    className={`${
                      count != 0
                        ? "bg-[#25272b] text-[#5b5e5b]"
                        : "bg-white text-black"
                    } px-4 py-2 rounded-xl font-semibold `}
                  >
                    {isApproving
                      ? "Pending..."
                      : count == 0
                      ? "Approve 📝"
                      : "Done ✅"}
                  </button>
                </div>
                <div
                  className={`ml-2 border ${
                    count == 1 ? "border-white" : "border-[#25272b]"
                  } py-3 px-5 rounded-xl flex justify-between my-2`}
                >
                  <p
                    className={`font-semibold my-auto mr-16 ${
                      count == 1 ? "text-white" : "text-[#5b5e5b]"
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

                      try {
                        await createNftFunction({
                          args: [fetchedImage.image, address, "0x"],
                        });
                        setImage(fetchedImage.image);
                        setImageAlt(fetchedImage.imageAlt);
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                    className={`${
                      count != 1
                        ? "bg-[#25272b] text-[#5b5e5b]"
                        : "bg-white text-black"
                    } px-4 py-2 rounded-xl font-semibold `}
                    disabled={count != 1 || isMinting}
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
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col justify-center">
          {nft2 != null && (
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
          )}
        </div>
      </div>
    </Layout>
  );
}

import Layout from "@/components/Layout";
import LoadingSpinner from "@/components/Spinner";
import { capitalizeString, shortenEthereumAddress } from "@/utils";
import { abi, mumbaiDeployments, pegoDeployments } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  useAccount,
  useContractEvent,
  useContractWrite,
  useNetwork,
} from "wagmi";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";
export default function Generate() {
  const router = useRouter();
  const { address } = useAccount();
  const { width, height } = useWindowSize();
  const { chain } = useNetwork();
  const [prompt, setPrompt] = useState("");
  const [count, setCount] = useState(0);
  const [messageId, setMessageId] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [displayImage, setDisplayImage] = useState(true);
  const [mintDone, setMintDone] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [confetttiAnimation, setConfettiAnimation] = useState(false);

  const { writeAsync: createNft } = useContractWrite({
    address:
      chain?.id == 80001
        ? (mumbaiDeployments.pegocraft as `0x${string}`)
        : (pegoDeployments.pegocraft as `0x${string}`),
    abi: abi.pegoCraft,
    functionName: "createNft",
  });
  const { writeAsync: approve } = useContractWrite({
    address:
      chain?.id == 80001
        ? (mumbaiDeployments.craftToken as `0x${string}`)
        : (pegoDeployments.craftToken as `0x${string}`),
    abi: abi.pegoCraft,
    functionName: "approve",
  });

  useContractEvent({
    address:
      chain?.id == 80001
        ? (mumbaiDeployments.craftToken as `0x${string}`)
        : (pegoDeployments.craftToken as `0x${string}`),
    abi: abi.craftToken,
    eventName: "Approval",
    listener(log) {
      setIsApproving(false);
      setCount(count + 1);
    },
  });

  useContractEvent({
    address:
      chain?.id == 80001
        ? (mumbaiDeployments.pegocraft as `0x${string}`)
        : (pegoDeployments.pegocraft as `0x${string}`),
    abi: abi.pegoCraft,
    eventName: "Transfer",
    listener(log) {
      setDisplayImage(true);
      setMintDone(true);
      setIsMinting(false);
      setCount(count + 1);
      setConfettiAnimation(true);
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
      <div className="flex justify-center h-[90vh] items-center ">
        {confetttiAnimation && <Confetti width={width} height={height} />}
        <div className="flex">
          <div className=" flex flex-col justify-start">
            <p className="text-5xl font-bold mb-5">Create New PegoCraft</p>
            <p className="font-semibold text-xl text-[#9c9e9e] ml-2 mb-6">
              Let your imaginations go wild 👽
            </p>
            <div className=" my-5 border border-[#25272b] py-3 px-5 rounded-xl flex justify-between">
              <div className="flex">
                <Image
                  src={
                    chain?.name == "PEGO Mainnet"
                      ? "/tech/pego.png"
                      : chain?.name == "Polygon Mumbai"
                      ? "/tech/polygon.png"
                      : "/tech/blue-ethereum.png"
                  }
                  width={50}
                  height={50}
                  alt={chain?.name as string}
                ></Image>
                <div className="flex flex-col justify-around ml-3">
                  <p className="font-bold">
                    {shortenEthereumAddress(address as string)}
                  </p>
                  <p className="text-[#9c9e9e] font-semibold">
                    {capitalizeString(chain?.name as string)}
                  </p>
                </div>
              </div>
              <button className="bg-[#1a2c21] px-4 py-2 rounded-xl font-semibold text-[#27ab30]">
                Connected
              </button>
            </div>
            <p className="text-white text-xl font-semibold ml-4 mb-2 mt-3">
              Prompt
            </p>
            <input
              type="text"
              placeholder={"Ex. CryptoPunk that looks like Drake"}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              className="font-theme ml-2 font-semibold placeholder:text-[#6c6f70] text-xl placeholder:text-base bg-[#25272b] border border-[#25272b] focus:border-white my-1 pl-6 text-white p-2 rounded-xl focus:outline-none  w-full flex-shrink-0 mr-2"
            />
            <p className="text-white text-xl font-semibold ml-4 mb-2 mt-6">
              Transactions ({count}/2)
            </p>
            <div
              className={`ml-2 border ${
                count != 0 ? "border-[#25272b]" : "border-white"
              } py-3 px-5 rounded-xl flex justify-between my-2`}
            >
              <p
                className={`font-semibold my-auto ${
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
                        chain?.id == 80001
                          ? mumbaiDeployments.pegocraft
                          : pegoDeployments.pegocraft,
                        1,
                      ],
                    });
                    setIsApproving(true);
                    setCount(count + 1);
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
                className={`font-semibold my-auto ${
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
                      prompt: prompt,
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
                    fetchedImage = await fetchImage(generatedImage.messageId);
                    setProgress(fetchedImage.progress);
                    setTimeout(() => {}, 5000);
                  }
                  console.log(fetchedImage.image);
                  setProgress(100);

                  try {
                    await createNft({
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
                {isMinting ? "Pending..." : count != 2 ? "Mint 🪄" : "Done ✅"}
              </button>
            </div>
          </div>
          <div className=" border border-white border-dashed h-[500px] w-[500px] rounded-xl ml-16">
            {mintDone && displayImage ? (
              <Image
                src={
                  "https://cdn.midjourney.com/3c7ac239-6d2f-4457-891b-cbe60b1959c3/0_0.png"
                }
                width={500}
                height={500}
                alt="drake"
                className="rounded-xl"
              />
            ) : (
              messageId != "" && (
                <div className="flex flex-col justify-center items-center h-full">
                  <p className="font-bold text-xl text-[#9c9e9e]">Seed</p>
                  <p className="font-semibold text-lg">{messageId}</p>
                  <p className="font-bold text-xl text-[#9c9e9e] mt-8">
                    Progress
                  </p>
                  <p className="font-semibold mb-8 text-lg">{progress} / 100</p>
                  <LoadingSpinner loading={true} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

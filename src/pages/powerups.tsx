import Layout from "@/components/Layout";
import Powerup from "@/components/Powerup";
import { capitalizeString, shortenEthereumAddress } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount, useNetwork } from "wagmi";

export default function Powerups() {
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const changeTotal = (value: number, isIncrement: boolean) => {
    if (isIncrement) setTotal(parseFloat((total + value).toFixed(2)));
    else setTotal(parseFloat((total - value).toFixed(2)));
  };
  return (
    <Layout>
      <div className=" min-h-[90vh] mt-20 ml-10 flex justify-center ">
        <div className="w-[70%] ">
          <div className="w-full">
            <p className="text-5xl font-bold mb-5">Powerups</p>
            <p className="font-semibold text-xl text-[#9c9e9e] ml-2 mb-6">
              Purchase these orbs to breed better CraftNFTs 🚀
            </p>
          </div>

          <div className="grid grid-cols-3  my-4 gap-4">
            <Powerup
              title="+1 Boost"
              description="On equipping this powerup to your NFT, the next ZexCraft bred
                will have a +1 rarity increase."
              changeTotal={changeTotal}
              price={0.2}
              ownCount={0}
            />
            <Powerup
              title="+2 Boost"
              description="On equipping this powerup to your NFT, the next ZexCraft bred
                will have a +2 rarity increase."
              changeTotal={changeTotal}
              price={0.6}
              ownCount={0}
            />
            <Powerup
              title="+5 Boost"
              description="On equipping this powerup to your NFT, the next ZexCraft bred
                will have a +5 rarity increase."
              changeTotal={changeTotal}
              price={2}
              ownCount={1}
            />
            <Powerup
              title="+10 Boost"
              description="On equipping this powerup to your NFT, the next ZexCraft bred
                will have a +10 rarity increase."
              changeTotal={changeTotal}
              price={10}
              ownCount={5}
            />
            <Powerup
              title="Twins"
              description="On equipping this powerup to your NFT, two ZexCraft NFTs will be bred at once. This increases the breeding threshold by 1."
              changeTotal={changeTotal}
              price={50}
              ownCount={1}
            />
            <Powerup
              title="Triplets"
              description="On equipping this powerup to your NFT, three ZexCraft NFTs will be bred at once. This increases the breeding threshold by 2."
              changeTotal={changeTotal}
              price={80}
              ownCount={1}
            />
          </div>
          <div className="flex justify-end">
            <p className="my-auto font-semibold text-lg">Total: {total} PG</p>
            <button className="m-4 py-3 px-6 bg-[#25272b] hover:bg-[#d0d1d1] hover:text-black font-semibold text-lg rounded-lg">
              Purchase
            </button>
          </div>
        </div>

        {/* <div className=" my-5 border border-[#25272b] py-3 px-5 rounded-xl flex justify-between">
              <div className="flex">
                <Image
                  src={
                    chain?.name == "fuji"
                      ? "/tech/avalanche.png"
                      : chain?.name == "mumbai"
                      ? "/tech/viction.png"
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
            <div className="ml-2 border border-[#25272b] py-3 px-5 rounded-xl flex justify-between my-2">
              <p className="font-semibold text-[#6c6f70]">
                Generate Image & Rarity
              </p>{" "}
              <button className="bg-[#252525] px-4 py-2 rounded-xl font-semibold text-[#5b5e5b]">
                Waiting...
              </button>
            </div>
            <div className="ml-2 border border-[#25272b] py-3 px-5 rounded-xl flex justify-between my-2">
              <p className="font-semibold text-[#6c6f70]">
                Mint NFT & Create Account
              </p>{" "}
              <button className="bg-[#252525] px-4 py-2 rounded-xl font-semibold text-[#5b5e5b]">
                Waiting...
              </button>
            </div> */}
      </div>
    </Layout>
  );
}

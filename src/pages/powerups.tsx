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
      </div>
    </Layout>
  );
}

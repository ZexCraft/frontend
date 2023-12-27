import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useNetwork } from "wagmi";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
export default function Create() {
  const { openChainModal } = useChainModal();
  const { chain } = useNetwork();
  const router = useRouter();

  return (
    <Layout>
      <div>
        <div className="flex justify-center h-[90vh] items-center ">
          <div className="w-[75%]">
            <p className="text-6xl font-bold mb-8">Choose Blockchain</p>
            <p className="text-2xl font-bold text-[#9c9e9e]">
              Choose the most suitable blockchain for your needs.
            </p>
            <p className="text-2xl font-bold text-[#9c9e9e]">
              Log in your wallet to craft CraftNFTs. 🪄
            </p>
            <div className="grid grid-cols-3 gap-3 mt-10">
              <button
                onClick={() => {
                  if (chain?.id != 88) {
                    openChainModal && openChainModal();
                  } else {
                    router.push(`/create/mainnet`);
                  }
                }}
                className="border-[2px] border-[#3c3f41] flex flex-col justify-center items-center h-[300px] rounded-2xl"
              >
                <Image
                  src="/tech/viction.png"
                  width={100}
                  height={100}
                  alt="viction"
                />
                <p className="text-white font-bold text-2xl mt-4">
                  Viction Mainnet
                </p>
              </button>
              <button
                onClick={() => {
                  if (chain?.id != 89) {
                    openChainModal && openChainModal();
                  } else {
                    router.push(`/create/testnet`);
                  }
                }}
                className="border-[2px] border-[#3c3f41] flex flex-col justify-center items-center h-[300px] rounded-2xl"
              >
                <Image
                  src="/tech/viction.png"
                  width={100}
                  height={100}
                  alt="viction"
                  className="rounded-full "
                />
                <p className="text-white font-bold text-2xl mt-4">
                  Viction Testnet
                </p>
              </button>

              <div className="border-[2px] border-[#3c3f41] flex flex-col justify-center items-center h-[300px] rounded-2xl cursor-default opacity-50">
                <Image
                  src="/tech/polygon.png"
                  width={100}
                  height={100}
                  alt="mumbai"
                />
                <p className="text-[#9c9e9e] font-bold text-2xl mt-4">
                  Other Blockchains
                </p>
                <p className="text-[#3c3f41] font-semibold">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

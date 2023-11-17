import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function Create() {
  const [prompt, setPrompt] = useState("");
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
              Log in your wallet to craft ZexNFTs. 🪄
            </p>
            <div className="grid grid-cols-3 gap-3 mt-10">
              <Link
                href={`/create/fuji`}
                className="border-[2px] border-[#3c3f41] flex flex-col justify-center items-center h-[300px] rounded-2xl"
              >
                <Image
                  src="/tech/avalanche.png"
                  width={100}
                  height={100}
                  alt="mumbai"
                />
                <p className="text-white font-bold text-2xl mt-4">
                  Avalanche Fuji
                </p>
              </Link>
              <Link
                href={`/create/sepolia`}
                className="border-[2px] border-[#3c3f41] flex flex-col justify-center items-center h-[300px] rounded-2xl"
              >
                <Image
                  src="/tech/blue-ethereum.png"
                  width={100}
                  height={100}
                  alt="sepolia"
                />
                <p className="text-white font-bold text-2xl mt-4">Sepolia</p>
              </Link>
              <Link
                href={`/create/mumbai`}
                className="border-[2px] border-[#3c3f41] flex flex-col justify-center items-center h-[300px] rounded-2xl"
              >
                <Image
                  src="/tech/polygon.png"
                  width={100}
                  height={100}
                  alt="mumbai"
                />
                <p className="text-white font-bold text-2xl mt-4">Mumbai</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import Layout from "@/components/Layout";
import { capitalizeString, shortenEthereumAddress } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount, useNetwork } from "wagmi";

export default function Generate() {
  const router = useRouter();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [prompt, setPrompt] = useState("");
  const [count, setCount] = useState(0);
  console.log(chain?.name);
  return (
    <Layout>
      <div className="flex justify-center h-[90vh] items-center ">
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
                count == 0 ? "border-white" : "border-[#25272b]"
              } py-3 px-5 rounded-xl flex justify-between my-2`}
            >
              <p
                className={`font-semibold my-auto ${
                  count == 0 ? "text-white" : "text-[#25272b]"
                }`}
              >
                Approve 0.1 CraftTokens
              </p>
              <button
                className={`${
                  count == 0 ? "bg-white" : "bg-[#25272b]"
                } px-4 py-2 rounded-xl font-semibold text-black`}
              >
                {count == 0 ? "Approve 📝" : "Done ✅"}
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
                className="bg-[#252525] px-4 py-2 rounded-xl font-semibold text-[#5b5e5b]"
                disabled={count == 0}
              >
                {count != 2 ? "Mint 🪄" : "Done ✅"}
              </button>
            </div>
          </div>
          <div className=" border border-white border-dashed h-[500px] w-[500px] rounded-xl ml-16">
            {/* <Image src="/1.png" width={500} height={500} alt="drake" /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

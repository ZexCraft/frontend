import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function Create() {
  const [prompt, setPrompt] = useState("");
  return (
    <div>
      <div className="flex justify-center h-[70vh] bg-[#e1d7d5] ">
        <div className="flex items-center justify-between pt-24 w-[60%] h-full px-12 ">
          <div className=" h-full w-[50%]">
            <Image
              src={"/loading.gif"}
              width={400}
              height={400}
              alt="logo"
              className="w-full h-full"
            />
          </div>
          <div className="pl-20 flex flex-col justify-center h-full w-[50%] ">
            <p className="font-noun text-black text-6xl mb-8">Create zNouns</p>
            <p className="font-theme  text-black text-xl font-bold mb-6">
              Enter a prompt and see the magic :)
            </p>

            <div className="flex justify-between">
              <input
                type="text"
                placeholder={"eg. Swimming in the pool"}
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                className="font-theme font-bold text-xl border text-black border-gray-300 p-2 rounded-md focus:outline-none  focus:border-black w-full mr-2"
              />
              <button className="font-theme bg-black rounded-lg p-3 text-white font-bold ">
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center h-[60vh]">
        <div className="flex items-center justify-between pt-6 w-[60%] h-full px-12 ">
          <div className="pl-20 flex flex-col justify-center h-full w-[50%] ">
            <p className="font-noun text-black text-6xl mb-8">How it works?</p>
            <p className="font-theme  text-black text-lg mb-6">
              Behold, an infinite work of art! Nouns is a community-owned brand
              that makes a positive impact by funding ideas and fostering
              collaboration. From collectors and technologists, to non-profits
              and brands, Nouns is for everyone.
            </p>
          </div>
          <div className=" h-full w-[50%]">
            <Image
              src={"/create.gif"}
              width={400}
              height={400}
              alt="logo"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

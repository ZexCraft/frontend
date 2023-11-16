import Image from "next/image";
import Link from "next/link";

export default function Body() {
  return (
    <div>
      <div className="flex justify-center h-[60vh]">
        <div className="flex items-center justify-between pt-6 w-[60%] h-full px-12 ">
          <div className="pl-20 flex flex-col justify-center h-full w-[50%] ">
            <p className="font-noun text-black text-6xl mb-8">
              Forge Connections, Create zNouns.
            </p>
            <p className="font-theme  text-black text-lg mb-6">
              Behold, an infinite work of art! Nouns is a community-owned brand
              that makes a positive impact by funding ideas and fostering
              collaboration. From collectors and technologists, to non-profits
              and brands, Nouns is for everyone.
            </p>
          </div>
          <div className=" h-full w-[50%]">
            <Image
              src={"/breed-new.gif"}
              width={400}
              height={400}
              alt="logo"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center h-[60vh]">
        <div className="flex items-center justify-between pt-6 w-[60%] h-full px-12 ">
          <div className=" h-full w-[50%]">
            <Image
              src={"/1.png"}
              width={400}
              height={400}
              alt="logo"
              className="w-full h-full"
            />
          </div>
          <div className="pl-20 flex flex-col justify-center h-full w-[50%] ">
            <p className="font-noun text-black text-6xl mb-8">
              Nouns own their zNoun offsprings.
            </p>
            <p className="font-theme  text-black text-lg mb-6">
              Behold, an infinite work of art! Nouns is a community-owned brand
              that makes a positive impact by funding ideas and fostering
              collaboration. From collectors and technologists, to non-profits
              and brands, Nouns is for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

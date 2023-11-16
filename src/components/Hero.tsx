import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ConnectButton from "./ConnectButton";
import { useAccount } from "wagmi";

export default function Hero() {
  const { isConnected } = useAccount();
  const images = ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  return (
    <main className="flex justify-center h-[70vh] bg-[#e1d7d5] ">
      <div className="flex items-center justify-between pt-24 w-[60%] h-full px-12 ">
        <div className=" h-full w-[50%]">
          {images.map((imageData, index) => (
            <Image
              src={imageData}
              width={400}
              height={400}
              alt="logo"
              className="w-full h-full"
              style={{
                display: index === currentImageIndex ? "block" : "none",
              }}
            />
          ))}
        </div>
        <div className="pl-20 flex flex-col justify-center h-full w-[50%] ">
          <p className="font-noun text-black text-6xl mb-8">ZexNouns</p>
          <p className="font-theme  text-black text-xl font-bold mb-6">
            Breed Nouns with your favourite NFT using AI.
          </p>
          <div className="">
            {isConnected ? (
              <Link
                href={"/create"}
                className="font-theme bg-white rounded-lg p-3 text-black font-bold border border-[#cfbdba]"
              >
                Generate Now
              </Link>
            ) : (
              <ConnectButton />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

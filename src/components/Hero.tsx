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
    <main
      className="flex flex-col justify-center items-center h-[60vh] my-8 rounded-xl"
      style={{
        backgroundImage: 'url("/cover.gif")',
        backgroundSize: "cover",
      }}
    >
      <div className=" flex">
        <Image
          src="/logo.png"
          width={60}
          height={60}
          alt="logo"
          className="my-auto  mr-6"
        />
        <p className=" font-noun font-logo mb-4 font-bold text-6xl">
          PegoCraft
        </p>
      </div>
      <p className="font-logo  font-semibold  text-4xl">
        Create/Breed NFTs using AI
      </p>
      <div className="rounded-lg p-2 mt-4 opacity-90">
        <p className="font-logo  font-bold  text-4xl ">
          ❤️🔨🔮✨😢⚙️👾👻🪄😏🤖🦄🥵👀
        </p>
      </div>
    </main>
  );
}

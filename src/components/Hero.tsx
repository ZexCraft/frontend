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
      className="flex justify-center h-[70vh] my-8 rounded-xl"
      style={{
        backgroundImage: 'url("/animations/hero.gif")',
        backgroundSize: "cover",
        filter: "brightness(1.5)",
      }}
    ></main>
  );
}

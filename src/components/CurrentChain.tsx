import { faChain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChainModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect } from "react";
import { useAccount, useNetwork, useBalance } from "wagmi";

const CurrentChain = () => {
  const { address, isConnected } = useAccount();
  const { openChainModal } = useChainModal();
  const { chain } = useNetwork();
  const { data: balance } = useBalance({
    address,
  });

  useEffect(() => {
    console.log(balance);
  }, []);
  return isConnected ? (
    <div
      className="flex items-center justify-center rounded-lg bg-[#d0d1d1] px-3 mx-2 my-1 cursor-pointer "
      onClick={() => {
        if (openChainModal) {
          openChainModal();
        } else {
          console.log("openConnectModal is undefined");
        }
      }}
    >
      <Image
        src={
          chain == undefined
            ? ""
            : chain.name == "Polygon Mumbai"
            ? "/tech/polygon.png"
            : chain.name == "Injective EVM"
            ? "/tech/injective.png"
            : "/wrong.png"
        }
        width={25}
        height={25}
        alt="chain"
        className="mr-2 "
      />
      <p className="font-theme text-[#201c1c] text-md font-bold">
        {chain == undefined
          ? ""
          : chain.unsupported
          ? "Wrong Network"
          : chain.name}
      </p>
      {!chain?.unsupported && (
        <div className="h-full  w-[1px] bg-[#201c1c] mx-2"></div>
      )}
      {!chain?.unsupported && (
        <p className="font-theme text-[#201c1c] text-md font-bold mr-2">
          {balance?.formatted.slice(0, 5) ?? "0"}
        </p>
      )}
      <p className="font-theme text-[#201c1c] text-md font-bold">
        {chain == undefined
          ? ""
          : chain.name == "Polygon Mumbai"
          ? "MATIC"
          : chain.name == "PEGO Mainnet"
          ? "PG"
          : chain.name == "PEGO Testnet"
          ? "tPG"
          : ""}
      </p>
    </div>
  ) : (
    <div></div>
  );
};

export default CurrentChain;

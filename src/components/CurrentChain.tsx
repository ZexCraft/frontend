import { faChain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChainModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useAccount, useNetwork, useBalance } from "wagmi";

const CurrentChain = () => {
  const { address, isConnected } = useAccount();
  const { openChainModal } = useChainModal();
  const { chain } = useNetwork();
  const { data: balance } = useBalance({
    address,
  });
  return isConnected ? (
    <div
      className="flex items-center justify-center rounded-lg border-[1px] bg-white border-[#cfbdba] px-3 mx-2 my-1 cursor-pointer"
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
            : chain.name == "Sepolia" || chain.name == "Goerli"
            ? "/ethereum.png"
            : chain.name == "Polygon Mumbai"
            ? "/polygon.png"
            : "/avalanche.png"
        }
        width={25}
        height={25}
        alt="chain"
        className="mr-2"
      />
      <p className="font-theme text-black text-md font-bold">
        {chain == undefined ? "" : chain.name}
      </p>
      <div className="h-full border-r border-[#cfbdba] mx-2"></div>
      <p className="font-theme text-black text-md font-bold mr-2">
        {balance?.formatted.slice(0, 5) ?? "0"}
      </p>
      <p className="font-theme text-black text-md font-bold">
        {chain == undefined
          ? ""
          : chain.name == "Sepolia" || chain.name == "Goerli"
          ? "ETH"
          : chain.name == "Polygon Mumbai"
          ? "MATIC"
          : "AVAX"}
      </p>
    </div>
  ) : (
    <div></div>
  );
};

export default CurrentChain;

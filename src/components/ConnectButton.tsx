import { shortenEthereumAddress } from "@/utils";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
const ConnectButton = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { isConnected, address } = useAccount();

  return isConnected ? (
    <button
      className="flex items-center justify-center rounded-lg bg-[#d0d1d1] px-3  ml-2 my-1"
      onClick={() => {
        if (openAccountModal) {
          openAccountModal();
        } else {
          console.log("openAccountModal is undefined");
        }
      }}
    >
      <FontAwesomeIcon
        icon={faWallet}
        className=" text-[#201c1c] text-md font-bold mr-2"
      />
      <p className="font-theme text-[#201c1c] text-md font-bold">
        {shortenEthereumAddress((address as string) ?? "")}
      </p>
    </button>
  ) : (
    <button
      className="flex items-center justify-center rounded-lg bg-[#d0d1d1]  px-3 py-2 ml-2 my-1"
      onClick={() => {
        if (openConnectModal) {
          openConnectModal();
        } else {
          console.log("openConnectModal is undefined");
        }
      }}
    >
      <FontAwesomeIcon
        icon={faWallet}
        className=" text-[#201c1c] text-md font-bold mr-2"
      />
      <p className="font-theme text-[#201c1c] text-md font-bold">
        Connect Wallet
      </p>
    </button>
  );
};

export default ConnectButton;

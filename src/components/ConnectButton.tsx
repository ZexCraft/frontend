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
      className="flex items-center justify-center rounded-lg border-[1px] bg-white border-[#cfbdba] px-3  mx-2 my-1"
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
        className=" text-black text-md font-bold mr-2"
      />
      <p className="font-theme text-black text-md font-bold">
        {shortenEthereumAddress(address ?? "")}
      </p>
    </button>
  ) : (
    <button
      className="flex items-center justify-center rounded-lg border-[1px] bg-white border-[#cfbdba] px-3 py-2 mx-2 my-1"
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
        className=" text-black text-md font-bold mr-2"
      />
      <p className="font-theme text-black text-md font-bold">Connect Wallet</p>
    </button>
  );
};

function shortenEthereumAddress(address: string, length = 6) {
  // Validate input
  if (
    !address ||
    typeof address !== "string" ||
    !address.startsWith("0x") ||
    address.length !== 42
  ) {
    throw new Error("Invalid Ethereum address");
  }

  // Extract the first and last few characters
  const start = address.substring(0, length);
  const end = address.substring(address.length - length);

  // Create the shortened address
  const shortenedAddress = `${start}...${end}`;

  return shortenedAddress;
}

export default ConnectButton;

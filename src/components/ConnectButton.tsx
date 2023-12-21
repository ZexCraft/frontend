import { shortenEthereumAddress } from "@/utils";
import { faDroplet, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import {
  useAccount,
  useContractEvent,
  useContractWrite,
  useNetwork,
} from "wagmi";
import { abi, injectiveDeployments } from "@/utils/constants";
const ConnectButton = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const [dropdown, setDropdown] = useState(false);

  const {
    data,
    isLoading,
    isSuccess,
    write: mint,
  } = useContractWrite({
    address: injectiveDeployments.craftToken as `0x${string}`,
    abi: abi.craftToken,
    functionName: "mint",
    onSuccess(data) {
      console.log("Hash: ", data.hash);
    },
  });

  useContractEvent({
    address: injectiveDeployments.craftToken as `0x${string}`,
    abi: abi.inCraft,
    eventName: "Transfer",
    listener(log) {
      console.log(log[0]);
      // address, data, eventName, topics, transactionHash
    },
  });

  return isConnected ? (
    <>
      <button
        className="flex items-center justify-center rounded-lg bg-[#d0d1d1] px-3  ml-2 my-1"
        onClick={() => {
          setDropdown(!dropdown);
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
      {dropdown && (
        <div className="absolute right-10 mt-2 top-12  w-48 rounded-md shadow-lg bg-[#25272b] ring-1 ring-black ring-opacity-5  z-20 ">
          <div className="py-1">
            <button
              className={`flex items-center rounded-lg  px-3 mx-2 my-1 py-1   w-full`}
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
                className=" text-[#9c9e9e] text-md font-bold mr-2"
              />
              <p className="font-theme text-[#9c9e9e] text-md font-bold">
                Wallet
              </p>
            </button>
            <button
              onClick={() => {
                mint({ args: [address] });
              }}
              className={`flex items-center  rounded-lg  px-3 mx-2 my-1 py-1   w-full`}
            >
              <FontAwesomeIcon
                icon={faDroplet}
                className=" text-[#9c9e9e] text-md font-bold mr-2"
              />
              <p className="font-theme text-[#9c9e9e] text-md font-bold">
                Drip Tokens
              </p>
            </button>
          </div>
        </div>
      )}
    </>
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

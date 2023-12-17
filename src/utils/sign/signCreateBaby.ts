import { WalletClient, encodePacked, toBytes } from "viem";
import { useContractRead } from "wagmi";
import { abi } from "../constants";

export default async function signCreateBaby(args: {
  walletClient: WalletClient;
  relationship: `0x${string}`;
}) {
  const { walletClient, relationship } = args;
  const MINT_ACTION = "INCRAFT_MINT";
  const [account] = await walletClient.getAddresses();

  const { data: nonce } = useContractRead({
    address: relationship as `0x${string}`,
    abi: abi.relationship,
    functionName: "nonce",
  });

  console.log("Mint Action: ", MINT_ACTION);
  console.log("Relationship: ", relationship);
  console.log("Nonce: ", nonce);

  let signature = await walletClient?.signMessage({
    account,
    message: {
      raw: toBytes(
        encodePacked(
          ["string", "address", "uint256"],
          [MINT_ACTION, relationship, nonce]
        )
      ),
    },
  });
  console.log("Signature: ", signature);
  return signature;
}

import { WalletClient, encodePacked, keccak256, toBytes } from "viem";
import { useContractRead } from "wagmi";
import { abi } from "../constants";

export default async function signCreateBaby(args: {
  walletClient: WalletClient;
  relationship: `0x${string}`;
  nonce: bigint;
}) {
  const { walletClient, relationship, nonce } = args;
  const MINT_ACTION = "ZEXCRAFT_MINT";
  const [account] = await walletClient.getAddresses();

  console.log("Mint Action: ", MINT_ACTION);
  console.log("Relationship: ", relationship);
  console.log("Nonce: ", BigInt(nonce));

  let signature = await walletClient?.signMessage({
    account,
    message: {
      raw: toBytes(
        keccak256(
          encodePacked(
            ["string", "address", "uint256"],
            [MINT_ACTION, relationship, BigInt(nonce)]
          )
        )
      ),
    },
  });
  console.log("Signature: ", signature);
  return signature;
}

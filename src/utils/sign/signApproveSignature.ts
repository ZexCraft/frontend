import { WalletClient, encodePacked, keccak256, toBytes } from "viem";
import { useContractRead } from "wagmi";
import { abi, mumbaiDeployments } from "../constants";

export default async function signApproveSignature(args: {
  walletClient: WalletClient;
  nonce: string;
  owner: `0x${string}`;
  spender: `0x${string}`;
  amount: string;
}) {
  const { walletClient, nonce, owner, spender, amount } = args;
  const deadline =
    "115792089237316195423570985008687907853269984665640564039457584007913129639935";
  const [account] = await walletClient.getAddresses();

  console.log("Nonce: ", nonce);
  console.log("Deadline: ", deadline);
  console.log("Amount: ", amount);
  console.log("Owner: ", owner);
  console.log("Spender: ", spender);

  console.log(
    encodePacked(
      ["address", "address", "uint256", "uint256", "uint256"],
      [owner, spender, BigInt(amount), BigInt(deadline), BigInt(nonce)]
    )
  );

  let signature = await walletClient?.signMessage({
    account,
    message: {
      raw: toBytes(
        keccak256(
          encodePacked(
            ["address", "address", "uint256", "uint256", "uint256"],
            [owner, spender, BigInt(amount), BigInt(nonce), BigInt(deadline)]
          )
        )
      ),
    },
  });
  console.log("Signature: ", signature);
  return signature;
}

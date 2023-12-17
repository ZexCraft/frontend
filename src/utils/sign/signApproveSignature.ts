import { WalletClient, encodePacked, toBytes } from "viem";
import { useContractRead } from "wagmi";
import { abi, testnetDeployments } from "../constants";

export default async function signApproveSignature(args: {
  walletClient: WalletClient;
  owner: `0x${string}`;
  spender: `0x${string}`;
  amount: string;
}) {
  const { walletClient, owner, spender, amount } = args;
  const deadline =
    "115792089237316195423570985008687907853269984665640564039457584007913129639935";
  const [account] = await walletClient.getAddresses();

  const { data: nonce } = useContractRead({
    address: testnetDeployments.craftToken as `0x${string}`,
    abi: abi.craftToken,
    functionName: "nonces",
    args: [owner],
  });
  console.log("Nonce: ", nonce);
  console.log("Deadline: ", deadline);
  console.log("Amount: ", amount);
  console.log("Owner: ", owner);
  console.log("Spender: ", spender);

  let signature = await walletClient?.signMessage({
    account,
    message: {
      raw: toBytes(
        encodePacked(
          ["address", "address", "uint256", "uint256", "uint256"],
          [
            owner,
            spender,
            BigInt(amount),
            BigInt(deadline),
            BigInt(nonce as string),
          ]
        )
      ),
    },
  });
  console.log("Signature: ", signature);
  return signature;
}

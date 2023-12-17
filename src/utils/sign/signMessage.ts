import { WalletClient, toBytes } from "viem";

export default async function signMessage(
  walletClient: WalletClient,
  message: string
) {
  const [account] = await walletClient.getAddresses();
  let signature = await walletClient?.signMessage({
    account,
    message: {
      raw: toBytes(message),
    },
  });
  console.log("Signature: ", signature);
  return signature;
}

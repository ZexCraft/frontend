import { WalletClient, encodePacked, toBytes } from "viem";

export default async function signCreateRelationship(args: {
  walletClient: WalletClient;
  breedingAccount: `0x${string}`;
  otherAccount: `0x${string}`;
}) {
  const { walletClient, breedingAccount, otherAccount } = args;
  const [account] = await walletClient.getAddresses();

  console.log("Breeding Account: ", breedingAccount);
  console.log("Other Account: ", otherAccount);

  let signature = await walletClient?.signMessage({
    account,
    message: {
      raw: toBytes(
        encodePacked(["address", "address"], [breedingAccount, otherAccount])
      ),
    },
  });
  console.log("Signature: ", signature);
  return signature;
}

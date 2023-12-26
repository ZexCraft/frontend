import { WalletClient, encodePacked, keccak256, toBytes } from "viem";

export default async function signCreateRelationship(args: {
  walletClient: WalletClient;
  breedingAccount: `0x${string}`;
  otherAccount: `0x${string}`;
}) {
  const { walletClient, breedingAccount, otherAccount } = args;
  const [account] = await walletClient.getAddresses();
  const ZEXCRAFT_CREATE_RELATIONSHIP = "ZEXCRAFT_CREATE_RELATIONSHIP";
  console.log("Breeding Account: ", breedingAccount);
  console.log("Other Account: ", otherAccount);

  let signature = await walletClient?.signMessage({
    account,
    message: {
      raw: toBytes(
        keccak256(
          encodePacked(
            ["string", "address", "address"],
            [ZEXCRAFT_CREATE_RELATIONSHIP, otherAccount, breedingAccount]
          )
        )
      ),
    },
  });
  console.log("Signature: ", signature);
  return signature;
}

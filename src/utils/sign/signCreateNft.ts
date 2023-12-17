import { WalletClient, encodePacked, toBytes, keccak256 } from "viem";

export default async function signCreateNft(args: {
  walletClient: WalletClient;
  tokenURI: string;
  creator: `0x${string}`;
}) {
  const { walletClient, tokenURI, creator } = args;
  const MINT_ACTION = "INCRAFT_MINT";
  const [account] = await walletClient.getAddresses();

  console.log("Mint Action: ", MINT_ACTION);
  console.log("Token URI: ");
  console.log("Creator: ", creator);

  let signature = await walletClient?.signMessage({
    account,
    message: {
      raw: toBytes(
        keccak256(
          encodePacked(
            ["string", "string", "address"],
            [MINT_ACTION, tokenURI, creator]
          )
        )
      ),
    },
  });
  console.log("Signature: ", signature);
  return signature;
}

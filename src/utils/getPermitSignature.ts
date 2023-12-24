import { WalletClient, hexToSignature } from "viem";

export default async function getPermitSignature(args: {
  walletClient: WalletClient;
  nonce: number;
  name: string;
  chainId: number;
  tokenAddress: string;
  spender: string;
  value: string;
  deadline: string;
}): Promise<{ v: string; r: string; s: string }> {
  const {
    walletClient,
    nonce,
    name,
    chainId,
    tokenAddress,
    spender,
    value,
    deadline,
  } = args;
  const domain = {
    name,
    version: "1",
    chainId,
    verifyingContract: tokenAddress as `0x${string}`,
  };
  const types = {
    Permit: [
      {
        name: "owner",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
      {
        name: "value",
        type: "uint256",
      },
      {
        name: "nonce",
        type: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
      },
    ],
  };
  const [account] = await walletClient.getAddresses();
  console.log("Account: ", account);
  const { v, r, s } = hexToSignature(
    await walletClient.signTypedData({
      account,
      domain,
      types,
      primaryType: "Permit",
      message: {
        owner: account,
        spender,
        value,
        nonce,
        deadline,
      },
    })
  );
  console.log("Signature: ", { v, r, s });
  return { v: v.toString(), r: r as string, s: s as string };
}

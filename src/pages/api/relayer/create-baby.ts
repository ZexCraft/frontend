import { abi, testnetDeployments, mainnetDeployments } from "@/utils/constants";
import { NextApiRequest, NextApiResponse } from "next";
import { Chain, createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { victionMainnet, victionTestnet } from "@/utils/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const NEXT_PUBLIC_MIDJOURNEY_API_KEY =
    process.env.NEXT_PUBLIC_MIDJOURNEY_API_KEY;
  const VICTION_MAINNET_RPC_ENDPOINT = "https://rpc.viction.xyz";
  const VICTION_TESTNET_RPC_ENDPOINT = "https://rpc-testnet.viction.xyz";
  const API_KEY =
    req.headers.authorization != null
      ? req.headers.authorization.replace("Bearer ", "")
      : "";
  if (API_KEY === "" || API_KEY != NEXT_PUBLIC_MIDJOURNEY_API_KEY) {
    res.status(401).send({ error: "Unauthorized" });
  }
  const {
    tokenUri,
    altImage,
    relationship,
    nft1Signature,
    nft2Signature,
    chainId,
  } = req.body;
  console.log(req.body);
  console.log(process.env.NEXT_PUBLIC_PRIVATE_KEY);
  try {
    const PRIVATE_KEY = ("0x" +
      process.env.NEXT_PUBLIC_PRIVATE_KEY) as `0x${string}`;

    const account = privateKeyToAccount(PRIVATE_KEY);

    const client = createWalletClient({
      account,
      chain: chainId == 88 ? victionMainnet : victionTestnet,
      transport: http(
        chainId == 88
          ? VICTION_MAINNET_RPC_ENDPOINT
          : VICTION_TESTNET_RPC_ENDPOINT
      ),
    });

    const publicClient = createPublicClient({
      chain: chainId == 88 ? victionMainnet : victionTestnet,
      transport: http(
        chainId == 88
          ? VICTION_MAINNET_RPC_ENDPOINT
          : VICTION_TESTNET_RPC_ENDPOINT
      ),
    });

    const { request } = await publicClient.simulateContract({
      account,
      address: relationship as `0x${string}`,
      abi: abi.relationship,
      functionName: "createBaby",
      args: [tokenUri, altImage, [nft1Signature, nft2Signature]],
    });

    const txHash = await client.writeContract(request);
    res.status(200).send({ success: true, data: txHash });
  } catch (e: any) {
    console.log(e);
    res.status(500).send({ success: false, data: e.message });
  }
}

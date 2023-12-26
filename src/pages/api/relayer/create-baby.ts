import { abi, mumbaiDeployments } from "@/utils/constants";
import { NextApiRequest, NextApiResponse } from "next";
import { Chain, createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const NEXT_PUBLIC_MIDJOURNEY_API_KEY =
    process.env.NEXT_PUBLIC_MIDJOURNEY_API_KEY;
  const NEXT_PUBLIC_POLYGON_RPC_ENDPOINT =
    process.env.NEXT_PUBLIC_POLYGON_RPC_ENDPOINT;

  const API_KEY =
    req.headers.authorization != null
      ? req.headers.authorization.replace("Bearer ", "")
      : "";
  if (API_KEY === "" || API_KEY != NEXT_PUBLIC_MIDJOURNEY_API_KEY) {
    res.status(401).send({ error: "Unauthorized" });
  }
  const { tokenUri, altImage, relationship, nft1Signature, nft2Signature } =
    req.body;
  console.log(req.body);
  console.log(process.env.NEXT_PUBLIC_PRIVATE_KEY);
  try {
    const PRIVATE_KEY = ("0x" +
      process.env.NEXT_PUBLIC_PRIVATE_KEY) as `0x${string}`;

    const account = privateKeyToAccount(PRIVATE_KEY);

    const client = createWalletClient({
      account,
      chain: polygonMumbai,
      transport: http(NEXT_PUBLIC_POLYGON_RPC_ENDPOINT),
    });

    const publicClient = createPublicClient({
      chain: polygonMumbai,
      transport: http(NEXT_PUBLIC_POLYGON_RPC_ENDPOINT),
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

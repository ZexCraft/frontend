import { abi, injectiveDeployments } from "@/utils/constants";
import { NextApiRequest, NextApiResponse } from "next";
import { Chain, createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { injective } from "@/utils/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const NEXT_PUBLIC_MIDJOURNEY_API_KEY =
    process.env.NEXT_PUBLIC_MIDJOURNEY_API_KEY;
  const NEXT_PUBLIC_INJECTIVE_RPC_ENDPOINT =
    process.env.NEXT_PUBLIC_INJECTIVE_RPC_ENDPOINT;

  const API_KEY =
    req.headers.authorization != null
      ? req.headers.authorization.replace("Bearer ", "")
      : "";
  if (API_KEY === "" || API_KEY != NEXT_PUBLIC_MIDJOURNEY_API_KEY) {
    res.status(401).send({ error: "Unauthorized" });
  }
  const { tokenUri, creator, permitTokensSignature, createNftSignature } =
    req.body;
  console.log(req.body);
  console.log(process.env.NEXT_PUBLIC_PRIVATE_KEY);
  try {
    const PRIVATE_KEY = ("0x" +
      process.env.NEXT_PUBLIC_PRIVATE_KEY) as `0x${string}`;

    const account = privateKeyToAccount(PRIVATE_KEY);

    const client = createWalletClient({
      account,
      chain: injective as Chain,
      transport: http(NEXT_PUBLIC_INJECTIVE_RPC_ENDPOINT),
    });

    const publicClient = createPublicClient({
      chain: injective as Chain,
      transport: http(),
    });

    const { request } = await publicClient.simulateContract({
      account,
      address: injectiveDeployments.inCraft as `0x${string}`,
      abi: abi.inCraft,
      functionName: "createNft",
      args: [tokenUri, creator, permitTokensSignature, createNftSignature],
    });

    const txHash = await client.writeContract(request);
    res.status(200).send({ success: true, data: txHash });
  } catch (e: any) {
    console.log(e);
    res.status(500).send({ success: false, data: e.message });
  }
}

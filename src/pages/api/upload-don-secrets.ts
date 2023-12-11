import { NextApiRequest, NextApiResponse } from "next";

import { ethers, Signer } from "ethers";
import { SecretsManager } from "@chainlink/functions-toolkit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const privateKey = process.env.WHITELISTED_PRIVATE_KEY || "";
  const provider = new ethers.providers.JsonRpcProvider(
    "https://ethereum-sepolia.publicnode.com"
  );
  const wallet = new ethers.Wallet(privateKey as string);
  const signer = wallet.connect(provider) as Signer;

  // SEPOLIA ROUTER ADDRESS
  const functionsRouterAddress = "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0";
  // SEPOLIA DON ID
  const donId = "fun-ethereum-sepolia-1";

  const gatewayUrls = [
    "https://01.functions-gateway.testnet.chain.link/",
    "https://02.functions-gateway.testnet.chain.link/",
  ];

  const slotId = 0;
  const minutesUntilExpiration = 10;
  const secretsManager = new SecretsManager({
    signer,
    functionsRouterAddress,
    donId,
  });
  await secretsManager.initialize();

  const secrets = {
    midjourneyApiKey: process.env.MIDJOURNEY_API_KEY || "",
    nftStorageApiKey: process.env.NFT_STORAGE_API_KEY || "",
  };
  console.log(secrets);

  console.log("Encrypting secrets and uploading to DON...");
  const encryptedSecretsObj = await secretsManager.encryptSecrets(secrets);

  const { version, success } = await secretsManager.uploadEncryptedSecretsToDON(
    {
      encryptedSecretsHexstring: encryptedSecretsObj.encryptedSecrets,
      gatewayUrls,
      slotId,
      minutesUntilExpiration,
    }
  );

  console.log(version);

  const encryptedSecretsReference =
    secretsManager.buildDONHostedEncryptedSecretsReference({
      slotId,
      version,
    });
  console.log(
    `\nYou can now use slotId ${slotId} and version ${version} and reference ${encryptedSecretsReference} to reference the encrypted secrets hosted on the DON.`
  );
  res.status(200).json({
    slotId,
    version,
  });
}

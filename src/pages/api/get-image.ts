import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const API_KEY =
    req.headers.authorization != null
      ? req.headers.authorization.replace("Bearer ", "")
      : "";
  if (API_KEY === "") {
    res.status(401).send({ error: "Unauthorized" });
  }
  const BASE_URL = "https://api.thenextleg.io/v2";
  const AUTH_HEADERS = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };
  const { messageId } = JSON.parse(req.body);
  const imageRes = await fetch(`${BASE_URL}/message/${messageId}`, {
    method: "GET",
    headers: AUTH_HEADERS,
  });
  const imagesResponseData = await imageRes.json();

  if (imagesResponseData.progress === 100) {
    const imageUrl = imagesResponseData.response.imageUrls[0];

    const ipfsUrl = await fetch(`https://zixins-be1.adaptable.app/auth/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageUrl }),
    });

    const ipfsResponseData = await ipfsUrl.json();

    res.status(200).send({
      progress: 100,
      image:
        "https://" +
        ipfsResponseData.value.cid +
        ".ipfs.nftstorage.link/image.jpg",
    });
  } else {
    res.status(200).send({ progress: imagesResponseData.progress, image: "" });
  }
}

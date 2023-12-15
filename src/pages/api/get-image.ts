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
  console.log(req.body);
  const { messageId } = req.body;
  const imageRes = await fetch(`${BASE_URL}/message/${messageId}`, {
    method: "GET",
    headers: AUTH_HEADERS,
  });
  const imagesResponseData = await imageRes.json();
  console.log(imagesResponseData);
  if (imagesResponseData.progress === 100) {
    const imageUrl = imagesResponseData.response.imageUrls[0];

    const imageRes = await fetch(`${BASE_URL}/getImage`, {
      method: "POST",
      headers: AUTH_HEADERS,
      body: JSON.stringify({ imageUrl: imageUrl }),
    });

    const imageResponseData = await imageRes.arrayBuffer();
    const uint8Array = new Uint8Array(imageResponseData);

    // Create a Blob from Uint8Array
    const blob = new Blob([uint8Array], { type: "image/jpeg" });

    // Create a data URL from the Blob
    const dataUrl = URL.createObjectURL(blob);

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
      imageAlt: dataUrl,
      image:
        "https://ipfs.io/ipfs/" + ipfsResponseData.value.cid + "/image.jpg",
    });
  } else {
    res
      .status(200)
      .send({ progress: imagesResponseData.progress, image: "", imageAlt: "" });
  }
}

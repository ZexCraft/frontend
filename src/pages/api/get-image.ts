import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
const BASE_URL = "https://api.thenextleg.io/v2";
const dnow = Date.now();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const API_KEY =
    req.headers.authorization != null
      ? req.headers.authorization.replace("Bearer ", "")
      : "";
  const AUTH_HEADERS = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };
  if (
    !req.headers["content-type"] ||
    !req.headers["content-type"].includes("application/json")
  ) {
    return res
      .status(400)
      .json({ error: "Invalid Content-Type. Expected application/json." });
  }
  if (API_KEY === "") {
    res.status(401).send({ error: "Unauthorized" });
  }

  console.log(req.body);
  const { messageId } = req.body;
  console.log(messageId);
  const imageRes = await fetch(`${BASE_URL}/message/${messageId}`, {
    method: "GET",
    headers: AUTH_HEADERS,
  });
  const imagesResponseData = await imageRes.json();
  console.log(imagesResponseData);
  console.log("Getting image");
  if (imagesResponseData.progress === 100) {
    const imageUrl = imagesResponseData.response.imageUrls[0];
    console.log("sending image to ipfs");
    const ipfsUrl = await fetch(`https://zixins-be1.adaptable.app/auth/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageUrl }),
    });

    const ipfsResponseData = await ipfsUrl.json();
    console.log(ipfsResponseData);
    res.status(200).send({
      progress: 100,
      imageAlt: imageUrl,
      image:
        "https://cloudflare-ipfs.com/ipfs/" +
        ipfsResponseData.value.cid +
        "/image.jpg",
    });
  } else {
    res
      .status(200)
      .send({ progress: imagesResponseData.progress, image: "", imageAlt: "" });
  }
}

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
  console.log(req.query);
  const { image } = req.query;
  const imageRes = await fetch(`${BASE_URL}/getImage`, {
    method: "POST",
    headers: AUTH_HEADERS,
    body: JSON.stringify({ imageAlt: image }),
  });
  const buffer = await imageRes.arrayBuffer();
  console.log(buffer);
  res.setHeader("Content-Type", "image/jpeg"); // Change the content type based on the actual image type
  res.setHeader("Content-Length", buffer.byteLength.toString());
  res.setHeader("Cache-Control", "public, max-age=86400"); // Adjust caching settings as needed

  // Send the image data as the response
  res.end(Buffer.from(buffer), "binary");
}

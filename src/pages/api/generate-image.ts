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
  const AUTH_HEADERS = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };
  const BASE_URL = "https://api.thenextleg.io/v2";

  const { prompt } = req.body;
  console.log(API_KEY);

  const imageRes = await fetch(`${BASE_URL}/imagine`, {
    method: "POST",
    headers: AUTH_HEADERS,
    body: JSON.stringify({ msg: prompt }),
  });

  const imageResponseData = await imageRes.json();
  console.log("\n=====================");
  console.log("IMAGE GENERATION MESSAGE DATA");
  console.log(imageResponseData);
  console.log("=====================");

  res.status(200).send(imageResponseData);
}

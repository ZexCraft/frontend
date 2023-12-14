import { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.NEXT_PUBLIC_MIDJOURNEY_API_KEY;
const BASE_URL = "https://api.thenextleg.io/v2";
const AUTH_HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = JSON.parse(req.body);
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

  const completedImageData = await fetchToCompletion(
    imageResponseData.messageId,
    0
  );

  console.log("\n=====================");
  console.log("COMPLETED IMAGE DATA");
  console.log(completedImageData);
  console.log("=====================");

  res.status(200).send({ completedImageData });
}

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const fetchToCompletion = async (
  messageId: string,
  retryCount: number,
  maxRetry = 20
): Promise<any> => {
  const imageRes = await fetch(`${BASE_URL}/message/${messageId}`, {
    method: "GET",
    headers: AUTH_HEADERS,
  });

  const imageResponseData = await imageRes.json();

  if (imageResponseData.progress === 100) {
    return imageResponseData;
  }

  if (imageResponseData.progress === "incomplete") {
    throw new Error("Image generation failed");
  }

  if (retryCount > maxRetry) {
    throw new Error("Max retries exceeded");
  }

  if (imageResponseData.progress && imageResponseData.progressImageUrl) {
    console.log("---------------------");
    console.log(`Progress: ${imageResponseData.progress}%`);
    console.log(`Progress Image Url: ${imageResponseData.progressImageUrl}`);
    console.log("---------------------");
  }

  await sleep(5000);
  return fetchToCompletion(messageId, retryCount + 1);
};

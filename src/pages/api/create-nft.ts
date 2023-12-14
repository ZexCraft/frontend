import { NextApiRequest, NextApiResponse } from "next";

import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { wallet, name, image, cover, description } = req.body;

  try {
    const { data: fetchedProfile, error: fetchError } = await supabase
      .from("profile")
      .select("*");
    console.log(fetchedProfile);

    if (fetchError) {
      const { data, error } = await supabase
        .from("profile")
        .update([{ wallet, name, image, cover, description }]);

      if (error) {
        return res.status(500).json({ message: "Error creating profile" });
      }
      return res.status(200).json({
        message: "Profile created",
        data: data != null ? data[0] : "",
      });
    } else {
      return res.status(200).json({
        message: "Profile already exists",
        resposne: "fetchedProfile[0]",
      });
    }
  } catch (error) {
    console.error("Error creating profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

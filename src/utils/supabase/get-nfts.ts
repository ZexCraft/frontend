import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getNfts(): Promise<{
  message: string;
  response: any;
}> {
  try {
    const { data: fetchedNfts, error: fetchError } = await supabase
      .from("nft")
      .select("*");

    console.log(fetchedNfts);

    if (fetchError || fetchedNfts == null || fetchedNfts.length === 0) {
      return {
        message: "NFT does not exist",
        response: "",
      };
    } else {
      return {
        message: "Success",
        response: fetchedNfts,
      };
    }
  } catch (error) {
    console.error("Error creating nft:", error);
    return { message: "Internal Server Error", response: "" };
  }
}

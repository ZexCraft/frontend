import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getNft(req: { address: string }) {
  const { address } = req;

  try {
    const { data: fetchedNft, error: fetchError } = await supabase
      .from("nft")
      .select("*")
      .eq("address", address);
    console.log(fetchedNft);

    if (fetchError || fetchedNft == null || fetchedNft.length === 0) {
      return {
        message: "NFT does not exist",
        data: "",
      };
    } else {
      return {
        message: "Success",
        resposne: fetchedNft[0],
      };
    }
  } catch (error) {
    console.error("Error creating nft:", error);
    return { message: "Internal Server Error" };
  }
}

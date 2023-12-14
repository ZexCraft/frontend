import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function createNft(req: {
  address: string;
  metadata: string;
  parent: string;
  contractAddress: string;
  tokenId: number;
}) {
  const { address, metadata, parent, contractAddress, tokenId } = req;

  try {
    const { data: fetchedNft, error: fetchError } = await supabase
      .from("nft")
      .select("*");
    console.log(fetchedNft);

    if (fetchError || fetchedNft == null || fetchedNft.length === 0) {
      const { data, error } = supabase
        ? await supabase
            .from("nft")
            .insert([
              {
                address,
                metadata,
                parent,
                contract_address: contractAddress,
                token_id: tokenId,
              },
            ])
            .select()
        : {
            data: null,
            error: new Error("Supabase client is not initialized"),
          };
      if (error) {
        console.log(error);

        return { message: "Error creating nft" };
      }
      return {
        message: "NFT created",
        data: data != null ? data[0] : "",
      };
    } else {
      return {
        message: "NFT already exists",
        resposne: fetchedNft[0],
      };
    }
  } catch (error) {
    console.error("Error creating nft:", error);
    return { message: "Internal Server Error" };
  }
}

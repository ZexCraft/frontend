import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function createNft(req: {
  address: string;
  image: string;
  imageAlt: string;
  parent: string;
  chainId: string;
  contractAddress: string;
  rarity: number;
  tokenId: number;
  type: number;
}): Promise<{ message: string; response: any }> {
  const {
    address,
    image,
    imageAlt,
    parent,
    contractAddress,
    tokenId,
    chainId,
    rarity,
    type,
  } = req;

  try {
    const { data: fetchedNft, error: fetchError } = await supabase
      .from("nft")
      .select("*")
      .eq("address", address)
      .eq("chain_id", chainId);

    console.log(fetchedNft);
    console.log("IMAGE: ", image);
    console.log("IMAGE ALT: ", imageAlt);
    if (fetchError || fetchedNft == null || fetchedNft.length === 0) {
      const { data, error } = supabase
        ? await supabase
            .from("nft")
            .insert([
              {
                address,
                image,
                image_alt: imageAlt,
                parent,
                rarity,
                chain_id: chainId,
                contract_address: contractAddress,
                token_id: tokenId,
                type,
              },
            ])
            .select()
        : {
            data: null,
            error: new Error("Supabase client is not initialized"),
          };
      if (error) {
        console.log(error);

        return { message: "Error creating nft", response: "" };
      }
      return {
        message: "NFT created",
        response: data != null ? data[0] : "",
      };
    } else {
      return {
        message: "NFT already exists",
        response: fetchedNft[0],
      };
    }
  } catch (error) {
    console.error("Error creating nft:", error);
    return { message: "Internal Server Error", response: "" };
  }
}

import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function createChild(req: {
  address: string;
  image: string;
  imageAlt: string;
  parent: string;
  contractAddress: string;
  rarity: string;
  tokenId: string;
  chainId: string;
}) {
  const {
    rarity,
    address,
    image,
    imageAlt,
    parent,
    chainId,
    contractAddress,
    tokenId,
  } = req;

  try {
    const { data: fetchedNft, error: fetchError } = await supabase
      .from("nft")
      .select("*")
      .eq("address", address)
      .eq("chain_id", chainId);

    if (fetchError || fetchedNft == null || fetchedNft.length === 0) {
      const { data, error } = supabase
        ? await supabase
            .from("nft")
            .insert([
              {
                address,
                parent,
                contract_address: contractAddress,
                rarity,
                token_id: tokenId,
                chain_id: chainId,
                type: 1,
                image,
                image_alt: imageAlt,
              },
            ])
            .select()
        : {
            data: null,
            error: new Error("Supabase client is not initialized"),
          };
      console.log("Create child return data");
      console.log({ data, error });
      if (error) {
        console.log(error);

        return { message: "Error creating nft", response: null };
      }

      return {
        message: "Child created",
        response: data != null ? data[0] : "",
      };
    } else {
      return {
        message: "NFT already exists",
        resposne: fetchedNft[0],
      };
    }
  } catch (error) {
    console.error("Error creating nft:", error);
    return { message: "Internal Server Error", response: null };
  }
}

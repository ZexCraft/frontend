import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function createBabyRequest(req: {
  relationship: string;
  parentNumber: string;
  signature: string;
  chainId: string;
}): Promise<{ message: string; response: any }> {
  const { relationship, parentNumber, chainId, signature } = req;

  try {
    const { data: fetchedRequest, error: fetchError } = await supabase
      .from("baby_requests")
      .select("*")
      .eq("relationship", relationship)
      .eq("chainId", chainId)
      .eq("is_incomplete", true);

    if (fetchError || fetchedRequest == null || fetchedRequest.length === 0) {
      const { data, error } = supabase
        ? await supabase
            .from("baby_requests")
            .insert([
              {
                relationship,
                parent1_sig: parentNumber == "1" ? signature : null,
                parent2_sig: parentNumber == "2" ? signature : null,
                chain_id: chainId,
                is_incomplete: true,
              },
            ])
            .select()
        : {
            data: null,
            error: new Error("Supabase client is not initialized"),
          };
      if (error) {
        console.log(error);

        return { message: "Error creating baby request", response: "" };
      }
      return {
        message: "Breed Request created",
        response: data != null ? data[0] : "",
      };
    } else {
      return {
        message: "Breed Request already exists",
        response: fetchedRequest[0],
      };
    }
  } catch (error) {
    console.error("Error creating nft:", error);
    return { message: "Internal Server Error", response: "" };
  }
}

import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getBreedRequest(req: {
  requester: string;
  receiver: string;
}): Promise<{ message: string; response: any }> {
  const { requester, receiver } = req;

  try {
    const { data: fetchedRequest, error: fetchError } = await supabase
      .from("breeding_requests")
      .select("*")
      .eq("requester", requester)
      .eq("receiver", receiver);
    if (fetchError || fetchedRequest == null || fetchedRequest.length === 0) {
      return {
        message: "Breed Request does not exist",
        response: null,
      };
    } else {
      return {
        message: "Breed Request already exists",
        response: fetchedRequest[0],
      };
    }
  } catch (error) {
    console.error("Error creating nft:", error);
    return { message: "Internal Server Error", response: null };
  }
}

import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getBreedRequests(req: {
  receiver: string;
}): Promise<{ message: string; response: any }> {
  const { receiver } = req;

  try {
    const { data: fetchedRequests, error: fetchError } = await supabase
      .from("breeding_requests")
      .select("*")
      .eq("receiver", receiver);
    if (fetchError || fetchedRequests == null || fetchedRequests.length === 0) {
      return {
        message: "You don't have any breed requests",
        response: null,
      };
    } else {
      return {
        message: "Success",
        response: fetchedRequests,
      };
    }
  } catch (error) {
    console.error("Error creating nft:", error);
    return { message: "Internal Server Error", response: null };
  }
}

import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getBabyRequest(req: {
  relationship: string;
  chainId: string;
}): Promise<{ message: string; response: any }> {
  const { relationship, chainId } = req;

  try {
    const { data: fetchedRequest, error: fetchError } = await supabase
      .from("baby_requests")
      .select("*")
      .eq("relationship", relationship)
      .eq("is_incomplete", true)
      .eq("chain_id", chainId);
    if (fetchError || fetchedRequest == null || fetchedRequest.length === 0) {
      return {
        message: "Baby Request does not exist",
        response: null,
      };
    } else {
      return {
        message: "Success",
        response: fetchedRequest[0],
      };
    }
  } catch (error) {
    console.error("Error getting baby:", error);
    return { message: "Internal Server Error", response: null };
  }
}

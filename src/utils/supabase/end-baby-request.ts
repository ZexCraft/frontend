import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function endBabyRequest(req: {
  relationship: string;
  chainId: string;
}): Promise<{ message: string; response: any }> {
  const { relationship, chainId } = req;

  try {
    const { data: fetchedRequest, error: fetchError } = await supabase
      .from("baby_requests")
      .select("*")
      .eq("id", relationship)
      .eq("chain_id", chainId);
    if (fetchError || fetchedRequest == null || fetchedRequest.length === 0) {
      return {
        message: "Baby Request does not exist",
        response: null,
      };
    } else {
      const { data: updatedRequest, error: updateError } = await supabase
        .from("baby_requests")
        .update({ is_incomplete: false })
        .eq("id", relationship)
        .eq("chain_id", chainId);
      return {
        message: "Success",
        response: updatedRequest != null ? updatedRequest[0] : null,
      };
    }
  } catch (error) {
    console.error("Error getting baby:", error);
    return { message: "Internal Server Error", response: null };
  }
}

import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function endBreedingRequest(req: {
  id: string;
  chainId: string;
}): Promise<{ message: string; response: any }> {
  const { id, chainId } = req;

  try {
    const { data, error: deleteError } = await supabase
      .from("breeding_requests")
      .delete()
      .eq("id", id)
      .eq("chain_id", chainId);

    console.log("Delete Breeding Request Response");
    console.log({ data, deleteError });
    return {
      message: deleteError == null ? "Success" : "Error",
      response: deleteError != null ? deleteError : null,
    };
  } catch (error) {
    console.error("Error deleting request: ", error);
    return { message: "Internal Server Error", response: null };
  }
}

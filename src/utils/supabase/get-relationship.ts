import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getRelationship(req: {
  address: string;
}): Promise<{ message: string; response?: any }> {
  const { address } = req;

  try {
    console.log(address);
    const { data: fetchedRelationship, error: fetchError } = await supabase
      .from("relationship")
      .select("*")
      .eq("address", address);
    console.log(fetchedRelationship);

    if (
      fetchError ||
      fetchedRelationship == null ||
      fetchedRelationship.length === 0
    ) {
      return {
        message: "Relationship does not exist",
        response: null,
      };
    } else {
      return {
        message: "Success",
        response: fetchedRelationship[0],
      };
    }
  } catch (error) {
    console.error("Error getting relationship:", error);
    return { message: "Internal Server Error", response: null };
  }
}

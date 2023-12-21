import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getRelationshipsByCreator(req: {
  actual_parent: string;
  chainId: string;
}): Promise<{ message: string; response?: any }> {
  const { actual_parent, chainId } = req;

  try {
    console.log(actual_parent);
    console.log(
      "actual_parent_1.eq." +
        actual_parent +
        ",actual_parent_2.eq." +
        actual_parent
    );
    const { data: fetchedRelationships, error: fetchError } = await supabase
      .from("relationship")
      .select("*")
      .or(
        "actual_parent_1.eq." +
          actual_parent +
          ",actual_parent_2.eq." +
          actual_parent
      )
      .eq("chain_id", chainId);
    console.log(fetchedRelationships);

    if (
      fetchError ||
      fetchedRelationships == null ||
      fetchedRelationships.length === 0
    ) {
      return {
        message: "No relationships exist",
        response: null,
      };
    } else {
      return {
        message: "Success",
        response: fetchedRelationships,
      };
    }
  } catch (error) {
    console.error("Error getting relationship:", error);
    return { message: "Internal Server Error", response: null };
  }
}

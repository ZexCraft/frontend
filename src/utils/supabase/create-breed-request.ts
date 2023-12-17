import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function createBreedRequest(req: {
  requester: string;
  receiver: string;
  signature: string;
}): Promise<{ message: string; response: any }> {
  const { requester, receiver, signature } = req;

  try {
    const { data: fetchedRequest, error: fetchError } = await supabase
      .from("breeding_requests")
      .select("*")
      .eq("requester", requester)
      .eq("receiver", receiver);
    if (fetchError || fetchedRequest == null || fetchedRequest.length === 0) {
      const { data, error } = supabase
        ? await supabase
            .from("breeding_requests")
            .insert([
              {
                requester,
                receiver,
                requester_sig: signature,
              },
            ])
            .select()
        : {
            data: null,
            error: new Error("Supabase client is not initialized"),
          };
      if (error) {
        console.log(error);

        return { message: "Error creating breed request", response: "" };
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

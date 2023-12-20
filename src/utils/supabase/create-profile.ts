import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function creatProfile(req: {
  wallet: string;
  name: string;
  image: string;
  cover: string;
  description: string;
}): Promise<{ message: string; response: any }> {
  const { wallet, name, image, cover, description } = req;

  try {
    const { data: fetchedProfile, error: fetchError } = await supabase
      .from("profile")
      .select("*")
      .eq("wallet", wallet);
    console.log(fetchedProfile);

    if (fetchError || fetchedProfile == null || fetchedProfile.length === 0) {
      const { data, error } = supabase
        ? await supabase
            .from("profile")
            .insert([{ wallet, name, image, cover, description }])
            .select()
        : {
            data: null,
            error: new Error("Supabase client is not initialized"),
          };
      if (error) {
        return { message: "Error creating profile", response: "" };
      }
      return {
        message: "Success",
        response: data != null ? data[0] : "",
      };
    } else {
      return {
        message: "Profile already exists",
        response: fetchedProfile[0],
      };
    }
  } catch (error) {
    console.error("Error creating profile:", error);
    return { message: "Internal Server Error", response: "" };
  }
}

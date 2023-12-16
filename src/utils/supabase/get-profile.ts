import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getProfile(req: { wallet: string }) {
  const { wallet } = req;

  try {
    const { data: fetchedProfile, error: fetchError } = await supabase
      .from("profile")
      .select("*")
      .eq("wallet", wallet);
    console.log(fetchedProfile);

    if (fetchError || fetchedProfile == null || fetchedProfile.length === 0) {
      return {
        message: "Profile does not exist",
        response: {
          wallet: wallet,
          name: "Bob",
          image: "https://picsum.photos/500/500",
          cover: "https://picsum.photos/800/300",
          description: "Hey there! I'm new to InCraft!",
        },
      };
    } else {
      return {
        message: "Success",
        response: fetchedProfile[0],
      };
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { message: "Internal Server Error" };
  }
}

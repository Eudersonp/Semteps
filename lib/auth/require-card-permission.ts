import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireCardPermission(
  cardKey: string,
  returnTo = "/",
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    const next = encodeURIComponent(returnTo);
    redirect(`/login?next=${next}`);
  }

  const { data: permission, error: permissionError } = await supabase
    .from("user_card_permissions")
    .select("card_key")
    .eq("user_id", user.id)
    .eq("card_key", cardKey)
    .maybeSingle();

  if (permissionError || !permission) {
    redirect("/sem-permissao");
  }

  return user;
}
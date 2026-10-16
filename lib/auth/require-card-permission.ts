import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireCardPermission(cardKey: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: permission, error: permissionError } = await supabase
    .from("user_card_permissions")
    .select("card_key")
    .eq("card_key", cardKey)
    .maybeSingle();

  if (permissionError || !permission) {
    redirect("/sem-permissao");
  }

  return user;
}
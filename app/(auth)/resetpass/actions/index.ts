"use server";
import { supabase } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function resetpass({ passwordReset }: { passwordReset: string }) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.updateUser({
    password: passwordReset,
  });
  return { data, error };
}

export async function updateEstadoUser({
  estado,
  id,
}: {
  estado: string;
  id: string;
}) {
  const { data, error } = await supabase
    .from("personas_x_usuarios")
    .update({ estado: estado })
    .eq("id_usuario", id);

  return { data, error };
}

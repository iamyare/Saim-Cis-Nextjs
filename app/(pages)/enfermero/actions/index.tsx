"use server";
import { supabase } from "@/lib/supabase";

export async function getUsersByRol({ role }: { role: string }) {
  const { data: usuario, error: errorUsuario } = await supabase
    .from("personas")
    .select("*")
    .eq("rol", role);

  return { usuario, errorUsuario };
}

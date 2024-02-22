"use server";
import { supabase } from "@/lib/supabase";

export async function getUsersByRol({ rol }: { rol: string }) {
  const { data: usuario, error: errorUsuario } = await supabase
    .from("personas")
    .select("*")
    .eq("rol", rol);

  return { usuario, errorUsuario };
}

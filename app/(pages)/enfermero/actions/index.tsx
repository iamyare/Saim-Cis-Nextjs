"use server";
import { supabase } from "@/lib/supabase";
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getUsersByRol({ role }: { role: string }) {
  const { data: usuario, error: errorUsuario } = await supabase
    .from("personas")
    .select("*")
    .eq("rol", role);

  return { usuario, errorUsuario };
}

export async function getPersonasByDNI({ dni }: { dni: string }) {
  const { data: persona, error: errorPersona } = await supabase
    .from("personas")
    .select("*")
    .eq("dni", dni);
  return { persona, errorPersona };
}

export async function insertaPersona ({data}: {
  data: {
    nombre: string
    apellido: string
    correo: string
    direccion: string
    dni: string
    fecha_nacimiento: string
    genero: string
    telefono: string
  }
}) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: personaData, error } = await supabase
      .from('personas')
      .insert({
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        direccion: data.direccion,
        dni: data.dni,
        fecha_nacimiento: data.fecha_nacimiento,
        genero: data.genero,
        telefono: data.telefono
      } 
      );

    if (error) {
      throw new Error(`Error al insertar persona: ${error.message}`);
    }

    return personaData;
  } catch (error) {
    console.error('Error al insertar persona:', error);
    throw error;
  }
}

// export async function signUpWithEmailAndPassword ({data3}: {
//   data3: {
//     correo: string
//     contrasenia: string
//   }
// }

// ) {
//   const supabase = await createSupabaseServerClient()
//   const result = await supabase.auth.signUp({
//     email: data3.correo,
//     password: '123456',
//   })

//   return JSON.stringify(result)
// }


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

// Funcion para verificar si el dni ya existe en supabase
export async function verificarExistenciaDNI( dni: string ) {
    // Verificar si el DNI ya existe en la base de datos
    const { data: dniExistente, error: errorDni } = await supabase
      .from('personas')
      .select('id')
      .eq('dni', dni)
      .single();

    // Si el DNI existe, retornar verdadero
    if (dniExistente) {
      return true;
    }

    // Si no existe, retornar falso
    return false;
}

// Funcion para verificar si el correo ya existe en la base de datos
export async function verificarExistenciaCorreo(correo: string) {
    const supabase = await createSupabaseServerClient();
    
    // Verificar si el correo ya existe en la base de datos
    const { data: correoExistente, error: errorCorreo } = await supabase
      .from('personas')
      .select('id')
      .eq('correo', correo)
      .single();

    // Si el correo existe, retornar verdadero
    if (correoExistente) {
      return true;
    }

    // Si no existe, retornar falso
    return false;
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
    
    // Verificar si el correo ya existe en la base de datos
    const { data: correoExistente, error: errorCorreo } = await supabase
      .from('personas')
      .select('id')
      .eq('correo', data.correo)
      .single();

    if (correoExistente) {
      throw new Error('El correo ya está registrado');
    }

    //Insertar los datos del paciente en la tabla personas
    const { data: personaData, error } = await supabase
      .from('personas')
      .insert([data]);

    if (error) {
      throw new Error(`Error al insertar persona: ${error.message}`);
    }

    return personaData;
  } catch (error) {
    console.error('Error al insertar persona:', error);
    throw error;
  }
}

export async function signUpWithEmailAndPassword ({data3}: {
  data3: {
    correo: string
    contrasenia: string
  }
}
) {
  const supabase = await createSupabaseServerClient()
  const result = await supabase.auth.signUp({
    email: data3.correo,
    password: '123456',
  })
  return JSON.stringify(result)
}


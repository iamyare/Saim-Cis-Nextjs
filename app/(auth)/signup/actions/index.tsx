'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { supabase } from '@/lib/supabase'

export async function signUpWithEmailAndPassword ({data}: {
  data: {
    email: string
    password: string
    confirm: string
  }
}

) {
  const supabase = await createSupabaseServerClient()
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  return JSON.stringify(result)
}

// export async function insertaPersona ({data}: {
//   data: {
//     firstName: string
//     lastName: string
//     dni: string
//     email: string
//   }
// }) {
//   const supabase = await createSupabaseServerClient()
//   const { data: personaData} = await supabase
//       .from('personas')
//       .insert([
//         {
//           primer_nombre: data.firstName,
//           primer_apellido: data.lastName,
//           dni: data.dni,
//           correo: data.email,
//         }
//       ])

//   return JSON.stringify(personaData)
  
// }


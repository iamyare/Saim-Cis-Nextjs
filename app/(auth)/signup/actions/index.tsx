'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { supabase } from '@/lib/supabase'

export async function signUpWithEmailAndPassword ({data, id_persona}: {
  data: {
    email: string
    password: string
    confirm: string
  },
  id_persona: string
}

) {
  const supabase = await createSupabaseServerClient()
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        id_persona: id_persona
      }
    }
  })

  return JSON.stringify(result)
}

export async function getUserbyDNI ({dni}: {dni: string}) {
  const { data, error } = await supabase
    .from('personas')
    .select('*')
    .eq('dni', dni)
    .single()
  return { data, error }
}

export async function checkPersonAndUser ({id}: {id: string}) {

  const { data: userData, error: userError } = await supabase
    .from('personas_x_usuarios')
    .select('*')
    .eq('id_persona', id)

  
  return { userData, userError }
}


import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseAnonKey, getSupabaseUrl } from './env'

let supabaseClient: SupabaseClient<Database> | null = null

const getSupabaseClient = () => {
  supabaseClient ??= createClient<Database>(
    getSupabaseUrl(),
    getSupabaseAnonKey()
  )

  return supabaseClient
}

const supabaseProxyTarget: SupabaseClient<Database> = Object.create(null)

export const supabase = new Proxy(supabaseProxyTarget, {
  get (_target, prop, receiver) {
    return Reflect.get(getSupabaseClient(), prop, receiver)
  }
})

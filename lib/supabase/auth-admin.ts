import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseServiceRoleKey, getSupabaseUrl } from './env'

let supabaseClient: SupabaseClient<Database> | null = null

const getSupabaseClient = () => {
  supabaseClient ??= createClient<Database>(
    getSupabaseUrl(),
    getSupabaseServiceRoleKey(),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  return supabaseClient
}

const adminAuthClientProxyTarget: SupabaseClient<Database>['auth']['admin'] =
  Object.create(null)

export const adminAuthClient = new Proxy(adminAuthClientProxyTarget, {
  get (_target, prop, receiver) {
    return Reflect.get(getSupabaseClient().auth.admin, prop, receiver)
  }
})

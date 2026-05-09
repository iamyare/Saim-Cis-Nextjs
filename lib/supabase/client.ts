import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseAnonKey, getSupabaseUrl } from './env'

export default function createSupabaseBrowerClient () {
  return createBrowserClient(
    getSupabaseUrl(),
    getSupabaseAnonKey()
  )
}

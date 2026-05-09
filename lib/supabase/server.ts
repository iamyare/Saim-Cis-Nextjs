'use server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseAnonKey, getSupabaseUrl } from './env'

export async function createSupabaseServerClient () {
  const cookieStore = cookies()

  return createServerClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      cookies: {
        get (name: string) {
          return cookieStore.get(name)?.value
        },
        set (name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove (name: string, options: CookieOptions) {
          cookieStore.delete({ name, ...options })
        }
      }
    }
  )
}

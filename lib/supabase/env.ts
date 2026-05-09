const requiredEnv = (name: string) => {
  const value = process.env[name]

  if (value == null || value.trim() === '') {
    throw new Error(`${name} is required.`)
  }

  return value
}

export const getSupabaseUrl = () => requiredEnv('NEXT_PUBLIC_SUPABASE_URL')

export const getSupabaseAnonKey = () =>
  requiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

export const getSupabaseServiceRoleKey = () =>
  requiredEnv('NEXT_PUBLIC_SUPABASE_ROLE_KEY')

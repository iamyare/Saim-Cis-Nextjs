import { type Database as DB } from '@/lib/database.types'

declare global {
  type Database = DB
  type Users = DB['public']['Tables']['usuarios']['Row']
  type Expedientes = DB['public']['Tables']['expedientes']['Row']
  type Consultas = DB['public']['Tables']['consultas']['Row']
  type Diagnosticos = DB['public']['Tables']['diagnosticos']['Row']

}

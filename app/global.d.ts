import { type Database as DB } from '@/lib/database.types'

declare global {
  type Database = DB
  type Personas = DB['public']['Tables']['personas']['Row']
  type Expedientes = DB['public']['Tables']['expedientes']['Row']
  type Consultas = DB['public']['Tables']['consultas']['Row']
  type Diagnosticos = DB['public']['Tables']['diagnosticos']['Row']
  type PersonasXUsuarios = DB['public']['Tables']['personas_x_usuarios']['Row']
  type UserType = 
  | (Personas & { usuario: PersonasXUsuarios } & {
      role: {
          rol: string;
          especialidad: string[];
        }[];
    })
  | null;

}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      citas: {
        Row: {
          descripcion: string | null
          estado: string
          fecha_final: string
          fecha_inicio: string
          fecha_registro: string
          id: string
          id_doctor: string
          id_paciente: string
        }
        Insert: {
          descripcion?: string | null
          estado: string
          fecha_final: string
          fecha_inicio: string
          fecha_registro?: string
          id?: string
          id_doctor: string
          id_paciente: string
        }
        Update: {
          descripcion?: string | null
          estado?: string
          fecha_final?: string
          fecha_inicio?: string
          fecha_registro?: string
          id?: string
          id_doctor?: string
          id_paciente?: string
        }
        Relationships: [
          {
            foreignKeyName: 'citas_id_doctor_fkey'
            columns: ['id_doctor']
            isOneToOne: false
            referencedRelation: 'personas'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'citas_id_paciente_fkey'
            columns: ['id_paciente']
            isOneToOne: false
            referencedRelation: 'personas'
            referencedColumns: ['id']
          }
        ]
      }
      consultas: {
        Row: {
          estatura: number | null
          fecha_consulta: string
          id: string
          id_cita: string | null
          id_expediente: string
          peso: number | null
          presion_arterial: string | null
          saturacion_oxigeno: string | null
          sintomas: string | null
          temperatura: number | null
        }
        Insert: {
          estatura?: number | null
          fecha_consulta?: string
          id?: string
          id_cita?: string | null
          id_expediente: string
          peso?: number | null
          presion_arterial?: string | null
          saturacion_oxigeno?: string | null
          sintomas?: string | null
          temperatura?: number | null
        }
        Update: {
          estatura?: number | null
          fecha_consulta?: string
          id?: string
          id_cita?: string | null
          id_expediente?: string
          peso?: number | null
          presion_arterial?: string | null
          saturacion_oxigeno?: string | null
          sintomas?: string | null
          temperatura?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'consultas_id_cita_fkey'
            columns: ['id_cita']
            isOneToOne: false
            referencedRelation: 'citas'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'consultas_id_expediente_fkey'
            columns: ['id_expediente']
            isOneToOne: false
            referencedRelation: 'expedientes'
            referencedColumns: ['id']
          }
        ]
      }
      especializacion_x_personas: {
        Row: {
          id_especializacion: string
          id_persona: string
        }
        Insert: {
          id_especializacion: string
          id_persona: string
        }
        Update: {
          id_especializacion?: string
          id_persona?: string
        }
        Relationships: [
          {
            foreignKeyName: 'especializacion_x_personas_id_especializacion_fkey'
            columns: ['id_especializacion']
            isOneToOne: false
            referencedRelation: 'especializaciones'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'especializacion_x_personas_id_persona_fkey'
            columns: ['id_persona']
            isOneToOne: false
            referencedRelation: 'personas'
            referencedColumns: ['id']
          }
        ]
      }
      especializaciones: {
        Row: {
          id: string
          id_rol: string
          nombre: string
        }
        Insert: {
          id?: string
          id_rol: string
          nombre: string
        }
        Update: {
          id?: string
          id_rol?: string
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: 'especializaciones_id_rol_fkey'
            columns: ['id_rol']
            isOneToOne: false
            referencedRelation: 'roles'
            referencedColumns: ['id']
          }
        ]
      }
      expedientes: {
        Row: {
          fecha_apertura: string
          id: string
          id_persona: string
        }
        Insert: {
          fecha_apertura?: string
          id?: string
          id_persona: string
        }
        Update: {
          fecha_apertura?: string
          id?: string
          id_persona?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_expedientes_id_persona_fkey'
            columns: ['id_persona']
            isOneToOne: false
            referencedRelation: 'personas'
            referencedColumns: ['id']
          }
        ]
      }
      personas: {
        Row: {
          apellido: string
          correo: string | null
          creado: string
          direccion: string | null
          dni: string
          fecha_nacimiento: string
          genero: string
          id: string
          nombre: string
          rol: string | null
          telefono: string | null
        }
        Insert: {
          apellido: string
          correo?: string | null
          creado?: string
          direccion?: string | null
          dni: string
          fecha_nacimiento: string
          genero: string
          id?: string
          nombre: string
          rol?: string | null
          telefono?: string | null
        }
        Update: {
          apellido?: string
          correo?: string | null
          creado?: string
          direccion?: string | null
          dni?: string
          fecha_nacimiento?: string
          genero?: string
          id?: string
          nombre?: string
          rol?: string | null
          telefono?: string | null
        }
        Relationships: []
      }
      personas_x_usuarios: {
        Row: {
          avatar_url: string | null
          correo: string
          created_at: string
          descripcion: string | null
          estado: string | null
          id_persona: string
          id_usuario: string
          pass_temp: string | null
        }
        Insert: {
          avatar_url?: string | null
          correo: string
          created_at?: string
          descripcion?: string | null
          estado?: string | null
          id_persona: string
          id_usuario: string
          pass_temp?: string | null
        }
        Update: {
          avatar_url?: string | null
          correo?: string
          created_at?: string
          descripcion?: string | null
          estado?: string | null
          id_persona?: string
          id_usuario?: string
          pass_temp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'personas_x_usuarios_id_persona_fkey'
            columns: ['id_persona']
            isOneToOne: false
            referencedRelation: 'personas'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'personas_x_usuarios_id_usuario_fkey'
            columns: ['id_usuario']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      roles: {
        Row: {
          id: string
          nombre: string
        }
        Insert: {
          id?: string
          nombre: string
        }
        Update: {
          id?: string
          nombre?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (Database['public']['Tables'] & Database['public']['Views'])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
      ? R
      : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
  Database['public']['Views'])
    ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof Database['public']['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof Database['public']['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof Database['public']['Enums']
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never

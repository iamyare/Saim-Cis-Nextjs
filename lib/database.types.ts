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
      centro_medico: {
        Row: {
          creado: string
          direccion: string | null
          id: string
          img: string | null
          nombre: string
          rtn: string
        }
        Insert: {
          creado?: string
          direccion?: string | null
          id?: string
          img?: string | null
          nombre: string
          rtn: string
        }
        Update: {
          creado?: string
          direccion?: string | null
          id?: string
          img?: string | null
          nombre?: string
          rtn?: string
        }
        Relationships: []
      }
      citas: {
        Row: {
          estado: string
          fecha_final: string
          fecha_registro: string
          id: string
          id_doctor: string
          id_paciente: string
        }
        Insert: {
          estado: string
          fecha_final: string
          fecha_registro?: string
          id?: string
          id_doctor: string
          id_paciente: string
        }
        Update: {
          estado?: string
          fecha_final?: string
          fecha_registro?: string
          id?: string
          id_doctor?: string
          id_paciente?: string
        }
        Relationships: [
          {
            foreignKeyName: "citas_id_doctor_fkey"
            columns: ["id_doctor"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "citas_id_paciente_fkey"
            columns: ["id_paciente"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          }
        ]
      }
      consultas: {
        Row: {
          creado: string
          estatura: number | null
          id: string
          id_cita: string
          id_expediente: string
          peso: number | null
          presion_arterial: string | null
          saturacion_oxigeno: string | null
          sintomas: string
          temperatura: number | null
        }
        Insert: {
          creado?: string
          estatura?: number | null
          id?: string
          id_cita: string
          id_expediente: string
          peso?: number | null
          presion_arterial?: string | null
          saturacion_oxigeno?: string | null
          sintomas: string
          temperatura?: number | null
        }
        Update: {
          creado?: string
          estatura?: number | null
          id?: string
          id_cita?: string
          id_expediente?: string
          peso?: number | null
          presion_arterial?: string | null
          saturacion_oxigeno?: string | null
          sintomas?: string
          temperatura?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "consultas_id_cita_fkey"
            columns: ["id_cita"]
            isOneToOne: false
            referencedRelation: "citas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultas_id_expediente_fkey"
            columns: ["id_expediente"]
            isOneToOne: false
            referencedRelation: "expedientes"
            referencedColumns: ["id"]
          }
        ]
      }
      contratos: {
        Row: {
          fecha_final: string | null
          fecha_inicio: string | null
          id: string
          id_usuario: string | null
          jornada: string | null
          sueldo: number | null
        }
        Insert: {
          fecha_final?: string | null
          fecha_inicio?: string | null
          id?: string
          id_usuario?: string | null
          jornada?: string | null
          sueldo?: number | null
        }
        Update: {
          fecha_final?: string | null
          fecha_inicio?: string | null
          id?: string
          id_usuario?: string | null
          jornada?: string | null
          sueldo?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contratos_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          }
        ]
      }
      diagnosticos: {
        Row: {
          estado: string | null
          fecha_diagnostico: string
          id: string
          id_consulta: string | null
          id_diagnosticador: string
          observacion: string | null
        }
        Insert: {
          estado?: string | null
          fecha_diagnostico?: string
          id?: string
          id_consulta?: string | null
          id_diagnosticador: string
          observacion?: string | null
        }
        Update: {
          estado?: string | null
          fecha_diagnostico?: string
          id?: string
          id_consulta?: string | null
          id_diagnosticador?: string
          observacion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diagnosticos_id_consulta_fkey"
            columns: ["id_consulta"]
            isOneToOne: false
            referencedRelation: "consultas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diagnosticos_id_diagnosticador_fkey"
            columns: ["id_diagnosticador"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          }
        ]
      }
      diagnosticos_x_enfermedades: {
        Row: {
          fecha_diagnostico: string
          id_diagnostico: string
          id_enfermedades: string
          observacion: string | null
        }
        Insert: {
          fecha_diagnostico?: string
          id_diagnostico: string
          id_enfermedades: string
          observacion?: string | null
        }
        Update: {
          fecha_diagnostico?: string
          id_diagnostico?: string
          id_enfermedades?: string
          observacion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diagnosticos_x_enfermedades_id_diagnostico_fkey"
            columns: ["id_diagnostico"]
            isOneToOne: false
            referencedRelation: "diagnosticos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diagnosticos_x_enfermedades_id_enfermedades_fkey"
            columns: ["id_enfermedades"]
            isOneToOne: false
            referencedRelation: "enfermedades"
            referencedColumns: ["id"]
          }
        ]
      }
      enfermedades: {
        Row: {
          created_at: string
          id: string
          nombre: string
          observacion: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          nombre: string
          observacion?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          nombre?: string
          observacion?: string | null
        }
        Relationships: []
      }
      expedientes: {
        Row: {
          fecha_apertura: string
          id: string
        }
        Insert: {
          fecha_apertura?: string
          id?: string
        }
        Update: {
          fecha_apertura?: string
          id?: string
        }
        Relationships: []
      }
      jornadas: {
        Row: {
          hora_final: string | null
          hora_inicial: string | null
          id: string
          nombre: string
        }
        Insert: {
          hora_final?: string | null
          hora_inicial?: string | null
          id?: string
          nombre: string
        }
        Update: {
          hora_final?: string | null
          hora_inicial?: string | null
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      permisos_tipo_usuarios: {
        Row: {
          id: string
          nombre: string
        }
        Insert: {
          id: string
          nombre: string
        }
        Update: {
          id?: string
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "permisos_tipo_usuarios_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "tipo_usuarios"
            referencedColumns: ["id"]
          }
        ]
      }
      personas: {
        Row: {
          avatar: string | null
          correo: string | null
          creado: string
          direccion: string | null
          dni: string
          fecha_nacimiento: string
          genero: string
          id: string
          id_expediente: string
          primer_apellido: string
          primer_nombre: string
          segundo_apellido: string | null
          segundo_nombre: string | null
          telefono: string | null
          tipo_usuario: string | null
        }
        Insert: {
          avatar?: string | null
          correo?: string | null
          creado?: string
          direccion?: string | null
          dni: string
          fecha_nacimiento: string
          genero: string
          id?: string
          id_expediente: string
          primer_apellido: string
          primer_nombre: string
          segundo_apellido?: string | null
          segundo_nombre?: string | null
          telefono?: string | null
          tipo_usuario?: string | null
        }
        Update: {
          avatar?: string | null
          correo?: string | null
          creado?: string
          direccion?: string | null
          dni?: string
          fecha_nacimiento?: string
          genero?: string
          id?: string
          id_expediente?: string
          primer_apellido?: string
          primer_nombre?: string
          segundo_apellido?: string | null
          segundo_nombre?: string | null
          telefono?: string | null
          tipo_usuario?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "personas_id_expediente_fkey"
            columns: ["id_expediente"]
            isOneToOne: false
            referencedRelation: "expedientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "personas_tipo_usuario_fkey"
            columns: ["tipo_usuario"]
            isOneToOne: false
            referencedRelation: "tipo_usuarios"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
        }
        Relationships: []
      }
      telefonos_sucursales: {
        Row: {
          centro_medico: string
          creado: string
          id: number
          numero: string
        }
        Insert: {
          centro_medico: string
          creado?: string
          id?: number
          numero: string
        }
        Update: {
          centro_medico?: string
          creado?: string
          id?: number
          numero?: string
        }
        Relationships: [
          {
            foreignKeyName: "telefonos_sucursales_centro_medico_fkey"
            columns: ["centro_medico"]
            isOneToOne: false
            referencedRelation: "centro_medico"
            referencedColumns: ["id"]
          }
        ]
      }
      tipo_usuarios: {
        Row: {
          created_at: string
          id: string
          nombre: string
        }
        Insert: {
          created_at?: string
          id?: string
          nombre: string
        }
        Update: {
          created_at?: string
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
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

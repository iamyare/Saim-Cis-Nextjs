/* eslint-disable @typescript-eslint/naming-convention */
import { supabase } from '@/lib/supabase'

export async function getCitasByDoctor ({ id_doctor }: { id_doctor: string }) {
  const { data: citas, error: errorCitas } = await supabase
    .from('citas')
    .select('*, paciente:personas!citas_id_paciente_fkey(*)')
    .eq('id_doctor', id_doctor)
    .order('fecha_inicio', { ascending: true })

  return { citas, errorCitas }
}

export async function getCita ({ id_cita }: { id_cita: string }) {
  const { data: cita, error: errorCita } = await supabase
    .from('citas')
    .select('*, consulta:consultas(*)')
    .eq('id', id_cita)
    .single()

  // citasModifica ya que consulta es un objeto y no un array
  const citasModifica = {
    ...cita,
    consulta: cita?.consulta[0] ?? null
  }

  return { cita: citasModifica, errorCita }
}

export async function getConsultasById ({ id_consulta }: { id_consulta: string }) {
  const { data: consulta, error: errorConsulta } = await supabase
    .from('consultas')
    .select('*, estado:estado_consultas(*), expedientes(*, personas(*))')
    .eq('id', id_consulta)
    .single()

  return { consulta, errorConsulta }
}

/*
export async function createDiagnostico ({ data }: { data: DiagnosticoInsert }) {
  const { data: diagnostico, error: errorDiagnostico } = await supabase
    .from('diagnosticos')
    .insert({ ...data })
    .select('*')
    .single()

  return { diagnostico, errorDiagnostico }
}
*/
import { supabase } from '@/lib/supabase'


export async function getUser ({id}: {id: string}) {
    const { data: usuarios, error: errorUsuarios } =
        await supabase
            .from('usuarios')
            .select('*')
            .eq('id', id)
            .single()

  
    return { usuarios, errorUsuarios }
  }


export async function getExpedienteByUser ({id} : {id: string}) {
    const { data: expedientes, error: errorExpedientes } =
        await supabase
            .from('expedientes')
            .select('*')
            .eq('id_paciente', id)

  
    return { expedientes, errorExpedientes }
  }


  export async function getAllInfoUser ({id}: {id: string}) {
    const { data: usuarios, error: errorUsuarios } =
        await supabase
            .from('usuarios')
            .select('*, expedientes(*)')
            .eq('id', id)
            .single()

  
    return { usuarios, errorUsuarios }
  }

    export async function getAllInfoUserByExpediente ({id}: {id: string}) {
        const { data: expediente, error: errorExpediente } =
            await supabase
                .from('expedientes')
                .select('*, consultas(*)')
                .eq('id', id)
                .single()

    
    
        return { expediente, errorExpediente }
    }
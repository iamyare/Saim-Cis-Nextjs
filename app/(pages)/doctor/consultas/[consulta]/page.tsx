import { getConsultasById, getEstadoConsultaAndChange } from '../../actions'
import ConsultaClient from './consulta-client'

export default async function page ({
  params
}: {
  params: { consulta: string }
}) {
  const { consulta, errorConsulta } = await getConsultasById({
    id_consulta: params.consulta
  })

  if (errorConsulta) {
    return <h1>Error al cargar la consulta</h1>
  }

  if (!consulta) {
    return <h1>Consulta no encontrada</h1>
  }

  if (consulta.id_estado_consulta === '5961389c-363d-4a9a-8c76-025b0421caff') {
    await getEstadoConsultaAndChange({ idConsulta: consulta.id, estado: 'diagnostico' })
  }

  return (
    <ConsultaClient consulta={consulta} />
  )
}

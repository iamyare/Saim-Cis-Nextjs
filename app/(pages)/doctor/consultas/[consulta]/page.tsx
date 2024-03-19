import { getConsultasById } from '../../actions'
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

  return (
    <ConsultaClient consulta={consulta } />
  )
}

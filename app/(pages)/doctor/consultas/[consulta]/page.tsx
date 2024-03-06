import { getConsultasById } from '../../actions'
import FormDiagnostic from './components/form-diagnostic'

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
    <main className=" container">

    <aside className='flex flex-col md:flex-row border-b my-2'>
    <div className='w-full'>
      <h2 className="text-2xl font-medium my-2">Paciente</h2>
      <div>
        <h1>Detalles del paciente</h1>

        <div className="flex flex-col gap-4">
          <div>
            <h2>Nombre</h2>
            <p>{consulta.expedientes?.personas?.nombre}</p>
          </div>
          <div>
            <h2>Apellido</h2>
            <p>{consulta.expedientes?.personas?.apellido}</p>
          </div>
          <div>
            <h2>Fecha de nacimiento</h2>
            <p>
              {consulta.expedientes?.personas?.fecha_nacimiento
                ? new Date(consulta.expedientes?.personas?.fecha_nacimiento).toLocaleDateString(
                  'es-ES',
                  {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }
                )
                : 'No disponible'}
            </p>
          </div>
          <div>
            <h2>DNI</h2>
            <p>{consulta.expedientes?.personas?.dni}</p>
          </div>
        </div>
        </div>

      </div>

      <div className='w-full'>
      <h2 className="text-2xl font-medium my-2">Consulta</h2>
      <div>
        <h1>Detalles de la consulta {consulta?.id}</h1>

        <div className="flex flex-col gap-4">
          <div>
            <h2>Fecha de la consulta</h2>
            <p>
              {consulta.fecha_consulta
                ? new Date(consulta?.fecha_consulta).toLocaleDateString(
                  'es-ES',
                  {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }
                )
                : 'No disponible'}
            </p>
          </div>
          <div>
            <h2>Estado</h2>
            <p>{consulta.estado?.estado}</p>
          </div>
          <div>
            <h2>Sintomas</h2>
            <p>{consulta.sintomas}</p>
          </div>
        </div>
      </div>
      </div>
    </aside>

      <aside>
        <h2 className="text-2xl font-medium my-2">Diagnostico</h2>

        <FormDiagnostic consulta={consulta} />
      </aside>
    </main>
  )
}

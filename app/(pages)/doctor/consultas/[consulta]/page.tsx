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

    <aside className='flex flex-col md:flex-row border-b my-10'>
    <div className='w-full text-center'>
      <h2 className="text-2xl font-medium my-2">Detalles del Paciente</h2>
      <div>
        <div className="flex flex-col gap-4 mt-5 mb-10">
          <div className=''>
            <span className='font-semibold'>DNI: </span>
            <span>{consulta.expedientes?.personas?.dni}</span>
          </div>
          <div className=''>
            <span className='font-semibold'>Nombre: </span>
            <span>{consulta.expedientes?.personas?.nombre} {consulta.expedientes?.personas?.apellido}</span>
          </div>
          <div>
            <span className='font-semibold'>Fecha de nacimiento: </span>
            <span>
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
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className='w-full text-center'>
    <h2 className="text-2xl font-medium my-2">Detalles de la Consulta</h2>
    <div>
      <div className="flex flex-col gap-4 mt-5 mb-10">
        <div>
          <span className='font-semibold'>Fecha de la consulta: </span>
          <span>
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
          </span>
        </div>
        <div>
          <span className='font-semibold'>Estado: </span>
          <span>{consulta.estado?.estado}</span>
        </div>
        <div>
          <span className='font-semibold'>Sintomas: </span>
          <span>{consulta.sintomas}</span>
        </div>
      </div>
    </div>
    </div>
    </aside>

      <aside className=''>
        <h2 className="text-2xl font-medium my-2 text-center">Diagnostico</h2>

        <FormDiagnostic consulta={consulta} />
      </aside>
    </main>
  )
}

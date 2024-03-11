import { getCitasByDoctor } from '../actions'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import CitasListInfo from './citas-list-info'

export default async function CitasInfo ({ usuario }: { usuario: UserType }) {
  if (!usuario) return null
  const { citas } = await getCitasByDoctor({
    id_doctor: usuario.id
  })

  const citasAgrupadas = citas?.reduce<Record<string, Array<Citas & { paciente: Personas }>>>((acc, cita) => {
    const fechaInicio = new Date(cita.fecha_inicio).toLocaleDateString('en-US')
    if (!acc[fechaInicio]) {
      acc[fechaInicio] = []
    }
    if (cita.paciente) {
      acc[fechaInicio].push({ ...cita, paciente: cita.paciente })
    }
    return acc
  }, {})

  const citasFuturas = Object.entries(citasAgrupadas ?? {}).filter(
    ([fecha, citasPorFecha]) => new Date(fecha) >= new Date()
  )

  return (
    <div className=" w-full bg-white dark:bg-slate-900 rounded-lg shadow-xl p-8">
      <h4 className="text-xl text-gray-900 dark:text-gray-100 font-bold">
        Citas Próximas
      </h4>
      {citasFuturas.length > 0 ? (
        citasFuturas.map(([fecha, citasPorFecha], index) => (
          <ul key={index} className="">
            <div className=" flex justify-center items-center gap-2 w-fit text-gray-700 dark:text-gray-300 mt-4">
              <CalendarDaysIcon className="h-4 w-4 " />
              <h5 className="text-sm">
                {new Date(fecha).toLocaleDateString('es-HN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
              </h5>
            </div>
            <CitasListInfo citasPorFecha={citasPorFecha} />
          </ul>
        ))
      ) : (
        <div className="grid place-items-center h-full w-full ">
          <div className="flex flex-col items-center justify-center gap-1">
            <h5 className="text-gray-300 dark:text-gray-700 text-center">
              No hay citas próximas
            </h5>
          </div>
        </div>
      )}
    </div>
  )
}

import CalendarClient from './calendar'
import { getCitasByDoctor } from '@/app/(pages)/doctor/actions'

export default async function page () {
  const { citas, errorCitas } = await getCitasByDoctor({
    id_doctor: '90b4168c-8aa6-4548-9055-4c00bf36ee32'
  })

  if (errorCitas) return <div>Error</div>

  if (!citas) return <div>Loading...</div>

  const events = citas.map((cita) => ({
    id: cita.id,
    title: cita.paciente?.nombre ?? '',
    start: new Date(cita.fecha_inicio),
    end: new Date(cita.fecha_final),
    info: cita
  }))

  return (
      <div className="">
        <CalendarClient events={events} />
      </div>
  )
}

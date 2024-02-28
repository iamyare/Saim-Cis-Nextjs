import { Suspense } from 'react'
import { getUsersByRol } from '../actions'
import { AgregarPaciente } from '../components/agregar-paciente'
import ListaPacientes from '../components/list'

export default async function EnfermeroPacientePage () {
  const { usuario, errorUsuario } = await getUsersByRol({ role: 'paciente' })

  if (errorUsuario) {
    return <span>Error al obtener los pacientes</span>
  }

  if (!usuario) {
    return <span>No hay pacientes</span>
  }

  return (
    <div className="w-full px-8 py-2">
      <div className="flex w-full items-center justify-between">
        <h1 className={'text-2xl'}>Pacientes</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <AgregarPaciente />
      </div>
      <Suspense fallback={<span>Cargando...</span>}>
        <div className="mt-8">
          <span>{`Total de pacientes: ${usuario?.length}`}</span>
          <ul className="flex flex-col gap-4 divide-y  items-center">
            <ListaPacientes usuario={usuario} />
          </ul>
        </div>
      </Suspense>
    </div>
  )
}

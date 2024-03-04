// import NavbarPacienteClient from '../components/navbar-paciente-client'
import { getInfoPersona } from '@/app/actions'
import ActualizarPerfil from '@/components/actualizar-info'

export default async function PerfilPacientePage () {
  const { usuario, errorUsuario } = await getInfoPersona()

  if (errorUsuario) {
    return (
      <div>
        <span>Error al obtener los datos del usuario</span>
      </div>
    )
  }

  return (
    <>
      <ActualizarPerfil usuario={usuario ?? null} />
    </>
  )
}

import { getInfoPersona } from '@/app/actions'
import ActualizarPerfil from '@/app/components/actualizar-usuario'

import NavbarIndex from '@/components/navbar-index'

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
      <NavbarIndex />
      <ActualizarPerfil usuario={usuario ?? null} />
    </>
  )
}

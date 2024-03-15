import { readUserSession } from '@/lib/actions'
import NavbarEnfermeroClient from './navbar-enfermero-client'
import { getUser } from '@/app/actions'

export default async function NavbarIndex () {
  const {
    data: { session }
  } = await readUserSession()
  if (!session) {
    return <NavbarEnfermeroClient user={null} />
  }

  const { usuario, errorUsuario } = await getUser({ id: session.user.id })
  if (errorUsuario) {
    console.error(errorUsuario)
  }

  return <NavbarEnfermeroClient user={usuario ?? null} />
}

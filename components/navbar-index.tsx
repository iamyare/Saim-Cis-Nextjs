import { readUserSession } from '@/lib/actions'
import NavbarIndexClient from './navbar-index-client'

export default async function NavbarIndex () {
  let session: Awaited<ReturnType<typeof readUserSession>>['data']['session'] | null = null

  try {
    const response = await readUserSession()
    session = response.data.session
  } catch (error) {
    console.error('No se pudo leer la sesión pública:', error)
    return <NavbarIndexClient user={null} />
  }

  if (!session) {
    return <NavbarIndexClient user={null} />
  }

  try {
    const { getUser } = await import('@/app/actions')
    const { usuario, errorUsuario } = await getUser({ id: session.user.id })
    if (errorUsuario) {
      console.error(errorUsuario)
    }

    return <NavbarIndexClient user={usuario ?? null} />
  } catch (error) {
    console.error('No se pudo cargar el usuario público:', error)
    return <NavbarIndexClient user={null} />
  }
}

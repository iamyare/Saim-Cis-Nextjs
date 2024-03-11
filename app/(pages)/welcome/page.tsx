import { type Metadata } from 'next'
import WelcomeClient from './welcome'
import { redirect } from 'next/navigation'
import { readUserSession } from '@/lib/actions'
import { getUser } from '../../actions'
export const metadata: Metadata = {
  title: 'Bienvenido a Saim Cis 🎉',
  description: 'Bienvenido a Saim Cis 🎉'
}

export default async function Welcome () {
  const { data: { session } } = await readUserSession()

  if (!session) {
    return redirect('/')
  }

  const { usuario, errorUsuario } = await getUser({ id: session.user.id })
  if (errorUsuario) {
    return (
      <div>
        <h1>Error</h1>
        <p>{errorUsuario.message}</p>
      </div>
    )
  }

  if (!usuario) {
    return (
      <div>
        <h1>Error</h1>
        <p>No se encontró el usuario</p>
      </div>
    )
  }

  return (
    <WelcomeClient user={usuario}/>
  )
}

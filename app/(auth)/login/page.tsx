import { type Metadata } from 'next'
import LoginAuth from './components/login'

import { redirect } from 'next/navigation'
import { getInfoPersona } from '@/app/actions'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: 'Iniciar sesión en la aplicación.'
}

export default async function Login () {
  // const { data } = await readUserSession()
  const { usuario } = await getInfoPersona()

  if (usuario) {
    usuario.usuario.estado === 'pendiente'
      ? redirect('/resetpass')
      : redirect('/')
  }

  // if (data.session) {
  //   return redirect('/')
  // }

  return <LoginAuth />
}

import { type Metadata } from 'next'
import LoginAuth from './components/login'

import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: 'Iniciar sesión en la aplicación.'
}

export default async function Login () {
  let usuario: Awaited<ReturnType<typeof import('@/app/actions').getInfoPersona>>['usuario'] | undefined

  try {
    const { getInfoPersona } = await import('@/app/actions')
    const response = await getInfoPersona()
    usuario = response.usuario
  } catch (error) {
    console.error('No se pudo leer la sesión para login:', error)
  }

  if (usuario) {
    usuario.usuario.estado === 'pendiente'
      ? redirect('/resetpass')
      : redirect('/')
  }

  return <LoginAuth />
}

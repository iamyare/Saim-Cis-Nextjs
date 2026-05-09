/* eslint-disable @typescript-eslint/space-before-function-paren */
import { type Metadata } from 'next'
import LoginAuth from './components/login'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: 'Iniciar sesión en la aplicación.'
}

export default async function Login() {
  return <LoginAuth />
}

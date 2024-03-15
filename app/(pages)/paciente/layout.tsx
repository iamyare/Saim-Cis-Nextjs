import { type Metadata } from 'next'
import NavbarPacienteClient from './components/navbar-paciente-client'
import { getPermissionsAndUser } from '@/app/actions'
import Permissions from '@/components/permissions'

export const metadata: Metadata = {
  title: 'Paciente',
  description: 'Pagina principal del paciente'
}

export default async function PacienteLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const { permissions, message, errorCode, usuario } =
  await getPermissionsAndUser({
    rolNecesario: 'paciente'
  })

  if (!permissions) {
    return <Permissions message={message} errorCode={errorCode} />
  }

  return (
    <>
      <NavbarPacienteClient user={usuario ?? null} />
      {children}
    </>
  )
}

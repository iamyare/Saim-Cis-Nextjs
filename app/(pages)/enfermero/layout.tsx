import { type Metadata } from 'next'
import NavbarEnfermeroClient from './components/navbar-enfermero-client'
import { getPermissionsAndUser } from '@/app/actions'
import Permissions from '@/components/permissions'

export const metadata: Metadata = {
  title: 'Enfermero',
  description: 'Pagina principal del enfermero'
}
export default async function EnfermeroLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const { permissions, message, errorCode, usuario } =
    await getPermissionsAndUser({
      rolNecesario: 'enfermero'
    })

  if (!permissions) {
    return <Permissions message={message} errorCode={errorCode} />
  }

  return (
    <>
      <NavbarEnfermeroClient user={usuario ?? null}/>
      {children}
    </>
  )
}

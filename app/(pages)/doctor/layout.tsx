import type { Metadata } from 'next'
import NavbarDoctorClient from './components/navbar-doctor-client'
import { getPermissionsAndUser } from '@/app/actions'
import Permissions from '@/components/permissions'

export const metadata: Metadata = {
  title: 'Doctor',
  description: 'Pagina principal del doctor'
}

export default async function DoctorLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const { permissions, message, errorCode, usuario } =
    await getPermissionsAndUser({
      rolNecesario: 'doctor'
    })

  if (!permissions) {
    return <Permissions message={message} errorCode={errorCode} />
  }

  return (
    <>
      <NavbarDoctorClient user={usuario ?? null} />
      {children}
    </>
  )
}

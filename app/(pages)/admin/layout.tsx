import type { Metadata } from 'next'
// import NavbarAdminClient from './components/navbar-doctor-client'
import { getPermissionsAndUser } from '@/app/actions'
import Permissions from '@/components/permissions'
import React from 'react'

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Pagina principal del administrador'
}

export default async function AdminLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const { permissions, message, errorCode, usuario } =
  await getPermissionsAndUser({
    rolNecesario: 'admin'
  })

  if (!permissions) {
    return <Permissions message={message} errorCode={errorCode} />
  }

  return (
    <>
      hola {usuario}
    </>
  )
}

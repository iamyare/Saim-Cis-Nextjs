import NavbarEnfermeroClient from './components/navbar-enfermero-client'
import { getInfoPersona } from '@/app/actions'
import { type Metadata } from 'next'

export const meta: Metadata = {
  title: 'Pacientes',
  description: 'Pacientes de enfermería'
}

export default async function EnfermeroLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const { usuario: enfermero } = await getInfoPersona()

  return (
    <>
      <NavbarEnfermeroClient user={enfermero ?? null}/>
      {children}
    </>
  )
}

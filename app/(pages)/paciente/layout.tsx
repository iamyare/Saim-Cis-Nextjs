import { type Metadata } from 'next'
import { getInfoPersona } from '@/app/actions'
import NavbarPacienteClient from './components/navbar-paciente-client'

export const meta: Metadata = {
  title: 'Paciente',
  description: 'Pagina del paciente'
}

export default async function PacienteLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const { usuario: paciente } = await getInfoPersona()

  return (
    <>
      <NavbarPacienteClient user={paciente ?? null} />
      {children}
    </>
  )
}

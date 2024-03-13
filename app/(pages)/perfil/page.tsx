import { getInfoPersona } from '@/app/actions'
import ActualizarPerfil from '@/app/components/actualizar-usuario'

import NavbarDoctorClient from '../doctor/components/navbar-doctor-client'
import NavbarEnfermeroClient from '../enfermero/components/navbar-enfermero-client'
import NavbarPacienteClient from '../paciente/components/navbar-paciente-client'

export default async function PerfilPacientePage () {
  const { usuario, errorUsuario } = await getInfoPersona()

  if (errorUsuario) {
    return (
      <div>
        <span>Error al obtener los datos del usuario</span>
      </div>
    )
  }

  return (
    <>
      {
        // si el usuario role es paciente, mostrar el navbar de paciente, de lo contrario verificar que si es doctor y mostrar el navbar de doctor o enfermero

        usuario?.role.map((rol, index) => {
          if (rol.rol === 'paciente') {
            return <NavbarPacienteClient key={index} user={usuario ?? null} />
          } else if (rol.rol === 'doctor') {
            return <NavbarDoctorClient key={index} user={usuario ?? null} />
          } else if (rol.rol === 'enfermero') {
            return <NavbarEnfermeroClient key={index} user={usuario ?? null} />
          }
          return null // Add this line to return a value at the end of the arrow function
        })
      }
      <ActualizarPerfil usuario={usuario ?? null} />
    </>
  )
}

import { readUserSession } from '@/lib/actions'
import { supabase } from '@/lib/supabase'

export async function getUser ({ id }: { id: string }) {
  let usuarioModificado
  const { data: usuario, error: errorUsuario } = await supabase
    .from('personas_x_usuarios')
    .select(
      '*, personas(*, especializaciones:especializacion_x_personas(especializacion:especializaciones(nombre, rol:roles(nombre))))'
    )
    .eq('id_usuario', id)
    .single()

  if (usuario?.personas) {
    const { personas, ...restoUsuario } = usuario
    const { especializaciones, ...restoPersonas } = personas

    const roles = especializaciones.reduce<Array<{ rol: string, especialidad: string[] }>>((acc, especializacion) => {
      const rolNombre = especializacion.especializacion?.rol?.nombre ?? ''
      const especialidad = especializacion.especializacion?.nombre ?? ''

      const rolExistente = acc.find((rol) => rol.rol === rolNombre)

      if (rolExistente) {
        rolExistente.especialidad.push(especialidad)
      } else {
        acc.push({ rol: rolNombre, especialidad: [especialidad] })
      }

      return acc
    }, [])

    usuarioModificado = {
      ...restoPersonas,
      role: roles.length > 0 ? roles : [{ rol: '', especialidad: [''] }],
      usuario: {
        ...restoUsuario
      }
    }
  }

  return { usuario: usuarioModificado, errorUsuario }
}

export async function getAllInfoUser ({ id }: { id: string }) {
  const { data: usuarios, error: errorUsuarios } = await supabase
    .from('personas')
    .select('*, expedientes(*)')
    .eq('id', id)
    .single()

  return { usuarios, errorUsuarios }
}

export async function getAllInfoUserByExpediente ({ id }: { id: string }) {
  const { data: expediente, error: errorExpediente } = await supabase
    .from('expedientes')
    .select('*, consultas(*)')
    .eq('id', id)
    .single()

  return { expediente, errorExpediente }
}

export async function getInfoPersona () {
  const {
    data: { session }
  } = await readUserSession()
  if (!session) {
    return {
      permissions: false,
      message: 'No hay sesión activa',
      errorCode: 401
    }
  }

  const { usuario, errorUsuario } = await getUser({ id: session.user.id })

  if (errorUsuario) {
    return {
      permissions: false,
      message: 'Error al obtener el usuario',
      errorCode: 500
    }
  }

  if (!usuario) {
    return {
      permissions: false,
      message: 'No se encontró el usuario',
      errorCode: 404
    }
  }

  return { usuario, errorUsuario }
}

export async function getPermissionsAndUser ({
  rolNecesario
}: {
  rolNecesario: RolesPermissons
}) {
  // Comprobar si hay una sesión activa
  const {
    data: { session }
  } = await readUserSession()
  if (!session) {
    return {
      permissions: false,
      message: 'No hay sesión activa',
      errorCode: 401
    }
  }

  const { usuario, errorUsuario } = await getUser({ id: session.user.id })

  if (errorUsuario) {
    return {
      permissions: false,
      message: 'Error al obtener el usuario',
      errorCode: 500
    }
  }

  if (!usuario) {
    return {
      permissions: false,
      message: 'No se encontró el usuario',
      errorCode: 404
    }
  }

  let permiso = false

  usuario.role.map((rol) => {
    if (rol.rol === rolNecesario) {
      permiso = true
    }
    return null
  })

  if (!permiso) {
    return {
      permissions: false,
      message: 'No tienes permisos para acceder a esta página',
      errorCode: 403
    }
  }

  // Si todo está bien, devolvemos el usuario
  return {
    permissions: true,
    message: 'Cuenta con los permisos',
    errorCode: 200,
    usuario
  }
}

export async function getTotalPagesByRoleAndQuery ({
  role,
  query
}: {
  role: RolesPermissons
  query: string
}) {
  const { data: totalPages } = await supabase.rpc(
    'get_personas_count_by_rol_and_filter',
    {
      rol_param: role,
      filtro_param: query
    }
  )
  return totalPages
}

export async function getUsersByRoleAndQuery ({
  rol,
  query = '',
  offset,
  perPage,
  currentPage
}: {
  rol: RolesPermissons
  query: string
  offset: number
  perPage: number
  currentPage: number
}) {
  const { data: users, error } = await supabase.rpc(
    'get_personas_by_rol_and_filter_pagination',
    {
      rol_param: rol,
      filtro_param: query,
      offset_param: offset,
      limit_param: currentPage * perPage - 1
    }
  )

  return { users: users as PersonasAndUsuarios, error }
}

// obteniendo el id del estado de la consulta
export async function getIDEstadoConsultaByEstado ({ estado }: { estado: EstadosConsultas }) {
  const { data: dataIDEstado, error: errorIDEstado } = await supabase
    .from('estado_consultas')
    .select('id')
    .eq('estado', estado)
    .single()

  if (errorIDEstado) {
    return { data: null, error: errorIDEstado }
  }

  if (!dataIDEstado) {
    return { data: null, error: 'No se encontro el estado' }
  }

  return { dataIDEstado, errorIDEstado }
}

import { readUserSession } from "@/lib/actions";
import { supabase } from "@/lib/supabase";

export async function getUser({ id }: { id: string }) {
  let usuarioModificado;
  const { data: usuario, error: errorUsuario } = await supabase
    .from("personas_x_usuarios")
    .select(
      "*, personas(*, especializaciones:especializacion_x_personas(especializacion:especializaciones(nombre, rol:roles(nombre))))"
    )
    .eq("id_usuario", id)
    .single();

  if (usuario && usuario.personas) {
    const { personas, ...restoUsuario } = usuario;
    const { especializaciones, ...restoPersonas } = personas;

    const roles = especializaciones.reduce((acc, especializacion) => {
      const rolNombre = especializacion.especializacion?.rol?.nombre || "";
      const especialidad = especializacion.especializacion?.nombre || "";

      const rolExistente = acc.find((rol) => rol.rol === rolNombre);

      if (rolExistente) {
        rolExistente.especialidad.push(especialidad);
      } else {
        acc.push({ rol: rolNombre, especialidad: [especialidad] });
      }

      return acc;
    }, [] as { rol: string; especialidad: string[] }[]);

    usuarioModificado = {
      ...restoPersonas,
      role: roles.length > 0 ? roles : [{ rol: "", especialidad: [""] }],
      usuario: {
        ...restoUsuario,
      },
    };
  }

  return { usuario: usuarioModificado, errorUsuario };
}

export async function getExpedienteByUser({ id }: { id: string }) {
  const { data: expedientes, error: errorExpedientes } = await supabase
    .from("expedientes")
    .select("*")
    .eq("id_paciente", id);

  return { expedientes, errorExpedientes };
}

export async function getAllInfoUser({ id }: { id: string }) {
  const { data: usuarios, error: errorUsuarios } = await supabase
    .from("personas")
    .select("*, expedientes(*)")
    .eq("id", id)
    .single();

  return { usuarios, errorUsuarios };
}

export async function getAllInfoUserByExpediente({ id }: { id: string }) {
  const { data: expediente, error: errorExpediente } = await supabase
    .from("expedientes")
    .select("*, consultas(*)")
    .eq("id", id)
    .single();

  return { expediente, errorExpediente };
}

export async function getInfoPersona() {
  const {
    data: { session },
  } = await readUserSession();
  if (!session) {
    return {
      permissions: false,
      message: "No hay sesión activa",
      errorCode: 401,
    };
  }

  const { usuario, errorUsuario } = await getUser({ id: session.user.id });

  if (errorUsuario) {
    return {
      permissions: false,
      message: "Error al obtener el usuario",
      errorCode: 500,
    };
  }

  if (!usuario) {
    return {
      permissions: false,
      message: "No se encontró el usuario",
      errorCode: 404,
    };
  }

  return { usuario, errorUsuario };
}

import { Key, Suspense } from "react";
import { getUsersByRol } from "../actions";
import { AgregarPaciente } from "../components/agregar-paciente";

export default async function EnfermeroPacientePage() {
  const { usuario, errorUsuario } = await getUsersByRol({ role: "paciente" });

  if (errorUsuario) {
    return <span>Error al obtener los pacientes</span>;
  }

  if (!usuario) {
    return <span>No hay pacientes</span>;
  }

  return (
    <div className="w-full px-8 py-2">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Pacientes</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <AgregarPaciente />
      </div>
      <Suspense fallback={<span>Cargando...</span>}>
        <div className="mt-8">
          <ul className="flex flex-col gap-4 divide-y">
            {usuario.map((user, index) => (
              <li key={index} className="flex items-center gap-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full flex justify-center items-center bg-blue-500 text-white">
                    {user.nombre.charAt(0).toUpperCase() +
                      user.apellido.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {user.nombre} {user.apellido}
                    </p>
                    <p className="text-gray-500">{user.correo}</p>
                  </div>
                </div>
                <div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Ver
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Suspense>
    </div>
  );
}

import { readUserSession } from "@/lib/actions";
import DoctorPageClient from "./doctor-page-client";
import Link from "next/link";
import { getUser } from "@/app/actions";

export default async function page() {
  const {
    data: { session },
  } = await readUserSession();

  if (!session) {
    return (
      <div className="grid place-items-center h-screen">
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl">Inicia sesión para ver esta página</h2>
          <Link
            href="/login"
            className="inline-flex w-fit justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-900 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  const { usuario, errorUsuario } = await getUser({ id: session.user.id });
  if (errorUsuario) {
    console.error(errorUsuario);
  }
  
  if (!usuario) {
    return (
      <div className="grid place-items-center h-screen">
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl">No hay usuario</h2>
        </div>
      </div>
    );
  }



        return (
          <div className="grid place-items-center h-screen">
            <div className="flex flex-col justify-center items-center gap-4">
              <h2 className="text-2xl">No tienes permiso para ver esta página</h2>
              <Link
                href="/"
                className="inline-flex w-fit justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-900 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Ir a la página principal
              </Link>
            </div>
          </div>
        );

}

import { readUserSession } from "@/lib/actions";
import { getAllInfoUser, getUser } from "./actions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Info() {
  const {
    data: { session },
  } = await readUserSession();

  if (!session) {
    return redirect("/login");
  }

  if (!session?.user) {
    return (
      <div className="grid place-content-center min-h-screen">
        <h1 className="text-2xl text-center">Informacion</h1>
        <div>
          <span>Usuario:</span>
        </div>
      </div>
    );
  }

  const { usuarios, errorUsuarios } = await getAllInfoUser({
    id: session.user.id,
  });


  if (errorUsuarios) {
    return (
      <div className="grid place-content-center min-h-screen">
        <h1 className="text-2xl text-center">Error:</h1>
        <div>
          <span>{errorUsuarios.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid place-content-center min-h-screen">
      <div className=" max-w-md">
        <h1 className="text-2xl text-center">Informacion</h1>
        <div className="flex flex-col gap-4">
          <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            <div className="flex flex-col pb-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Nombre
              </dt>
              <dd className="text-lg font-semibold">
                {usuarios?.primer_nombre} {usuarios?.primer_apellido}
              </dd>
            </div>
            <div className="flex flex-col pb-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Correo Electronico
              </dt>
              <dd className="text-lg font-semibold">{usuarios?.correo}</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Domicilio
              </dt>
              <dd className="text-lg font-semibold">{usuarios?.direccion}</dd>
            </div>
            <div className="flex flex-col pt-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Telefono
              </dt>
              <dd className="text-lg font-semibold">{usuarios?.telefono}</dd>
            </div>
          </dl>

          <hr />
          <div className="flex flex-col font-medium">
            <span>Expediente: {usuarios?.expedientes?.id}</span>
            <span>
              Fecha de apertura:{" "}
              {new Date(
                usuarios?.expedientes?.fecha_apertura ?? ""
              ).toLocaleDateString()}
            </span>
            <Link href={`/info/${usuarios?.id_expediente}`} >
                ver mas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

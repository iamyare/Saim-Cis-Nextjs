import Link from "next/link";
import { getCitasByDoctor } from "../actions";
import { ClockIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

export default async function CitasInfo({ usuario }: { usuario: UserType }) {
  if (!usuario) return null;
  const { citas, errorCitas } = await getCitasByDoctor({
    id_doctor: usuario.id,
  });

  const citasAgrupadas = citas?.reduce<{
    [key: string]: (Citas & { paciente: Personas })[];
  }>((acc, cita) => {
    const fechaInicio = new Date(cita.fecha_inicio).toLocaleDateString("en-US");
    if (!acc[fechaInicio]) {
      acc[fechaInicio] = [];
    }
    if (cita.paciente) {
      acc[fechaInicio].push({ ...cita, paciente: cita.paciente });
    }
    return acc;
  }, {});

  const citasFuturas = Object.entries(citasAgrupadas || {}).filter(
    ([fecha, citasPorFecha]) => new Date(fecha) >= new Date()
  );

  return (
    <div className=" w-full bg-white dark:bg-slate-900 rounded-lg shadow-xl p-8">
      <h4 className="text-xl text-gray-900 dark:text-gray-100 font-bold">
        Citas Próximas
      </h4>
      {citasFuturas.length > 0 ? (
        citasFuturas.map(([fecha, citasPorFecha], index) => (
          <ul key={index} className="">
            <div className=" flex justify-center items-center gap-2 w-fit text-gray-700 dark:text-gray-300 mt-4">
              <CalendarDaysIcon className="h-4 w-4 " />
              <h5 className="text-sm">
                {new Date(fecha).toLocaleDateString("es-HN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h5>
            </div>
            {citasPorFecha.map((cita, index) => (
              <li
                key={index}
                className="flex flex-col px-2 py-3 gap-1 border-b"
              >
                <span className="flex  justify-center items-center gap-1 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 px-2 py-1 rounded-md w-fit text-sm">
                  <ClockIcon className="h-4 w-4 " />
                  {new Date(cita.fecha_inicio).toLocaleTimeString("es-HN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {" - "}
                  {new Date(cita.fecha_final).toLocaleTimeString("es-HN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <Link
                  className="flex flex-col"
                  href={`/doctor/citas/${cita.id}`}
                  scroll={false}
                >
                  <h5 className="font-semibold">
                    {cita.paciente?.nombre} {cita.paciente?.apellido}
                  </h5>
                </Link>
                <span className="text-sm">
                  {cita.descripcion ?? "Sin descripcion"}
                </span>
              </li>
            ))}
          </ul>
        ))
      ) : (
        <div className="grid place-items-center h-full w-full ">
          <div className="flex flex-col items-center justify-center gap-1">
            <h5 className="text-gray-300 dark:text-gray-700 text-center">
              No hay citas próximas
            </h5>
          </div>
        </div>
      )}
    </div>
  );
}

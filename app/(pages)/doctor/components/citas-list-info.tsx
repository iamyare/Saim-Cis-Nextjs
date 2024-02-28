"use client";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function CitasListInfo({
  citasPorFecha,
}: {
  citasPorFecha: (Citas & { paciente: Personas })[];
}) {
  const [citaSelected, setCitaSelected] = useState<
    (Citas & { paciente: Personas }) | null
  >(null);

  return (
    <>
      {citasPorFecha.map((cita, index) => (
        <li key={index} className="flex flex-col px-2 py-3 gap-1 border-b">
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
          <button
            className="flex flex-col"
            onClick={() => setCitaSelected(cita)}
            data-hs-overlay="#hs-modal-cita"
          >
            <h5 className="font-semibold">
              {cita.paciente?.nombre} {cita.paciente?.apellido}
            </h5>
          </button>
          <span className="text-sm">
            {cita.descripcion ?? "Sin descripcion"}
          </span>
        </li>
      ))}

      <div
        id="hs-modal-cita"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl pointer-events-auto shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center flex justify-end">
                <button
                  type="button"
                  className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  data-hs-overlay="#hs-modal-cita"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <div className="text-center">
                <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Cita
                </h2>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  Informacion detallada de la cita
                </p>
              </div>
              <div className="my-5">
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 text-justify">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold">Paciente</span>
                      <span className="text-sm">
                        {citaSelected?.paciente?.nombre}{" "}
                        {citaSelected?.paciente?.apellido}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold">Fecha</span>
                      <span className="text-sm">
                        {new Date(
                          citaSelected?.fecha_inicio ?? ""
                        ).toLocaleDateString("es-HN", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 text-justify">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold">Hora</span>
                      <span className="text-sm">
                        {new Date(
                          citaSelected?.fecha_inicio ?? ""
                        ).toLocaleTimeString("es-HN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {" - "}
                        {new Date(
                          citaSelected?.fecha_final ?? ""
                        ).toLocaleTimeString("es-HN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold">Descripcion</span>
                      <span className="text-sm">
                        {citaSelected?.descripcion ?? "Sin descripcion"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { DetallesPage } from '../consultas/detalle/page'
import { useState } from 'react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { ConsultaProvider, useConsultaContext } from '../actions/consulta-provider'

export default function DataTableClient ({ consultas }: { consultas: InfoConsultas[] }) {
  const [consultaSeleccionadaLocal, setConsultaSeleccionadaLocal] =
    useState<InfoConsultas | null>(null)
  const pathname = usePathname()
  const { consultaSeleccionada, setConsultaSeleccionada } = useConsultaContext() ?? {}

  const handleClickAtender = (consulta: InfoConsultas) => {
    setConsultaSeleccionadaLocal(consulta) // Actualizar el estado local del componente
    console.log(consultaSeleccionadaLocal)
    setConsultaSeleccionada(consulta) // Actualizar el estado en el contexto
  }
  return (
      <ConsultaProvider>
        <div className="flex flex-col my-4">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400  uppercase">Nombre</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">DNI</th>
                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Fecha Consulta</th>
                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Estado</th>
                  </tr>
                  </thead>
                  <tbody >

                    {consultas.map((consulta, index) => (
                      <tr
                        key={index}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                      >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex items-center gap-3">
                            {/* <img
                              src={consulta.consulta?.avatar_url ?? 'https://leplanb.lesmontagne.net/wp-content/uploads/sites/5/2017/06/default_avatar.png'}
                              className="rounded-full w-6 h-6"

                              alt={`Fotografia perfil de ${consulta.nombre}`}
                            /> */}
                            <Link href={`${pathname}/${consulta.id_consulta}`} className=' whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                              {consulta.nombre} {consulta.apellido}
                            </Link>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {consulta.dni}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-end">
                          {consulta.fecha_consulta
                            ? new Date(consulta.fecha_consulta).toLocaleDateString(
                              'es-ES',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              }
                            )
                            : 'No disponible'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-end">
                          <span
                            className={`capitalize px-2 py-1 rounded-md
                              ${
                                consulta.estado_consulta === 'preclinica'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-500'
                                  : consulta.estado_consulta === 'diagnostico'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500'
                                  : consulta.estado_consulta === 'completada'
                                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500'
                                  : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-500'
                              }
                            `}
                          >
                            {consulta.estado_consulta ?? 'No disponible'}
                          </span>
                        </td>
                        <td>
                          <div className="flex justify-end">
                            <Link className="flex items-center gap-x-3.5 rounded-lg text-sm text-gray-800"
                                href={`${pathname}/`}
                              >
                                <button
                                  onClick={() => { handleClickAtender(consulta) }}
                                  className="py-2 px-3 my-1 mx-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg transition-colors duration-200 border border-blue-600 text-blue-600 hover:bg-blue-500 hover:border-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                  <span className="hidden md:block">Atender</span>{' '}
                                  <PencilSquareIcon className="h-5 md:ml-4" />
                                </button>
                              </Link>
                            {/* <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700" aria-labelledby="hs-dropdown-custom-icon-trigger">
                              <button data-hs-overlay="#hs-modal-preclinica" className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" >
                                  Atender
                              </button>
                            </div> */}
                          </div>
                        </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ConsultaProvider>
  )
}

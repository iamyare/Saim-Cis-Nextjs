'use client'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { FormPreclinica } from './form-preclinica'

export default function ListaPacientes ({ usuario }: { usuario: Personas[] }) {
  const [personaSeleccionada, setPersonaSeleccionada] =
    useState<Personas | null>(null)

  return (
    <>
      {usuario.map((user, index) => (
        <li
          key={index}
          className="flex justify-between gap-4 py-2 w-full max-w-2xl "
        >
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full flex justify-center items-center bg-cyan-400 dark:bg-cyan-500 text-white">
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
          <div className="flex gap-2">
            <button
              data-hs-overlay="#hs-modal-preclinica"
              className="flex h-10 items-center w-full !mx-0 duration-700  md:w-auto md:mx-4 bg-cyan-400 rounded-lg hover:bg-cyan-500 dark:bg-cyan-600 hover:dark:bg-cyan-500 px-4 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => { setPersonaSeleccionada(user) }}
            >
              <span className="hidden md:block">Nueva Consulta</span>{' '}
              <PlusIcon className="h-5 md:ml-4" />
            </button>
            {/*
            <button
              data-hs-overlay="#hs-modal-show-preclinica"
              className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => setPersonaSeleccionada(user)}
            >
              <span className="hidden md:block">Ver Consulta</span>{" "}
              <EyeIcon className="h-5 md:ml-4" />
            </button> */}
          </div>
        </li>
      ))}
      <div
        id="hs-modal-preclinica"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl pointer-events-auto shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center flex justify-end">
                <button
                  type="button"
                  className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  data-hs-overlay="#hs-modal-preclinica"
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
                  Agregar Signos Vitales del Paciente
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Ingrese los datos del paciente{' '}
                  <strong>
                    {personaSeleccionada?.nombre}{' '}
                    {personaSeleccionada?.apellido}
                  </strong>
                </p>
              </div>
              <div className="mt-5">
                <FormPreclinica
                  id={
                    personaSeleccionada?.id != null
                      ? personaSeleccionada.id
                      : ''
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

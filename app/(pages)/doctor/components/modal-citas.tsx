import { PlusIcon } from '@heroicons/react/24/outline'
import { InfoCitas } from './info-citas'

export function ModalCitas () {
  return (
    <>
      <button
        data-hs-overlay="#hs-modal-preclinica"
        className="flex h-10 items-center rounded-lg bg-cyan-600 px-4 text-sm font-medium text-white transition-colors hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
      >
        <span className="hidden md:block">Abrir Modal</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </button>
      <div
        id="hs-modal-preclinica"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl pointer-events-auto shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Cita
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Informacion detallada de la cita
                </p>
              </div>
              <div className="mt-5">
                <InfoCitas />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

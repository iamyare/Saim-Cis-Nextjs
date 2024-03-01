'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DataTableClient ({ users }: { users: PersonasAndUsuarios }) {
  const pathname = usePathname()
  return (
<div className="flex flex-col my-4">
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle">
      <div className="border rounded-lg overflow-hidden dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
              <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400  uppercase">Nombre</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Correo</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">DNI</th>
              <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Fecha Nacimiento</th>
              <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Estado</th>
            </tr>
            </thead>
            <tbody >
              {users?.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={usuario.usuario?.avatar_url ?? 'https://leplanb.lesmontagne.net/wp-content/uploads/sites/5/2017/06/default_avatar.png'}
                        className="rounded-full w-6 h-6"

                        alt={`Fotografia perfil de ${usuario.nombre}`}
                      />
                      <Link href={`${pathname}/${usuario.id}`} className=' whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                        {usuario.nombre} {usuario.apellido}
                      </Link>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {usuario.correo}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {usuario.dni}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-end">
                    {usuario.fecha_nacimiento
                      ? new Date(usuario.fecha_nacimiento).toLocaleDateString(
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
                          usuario.usuario?.estado === 'activo'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-500'
                            : usuario.usuario?.estado === 'pendiente'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500'
                            : usuario.usuario?.estado === 'no disponible'
                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500'
                            : usuario.usuario?.estado === 'cancelado'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500'
                            : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-500'
                        }
                      `}
                    >
                      {usuario.usuario?.estado ?? 'No disponible'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

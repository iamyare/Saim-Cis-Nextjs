'use client'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'

export default function HeaderProfile ({ usuario }: { usuario: UserType }) {
  return (
    <section className=" rounded-lg shadow-xl pb-8">
      <div className="w-full h-[250px]">
        <div className="w-full h-full rounded-tl-lg rounded-tr-lg bg-cover bg-center bg-[url(https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg)] " />
      </div>
      <div className="flex flex-col items-center -mt-20">
        <img
          src={
            usuario?.usuario.avatar_url ??
            'https://leplanb.lesmontagne.net/wp-content/uploads/sites/5/2017/06/default_avatar.png'
          }
          className="w-40 border-4 border-white dark:border-slate-900 rounded-full bg-blue-500"
        />
        <div className="flex items-center space-x-1 mt-2">
          <p className="text-2xl">
            {usuario?.nombre} {usuario?.apellido}
          </p>
          <CheckBadgeIcon className="h-6 w-6  text-blue-500" />
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          {usuario?.usuario.descripcion ?? 'Sin descripción'}
        </p>
        <p className="text-sm text-gray-500">
          {usuario?.direccion ?? usuario?.usuario.correo}
        </p>
        <div className="flex flex-row gap-2 mt-2">
          {usuario?.role.map((rol, index) => (
            <div key={index} className="flex gap-2">
              {rol.especialidad.map((especialidad, i) => (
                <span
                  className="capitalize bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md py-1 px-2 text-sm select-none"
                  key={i}
                >
                  {especialidad}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

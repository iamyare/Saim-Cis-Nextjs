'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { updatePersona } from '@/app/(pages)/enfermero/actions'
import { toast } from 'react-toastify'

const TAM_MAX = 10000000
const TIPOS_ACEPTADOS_IMAGEN = ['jpeg', 'jpg', 'png', 'webp']

const validationSchema = z.object({
  direccion: z.string().min(1, { message: 'La dirección es obligatoria' }),
  telefono: z
    .string()
    .min(1, { message: 'El telefono es obligatorio' })
    .regex(/^\d{4}-?\d{4}$/, {
      message: 'El telefono debe tener el formato dddd-dddd'
    }),
  descripcion: z.string().min(1, { message: 'Agrega una descripcion' }),
  imagen: z
    .any()
    .refine((file) => file?.size <= TAM_MAX, 'Tamaño maximo de imagenes: 10MB.')
    .refine(
      (file) => TIPOS_ACEPTADOS_IMAGEN.includes(file?.type),
      'Solo se aceptan archivos .jpg, .jpeg, .png y .webp'
    )
})

type ValidationSchema = z.infer<typeof validationSchema>

export default function ActualizarPerfil ({ usuario }: { usuario: UserType }) {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({ resolver: zodResolver(validationSchema) })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    startTransition(async () => {
      if (!usuario || !usuario.id) {
        toast.error('Error: ID de usuario no disponible')
        return
      }
      const { personaUpdate, errorPersonaUpdate } = await updatePersona({ id: usuario?.id, data })
      if (errorPersonaUpdate) {
        toast.error(errorPersonaUpdate.message)
        return
      }

      if (!personaUpdate) {
        toast.error('Error al actualizar la persona')
      }
    })
  }

  return (
    <div className="mx-8 dark:bg-gray-800">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto py-6">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Perfil
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
              Buen Dia
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <Label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
                >
                  Usuario
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 dark:text-white sm:text-sm">
                      saimcis.com/
                    </span>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="yare"
                      defaultValue={usuario?.usuario.id_usuario}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <Label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Descripcion
                </Label>
                <div className="mt-2">
                  <Input
                    className={errors.descripcion ? 'border-red-500  !placeholder-red-500 text-red-500' : 'block w-full rounded-md border-0 py-1.5 dark:text-white dark:bg-transparent text-gray-900 shadow-sm ring-1 ring-inset ring-gray-30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'}
                    defaultValue={usuario?.usuario.descripcion ?? 'N/A'}
                    {...register('descripcion')}
                  />
                  {errors.descripcion && (
                    <p className="text-xs italic text-red-500 mt-0">
                      {errors.descripcion?.message}
                    </p>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 dark:text-white text-gray-600">
                  Escribe algunas frases sobre ti.
                </p>
              </div>

              <div className="col-span-full">
                <Label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
                >
                  Fotografia de portada
                </Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 dark:text-white text-black"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 dark:text-white text-gray-600">
                      <Label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Subir Imagen</span>
                        <Input
                          type="file"
                          className={errors.imagen ? 'border-red-500  !placeholder-red-500 text-red-500' : 'sr-only'}
                          {...register('imagen')}
                        />
                      </Label>
                      <p className="pl-1">o drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 dark:text-white text-gray-600">
                      PNG, JPG no mayor a 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 dark:text-white text-gray-900">
              Informacion Personal
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Utilice una dirección permanente donde pueda recibir correo.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
                >
                  Nombre
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 dark:bg-transparent dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={usuario?.nombre}
                    disabled
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
                >
                  Apellido
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 dark:bg-transparent dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={usuario?.apellido}
                    disabled
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label
                  htmlFor="dni"
                  className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
                >
                  DNI
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    name="dni"
                    id="dni"
                    autoComplete="dni"
                    className="block w-full rounded-md border-0 py-1.5 dark:bg-transparent dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={usuario?.dni}
                    disabled
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
                >
                  Correo Electronico
                </Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 dark:bg-transparent dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={usuario?.correo ?? 'N/A'}
                    disabled
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label
                  htmlFor="birthdate"
                  className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
                >
                  Fecha Nacimiento
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    autoComplete="birthdate"
                    className="block w-full rounded-md border-0 py-1.5 dark:bg-transparent dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={usuario?.fecha_nacimiento}
                    disabled
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="country" className="block text-sm font-medium leading-6 dark:text-white text-gray-900">Genero</Label>
                <div className="mt-2">
                  <select id="genero" name="genero" autoComplete="genero-name"
                    className="block w-full rounded-md border-0 py-1.5 dark:bg-transparent dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" value={usuario?.genero} disabled
                  >
                    <option>Masculino</option>
                    <option>Femenino</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
                >
                  Telefono
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    autoComplete="phone"
                    className="block w-full rounded-md border-0 py-1.5 dark:bg-transparent dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={usuario?.telefono ?? 'N/A'}
                    disabled={isPending}
                    {...register('telefono')}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <Label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
                >
                  Dirrecion
                </Label>
                <div className="mt-2">
                  <Input
                    type="text"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 dark:bg-transparent dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={usuario?.direccion ?? 'N/A'}
                    disabled={isPending}
                    {...register('direccion')}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <a
              type="button"
              className="text-sm font-semibold leading-6 dark:text-white text-gray-900"
              href={`/${usuario?.rol}`}
            >
              Cancelar
            </a>
            <button
              type="submit"
              className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold dark:text-white text-black shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

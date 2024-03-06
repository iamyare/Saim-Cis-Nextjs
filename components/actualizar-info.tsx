'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { updatePersona } from '@/app/(pages)/enfermero/actions'
import { toast } from 'react-toastify'
import { type DropzoneState, useDropzone } from 'react-dropzone'
import { uploadingImage } from '@/app/actions'
import { Button } from './ui/button'
import { Icons } from './icons'
import Link from 'next/link'

const validationSchema = z.object({
  direccion: z.string().min(1, { message: 'La dirección es obligatoria' }),
  telefono: z
    .string()
    .min(1, { message: 'El telefono es obligatorio' })
    .regex(/^\d{4}-?\d{4}$/, {
      message: 'El telefono debe tener el formato dddd-dddd'
    }),
  descripcion: z.string().min(1, { message: 'Agrega una descripcion' })

})

type ValidationSchema = z.infer<typeof validationSchema>

export default function ActualizarPerfil ({ usuario }: { usuario: UserType }) {
  const [isPending, startTransition] = useTransition()

  // Funcion que se ejecuta cuando se suelta el archivo en la dropzone
  const onDrop = (acceptedFiles: File[]) => {
    console.log('Archivo seleccionado:', acceptedFiles[0])
  }

  // Configuracion de la dropzone como manejar los eventos de arrastrar y soltar asi como la configuracion de los tipos de imagen que acepta
  // y si pueden arrastrarse mas de un archivo a la vez
  const { getRootProps, getInputProps, acceptedFiles }: DropzoneState = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: false
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      descripcion: usuario?.usuario.descripcion ?? 'No hay descripcion',
      telefono: usuario?.telefono ?? 'No hay telefono',
      direccion: usuario?.direccion ?? 'No hay direccion'

    }
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    startTransition(async () => {
      if (acceptedFiles.length > 0) {
        const { data, error } = await uploadingImage({ file: acceptedFiles[0] })
        if (error) {
          toast.error('Error al subir la imagen')
          console.error('Error al subir la imagen:', error)
          return
        }
        console.log('Imagen subida:', data)
      }
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
    <div className="sm:mx-2 md:mx-8 dark:bg-gray-800 bg-gray-100 rounded-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto py-6 grid sm:grid-cols-1">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white px-4">
              Perfil
            </h2>
            <p className="mt-1 text-sm leading-6 px-4 text-gray-600 dark:text-white">
              Buen Dia
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full px-4">
                <Label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Descripcion
                </Label>
                <div className="mt-2">
                  <Input
                    className={errors.descripcion ? 'border-red-500  !placeholder-red-500 text-red-500' : 'block w-full rounded-md border-0 py-1.5 dark:text-white dark:bg-transparent text-gray-900 shadow-sm ring-1 ring-inset ring-gray-30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'}
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

              <div className="col-span-full px-4">
                <Label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 dark:text-white text-gray-900"
                >
                  Fotografia de portada
                </Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="mt-4 flex text-sm leading-6 dark:text-white text-gray-600 justify-center items-center">
                      {/* Dropzone necesario para realizar el Drag and drop */}
                      <div {...getRootProps()} className="dropzone border-2 border-dashed border-black p-4 text-center" >
                        <input {...getInputProps()} />
                        <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionarla.</p>
                        {/* Muestra la vista previa de la imagen seleccionada */}
                        {acceptedFiles.length > 0 && (
                          <div className="flex justify-center">
                            <img src={URL.createObjectURL(acceptedFiles[0])} alt="Vista previa" className="h-40 mt-2 mx-auto" />
                          </div>
                        )}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 dark:text-white text-gray-900 px-4">
              Informacion Personal
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 px-4">
              Utilice una dirección permanente donde pueda recibir correo.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 px-4">
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

              <div className="sm:col-span-3 px-4">
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

              <div className="sm:col-span-3 px-4">
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

              <div className="sm:col-span-3 px-4">
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

              <div className="sm:col-span-3 px-4">
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

              <div className="sm:col-span-3 px-4">
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

              <div className="sm:col-span-3 px-4">
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
                    className={errors.telefono ? 'border-red-500  !placeholder-red-500 text-red-500' : 'block w-full rounded-md border-0 py-1.5 dark:text-white dark:bg-transparent text-gray-900 shadow-sm ring-1 ring-inset ring-gray-30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'}
                    disabled={isPending}
                    {...register('telefono')}
                  />
                  {errors.telefono && (
                    <p className="text-xs italic text-red-500 mt-0">
                      {errors.telefono?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full px-4">
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
                    className={errors.direccion ? 'border-red-500  !placeholder-red-500 text-red-500' : 'block w-full rounded-md border-0 py-1.5 dark:text-white dark:bg-transparent text-gray-900 shadow-sm ring-1 ring-inset ring-gray-30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'}
                    disabled={isPending}
                    {...register('direccion')}
                  />
                  {errors.direccion && (
                    <p className="text-xs italic text-red-500 mt-0">
                      {errors.direccion?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link
              type="button"
              className="text-sm font-semibold leading-6 dark:text-white text-gray-900"
              href={`/${usuario?.rol}`}
            >
              Cancelar
            </Link>
            <Button
            disabled={isPending}
            className="py-3 px-4 inline-flex bg-blue-500 text-white items-center gap-x-2 text-sm font-semibold rounded-lg transition-colors duration-200 border   hover:bg-blue-600 hover:border-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"

          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
            Actualizar
          </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

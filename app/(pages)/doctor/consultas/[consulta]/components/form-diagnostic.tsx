'use client'

import * as React from 'react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckBox } from '@/components/ui/checkbox'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { useTransition } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { createDiagnostico } from '../../../actions'

const validationSchema = z.object({
/*   enfermedades: z.string().min(1, { message: 'Las enfermedades son requeridas' }), */
  observacion: z.string().min(1, { message: 'Las observaciones son requeridas' }),
  id_expediente: z.string(),
  id_consulta: z.string(),
  interno: z.boolean(),
  diferencial: z.boolean(),
  fecha_diagnostico: z.string().min(1, { message: 'La fecha del diagnostico es requerida' }),
  enfermedades: z
    .string()
    .min(1, { message: 'Es obligatorio ingresar al menos una enfermedad' })
    .regex(/^\s*[^.,;:\s]+(?:\s+[^.,;:\s]+)*\s*(?:,\s*[^.,;:\s]+(?:\s+[^.,;:\s]+)*\s*)*$/, {
      message: 'Si ingresa mas de una enfermedad estas deben estar separadas únicamente por comas'
    }),
  observaciones: z
    .string()
    .min(1, { message: 'La observación es obligatoria' })
})

type ValidationSchema = z.infer<typeof validationSchema>

export default function FormDiagnostic ({ consulta }: { consulta: Consultas }) {
  const [isPending, startTransition] = useTransition()
  const [tags, setTags] = React.useState<string[]>([]) // useState para el arreglo de tags
  const [tagsEnfermedades, setTagsEnfermedades] = React.useState<string>('') // useState para las enfermedades (string extraido del arreglo de tags)
  let newTags: string[] = [] // variable auxiliar para el arreglo de tags
  // agregar tags
  const handleAddTag = (tag: string) => {
    if (tag !== '') {
      newTags = [...tags, tag]
      setTags(newTags)
    }
    return newTags
  }
  // eliminando los tags
  const handleRemoveTag = (index: number) => {
    if (index !== -1) {
      newTags = [...tags]
      newTags.splice(index, 1)
      setTags(newTags)
    }
    return newTags
  }
  // funcion para se crear los tags al presionar una coma
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ',') {
      const tag = event.currentTarget.value.trim().replace(/\s*,\s*/g, '')
      if (tag) {
        handleAddTag(tag)
        event.currentTarget.value = ''
      }
      event.preventDefault() // Prevent the comma from being entered in the input field
    }
  }
  // handle cuando se pierde el focus del input para agregar enfermedades
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const tag = event.currentTarget.value.trim()
    if (tag) {
      handleAddTag(tag)
      event.currentTarget.value = ''
    }
    const tagsSended = handleAddTag('')
    getTags(tagsSended ? tagsSended.join(',') : '')
  }
  // funcion que llama a removeTags presionando x
  const handleTagClick = (index: number) => {
    handleRemoveTag(index)
    const tagsSended = handleRemoveTag(-1)
    getTags(tagsSended ? tagsSended.join(',') : '')
  }
  // obtenemos los tags y convertimos el arreglo a string
  function getTags (enfermedades: string) {
    const enfermedadesTags = enfermedades
    console.log(enfermedadesTags)
    setTagsEnfermedades(enfermedadesTags)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      enfermedades: '',
      observacion: '',
      id_expediente: '',
      id_consulta: '',
      interno: true,
      diferencial: false,
      fecha_diagnostico: ''
    }
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    startTransition(async () => {
      // Añadir dato del expediente
      data.id_expediente = consulta.id_expediente

      // Añadir dato de la consulta
      data.id_consulta = consulta.id

      // Generar fecha del diagnostico
      data.fecha_diagnostico = new Date().toISOString()

      // Añadir enfermedades
      data.enfermedades = tagsEnfermedades
      console.log(tagsEnfermedades)

      const { diagnostico, errorDiagnostico } = await createDiagnostico({
        data
      })

      if (errorDiagnostico) {
        toast.error('Error al guardar el diagnostico')
        return
      } else {
        toast.success('Los Datos han sido guardados Exitosamente!')
        reset()
      }

      if (!diagnostico) {
        toast.error('Error al crear el diagnostico')
      }
    })
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
            {/* <div className="grid gap-1">
              <Input
                type="text"
                autoComplete="enfermedades"
                placeholder="enfermedad 1, enfermedad 2,..."
                disabled={isPending}
                className={
                  errors.enfermedades
                    ? 'border-red-500  !placeholder-red-500 text-red-500'
                    : ''
                }
                {...register('enfermedades')}
              />
              {errors.enfermedades && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.enfermedades?.message}
                </p>
              )}
            </div> */}
          <div className="grid gap-1">
            <Label className="" htmlFor="enfermedades">
              Enfermedades
            </Label>
            <p className="mt-1 leading-6 px-4 text-gray-600 dark:text-white">
              Ingrese una enfermedad o varias enfermedades separadas por comas
            </p>
          </div>
          <div className="flex gap-1  border border-solid rounded-md items-center px-2">
            <ul
              className=' flex gap-1'
            >
              { tags.map((tag, index) => (
                <li key={index} className='text-white flex  group  bg-secundario rounded-lg  border-1 border-blue-400  px-2 py-1'>
                  <p className=' capitalize text-sm truncate '>
                    {tag}
                  </p>
                  <span
                    className='inline-flex justify-center items-center ml-2 rounded-full transition-colors hover:bg-secundariovariant-600 p-1 cursor-pointer'
                    onClick={() => { handleTagClick(index) }}
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </span>
                </li>

              ))}
            </ul>
            <Input
              type="text"
              autoComplete="enfermedades"
              placeholder="enfermedades"
              className='border-0 outline-none focus:!ring-0 focus:!border-0 focus:ring-offset-0  focus-visible:ring-offset-0 '
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              disabled={isPending}
            />

          </div>
            <div className="grid gap-1">
              <Label className="" htmlFor="observaciones">
                Observaciones
              </Label>
              <Input
                type="text"
                autoComplete="observaciones"
                placeholder="observaciones"
                disabled={isPending}
                className={
                  errors.observaciones
                    ? 'border-red-500  !placeholder-red-500 text-red-500'
                    : ''
                }
                {...register('observaciones')}
              />
              {errors.observaciones && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.observaciones?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 my-5 ">
            <CheckBox
              type="checkbox"
              autoComplete=""
              placeholder=""
              disabled={isPending}
              className={
                errors.diferencial
                  ? 'border-red-500  !placeholder-red-500 text-red-500'
                  : ''
              }
              {...register('diferencial')}
            />
            {errors.diferencial && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.diferencial?.message}
              </p>
            )}
            <Label className="mx-1" htmlFor="address">
              Más de una enfermedad
            </Label>
          </div>

          <Button
            disabled={isPending}
            className="py-3 px-4 inline-flex bg-blue-500 text-white items-center gap-x-2 text-sm font-semibold rounded-lg transition-colors duration-200 border   hover:bg-blue-600 hover:border-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
            Agregar Diagnostico
          </Button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

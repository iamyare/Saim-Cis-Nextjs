'use client'

import * as React from 'react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import { useTransition } from 'react'
import { createDiagnostico } from '../../../actions'
import { CheckBox } from '@/components/ui/checkbox'
import InputTags from './input-tags'

const validationSchema = z.object({
  id_expediente: z.string(),
  id_consulta: z.string(),
  interno: z.boolean(),
  diferencial: z.boolean(),
  enfermedades: z
    .string(),
  // .min(1, { message: 'Es obligatorio ingresar al menos una enfermedad' })
  // .regex(/^\s*[^.,;:\s]+(?:\s+[^.,;:\s]+)*\s*(?:,\s*[^.,;:\s]+(?:\s+[^.,;:\s]+)*\s*)*$/, {
  //   message: 'Si ingresa mas de una enfermedad estas deben estar separadas únicamente por comas'
  // }),
  observacion: z
    .string()
    .min(1, { message: 'La observación es obligatoria' })
})

type ValidationSchema = z.infer<typeof validationSchema>

export default function FormDiagnostic ({ consulta }: { consulta: Consultas }) {
  const [isPending, startTransition] = useTransition()
  const [tags, setTags] = React.useState<string[]>([])
  const handleChildStateChange = (newTags: string[]) => {
    setTags(newTags)
  }
  const inputTagsRef = React.useRef<{ handleRemoveAllTags: () => void } | null>(null)

  const handleRemoveAllTags = () => {
    inputTagsRef.current?.handleRemoveAllTags() // para eliminar todos los tags al recargo
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
      id_expediente: consulta.id_expediente,
      id_consulta: consulta.id,
      interno: true,
      diferencial: false
    }
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    startTransition(async () => {
      // convirtiendo array de tags a string y agregando a la data que guardaremos
      data.enfermedades = tags.join(',')
      const { diagnostico, errorDiagnostico } = await createDiagnostico({
        data
      })

      if (errorDiagnostico) {
        toast.error('Error al guardar el diagnostico')
        return
      } else {
        toast.success('Los Datos han sido guardados Exitosamente!')
        reset()

        // Remover tags después de una inserción exitosa
        inputTagsRef.current?.handleRemoveAllTags()
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
          <div className="grid gap-1">
            <Label className="" htmlFor="enfermedades">
              Enfermedades
            </Label>
            <p className="mt-1 leading-6 px-4 text-gray-600 dark:text-white">
              Ingrese una enfermedad o varias enfermedades separadas por comas
            </p>
          </div>
            <InputTags onChange={handleChildStateChange} ref={inputTagsRef}/>
            <div className="grid gap-1">
              <Label className="" htmlFor="observaciones">
                Observaciones
              </Label>
              <Input
                type="text"
                autoComplete="observacion"
                placeholder="observacion"
                disabled={isPending}
                className={
                  errors.observacion
                    ? 'border-red-500  !placeholder-red-500 text-red-500'
                    : ''
                }
                {...register('observacion')}
              />
              {errors.observacion && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.observacion?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 my-5 ">
            <CheckBox
              type="checkbox"
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
            <Label className="mx-1" htmlFor="diferencial">
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

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

const validationSchema = z.object({
})

type ValidationSchema = z.infer<typeof validationSchema>

export default function FormDiagnostic ({ consulta }: { consulta: Consultas }) {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {

    }
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    startTransition(async () => {

    })
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">

          <div className="grid gap-1">
            <Label className="" htmlFor="address">
              Direccion
            </Label>
            <Input
              type="text"
              autoComplete="address"
              placeholder="Tegucigalpa, Francisco Morazán, Honduras"
              disabled={isPending}
              className={
                errors.direccion
                  ? 'border-red-500  !placeholder-red-500 text-red-500'
                  : ''
              }
              {...register('direccion')}
            />
            {errors.direccion && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.direccion?.message}
              </p>
            )}
          </div>

          <Button
            disabled={isPending}
            className="py-3 px-4 inline-flex bg-blue-500 text-white items-center gap-x-2 text-sm font-semibold rounded-lg transition-colors duration-200 border   hover:bg-blue-600 hover:border-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"

          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
            Registrar paciente
          </Button>
        </div>
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

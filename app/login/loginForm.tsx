'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
// import { GitHubButton, GoogleButton } from '../components/login-buttons'
import { signInWithEmailAndPassword } from './actions'
import { ToastContainer, toast } from 'react-toastify'
import { useTransition } from 'react'
// import { InfinityLogo } from '../(client)/components/InfinityLogo'


import Link from 'next/link'



const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El correo electrónico es obligatorio' })
    .email({
      message: 'Debe ser un correo electrónico válido'
    }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
  //   "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y tener al menos 6 caracteres"
  // ),
})

type ValidationSchema = z.infer<typeof validationSchema>

export default function LoginForm () {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function onSubmit (data: z.infer<typeof validationSchema>) {
    startTransition(async () => {
      const result = await signInWithEmailAndPassword(data)
      const { error } = JSON.parse(result)
      if (error.message) {
        toast.error(error.message)
      }
    })
  }

  return (
    <>

        <aside className="grid place-content-center min-h-screen md:w-full lg:min-w-1/2  select-none">
          <div className="flex min-h-full flex-col bg-white/50 border border-gray-200   dark:bg-black/10 dark:border-gray-700 backdrop-blur-[1px] p-6 rounded-2xl shadow-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center">
              <Link href="/">
              <span>Logo</span>
              </Link>
              <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-black dark:text-white">
                Iniciar Sesion
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Correo Electronico
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      required
                      className="py-3 px-4 block w-full border-gray-200 ring-1 ring-inset ring-gray-300 rounded-lg  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Ingrese su correo"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-xs italic text-red-500 mt-2">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="max-w-sm">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Contraseña
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Contraseña olvidada?
                      </a>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      autoComplete="current-password"
                      required
                      id="hs-toggle-password"
                      className="py-3 px-4 block w-full border-gray-200 ring-1 ring-inset ring-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Ingrese su contraseña"
                      {...register('password')}
                    />
                    {errors.password && (
                      <p className="text-xs italic text-red-500 mt-2">
                        {errors.password?.message}
                      </p>
                    )}

                    <button
                      type="button"
                      data-hs-toggle-password='{
    "target": "#hs-toggle-password"
  }'
                      className="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      <svg
                        className="flex-shrink-0 w-3.5 h-3.5 text-gray-400 dark:text-neutral-600"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          className="hs-password-active:hidden"
                          d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                        />
                        <path
                          className="hs-password-active:hidden"
                          d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                        />
                        <path
                          className="hs-password-active:hidden"
                          d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                        />
                        <line
                          className="hs-password-active:hidden"
                          x1="2"
                          x2="22"
                          y1="2"
                          y2="22"
                        />
                        <path
                          className="hidden hs-password-active:block"
                          d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                        />
                        <circle
                          className="hidden hs-password-active:block"
                          cx="12"
                          cy="12"
                          r="3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {isPending ? (
                      <>
                        <span
                          className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                          role="status"
                          aria-label="loading"
                        ></span>
                        Iniciar Sesion
                      </>
                    ) : (
                      <>Iniciar Sesion</>
                    )}
                  </button>
                </div>
              </form>
              <div>
                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                  O
                </div>
                <div className="">
                  {/* <GoogleButton />
                  <GitHubButton /> */}
                </div>
              </div>
              <p className="mt-10 text-center text-sm text-gray-500">
                Aun no es miembro?{' '}
                <a
                  href="/signup"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Registrate
                </a>
              </p>
            </div>
          </div>
        </aside>

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
        theme="dark"
      />
    </>
  )
}

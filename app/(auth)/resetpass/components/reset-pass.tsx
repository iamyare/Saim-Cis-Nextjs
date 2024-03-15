'use client'

import { ResetPassForm } from './reset-pass-form'

export default function ResetPassClient () {
  return (
    <main className="grid place-items-center h-screen">
      <header className="flex flex-col justify-center items-center gap-2  max-w-sm w-full">
        <h1 className="text-2xl">Restablecer contraseña</h1>
        <p>Restablecer contraseña personalizada</p>
        <ResetPassForm />
      </header>
    </main>
  )
}

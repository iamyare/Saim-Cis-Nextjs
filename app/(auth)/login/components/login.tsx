'use client'

import Link from 'next/link'
import { ArrowLeft, CalendarCheck, FileText, ShieldCheck } from 'lucide-react'
import { UserAuthForm } from '../components/user-auth-form'
import LogoSaimCis from '@/components/logo-saim-cis'

const highlights = [
  { icon: FileText, label: 'Expedientes digitales ordenados' },
  { icon: CalendarCheck, label: 'Agenda médica centralizada' },
  { icon: ShieldCheck, label: 'Acceso para equipo autorizado' }
]

export default function LoginAuth () {
  return (
    <main className="min-h-screen bg-[#f7fbfa] text-[#123032]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-[#0b3a42] p-10 text-white lg:flex lg:flex-col">
          <img
            className="absolute inset-0 h-full w-full object-cover opacity-[0.55]"
            src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1300&q=85"
            alt="Equipo médico revisando información clínica"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b3a42]/95 via-[#0b3a42]/72 to-[#0b6973]/62" />

          <Link
            className="relative z-10 inline-flex w-fit items-center gap-3"
            href="/"
          >
            <LogoSaimCis className="h-9 w-9" />
            <span className="text-base font-semibold">SAIM CIS</span>
          </Link>

          <div className="relative z-10 mt-auto max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9dd3cb]">
              Acceso clínico
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-tight">
              Un espacio sereno para continuar el cuidado.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#d4e8e5]">
              Ingresa para consultar expedientes, gestionar citas y acompañar a
              cada paciente con información clara y disponible.
            </p>
            <div className="mt-8 grid gap-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 backdrop-blur"
                >
                  <item.icon className="h-5 w-5 text-[#9dd3cb]" />
                  <span className="text-sm font-medium text-[#eef8f6]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#4f696a] transition hover:text-[#0b6973]"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>

            <div className="rounded-[2rem] border border-[#dcebe7] bg-white p-7 shadow-xl shadow-[#d4e9e5]/70 sm:p-9">
              <div className="mb-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7f5f2]">
                  <LogoSaimCis className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-[#0b3a42]">
                  Iniciar sesión
                </h2>
                <p className="mt-3 leading-7 text-[#5c7475]">
                  Accede con tus credenciales para continuar en SAIM CIS.
                </p>
              </div>

              <UserAuthForm />

              <p className="mt-6 text-sm leading-6 text-[#6b8181]">
                Al continuar aceptas nuestros{' '}
                <Link
                  href="/terms"
                  className="font-medium text-[#0b6973] hover:underline"
                >
                  Términos
                </Link>{' '}
                y{' '}
                <Link
                  href="/privacy"
                  className="font-medium text-[#0b6973] hover:underline"
                >
                  Política de privacidad
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

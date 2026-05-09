'use client'

import LogoSaimCis from '@/components/logo-saim-cis'
import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

const links = [
  { label: 'Expediente', href: '/#expediente' },
  { label: 'Agenda', href: '/#agenda' },
  { label: 'Seguridad', href: '/#seguridad' },
  { label: 'Login', href: '/login' }
]

export default function Footer () {
  return (
    <footer className="bg-[#0b3a42] text-white" id="contacto">
      <div className="container mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <LogoSaimCis className="h-9 w-9" />
              <div>
                <p className="text-base font-semibold">SAIM CIS</p>
                <p className="text-sm text-[#b8d3d0]">
                  Expediente digital y agenda médica
                </p>
              </div>
            </Link>
            <p className="mt-6 max-w-md leading-7 text-[#c6dcda]">
              Una experiencia pública simple para conocer la plataforma y un
              acceso privado para el equipo autorizado del centro médico.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9dd3cb]">
              Navegación
            </p>
            <div className="mt-5 grid gap-3">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#d9e9e7] transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9dd3cb]">
              Contacto
            </p>
            <div className="mt-5 space-y-4 text-sm text-[#d9e9e7]">
              <p className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-none text-[#9dd3cb]" />
                +504 9999-9999
              </p>
              <p className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-none text-[#9dd3cb]" />
                saimcishon@gmail.com
              </p>
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-[#9dd3cb]" />
                Boulevard Suyapa, UNAH.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-[#b8d3d0] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SAIM CIS. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            <Link href="/terms" className="hover:text-white">
              Términos
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

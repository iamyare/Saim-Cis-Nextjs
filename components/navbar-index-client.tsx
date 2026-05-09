'use client'

import { Disclosure } from '@headlessui/react'
import { Menu as MenuIcon, X } from 'lucide-react'
import Link from 'next/link'
import LogoSaimCis from '@/components/logo-saim-cis'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Expediente', href: '/#expediente' },
  { name: 'Agenda', href: '/#agenda' },
  { name: 'Seguridad', href: '/#seguridad' },
  { name: 'Contacto', href: '#contacto' }
]

function classNames (...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function NavbarIndexClient () {
  const pathname = usePathname()

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 border-b border-[#dcebe7] bg-[#f7fbfa]/[0.88] backdrop-blur-xl"
    >
      {({ open }) => (
        <>
          <div className="container mx-auto max-w-7xl px-6">
            <div className="flex h-16 items-center justify-between">
              <Link className="flex items-center gap-3" href="/">
                <LogoSaimCis className="h-8 w-8" />
                <div className="leading-tight">
                  <span className="block text-sm font-semibold text-[#0b3a42]">
                    SAIM CIS
                  </span>
                  <span className="hidden text-xs text-[#6b8181] sm:block">
                    Expediente y agenda médica
                  </span>
                </div>
              </Link>

              <div className="hidden items-center gap-1 md:flex">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      pathname === item.href &&
                        'bg-white text-[#0b6973] shadow-sm',
                      'rounded-full px-4 py-2 text-sm font-medium text-[#456466] transition hover:bg-white hover:text-[#0b6973]'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Disclosure.Button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#cde3df] bg-white text-[#0b3a42] md:hidden">
                  <span className="sr-only">Abrir menú</span>
                  {open ? (
                    <X className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="border-t border-[#dcebe7] bg-[#f7fbfa] md:hidden">
            <div className="container mx-auto space-y-1 px-6 py-4">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#456466] hover:bg-white hover:text-[#0b6973]"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

'use client'

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Menu as MenuIcon, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { logoutUser } from '@/lib/actions'
import LogoSaimCis from '@/components/logo-saim-cis'
import { usePathname, useRouter } from 'next/navigation'

const navigation = [
  { name: 'Expediente', href: '/#expediente' },
  { name: 'Agenda', href: '/#agenda' },
  { name: 'Seguridad', href: '/#seguridad' },
  { name: 'Contacto', href: '#contacto' }
]

function classNames (...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function NavbarIndexClient ({ user }: { user: UserType }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await logoutUser()
    router.push('/')
  }

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
                {user ? (
                  <Menu as="div" className="relative">
                    <Menu.Button className="relative flex rounded-full border border-[#cde3df] bg-white p-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8fcac1]">
                      <span className="sr-only">Abrir menú de usuario</span>
                      {user?.usuario.avatar_url ? (
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={user?.usuario.avatar_url}
                          alt={`Foto de perfil de ${user?.nombre}`}
                        />
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7f5f2] text-sm font-semibold text-[#0b6973]">
                          {user?.nombre?.charAt(0).toUpperCase() +
                            user?.apellido?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-2xl border border-[#dcebe7] bg-white p-2 shadow-xl shadow-[#cfe4df]/50 focus:outline-none">
                        <Menu.Item>
                          <div className="border-b border-[#edf4f2] p-3">
                            <span className="text-xs font-medium text-[#6b8181]">
                              Sesión activa
                            </span>
                            <span className="mt-1 block truncate text-sm font-semibold text-[#123032]">
                              {user.usuario.correo}
                            </span>
                          </div>
                        </Menu.Item>
                        {user.role.length > 0
                          ? user.role.map((rol, index) => (
                              <Menu.Item key={index}>
                                <Link
                                  href={`/${rol.rol.toLowerCase()}`}
                                  className={classNames(
                                    rol.rol.toLowerCase() ===
                                      pathname?.split('/')[1] && 'bg-[#f1f8f6]',
                                    'block rounded-xl px-3 py-2 text-sm text-[#123032] hover:bg-[#f1f8f6]'
                                  )}
                                >
                                  Perfil de {rol.rol}
                                </Link>
                              </Menu.Item>
                          ))
                          : (
                            <Menu.Item>
                              <span className="block rounded-xl px-3 py-2 text-sm text-[#6b8181]">
                                No hay roles asignados
                              </span>
                            </Menu.Item>
                            )}
                        <Menu.Item>
                          <Link
                            href="/perfil"
                            className="block rounded-xl px-3 py-2 text-sm text-[#123032] hover:bg-[#f1f8f6]"
                          >
                            Editar perfil
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            onClick={handleLogout}
                            className="block w-full rounded-xl px-3 py-2 text-left text-sm text-[#123032] hover:bg-[#f1f8f6]"
                          >
                            Cerrar sesión
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    className="hidden h-10 items-center gap-2 rounded-full bg-[#0b6973] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#095761] sm:inline-flex"
                    href="/login"
                  >
                    Iniciar sesión
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}

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
              {!user && (
                <Disclosure.Button
                  as="a"
                  href="/login"
                  className="mt-2 block rounded-2xl bg-[#0b6973] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Iniciar sesión
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

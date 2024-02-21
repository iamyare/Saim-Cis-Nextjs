'use client'
import { ModeToggle } from "./theme-toggle";
import Link  from "next/link";

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { logoutUser } from "@/lib/actions";


const navigation = [
  { name: 'Inicio', href: '#', current: true },
  { name: 'Nosotros', href: '#', current: false },
  { name: 'Servicios', href: '#servicios', current: false },
  { name: 'Doctores', href: '/terms', current: false },
  { name: 'Contacto', href: '#', current: false },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}


export default function NavbarIndexClient({user} : {user: Personas | null}) {


  return (

    <Disclosure className="bg-cyan-500 dark:bg-gray-900" as="nav" >
    {({ open }) => (
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-900 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Abrir el menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-cyan-500 dark:bg-gray-900 text-black dark:text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900  hover:text-black dark:hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ModeToggle/>


              {/* Profile dropdown */}
                        {
                          user ? (
                            <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="relative flex rounded-full bg-neutral-200 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-300 dark:focus:ring-offset-gray-700">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                {user?.avatar ? (
                                                      <img
                                                      className="h-8 w-8 rounded-full"
                                                      src={user?.avatar}
                                                      alt=""
                                                    />
                                                  ) : (
                                                    <span className="h-8 w-8 rounded-full flex justify-center items-center ">
                                                      {user?.primer_nombre?.charAt(0).toUpperCase() + user?.primer_apellido?.charAt(0).toUpperCase()}
                                                    </span>
                                                    )}


                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                                    <div className="flex flex-col gap-1 p-4">
                                                    <span className="text-sm text-gray-900 dark:text-gray-100 font-semibold">Iniciaste con:</span>
                                                    <span className="text-sm text-gray-900 dark:text-gray-100">{user.correo}</span>

                                                    </div>

                                </Menu.Item>
                                <hr />
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      href={
                                        user?.rol === "ADMIN" ? "/admin" : "/profile"
                                        // '#'
                                      }
                                      className={classNames(active ? 'bg-gray-100 dark:bg-gray-800' : '', 'block px-4 py-2 text-sm text-gray-900 dark:text-gray-100')}
                                    >
                                      Tu perfil
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={async () => {
                                        await logoutUser(); 
                                      }}
                                      className={classNames(active ? 'bg-gray-100 dark:bg-gray-800' : '', 'block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 w-full text-start')}
                                    >
                                      Cerrar sesión
                                    </button>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                          ) : (
                            <Link href="/login">
                              Iniciar sesión
                            </Link>
                          )
                        }
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden bg-cyan-500 dark:bg-gray-900 ">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current ? 'dark:bg-gray-600 bg-cyan-800 text-gray-900 dark:text-gray-100' : 'text-gray-900 dark:text-gray-100 hover:bg-cyan-600 hover:text-white dark:hover:text-white  dark:hover:bg-gray-500',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>

  );
}

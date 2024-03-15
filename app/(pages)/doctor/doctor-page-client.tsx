'use client'

import Link from 'next/link'

export default function DoctorPageClient ({ user }: { user: UserType }) {
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl">
          Bienvenido Dr. {user?.nombre} {user?.apellido}
        </h2>
        <p>{JSON.stringify(user)}</p>
        <Link
          href="/"
          className="inline-flex w-fit justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-900 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Ir a la página principal
        </Link>
      </div>
    </div>
  )
}

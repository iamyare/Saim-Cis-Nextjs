import { Suspense } from 'react'
import { AgregarPaciente } from '../components/agregar-paciente'
import { getTotalPagesByRoleAndQuery } from '@/app/actions'
import ToastServer from '@/components/toast-server'
import DataTable from '@/components/data-table'
import Search from '@/components/search-query'
import Pagination from '@/components/pagination'
import TitlePage from '@/components/title-page'

export default async function EnfermeroPacientePage ({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query ?? ''
  const currentPage = Number(searchParams?.page) ?? 1

  // obtenemos el total de paginas por el rol y el query
  const totalPages = await getTotalPagesByRoleAndQuery({
    role: 'paciente',
    query
  })

  if (totalPages === null) {
    return (
      <ToastServer message="Error al obtener el total de páginas por el rol y el query" />
    )
  }

  return (
    <div className="w-full px-8 py-2">
      <TitlePage title="Pacientes" description="Listado de pacientes" />
      <div className="my-2 flex items-center  gap-2 md:mt-8">
        <Search placeholder="Buscar pacientes..." debounce={200} />
        <AgregarPaciente />
      </div>
      <Suspense fallback={<span>Cargando...</span>}>
        <DataTable query={query} currentPage={currentPage} rol="paciente" />
      </Suspense>
      <div className="my-2 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}

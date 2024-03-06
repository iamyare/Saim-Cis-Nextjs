import React, { useContext, useState } from 'react'

const consultaContext = React.createContext<any>(null)
export function useConsultaContext () {
  return useContext(consultaContext)
}

export function ConsultaProvider ({ children }: { children: React.ReactNode }) {
  const [consultaSeleccionada, setConsultaSeleccionada] = useState('')

  return (
    <consultaContext.Provider value={{ consultaSeleccionada, setConsultaSeleccionada }}>
      { children }
    </consultaContext.Provider>
  )
}

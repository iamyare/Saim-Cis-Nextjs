'use client'
import React from 'react'
import { ConsultaProvider, useConsultaContext } from '../../../actions/consulta-provider'

export function FormDetalle () {
  const { consultaSeleccionada, setConsultaSeleccionada } = useConsultaContext() ?? {}
  return (
    <ConsultaProvider>
      <h1>{ JSON.stringify(consultaSeleccionada) }</h1>
    </ConsultaProvider>
  )
}

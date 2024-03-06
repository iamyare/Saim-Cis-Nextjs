'use client'
import React from 'react'
import { ConsultaProvider } from '../../actions/consulta-provider'
import { FormDetalle } from './components/form-detalle'

export function DetallesPage () {
  return (
    <ConsultaProvider>
      <FormDetalle/>
    </ConsultaProvider>
  )
}

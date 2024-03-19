'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { type IStaticMethods } from 'preline/preline'
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

export default function PrelineScript () {
  const path = usePathname()

  useEffect(() => {
    import('preline/preline').then(() => {
      if (window.HSStaticMethods) {
        window.HSStaticMethods.autoInit()
      }
    })
  }, [path])

  return null
}

'use client'
import { useState, useEffect } from 'react'
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks'
import { type TConductorInstance } from 'react-canvas-confetti/dist/types'

export default function Confetti () {
  const [conductor, setConductor] = useState<TConductorInstance>()

  useEffect(() => {
    if (conductor) {
      conductor.shoot()
    }
  }, [conductor])

  const onInit = ({ conductor }: { conductor: TConductorInstance }) => {
    setConductor(conductor)
  }

  return (
    <Fireworks
      onInit={onInit}
      decorateOptions={(options) => ({
        ...options,
        spread: 360,
        ticks: 300,
        gravity: 1
      })}
    />
  )
}

'use client'

import { Input } from '@/components/ui/input'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { forwardRef, useImperativeHandle, useState } from 'react'

// al cambiar el estado del input se actualiza el estado del componente padre
interface Props {
  onChange: (newState: string[]) => void
}

const InputTags = forwardRef<{ handleRemoveAllTags: () => void } | null, Props>(
  function InputTags ({ onChange }: Props, ref) {
    const [tags, setTags] = useState<string[]>([])

    // funcion para agregar un tag al array y pasar el array actualizado al componente padre
    const handleAddTag = (tag: string) => {
      const newTags = [...tags, tag]
      setTags(newTags)
      onChange(newTags) // Pasar el array actualizado
    }

    // funcion para remover un tag del array y pasar el array actualizado al componente padre
    const handleRemoveTag = (index: number) => {
      const newTags = [...tags]
      newTags.splice(index, 1)
      setTags(newTags)
      onChange(newTags)
    }

    const handleRemoveAllTags = () => {
      setTags(([]))
      onChange(([]))
    }

    // Exponer handleRemoveAllTags como parte de la ref
    useImperativeHandle(ref, () => ({
      handleRemoveAllTags
    }))

    // funcion para crear el tag al ingresar una coma
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === ',') {
        const tag = event.currentTarget.value.trim().replace(/\s*,\s*/g, '')
        if (tag) {
          handleAddTag(tag)
          event.currentTarget.value = ''
        }
        event.preventDefault() // Prevent the comma from being entered in the input field
      }
    }

    // verificar si se ingreso un ultimo elemento y agregarlo antes de cambiar de enfoque
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const tag = event.currentTarget.value.trim()
      if (tag) {
        handleAddTag(tag)
        event.currentTarget.value = ''
      }
    }

    // funcion para remover un tag al hacer click en el icono de eliminar
    const handleTagClick = (index: number) => {
      handleRemoveTag(index)
    }

    return (
    <>
      <div className='flex gap-1  border border-solid rounded-md items-center px-2'>
        <ul className=' flex gap-1'>
          {tags.map((tag, index) => (
            <li
              key={index}
              className='text-white flex  group  bg-secundario rounded-lg  border-1 border-blue-400  px-2 py-1'>
              <p className=' capitalize text-sm truncate '>{tag}</p>
              <span
                className='inline-flex justify-center items-center ml-2 rounded-full transition-colors hover:bg-secundariovariant-600 p-1 cursor-pointer'
                onClick={() => {
                  handleTagClick(index)
                }}>
                <XMarkIcon className='h-3 w-3' />
              </span>
            </li>
          ))}
        </ul>

        <Input
          className='border-0 outline-none focus:!ring-0 focus:!border-0 focus:ring-offset-0  focus-visible:ring-offset-0 '
          type='text'
          placeholder='Ingresa una enfermedad'
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      </div>
    </>
    )
  })

export default InputTags

'use client'

import { Input } from '@/components/ui/input'
import { XMarkIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'

export default function InputTags () {
  const [tags, setTags] = useState<string[]>([])

  const handleAddTag = (tag: string) => {
    setTags([...tags, tag])
  }

  const handleRemoveTag = (index: number) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }

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

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const tag = event.currentTarget.value.trim()
    if (tag) {
      handleAddTag(tag)
      event.currentTarget.value = ''
    }
  }

  const handleTagClick = (index: number) => {
    handleRemoveTag(index)
  }
  return (
    <>
      <div className="flex gap-1  border border-solid rounded-md items-center px-2">
              {/* <div className='text-white bg-cyan-500 rounded-xl  border-1 border-cyan-400 inline-block px-2 py-1'>
                <span className=''>hola</span>
                <span className='inline-flex justify-center align-middle bg-white/45 p-1 rounded-full text-gray-600 ml-2'>
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </span>
              </div> */}
              <ul className=' flex gap-1'>
              { tags.map((tag, index) => (
                <li key={index} className='text-white flex  group  bg-secundario rounded-lg  border-1 border-blue-400  px-2 py-1'>
                  <p className=' capitalize text-sm truncate '>
                    {tag}
                  </p>
                  <span
                    className='inline-flex justify-center items-center ml-2 rounded-full transition-colors hover:bg-secundariovariant-600 p-1 cursor-pointer'
                    onClick={() => { handleTagClick(index) }}
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </span>
                </li>
              ))}
              </ul>

              <Input
                className='border-0 outline-none focus:!ring-0 focus:!border-0 focus:ring-offset-0  focus-visible:ring-offset-0 '
                type="text"
                placeholder='Ingresa una enfermedad'
                onKeyDown={handleKeyDown}
              />

            </div>
    </>
  )
}

'use client'

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
      <div className="flex gap-1 flex-wrap border-2 border-solid rounded-md p-2 ">
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
              { tags.map((tag, index) => (
                <div key={index} className='text-white bg-cyan-500 rounded-xl  border-1 border-cyan-400 inline-block px-2 py-1'>
                  <span className=''>{tag}</span>
                  <span
                    className='inline-flex justify-center align-middle bg-white/45 p-1 rounded-full text-gray-600 ml-2 cursor-pointer'
                    onClick={() => { handleTagClick(index) }}
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="XXXXXXXXXXXXXXXXXXXXXXXXXX"
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
                </div>
              ))}
              <input
                className='border-0 outline-none bg-transparent'
                type="text"
                placeholder='Ingresa una enfermedad'
                onKeyDown={handleKeyDown}
              />
            </div>
    </>
  )
}

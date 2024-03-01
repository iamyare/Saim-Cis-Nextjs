'use client'

export default function TitlePage ({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col my-2">
      <h2 className="text-2xl">{title}</h2>
      <p className="text-neutral-500 max-w-2xl">
        {description}
      </p>
    </div>
  )
}

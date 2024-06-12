'use client'

const people = [
  {
    name: 'Miriam Velazquez',
    role: 'Doctor / Dermatologo',
    imageUrl:
      '/c.jpeg'
  },
  {
    name: 'Miguel Rodriguez',
    role: 'Doctor / Cardiologo',
    imageUrl:
      '/a.jpeg'
  },
  {
    name: 'Alexander fernandez',
    role: 'Doctor / Dentista',
    imageUrl:
      '/b.jpeg'
  },
  {
    name: 'Jose Martinez',
    role: 'Doctor / Psiquiatra',
    imageUrl:
      '/e.jpeg'
  },
  {
    name: 'Bianca Nuñez',
    role: 'Doctor / Pediatra',
    imageUrl:
      '/d.jpeg'
  }
]

export default function DoctorsSection () {
  return (
    <section className="container mx-auto py-12 animate-scroll-fade-up" id="doctores">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
            Nuestros Doctores
          </h2>
          <p className="mt-6 text-lg leading-8 ">
            En nuestro centro médico, contamos con un equipo de doctores
            altamente calificados y comprometidos con la excelencia en la
            atención médica. Cada uno de nuestros profesionales tiene una vasta
            experiencia en su especialidad, brindando un enfoque integral y
            personalizado a cada paciente.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  className="h-16 w-16 rounded-full"
                  src={person.imageUrl}
                  alt=""
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight ">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-sec dark:text-sec">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

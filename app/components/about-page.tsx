'use client'
import CirclesSVG from '@/components/svgs'

export default function AboutPage () {
  return (
    <>
      <section className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] bg-white dark:bg-dark text-justify">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://i.ibb.co/gFb3ns6/image-1.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://i.ibb.co/rfHFq15/image-2.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <img
                      src="https://i.ibb.co/9y7nYCD/image-3.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                    <span className="absolute -right-7 -bottom-7 z-[-1]">
                      <CirclesSVG />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <span className="block mb-4 text-lg font-semibold text-primary">
                  ¿Por qué elegirnos?
                </span>
                <h2 className="mb-5 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
                  Innovación y Cuidado en la Gestión Médica
                </h2>
                <p className="mb-5 text-base text-body-color dark:text-dark-6">
                  Somos un equipo dedicado a mejorar la gestión médica a través
                  de la tecnología. Nuestra aplicación está diseñada para
                  facilitar la administración de la atención médica, permitiendo
                  a los profesionales de la salud centrarse en lo que mejor
                  saben hacer: cuidar a los pacientes.
                </p>
                <p className="mb-8 text-base text-body-color dark:text-dark-6">
                  Con nuestra aplicación, puedes programar citas, gestionar
                  registros médicos y comunicarte de manera eficiente con los
                  pacientes. Estamos comprometidos con la innovación continua
                  para ofrecer las mejores soluciones en el campo de la gestión
                  médica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

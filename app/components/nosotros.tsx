"use client";
import AboutPage from "./about-page";

export default function Nosotros() {
  return (
    <>
      <section className="container mx-auto py-6" id="nosotros">
        <div className="mx-auto grid max-w-7xl gap-x-8 px-6 lg:px-8">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
              Sobre Nosotros
            </h2>
            <p className="my-2 text-md">Somos un centro medico que busca darle una buena atencion a nuestros pacientes con los mejores especialistas y con un equipo medico de ultima generación.</p>
          </div>
          <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 dark:bg-transparent py-6 sm:py-12">
            <div className="w-full items-center mx-auto max-w-screen-lg">
              <div className="group grid w-full lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 sm:col-end-1">
                <div>
                  <div className="pr-6">
                    <p className="peer mb-6 text-gray-800 dark:text-white">
                      La misión de Saim CIS es proporcionar atención médica de
                      alta calidad y accesible a todos los habitantes de
                      Honduras. Nos comprometemos a mejorar la salud y el
                      bienestar de nuestra comunidad a través de servicios
                      médicos integrales, educación para la salud y programas de
                      prevención.
                    </p>
                  </div>
                </div>
                <div className="pl-16 relative flex items-end flex-col before:block before:absolute before:h-1/6 before:w-4 before:bg-cyan-700/[.50] before:bottom-0 before:left-0 before:rounded-lg  before:transition-all group-hover:before:bg-cyan-300/[.50] overflow-hidden">
                  <div className="absolute top-0 left-0 bg-cyan-500/[.50] w-4/6 px-12 py-14 flex flex-col justify-center rounded-xl group-hover:bg-cyan-600/[.50] transition-all ">
                    <h2 className="text-white font-bold text-3xl">Mision</h2>
                  </div>
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src="https://kvcvdthsaepnfxzhvtmy.supabase.co/storage/v1/object/public/imagenes/Landing/mision%202.webp"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 dark:bg-transparent py-6 sm:py-12">
            <div className="w-full items-center mx-auto max-w-screen-lg">
              <div className="group grid w-full lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                <div className="pl-16 relative flex items-end flex-col before:block before:absolute before:h-1/6 before:w-4 before:bg-cyan-700/[.50] before:bottom-0 before:left-0 before:rounded-lg  before:transition-all group-hover:before:bg-cyan-300 overflow-hidden">
                  <div className="absolute top-0 left-0 bg-cyan-500/[.50] w-4/6 px-12 py-14 flex flex-col justify-center rounded-xl group-hover:bg-cyan-600/[.50] transition-all ">
                    <h2 className="text-white font-bold text-3xl text-center">
                      Vision
                    </h2>
                  </div>
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src="https://kvcvdthsaepnfxzhvtmy.supabase.co/storage/v1/object/public/imagenes/Landing/mision%204.webp"
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-6 py-4">
                    <p className="peer mb-6 text-gray-800 dark:text-white">
                      La visión de Saim CIS es ser reconocido como el líder en
                      atención médica en Honduras, estableciendo nuevos
                      estándares de cuidado y excelencia. Nos esforzamos por ser
                      el centro de elección para pacientes, médicos y empleados
                      debido a nuestra atención al paciente preeminente, nuestra
                      comprensión y compasión inigualables y nuestro compromiso
                      con la innovación en la atención médica.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

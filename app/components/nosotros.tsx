import React from "react";

export default function Nosotros() {
  return (
    <>
      <section className="container mx-auto py-4" id="nosotros">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
              Sobre Nosotros
            </h2>
            <p className="mt-6 text-lg leading-8 ">
              Somos un centro medico que
            </p>
          </div>
          <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 dark:bg-transparent py-6 sm:py-12">
            <div className="w-full items-center mx-auto max-w-screen-lg">
              <div className="group grid w-full grid-cols-2">
                <div>
                  <div className="pr-12">
                    <p className="peer mb-6 text-gray-400 dark:text-white">
                    La misión de Saim CIS es proporcionar atención médica de alta calidad y accesible a todos los habitantes de Honduras. Nos comprometemos a mejorar la salud y el bienestar de nuestra comunidad a través de servicios médicos integrales, educación para la salud y programas de prevención. 
                    </p>
                    <p className="mb-6 text-gray-400">
                      We also provide tailored Air Conditioning installation
                    </p>
                    <h3 className="mb-4 font-semibold text-xl text-gray-400">
                      Conditioning installation packages
                    </h3>
                    <ul
                      role="list"
                      className="marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-500"
                    >
                      <li>5 cups chopped Porcini mushrooms</li>
                      <li>1/2 cup of olive oil</li>
                      <li>3lb of celery</li>
                    </ul>
                  </div>
                </div>
                <div className="pl-16 relative flex items-end flex-col before:block before:absolute before:h-1/6 before:w-4 before:bg-blue-500 before:bottom-0 before:left-0 before:rounded-lg  before:transition-all group-hover:before:bg-orange-300 overflow-hidden">
                  <div className="absolute top-0 left-0 bg-blue-500 w-4/6 px-12 py-14 flex flex-col justify-center rounded-xl group-hover:bg-sky-600 transition-all ">
                    <h2 className="text-white font-bold text-3xl">Mision</h2>
                  </div>
                  <div className="rounded-xl overflow-hidden">
                    <img src="https://kvcvdthsaepnfxzhvtmy.supabase.co/storage/v1/object/public/imagenes/Landing/Landing%203.webp" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 dark:bg-transparent py-6 sm:py-12">
            <div className="w-full items-center mx-auto max-w-screen-lg">
              <div className="group grid w-full grid-cols-2">
                <div className="pl-16 relative flex items-end flex-col before:block before:absolute before:h-1/6 before:w-4 before:bg-blue-500 before:bottom-0 before:left-0 before:rounded-lg  before:transition-all group-hover:before:bg-orange-300 overflow-hidden">
                  <div className="absolute top-0 left-0 bg-cyan-400 w-4/6 px-12 py-14 flex flex-col justify-center rounded-xl group-hover:bg-sky-600 transition-all ">
                    <h2 className="text-white font-bold text-3xl text-center">
                      Vision
                    </h2>
                  </div>
                  <div className="rounded-xl overflow-hidden">
                    <img src="https://kvcvdthsaepnfxzhvtmy.supabase.co/storage/v1/object/public/imagenes/Landing/Landing%203.webp" alt="" />
                  </div>
                </div>
                <div>
                  <div className="pl-12">
                    <p className="peer mb-6 text-gray-400 dark:text-white">
                    La visión de Saim CIS es ser reconocido como el líder en atención médica en Honduras, estableciendo nuevos estándares de cuidado y excelencia. Nos esforzamos por ser el centro de elección para pacientes, médicos y empleados debido a nuestra atención al paciente preeminente, nuestra comprensión y compasión inigualables y nuestro compromiso con la innovación en la atención médica.
                      
                    </p>
                    <p className="mb-6 text-gray-400">
                      We also provide tailored Air Conditioning installation
                    </p>
                    <h3 className="mb-4 font-semibold text-xl text-gray-400">
                      Conditioning installation packages
                    </h3>
                    <ul
                      role="list"
                      className="marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-500"
                    >
                      <li>5 cups chopped Porcini mushrooms</li>
                      <li>1/2 cup of olive oil</li>
                      <li>3lb of celery</li>
                    </ul>
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

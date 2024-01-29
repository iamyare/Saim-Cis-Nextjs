'use client'

import Modal from "@/app/components/modal";
import Link from "next/link";



export type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default function InfoExpediente({
  expediente,
  props,

}: {
    expediente: Expedientes & {consultas: Consultas[]}
    props: Props
}) {



  const searchParams = props ? props.searchParams : undefined;
  console.log(searchParams);

  return (
    <>


      <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col">
          <h1 className="text-xl text-center">
            ID expediente: {expediente.id}
          </h1>
          <span>
            Fecha apertura:{" "}
            {new Date(expediente.fecha_apertura).toLocaleDateString(
                "es-HN",
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }
            )}
          </span>
        </div>
        <hr />
        <div className="flex flex-col">
          <h2 className=" text-lg text-center">Consultas:</h2>
          <ul className="flex flex-col gap-2">
            {expediente.consultas.map((consulta) => (
                <li key={consulta.id}>
                <Link 
                href={`/info/${expediente.id}/consulta/${consulta.id}`}
                  className="w-full flex flex-col hover:scale-105 duration-300 border rounded-lg p-2"
                  key={consulta.id}
                  passHref
                >
                  <span>
                    Fecha: {new Date(consulta.creado).toLocaleDateString()}
                  </span>
                  <span>Sintomas: {consulta.sintomas}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>


    </>
  );
}



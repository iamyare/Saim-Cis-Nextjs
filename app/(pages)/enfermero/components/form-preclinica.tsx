"use client";

import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import { useTransition } from "react";
import { createConsulta, getExpedienteByIDPaciente } from "../actions";

const validationSchema = z.object({
  peso: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) return false;
      const decimalPart = value.split(".")[1];
      return decimalPart ? decimalPart.length <= 2 : true;
    },
    { message: "El peso debe ser un número válido y tener hasta dos decimales" }
  ),
  estatura: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) return false;
      const decimalPart = value.split(".")[1];
      return decimalPart ? decimalPart.length <= 2 : true;
    },
    {
      message:
        "La estatura debe ser un número válido y tener hasta dos decimales",
    }
  ),
  temperatura: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue >= 25 && parsedValue <= 45;
    },
    { message: "La temperatura debe ser un número válido entre 25 y 45" }
  ),
  presion: z.string().regex(/\d+\/\d+/, {
    message: "La presion debe tener el formato sistólica/diastólica",
  }),
  saturacion: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100;
    },
    { message: "La saturación debe ser un número válido entre 0 y 100" }
  ),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export function FormPreclinica({id}: {id: string}) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      peso: "",
      estatura: "",
      temperatura: "",
      presion: "",
      saturacion: "",
    },
  });

  

  function onSubmit(data: z.infer<typeof validationSchema>) {
    startTransition(async () => {
      const idExpedienteResult = await getExpedienteByIDPaciente( {id} )
      
        
      if (typeof idExpedienteResult === "string") {
        const { consulta, errorConsulta } = await createConsulta({ data, id: idExpedienteResult });
        if (errorConsulta) {
          toast.error("Ha ocurrido un error, Los datos no han sido guardados");
          return;
        } else{
          toast.success("Los Datos han sido guardados Exitosamente!")
        }
      } else {
        toast.error("La persona que usted intenta atender no posee un expediente creado");
        return;
      }
    });
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col ">
              <Label className="mb-2" htmlFor="Peso">
                Peso (kg)
              </Label>
              <Input
                placeholder="kg.gg"
                type="text"
                autoCapitalize="none"
                autoComplete="Peso"
                autoCorrect="off"
                disabled={isPending}
                className={
                  errors.peso
                    ? "border-red-500  !placeholder-red-500 text-red-500"
                    : ""
                }
                {...register("peso")}
              />
              {errors.peso && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.peso?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Label className="mb-2" htmlFor="Estatura">
                Estatura (m)
              </Label>
              <Input
                placeholder="Estatura"
                type="text"
                autoCapitalize="none"
                autoComplete="Estatura"
                autoCorrect="off"
                disabled={isPending}
                className={
                  errors.estatura
                    ? "border-red-500  !placeholder-red-500 text-red-500"
                    : ""
                }
                {...register("estatura")}
              />
              {errors.estatura && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.estatura?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Label className="mb-2" htmlFor="Temperatura">
                Temperatura (°C)
              </Label>
              <Input
                placeholder="00"
                type="text"
                autoCapitalize="none"
                autoComplete="Temperatura"
                autoCorrect="off"
                disabled={isPending}
                className={
                  errors.temperatura
                    ? "border-red-500  !placeholder-red-500 text-red-500"
                    : ""
                }
                {...register("temperatura")}
              />
              {errors.temperatura && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.temperatura?.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-2">
            <div className="flex flex-col">
              <Label className="mb-2" htmlFor="Presion">
                Presión Arterial (mmHg)
              </Label>
              <Input
                placeholder="SS/DD"
                type="text"
                autoCapitalize="none"
                autoComplete="Presion"
                autoCorrect="off"
                disabled={isPending}
                className={
                  errors.presion
                    ? "border-red-500  !placeholder-red-500 text-red-500"
                    : ""
                }
                {...register("presion")}
              />
              {errors.presion && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.presion?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Label className="mb-2" htmlFor="saturacion">
                Saturación Oxígeno (%)
              </Label>
              <Input
                placeholder="dd"
                type="number"
                autoCapitalize="none"
                autoComplete="saturacion"
                autoCorrect="off"
                disabled={isPending}
                className={
                  errors.saturacion
                    ? "border-red-500  !placeholder-red-500 text-red-500"
                    : ""
                }
                {...register("saturacion")}
              />
              {errors.saturacion && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.saturacion?.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"></div>

          <Button
            disabled={isPending}
            className="bg-blue-500 hover:bg-blue-600 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
            Registrar datos
          </Button>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

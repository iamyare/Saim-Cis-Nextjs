"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import { useTransition } from "react";
import { checkPersonAndUser, getUserbyDNI, signUpWithEmailAndPassword } from "../actions";

const validationSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "El correo electrónico es obligatorio" })
      .email({
        message: "Debe ser un correo electrónico válido",
      }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
    //   "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y tener al menos 6 caracteres"
    // ),
    firstName: z.string().min(1, { message: "El nombre es obligatorio" }),
    lastName: z.string().min(1, { message: "El apellido es obligatorio" }),
    dni: z
      .string()
      .min(1, { message: "El DNI es obligatorio" })
      .regex(/^\d{4}-?\d{4}-?\d{5}$/, {
        message: "El DNI debe tener el formato dddd-dddd-ddddd",
      }),
    confirm: z
      .string()
      .min(1, { message: "La confirmación de contraseña es obligatoria" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"],
  });

type ValidationSchema = z.infer<typeof validationSchema>;

export function UserAuthForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dni: "",
      confirm: "",
    },
  });

  function onSubmit(data: z.infer<typeof validationSchema>) {

    // identificar si dni contiene guiones, si es así, quitarlos
    // luego si no tiene agrega guiones dddd-dddd-ddddd
    if (data.dni.includes("-")) {
      data.dni = data.dni.replace(/-/g, "");
    }
    if (data.dni.length === 13) {
      data.dni = `${data.dni.slice(0, 4)}-${data.dni.slice(4, 8)}-${data.dni.slice(8, 13)}`;
    }


    
    startTransition(async () => {
      const {data: dataUser, error: errorUser } = await getUserbyDNI({ dni: data.dni });


      if (!dataUser) {
        toast.error("El DNI no se encuentra registrado en el sistema.");
        return;
      }
      if (errorUser) {
        toast.error(errorUser.message);
        return;
      }

      const id_persona = dataUser.id;

      const {userData, userError} = await checkPersonAndUser({ id: id_persona });

      if (userData) {
        toast.error("El DNI ya se encuentra registrado en el sistema.");
        return;
      }
      if (userError) {
        toast.error(userError.message);
        return;
      }


      const result = await signUpWithEmailAndPassword({data, id_persona});
      const { error } = JSON.parse(result);
      if (error.message) {
        toast.error(error.message);
        return;
      }

    });
  }



  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="" htmlFor="first-name">
                Nombres
              </Label>
              <Input
                placeholder="Nombre"
                type="text"
                autoCapitalize="none"
                autoComplete="first-name"
                autoCorrect="off"
                disabled={isPending}
                className={
                  errors.firstName
                    ? "border-red-500  !placeholder-red-500 text-red-500"
                    : ""
                }
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.firstName?.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label className="" htmlFor="family-name">
                Apellidos
              </Label>
              <Input
                placeholder="Apellidos"
                type="text"
                autoCapitalize="none"
                autoComplete="family-name"
                autoCorrect="off"
                disabled={isPending}
                className={
                  errors.lastName
                    ? "border-red-500  !placeholder-red-500 text-red-500"
                    : ""
                }
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-xs italic text-red-500 mt-0">
                  {errors.lastName?.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-1">
            <Label className="" htmlFor="DNI">
              DNI
            </Label>
            <Input
              placeholder="0801-12345-67890"
              type="text"
              autoCapitalize="none"
              autoComplete="dni"
              autoCorrect="off"
              disabled={isPending}
              className={
                errors.dni
                  ? "border-red-500  !placeholder-red-500 text-red-500"
                  : ""
              }
              {...register("dni")}
            />
            {errors.dni && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.dni?.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="" htmlFor="email">
              Correo electrónico
            </Label>
            <Input
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
              className={
                errors.email
                  ? "border-red-500  !placeholder-red-500 text-red-500"
                  : ""
              }
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="" htmlFor="password">
              Contraseña
            </Label>
            <div className="relative flex-1">
              <Input
                placeholder="Contraseña"
                type="password"
                autoCapitalize="none"
                id="hs-strong-password-with-indicator-and-hint-in-popover"
                autoCorrect="off"
                disabled={isPending}
                className={
                  errors.password
                    ? "border-red-500  !placeholder-red-500 text-red-500"
                    : ""
                }
                {...register("password")}
              />

              <div
                id="hs-strong-password-popover"
                className="hidden absolute z-10 w-full bg-white shadow-md rounded-lg p-4 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
              >
                <div
                  id="hs-strong-password-in-popover"
                  data-hs-strong-password='{
            "target": "#hs-strong-password-with-indicator-and-hint-in-popover",
            "hints": "#hs-strong-password-popover",
            "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1",
            "mode": "popover"
          }'
                  className="flex mt-2 -mx-1"
                ></div>

                <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
                  Tu contraseña debe contener:
                </h4>

                <ul className="space-y-1 text-sm text-gray-500">
                  <li
                    data-hs-strong-password-hints-rule-text="min-length"
                    className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                  >
                    <span className="hidden" data-check>
                      <svg
                        className="flex-shrink-0 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span data-uncheck>
                      <svg
                        className="flex-shrink-0 w-4 h-4"
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
                    El número mínimo de caracteres es 6.
                  </li>
                  <li
                    data-hs-strong-password-hints-rule-text="lowercase"
                    className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                  >
                    <span className="hidden" data-check>
                      <svg
                        className="flex-shrink-0 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span data-uncheck>
                      <svg
                        className="flex-shrink-0 w-4 h-4"
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
                    Debe contener minúsculas.
                  </li>
                  <li
                    data-hs-strong-password-hints-rule-text="uppercase"
                    className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                  >
                    <span className="hidden" data-check>
                      <svg
                        className="flex-shrink-0 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span data-uncheck>
                      <svg
                        className="flex-shrink-0 w-4 h-4"
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
                    Debe contener mayúsculas.
                  </li>
                  <li
                    data-hs-strong-password-hints-rule-text="numbers"
                    className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                  >
                    <span className="hidden" data-check>
                      <svg
                        className="flex-shrink-0 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span data-uncheck>
                      <svg
                        className="flex-shrink-0 w-4 h-4"
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
                    Debe contener números.
                  </li>
                  <li
                    data-hs-strong-password-hints-rule-text="special-characters"
                    className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                  >
                    <span className="hidden" data-check>
                      <svg
                        className="flex-shrink-0 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span data-uncheck>
                      <svg
                        className="flex-shrink-0 w-4 h-4"
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
                    Debe contener caracteres especiales.
                  </li>
                </ul>
              </div>
            </div>
            {errors.password && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="" htmlFor="confirm">
              Confirmar contraseña
            </Label>
            <div className="relative flex-1">
              <Input
                placeholder="Confirmar contraseña"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isPending}
                className={
                  errors.confirm
                    ? "border-red-500  !placeholder-red-500 text-red-500"
                    : ""
                }
                {...register("confirm")}
              />

            </div>
            {errors.confirm && (
              <p className="text-xs italic text-red-500 mt-0">
                {errors.confirm?.message}
              </p>
            )}
          </div>

          <Button disabled={isPending} className=" bg-blue-500 hover:bg-blue-600">
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Registrarse
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

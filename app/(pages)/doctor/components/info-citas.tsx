"use client";

import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import { useTransition } from "react";



export function InfoCitas() {

  return (
    <div className="flex flex-col">
      <form>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex flex-col py-4">
              <Label className="" >
                Nombre del paciente
              </Label>
                <p className="mx-4">Paciente</p>
            </div>
            <div className="flex flex-col py-2">
              <Label className="" >
                Fecha Registro
              </Label>
                <p className="mx-4">registro</p>
            </div>
            <div className="flex flex-col py-2">
              <Label className="">
                Estado
              </Label>
                <p className="mx-4">estado cita</p>
            </div>
            <div className="flex flex-col py-2">
              <Label className="">
                Hora final
              </Label>
                <p className="mx-4"> fin </p>
            </div>
            <div className="flex flex-col py-2">
              <Label className="" >
                Descripcion
              </Label>
                <p className="mx-4"> descripcion</p>
            </div>
          </div>

          <div className="flex justify-center">
          </div>
          <Button
            className="bg-cyan-400 hover:bg-cyan-400 dark:text-white dark:bg-cyan-400 dark:hover:bg-cyan-400 flex justify-center mx-6"
          >
            Cerrar
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
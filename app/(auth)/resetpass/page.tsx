import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getInfoPersona } from "@/app/actions";
import ResetPassClient from "./components/reset-pass";

export const metadata: Metadata = {
  title: "Restablecer contraseña",
  description: "Restablecer contraseña personalizada",
};

export default async function ResetPass() {
  const { usuario, errorUsuario } = await getInfoPersona();

  if (errorUsuario) {
    return <span>Error al obtener el usuario</span>;
  }

  if (usuario) {
    if (usuario.usuario.estado === "activo") {
      redirect("/welcome");
    } else if (usuario.usuario.estado !== "pendiente") {
      redirect("/");
    }
  }
  return <ResetPassClient />;
}

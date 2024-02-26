import { Metadata } from "next";
import NavbarPacienteClient from "./components/navbar-paciente-client";

export const meta: Metadata = {
  title: "Paciente",
  description: "Pagina del paciente",
};

export default async function PacienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usuario = null; //await getInfoPersona();

  return (
    <>
      <NavbarPacienteClient user={usuario ?? null} />
      {children}
    </>
  );
}
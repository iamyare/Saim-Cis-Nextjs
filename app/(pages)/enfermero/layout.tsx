import NavbarEnfermeroClient from "./components/navbar-enfermero-client";
import { Metadata } from "next";

export const meta: Metadata = {
  title: "Pacientes",
  description: "Pacientes de enfermería",
};

export default async function EnfermeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usuario = null; //await getInfoPersona();

  return (
    <>
      <NavbarEnfermeroClient user={usuario ?? null} />
      {children}
    </>
  );
}

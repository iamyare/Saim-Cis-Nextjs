import { Metadata } from "next";
import NavbarDoctorClient from "./components/navbar-doctor-client";

export const meta: Metadata = {
  title: "Doctor",
  description: "Pagina del doctor",
};

export default async function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usuario = null; //await getInfoPersona();

  return (
    <>
      <NavbarDoctorClient user={usuario ?? null} />
      {children}
    </>
  );
}

import { Metadata } from "next";
import { getInfoPersona } from "@/app/actions";
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
  const { usuario: doctor} = await getInfoPersona();

  return (
    <>
      <NavbarDoctorClient user={doctor ?? null} />
      {children}
    </>
  );
}

import { Metadata } from "next";
import { getInfoPersona } from "@/app/actions";
import NavbarDoctorClient from "./components/navbar-doctor-client";
import NavbarIndexClient from "@/components/navbar-index-client";

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
      <NavbarIndexClient user={doctor ?? null} />
      {children}
    </>
  );
}

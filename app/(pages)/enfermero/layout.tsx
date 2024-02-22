import NavbarEnfermeroClient from "./components/navbar-enfermero-client";

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

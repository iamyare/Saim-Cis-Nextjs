import { getInfoPersona } from "@/app/actions";

import HeaderProfile from "./components/header-profile";
import PersonalInfo from "./components/personal-info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor",
  description: "Pagina de doctor",
};

export default async function DoctorPage() {
  const { usuario, errorUsuario } = await getInfoPersona();

  return (
    <main className="px-8 py-2">
      <HeaderProfile usuario={usuario ?? null} />
      <aside className="flex flex-col md:flex-row w-full md:space-x-4 ">
        <section className="my-4 flex-col  space-y-4 w-full ">
          <PersonalInfo usuario={usuario ?? null} />
        </section>
      </aside>
    </main>
  );
}

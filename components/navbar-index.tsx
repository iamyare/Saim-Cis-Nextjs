
import { readUserSession } from "@/lib/actions"
import NavbarIndexClient from "./navbar-index-client";
import { supabase } from "@/lib/supabase";
import { getUser } from "@/app/actions";


export default async function NavbarIndex() {
  const { data: {session} } = await readUserSession()
  if (!session) {
    return null
  }

  const { usuario, errorUsuario } = await getUser({ id: session.user.id });
  if (errorUsuario) {
    console.error(errorUsuario);
  }


  
  return (
    <NavbarIndexClient user={usuario} />
  );
}

import { Metadata } from "next"
import SignUpAuth from "./components/signup"
import { readUserSession } from "@/lib/actions"
import { redirect } from 'next/navigation'



export const metadata: Metadata = {
  title: "Registrarse",
  description: "Crea una cuenta para acceder a todos los beneficios de Saim Cis.",
}


export default async function Login() {
    const { data } = await readUserSession()

if (data.session) {
  return redirect('/welcome')
}

  return (
    <SignUpAuth />
  )
}
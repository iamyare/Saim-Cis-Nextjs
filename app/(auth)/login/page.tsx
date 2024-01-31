import { Metadata } from "next"
import LoginAuth from "./components/login"
import { readUserSession } from "@/lib/actions"
import { redirect } from 'next/navigation'



export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Iniciar sesión en la aplicación.",
}


export default async function Login() {
    const { data } = await readUserSession()

if (data.session) {
  return redirect('/')
}

  return (
    <LoginAuth />
  )
}
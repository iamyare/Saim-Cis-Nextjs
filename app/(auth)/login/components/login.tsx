'use client'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "../components/user-auth-form"
import LogoSaimCis from "@/components/logo-saim-cis"

export default function LoginAuth() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <Link
      href="/signup"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "absolute right-4 top-4 md:right-8 md:top-8"
      )}
    >
      Crear cuenta
    </Link>
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div className="absolute inset-0 bg-zinc-900" />
      <Link className="relative z-20 flex items-center text-lg font-medium" href='/'>
      <LogoSaimCis/>

        Saim Cis
      </Link>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">

          <p className="text-lg">
            &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas consequatur sint aut assumenda blanditiis neque impedit magni nisi voluptates! Reprehenderit veniam laudantium tempore impedit iste accusamus voluptatum modi, necessitatibus similique!&rdquo;
          </p>
          <footer className="text-sm">Yamir Rodas</footer>
        </blockquote>
      </div>
    </div>
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Iniciar sesión
          </h1>
          <p className="text-sm text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/signup"
              className="underline underline-offset-4 hover:text-primary"
            >
              Crear cuenta
            </Link>
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Al hacer clic en continuar, aceptas nuestros{" "}
        <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
        >
            Términos de servicio
        </Link>{" "}
        y{" "}
        <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
        >
            Política de privacidad
        </Link>
          .
        </p>
      </div>
    </div>
  </div>
  )
}

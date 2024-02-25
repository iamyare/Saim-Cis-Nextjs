"use server";
import TemplateEmailPassTemp from "@/components/html-email";
import { supabase } from "@/lib/supabase";
import { adminAuthClient } from "@/lib/supabase/auth-admin";
import nodemailer from "nodemailer";

type CreatePersona = {
  correo: string;
  nombre: string;
  apellido: string;
  dni: string;
  fecha_nacimiento: string;
  direccion: string;
  telefono: string;
  genero: string;
};

export async function createPersona({ data }: { data: CreatePersona }) {
  const { data: persona, error: errorPersona } = await supabase
    .from("personas")
    .insert({ ...data, rol: "Paciente" })
    .select("*")
    .single();
  return { persona, errorPersona };
}

export async function setRolePacienteUser({
  id,
  rol,
}: {
  id: string;
  rol: string;
}) {
  //Obtener el id de la especializacion por el nombre del rol
  const { data: especializacion, error: especializacionError } = await supabase
    .from("especializaciones")
    .select("id")
    .eq("nombre", rol)
    .single();

  if (especializacionError) {
    return { data: null, error: especializacionError };
  }
  if (!especializacion) {
    return { data: null, error: "No se encontro la especializacion" };
  }

  const { data, error } = await supabase
    .from("especializacion_x_personas")
    .insert({ id_persona: id, id_especializacion: especializacion.id })
    .select("*")
    .single();

  return { data, error };
}

export async function sendMailSingup({
  email,
  passwordTemp,
  persona,
}: {
  email: string;
  passwordTemp: string;
  persona: Personas;
}) {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `SAIM CIS ${process.env.NEXT_PUBLIC_EMAIL}`,
    to: email,
    subject: `Bienvenido a SAIM CIS ${persona.nombre}! 🎉`,
    text: `Su contraseña temporal es: ${passwordTemp}`,
    html: TemplateEmailPassTemp({
      nombre: persona.nombre,
      temp_pass: passwordTemp,
    }),
  };

  const emailResponse = await transporter.sendMail(mailOptions);

  return emailResponse;
}

export async function signUpWithEmailAndTempPass({
  email,
  passwordTemp,
  id_persona,
}: {
  email: string;
  passwordTemp: string;
  id_persona: string;
}) {
  const { data: userCreate, error: errorUserCreate } =
    await adminAuthClient.createUser({
      email: email,
      password: passwordTemp,
      user_metadata: { id_persona: id_persona, passwordTemp: passwordTemp },
      email_confirm: true,
    });

  return { userCreate, errorUserCreate };
}

export async function getUsersByRol({ role }: { role: string }) {
  const { data: usuario, error: errorUsuario } = await supabase
    .from("personas")
    .select("*")
    .eq("rol", role);

  return { usuario, errorUsuario };
}

export async function getUserByDNI({ dni }: { dni: string }) {
  const { data: dataDni, error: errorDni } = await supabase
    .from("personas")
    .select("*")
    .eq("dni", dni);

  return { dataDni, errorDni };
}

export async function getUserByCorreo({ correo }: { correo: string }) {
  const { data: dataCorreo, error: errorCorreo } = await supabase
    .from("personas")
    .select("*")
    .eq("correo", correo);

  return { dataCorreo, errorCorreo };
}

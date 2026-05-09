import Link from 'next/link'
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardPlus,
  FileText,
  HeartPulse,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UsersRound
} from 'lucide-react'
import NavbarIndex from '@/components/navbar-index'
import Footer from './components/footer'

const carePillars = [
  {
    icon: FileText,
    title: 'Expediente digital',
    copy:
      'Historia clínica, notas, diagnósticos y documentos en un perfil ordenado para cada paciente.'
  },
  {
    icon: CalendarCheck,
    title: 'Agenda de citas',
    copy:
      'Organiza disponibilidad, confirma consultas y reduce esperas desde una vista clara.'
  },
  {
    icon: ShieldCheck,
    title: 'Acceso por roles',
    copy:
      'Cada profesional ve lo que necesita, con una experiencia pensada para el trabajo clínico.'
  }
]

const platformSteps = [
  'Registro de pacientes con datos esenciales y contacto.',
  'Programación de citas por doctor, fecha y estado.',
  'Seguimiento clínico con notas y expedientes disponibles.',
  'Consulta segura para equipos médicos autorizados.'
]

const metrics = [
  { value: '01', label: 'perfil clínico unificado' },
  { value: '24/7', label: 'información lista para consultar' },
  { value: '3', label: 'flujos clave: pacientes, agenda y equipo' }
]

const features = [
  'Historial médico centralizado',
  'Control de citas por profesional',
  'Gestión de pacientes',
  'Vista para doctores y enfermería',
  'Datos de contacto organizados',
  'Experiencia responsive'
]

export default function Home () {
  return (
    <main className="min-h-screen bg-[#f7fbfa] text-[#123032]">
      <NavbarIndex />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(157,211,203,0.35),transparent_32%),radial-gradient(circle_at_88%_28%,rgba(99,170,185,0.22),transparent_30%)]" />
        <div className="container relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cde3df] bg-white/70 px-4 py-2 text-sm font-medium text-[#2f7374] shadow-sm shadow-[#dcefed]/60 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Gestión médica cercana, simple y segura
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-[#0b3a42] sm:text-6xl lg:text-7xl">
              SAIM CIS para cuidar cada expediente y cada cita.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4c6667]">
              Una plataforma para centros médicos que necesitan organizar
              pacientes, agenda y seguimiento clínico sin perder la calidez del
              trato humano.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0b6973] px-6 text-sm font-semibold text-white shadow-lg shadow-[#0b6973]/20 transition hover:bg-[#095761]"
              >
                Iniciar sesión
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#agenda"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#bfd8d4] bg-white/70 px-6 text-sm font-semibold text-[#17474d] transition hover:bg-white"
              >
                Ver cómo funciona
              </a>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/70 bg-white/65 p-4 shadow-sm shadow-[#d7ece8]/70 backdrop-blur"
                >
                  <p className="text-2xl font-semibold text-[#0b6973]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-[#557273]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-2xl shadow-[#bddbd5]/50">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85"
                alt="Profesional de salud revisando expediente digital con una paciente"
                className="h-[620px] w-full rounded-[1.5rem] object-cover"
              />
            </div>
            <div className="absolute -bottom-8 left-6 right-6 rounded-3xl border border-white/80 bg-white/85 p-5 shadow-xl shadow-[#badbd6]/50 backdrop-blur md:left-auto md:w-80">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e7f5f2] text-[#0b6973]">
                  <ClipboardPlus className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#123032]">
                    Próxima cita
                  </p>
                  <p className="text-sm text-[#5c7475]">
                    Consulta general confirmada
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-[#f1f8f6] p-3">
                  <p className="text-[#6b8181]">Paciente</p>
                  <p className="font-semibold text-[#123032]">Ana R.</p>
                </div>
                <div className="rounded-2xl bg-[#f1f8f6] p-3">
                  <p className="text-[#6b8181]">Hora</p>
                  <p className="font-semibold text-[#123032]">10:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24" id="expediente">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0b6973]">
                Expedientes vivos
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#0b3a42] sm:text-5xl">
                Todo el contexto médico en un lugar tranquilo de consultar.
              </h2>
            </div>
            <p className="text-lg leading-8 text-[#5c7475]">
              SAIM CIS ayuda al equipo de salud a pasar menos tiempo buscando
              información y más tiempo escuchando al paciente. La información
              importante queda disponible para dar continuidad a cada atención.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {carePillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-3xl border border-[#e3eeec] bg-[#fbfefd] p-7 shadow-sm shadow-[#e8f3f0]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e3f4f0] text-[#0b6973]">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#123032]">
                  {pillar.title}
                </h3>
                <p className="mt-3 leading-7 text-[#5c7475]">{pillar.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" id="agenda">
        <div className="container mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-xl shadow-[#d4e9e5]">
            <img
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1100&q=85"
              alt="Equipo médico conversando en una consulta"
              className="h-[520px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0b6973]">
              Agenda con calma
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#0b3a42] sm:text-5xl">
              Del primer contacto al seguimiento, sin fricción.
            </h2>
            <div className="mt-8 space-y-4">
              {platformSteps.map((step) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-2xl border border-[#deebe8] bg-white/80 p-4"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#0b6973]" />
                  <p className="leading-7 text-[#4f696a]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0b3a42] py-24 text-white" id="seguridad">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9dd3cb]">
                Confianza operativa
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                Tecnología discreta para un cuidado más humano.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#c6dcda]">
                La plataforma acompaña el trabajo diario del centro médico con
                orden, privacidad y navegación clara para el equipo autorizado.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-4"
                >
                  <LockKeyhole className="h-4 w-4 text-[#9dd3cb]" />
                  <span className="text-sm font-medium text-[#eef8f6]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0b6973]">
                Cercanía
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#0b3a42] sm:text-5xl">
                Hecho para centros que cuidan con orden y sensibilidad.
              </h2>
            </div>
            <div className="rounded-3xl border border-[#e3eeec] bg-[#f7fbfa] p-8">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0b6973]">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <p className="text-lg leading-8 text-[#4f696a]">
                  Cuando el expediente está claro y la agenda está ordenada,
                  el equipo puede recibir a cada persona con más atención,
                  paciencia y confianza.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0b6973]">
                  Pacientes
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0b6973]">
                  Doctores
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0b6973]">
                  Enfermería
                </span>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl bg-[#f1f8f6] p-7">
              <Stethoscope className="h-7 w-7 text-[#0b6973]" />
              <h3 className="mt-5 text-xl font-semibold text-[#123032]">
                Para doctores
              </h3>
              <p className="mt-3 leading-7 text-[#5c7475]">
                Acceso al contexto clínico antes, durante y después de la
                consulta.
              </p>
            </div>
            <div className="rounded-3xl bg-[#f1f8f6] p-7">
              <UsersRound className="h-7 w-7 text-[#0b6973]" />
              <h3 className="mt-5 text-xl font-semibold text-[#123032]">
                Para recepción
              </h3>
              <p className="mt-3 leading-7 text-[#5c7475]">
                Organización de pacientes y citas desde una experiencia simple
                de seguir.
              </p>
            </div>
            <div className="rounded-3xl bg-[#f1f8f6] p-7">
              <CalendarCheck className="h-7 w-7 text-[#0b6973]" />
              <h3 className="mt-5 text-xl font-semibold text-[#123032]">
                Para el centro
              </h3>
              <p className="mt-3 leading-7 text-[#5c7475]">
                Un flujo más consistente para brindar continuidad y orden
                operativo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7fbfa] py-20">
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl font-semibold leading-tight text-[#0b3a42] sm:text-5xl">
            Ingresa al entorno de trabajo de SAIM CIS.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#5c7475]">
            El acceso está reservado para el equipo autorizado del centro
            médico.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0b6973] px-6 text-sm font-semibold text-white shadow-lg shadow-[#0b6973]/20 transition hover:bg-[#095761]"
          >
            Ir al login
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

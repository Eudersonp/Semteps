import Image from "next/image";
import Link from "next/link";

type Service = {
  title: string;
  description: string;
  image?: string;
  icon?: "identification" | "council" | "map" | "planning" | "normativas" | "agenda";
  tone: "emerald" | "teal" | "amber" | "blue" | "violet" | "rose";
  analysisLinks: {
    label: string;
    href: string;
    external?: boolean;
  }[];
};

// Cartões exibidos no painel inicial. Cada item define título, descrição, identidade visual e destino.
const services: Service[] = [
  // Primeira fileira: dois cartões
  {
    title: "Proteção Social Básica",
    description: "CRAS, convivência e acompanhamento preventivo das famílias.",
    image: "/cras.png",
    tone: "emerald",
    analysisLinks: [{ label: "Acessar", href: "/painel/psb" }],
  },
  {
    title: "Proteção Social Especial",
    description:
      "Atendimento especializado e acompanhamento de violações de direitos.",
    image: "/creas.png",
    tone: "teal",
    analysisLinks: [{ label: "Acessar", href: "/painel/pse" }],
  },

  // Segunda fileira: três cartões
  {
    title: "Cadastro Único / Programa Bolsa Família",
    description:
      "Acesso às informações e aos serviços do Cadastro Único e PBF.",
    image: "/cad.png",
    tone: "violet",
    analysisLinks: [{ label: "Acessar", href: "/painel/cad_unico" }],
  },
  {
    title: "Sala do Trabalhador",
    description:
      "Oportunidades, orientação e serviços para quem busca trabalho.",
    image: "/trab.png",
    tone: "amber",
    analysisLinks: [
      {
        label: "Acessar Sala do Trabalhador",
        href: "/painel/trabalho",
      },
    ],
  },
  {
    title: "Sistema de Segurança Alimentar e Nutricional",
    description:
      "Informações e indicadores da política de segurança alimentar.",
    image: "/sisan.png",
    tone: "emerald",
    analysisLinks: [{ label: "Acessar sistema", href: "/rma/sisan" }],
  },

  // Terceira fileira: três cartões
  {
    title: "Conselho Tutelar",
    description:
      "Atendimento e garantia dos direitos de crianças e adolescentes.",
    icon: "council",
    tone: "rose",
    analysisLinks: [
      {
        label: "Acessar dados do Conselho Tutelar",
        href: "/conselho-tutelar",
      },
    ],
  },
  {
    title: "Setor de Identificação Civil",
    description:
      "Informações sobre atendimentos e serviços de identificação civil.",
    icon: "identification",
    tone: "teal",
    analysisLinks: [
      {
        label: "Análise de atendimentos",
        href: "/rma/identificacao-civil",
      },
    ],
  },
  {
    title: "Setor Financeiro",
    description: "Gestão e acompanhamento financeiro da secretaria.",
    image: "/financeiro.png",
    tone: "blue",
    analysisLinks: [
      {
        label: "Acessar dados financeiros",
        href: "/painel/financeiro",
      },
       
    ],
  },

  // Quarta fileira: os demais cartões
  {
    title: "Mapa Territorial",
    description:
      "Consulte a representação territorial de Santa Izabel do Pará.",
    icon: "map",
    tone: "blue",
    analysisLinks: [
      {
        label: "Acessar mapa do município",
        href: "/mapa-municipio",
      },
    ],
  },
  {
    title: "Planejamento 2027",
    description:
      "Consulte o planejamento, as metas e as ações previstas para 2027.",
    icon: "planning",
    tone: "violet",
    analysisLinks: [
      {
        label: "Acessar",
        href: "/painel/planejamento-2027",
      },
    ],
  },
  {
    title: "Normativas SUAS",
    description:
      "Consulte normas, orientações e documentos relacionados ao Sistema Único de Assistência Social.",
    icon: "normativas",
    tone: "violet",
    analysisLinks: [
      {
        label: "Acessar",
        href: "/normativas-suas",
      },
    ],
  },
  // Novo cartão de agenda, seguindo o mesmo padrão de acesso e apresentação dos demais.
  {
    title: "Agenda da SEMTEPS",
    description:
      "Consulte a agenda de atividades, reuniões e compromissos da SEMTEPS.",
    icon: "agenda",
    tone: "teal",
    analysisLinks: [
      {
        label: "Acessar agenda",
        href: "/painel/agenda-semteps",
      },
    ],
  },
];

const toneStyles: Record<
  Service["tone"],
  { icon: string; link: string; glow: string }
> = {
  emerald: {
    icon: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    link: "border-emerald-200 text-emerald-800 hover:bg-emerald-700 hover:border-emerald-700",
    glow: "bg-emerald-500",
  },
  teal: {
    icon: "bg-teal-50 text-teal-700 ring-teal-100",
    link: "border-teal-200 text-teal-800 hover:bg-teal-700 hover:border-teal-700",
    glow: "bg-teal-500",
  },
  amber: {
    icon: "bg-amber-50 text-amber-700 ring-amber-100",
    link: "border-amber-200 text-amber-800 hover:bg-amber-700 hover:border-amber-700",
    glow: "bg-amber-500",
  },
  blue: {
    icon: "bg-sky-50 text-sky-700 ring-sky-100",
    link: "border-sky-200 text-sky-800 hover:bg-sky-700 hover:border-sky-700",
    glow: "bg-sky-500",
  },
  violet: {
    icon: "bg-violet-50 text-violet-700 ring-violet-100",
    link: "border-violet-200 text-violet-800 hover:bg-violet-700 hover:border-violet-700",
    glow: "bg-violet-500",
  },
  rose: {
    icon: "bg-rose-50 text-rose-700 ring-rose-100",
    link: "border-rose-200 text-rose-800 hover:bg-rose-700 hover:border-rose-700",
    glow: "bg-rose-500",
  },
};

// Preserva o fluxo de autenticação: o login retorna ao destino selecionado no cartão.
function loginHref(destination: string) {
  return `/login?next=${encodeURIComponent(destination)}`;
}

function ArrowIcon({ external = false }: { external?: boolean }) {
  return external ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M14 4h6v6M10 14 20 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IdentificationIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className="h-8 w-8"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="7"
        width="28"
        height="22"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12.5" cy="15" r="3" fill="currentColor" />
      <path
        d="M7.5 24c.6-2.7 2.3-4.2 5-4.2s4.4 1.5 5 4.2M22 13h6m-6 4h6m-6 4h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CouncilIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className="h-8 w-8"
      aria-hidden="true"
    >
      <circle
        cx="13"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="24"
        cy="13"
        r="3.3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.5 28c.6-5 3-7.5 7.5-7.5s6.9 2.5 7.5 7.5m-1-2c.5-3.7 2.4-5.5 5.7-5.5 3.2 0 5 1.8 5.6 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className="h-8 w-8"
      aria-hidden="true"
    >
      <path
        d="m4 9 9-3 10 3 9-3v21l-9 3-10-3-9 3V9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M13 6v21m10-18v21" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M18 11.5a4.5 4.5 0 0 0-4.5 4.5c0 3 4.5 7 4.5 7s4.5-4 4.5-7a4.5 4.5 0 0 0-4.5-4.5Z"
        fill="currentColor"
      />
      <circle cx="18" cy="16" r="1.4" fill="white" />
    </svg>
  );
}

function PlanningIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className="h-8 w-8"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="7"
        width="26"
        height="24"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M11 5v5m14-5v5M5 13h26M11 19h5m-5 5h5m4-5h5m-5 5h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Ícone de documento usado no cartão de Normativas SUAS.
function NormativasIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className="h-8 w-8"
      aria-hidden="true"
    >
      <path
        d="M10 4h11l7 7v21H10a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M21 4v8h7M13 18h12M13 23h12M13 28h8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Ícone de calendário para a nova opção Agenda da SEMTEPS.
function AgendaIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className="h-8 w-8"
      aria-hidden="true"
    >
      <rect x="5" y="7" width="26" height="24" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 5v5m14-5v5M5 13h26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11 19h4m-4 5h4m4-5h6m-6 5h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// Escolhe o ícone cadastrado para o cartão ou usa a imagem correspondente.
function ServiceIcon({ service }: { service: Service }) {
  if (service.icon === "identification") return <IdentificationIcon />;
  if (service.icon === "council") return <CouncilIcon />;
  if (service.icon === "map") return <MapIcon />;
  if (service.icon === "planning") return <PlanningIcon />;
  if (service.icon === "normativas") return <NormativasIcon />;
  if (service.icon === "agenda") return <AgendaIcon />;

  if (service.image) {
    return (
      <Image
        src={service.image}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    );
  }

  return null;
}

// Página inicial: mantém a identidade visual original e apresenta os serviços em cartões responsivos.
export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f3f2ed] text-slate-900">
      {/* Cabeçalho de destaque com imagem temática integrada ao fundo. */}
      <div className="relative isolate overflow-hidden bg-[#102b27] text-white">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 left-[44%] z-0 hidden overflow-hidden lg:block"
          style={{
            clipPath: "polygon(0 0, 70% 0, 100% 100%, 29% 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 68%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, #000 68%, transparent 100%)",
          }}
        >
          <Image
            src="/assistencia-social.png"
            alt=""
            fill
            sizes="56vw"
            className="object-contain object-center"
            priority
          />
          <div className="absolute inset-0 bg-emerald-950/30 mix-blend-multiply" />
        </div>

        <header className="relative z-20 border-b border-white/10 bg-transparent text-white">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
            <Link
              href="/"
              aria-label="Página inicial"
              className="flex min-w-0 items-center gap-4"
            >
              <div className="flex h-14 w-32 shrink-0 items-center rounded-xl bg-white px-2 sm:h-16 sm:w-40">
                <Image
                  src="/log.png"
                  alt="Prefeitura de Santa Izabel do Pará"
                  width={200}
                  height={110}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>

              <div className="hidden min-w-0 border-l border-white/20 pl-4 sm:block">
                <p className="truncate text-xs font-semibold text-emerald-100/75">
                  Secretaria Municipal de Trabalho
                </p>
                <p className="truncate text-sm font-extrabold">
                  e Promoção Social{" "}
                  <span className="font-medium text-emerald-100/70">
                    / SEMTEPS
                  </span>
                </p>
              </div>
            </Link>
          </div>
        </header>

        <section className="relative z-10 text-white">
          <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.2fr_.8fr] lg:px-12 lg:py-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-lime-200/25 bg-lime-100/10 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[.2em] text-lime-100 sm:text-[11px]">
                <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_14px_rgba(190,242,100,.8)]" />
                Plataforma da Vigilância Socioassistencial
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.04] tracking-[-.04em] sm:text-5xl lg:text-6xl">
                Uma rede presente
                <span className="block text-lime-300">
                  em cada território.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-emerald-50/75 sm:text-base">
                Acesso integrado aos serviços, sistemas e informações que
                fortalecem a proteção social em Santa Izabel do Pará.
              </p>

              <a
                href="#areas"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-lime-300 px-5 py-3 text-sm font-extrabold text-[#173b2f] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#102b27]"
              >
                Explorar áreas <ArrowIcon />
              </a>
            </div>

            <div aria-hidden="true" className="hidden h-56 lg:block" />
          </div>

          <div className="h-1.5 bg-gradient-to-r from-lime-300 via-emerald-400 to-teal-400" />
        </section>
      </div>

      {/* Área principal dos cartões de acesso. */}
      <section
        id="areas"
        className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
      >
        <div className="mb-7 flex flex-col justify-between gap-5 sm:mb-9 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.22em] text-emerald-800">
              Acesso por área
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-.035em] text-[#102b27] sm:text-4xl">
              Serviços da SEMTEPS
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
              Encontre rapidamente sistemas, análises e serviços da rede
              municipal.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-2xl border border-[#dfdfd5] bg-white/75 px-4 py-3 sm:self-auto">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#102b27] text-sm font-black text-lime-300">
              {String(services.length).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold leading-4 text-slate-600">
              áreas e serviços
              <br />
              em um só painel
            </span>
          </div>
        </div>

        {/* A grade e a distribuição responsiva dos cartões permanecem iguais. */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12 xl:gap-5">
          {services.map((service, index) => {
            const tone = toneStyles[service.tone];
            const featured = index < 2;

            return (
              <article
                key={service.title}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-[#e3e4dc] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(16,43,39,.35)] transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_24px_50px_-28px_rgba(16,90,66,.45)] sm:p-6 ${
                  featured ? "xl:col-span-6" : "xl:col-span-4"
                }`}
              >
                <div
                  className={`absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full opacity-50 blur-2xl ${tone.glow}`}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div
                    className={`grid h-14 w-14 place-items-center rounded-[1.15rem] ring-1 ring-inset ${tone.icon}`}
                  >
                    <ServiceIcon service={service} />
                  </div>
                  <span className="rounded-full bg-[#f3f2ed] px-3 py-1.5 text-[10px] font-black tracking-[.16em] text-slate-500">
                    ÁREA {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative mt-5">
                  <h3 className="max-w-xl text-lg font-black leading-snug tracking-tight text-[#142e29] sm:text-xl">
                    {service.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-6 text-slate-500 ${
                      featured ? "max-w-xl" : "min-h-12"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                <div className="relative mt-5 grid gap-2.5 border-t border-[#efefe9] pt-4">
                  {/* Cada ação continua encaminhando ao login com retorno para a rota definida. */}
                  {service.analysisLinks.map((action) => (
                    <Link
                      key={`${action.href}-${action.label}`}
                      href={loginHref(action.href)}
                      aria-label={`${action.label} — entrar pelo login`}
                      className={`inline-flex min-h-11 items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-xs font-extrabold leading-5 transition duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 ${tone.link}`}
                    >
                      <span>{action.label}</span>
                      <ArrowIcon external={action.external} />
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="bg-[#102b27] text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div>
            <p className="text-sm font-extrabold">
              SEMTEPS · Santa Izabel do Pará
            </p>
            <p className="mt-1 text-xs text-emerald-100/65">
              Secretaria Municipal de Trabalho e Promoção Social
            </p>
          </div>
          <p className="text-xs text-emerald-100/65">
            Plataforma da Vigilância Socioassistencial
          </p>
        </div>
      </footer>
    </main>
  );
}
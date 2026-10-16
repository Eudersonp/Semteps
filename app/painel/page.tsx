import Image from "next/image";
import Link from "next/link";

type Service = {
  title: string;
  description: string;
  image?: string;
  icon?: "identification" | "council" | "map";
  href: string;
  external?: boolean;
  hideArrow?: boolean;
  hideServiceLink?: boolean;
  analysisLinks?: { label: string; href: string }[];
};

const services: Service[] = [
  {
    title: "CRAS",
    description: "Centro de Referência de Assistência Social",
    image: "/cras.png",
    href: "/assistencia-social/cras",
    hideArrow: true,
    hideServiceLink: true,
    analysisLinks: [
      {
        label: "Acessar análise RMA CRAS Conviver e Crescer",
        href: "/rma/cras-conviver-crescer/",
      },
      {
        label: "Acessar análise RMA CRAS Camélia Gaby",
        href: "/rma/cras-camelia-gaby/",
      },
    ],
  },
  {
    title: "CREAS",
    description: "Atendimento especializado às famílias",
    image: "/creas.png",
    href: "/rma/creas-sistema",
    hideArrow: true,
    hideServiceLink: true,
    analysisLinks: [
      {
        label: "Acessar Sistema de Indicadores CREAS",
        href: "/rma/creas-sistema",
      },
      { label: "Acessar análise RMA", href: "/rma/creas" },
    ],
  },
  {
    title: "SAMCA",
    description: "Serviços de atendimento e acompanhamento",
    image: "/samca.png",
    href: "/rma/samca",
    hideArrow: true,
    hideServiceLink: true,
    analysisLinks: [
      { label: "Acessar dados SAMCA", href: "/rma/samca" },
    ],
  },
  {
    title: "CCPI",
    description: "Centro de Convivência da Pessoa Idosa",
    image: "/ccpi.png",
    href: "/assistencia-social/ccpi",
    hideArrow: true,
    hideServiceLink: true,
    analysisLinks: [
      { label: "Acessar dados CCPI", href: "/rma/ccpi" },
    ],
  },
  {
    title: "Cadastro Único / PBF",
    description: "Informações e serviços do Cadastro Único",
    image: "/cad.png",
    href: "/cadastro-unico",
    hideArrow: true,
    hideServiceLink: true,
    analysisLinks: [
      {
        label: "Acessar dados Cadastro Único / Bolsa Família",
        href: "/rma/cad-unico",
      },
    ],
  },
  {
    title: "Sala do Trabalhador",
    description: "Serviços, oportunidades e atendimento",
    image: "/trab.png",
    href: "/rma/trabalho",
    hideArrow: true,
    hideServiceLink: true,
    analysisLinks: [
      {
        label: "Acessar dados Sala do Trabalhador",
        href: "/rma/trabalho",
      },
    ],
  },
  {
    title: "Setor Financeiro",
    description: "Gestão e acompanhamento financeiro",
    image: "/financeiro.png",
    href: "/financeiro",
    hideArrow: true,
    hideServiceLink: true,
    analysisLinks: [
      { label: "Acessar dados financeiros", href: "/rma/financeiro" },
    ],
  },
  {
    title: "Setor de Identificação Civil",
    description: "Atendimento e serviços de identificação civil",
    icon: "identification",
    href: "/identificacao-civil",
    hideArrow: true,
    hideServiceLink: true,
    analysisLinks: [
      {
        label: "Acessar análise de atendimentos",
        href: "/rma/identificacao-civil",
      },
    ],
  },
  {
    title: "Conselho Tutelar",
    description:
      "Atendimento e proteção dos direitos de crianças e adolescentes",
    icon: "council",
    href: "/conselho-tutelar",
    hideArrow: true,
    hideServiceLink: true,
    analysisLinks: [
      {
        label: "Acessar dados do Conselho Tutelar",
        href: "/rma/conselho-tutelar",
      },
    ],
  },
  {
    title: "Mapa do município",
    description: "Visualização geográfica de Santa Izabel do Pará",
    icon: "map",
    href: "/mapa",
    hideArrow: true,
    hideServiceLink: true,
    analysisLinks: [
      {
        label: "Acessar Mapa do Município",
        href: "rma/mapa",
      },
    ],
  },
  {
    title: "Sistema de Segurança Alimentar",
    description:
      "Visualização de dados e indicadores do Sistema de Segurança Alimentar",
    image: "/sisan.png",
    href: "/sisan",
    hideArrow: true,
    hideServiceLink: true,
    analysisLinks: [
      {
        label: "Acessar Sistema de Segurança Alimentar",
        href: "/rma/sisan",
      },
    ],
  },
  
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M5 12h14" strokeLinecap="round" />
      <path
        d="m13 6 6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M14 4h6v6" strokeLinecap="round" />
      <path d="M10 14 20 4" strokeLinecap="round" />
      <path
        d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5"
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
      className="h-9 w-9"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="7"
        width="29"
        height="22"
        rx="4"
        fill="#ecfeff"
        stroke="#0e7490"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="15" r="3.4" fill="#22a06b" />
      <path
        d="M6.8 24c.7-3 2.5-4.5 5.2-4.5s4.5 1.5 5.2 4.5"
        stroke="#22a06b"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M21 13h7M21 17.5h7M21 22h5"
        stroke="#0e7490"
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
      className="h-9 w-9"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="5.5"
        width="29"
        height="25"
        rx="6"
        fill="#ecfdf5"
        stroke="#15803d"
        strokeWidth="1.7"
      />
      <circle cx="13" cy="14" r="3.2" fill="#0e7490" />
      <circle cx="23" cy="14" r="3.2" fill="#22a06b" />
      <path
        d="M7.5 25c.5-3.4 2.3-5.1 5.5-5.1s5 1.7 5.5 5.1"
        stroke="#0e7490"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M17.5 25c.5-3.4 2.3-5.1 5.5-5.1s5 1.7 5.5 5.1"
        stroke="#22a06b"
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
      className="h-9 w-9"
      aria-hidden="true"
    >
      <path
        d="m4.5 9 8-3 11 3 8-3v21l-8 3-11-3-8 3V9Z"
        fill="#ecfdf5"
        stroke="#15803d"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M12.5 6v21M23.5 9v21" stroke="#15803d" strokeWidth="1.5" />
      <path
        d="M18 12.2c-2.6 0-4.6 2-4.6 4.5 0 3.1 4.6 7.2 4.6 7.2s4.6-4.1 4.6-7.2c0-2.5-2-4.5-4.6-4.5Z"
        fill="#0e7490"
      />
      <circle cx="18" cy="16.8" r="1.5" fill="white" />
    </svg>
  );
}

function ServiceIdentity({ service }: { service: Service }) {
  let icon = service.image ? (
    <Image
      src={service.image}
      alt={`Ícone do ${service.title}`}
      width={36}
      height={36}
      className="h-9 w-9 object-contain"
    />
  ) : null;

  if (service.icon === "identification") icon = <IdentificationIcon />;
  if (service.icon === "council") icon = <CouncilIcon />;
  if (service.icon === "map") icon = <MapIcon />;

  return (
    <>
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 p-2">
          {icon}
        </div>
        {!service.hideArrow && (
          <div className="rounded-full bg-slate-100 p-1.5 text-slate-400 transition group-hover:bg-green-100 group-hover:text-green-700">
            {service.external ? <ExternalIcon /> : <ArrowIcon />}
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-bold text-slate-900">{service.title}</h3>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {service.description}
        </p>
      </div>
    </>
  );
}

const cardClass =
  "group relative flex min-h-[155px] h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" aria-label="Página inicial" className="flex items-center">
            <div className="flex h-28 w-56 items-center">
              <Image
                src="/log.png"
                alt="Prefeitura de Santa Izabel do Pará"
                width={250}
                height={140}
                className="h-full w-full object-contain object-left"
                priority
              />
            </div>

            <div className="mx-6 hidden h-20 w-px bg-slate-200 md:block" />

            <div className="hidden md:block">
              <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-800">
                Secretaria Municipal de Trabalho
                <span className="block">e Promoção Social - SEMTEPS</span>
              </h1>
              <p className="mt-2 text-lg text-slate-500">
                Plataforma da Vigilância Socioassistencial
              </p>
            </div>
          </Link>

          <nav aria-label="Navegação principal">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            >
              Início
              <ArrowIcon />
            </Link>
          </nav>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 md:hidden">
          <h1 className="text-lg font-extrabold leading-tight text-slate-800">
            Secretaria Municipal de Trabalho
            <span className="block">e Promoção Social - SEMTEPS</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Plataforma da Vigilância Socioassistencial
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-green-700">
            Acesso rápido
          </p>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
            Painel de Sistemas
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Encontre rapidamente os principais equipamentos, programas e
            serviços da rede socioassistencial.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            if (service.analysisLinks?.length) {
              return (
                <article key={service.title} className={cardClass}>
                  {service.hideServiceLink ? (
                    <div className="flex flex-1 flex-col">
                      <ServiceIdentity service={service} />
                    </div>
                  ) : service.external ? (
                    <a
                      href={service.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Acessar sistema ${service.title} em uma nova aba`}
                      className="flex flex-1 flex-col rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                    >
                      <ServiceIdentity service={service} />
                      <div className="mt-auto pt-4">
                        <span className="text-[11px] font-semibold text-green-700">
                          Acessar sistema →
                        </span>
                      </div>
                    </a>
                  ) : (
                    <Link
                      href={service.href}
                      aria-label={`Acessar serviço ${service.title}`}
                      className="flex flex-1 flex-col rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                    >
                      <ServiceIdentity service={service} />
                      <div className="mt-auto pt-4">
                        <span className="text-[11px] font-semibold text-green-700">
                          Acessar serviço →
                        </span>
                      </div>
                    </Link>
                  )}

                  <div className="mt-3 grid gap-2">
                    {service.analysisLinks.map((action) => (
                      <Link
                        key={action.href}
                        href={action.href}
                        aria-label={action.label}
                        className="inline-flex min-h-10 items-center justify-between gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-[11px] font-semibold leading-5 text-green-700 transition hover:border-green-300 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                      >
                        <span>{action.label}</span>
                        <ArrowIcon />
                      </Link>
                    ))}
                  </div>
                </article>
              );
            }

            const cardContent = (
              <div className={cardClass}>
                <ServiceIdentity service={service} />
                <div className="mt-auto pt-4">
                  <span className="text-[11px] font-semibold text-green-700">
                    {service.external ? "Acessar plataforma" : "Acessar serviço"} →
                  </span>
                </div>
              </div>
            );

            if (service.external) {
              return (
                <a
                  key={service.title}
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Acessar ${service.title} em uma nova aba`}
                  className="block h-full rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <Link
                key={service.title}
                href={service.href}
                aria-label={`Acessar ${service.title}`}
                className="block h-full rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
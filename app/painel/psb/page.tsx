import Image from "next/image";
import Link from "next/link";

type SocialService = {
  title: string;
  description: string;
  href: string;
  kind: "families" | "community" | "older-adults";
  tag: string;
  hideArrow?: boolean;
  hideServiceLink?: boolean;
  analysisLinks?: { label: string; href: string }[];
};

const options: SocialService[] = [
   {
    title: "CRAS Conviver e Crescer",
    description: "Acesse a análise do RMA e os indicadores de atendimento do CRAS Conviver e Crescer.",
    href: "/rma/cras-conviver-crescer/",
    kind: "families",
    tag: "CRAS",
    hideArrow: true,
    hideServiceLink: true,
    analysisLinks: [
      {
        label: "Acessar análise RMA CRAS Conviver e Crescer",
        href: "/rma/cras-conviver-crescer/",
      },
      
    ],
  },

  {
    title: "CRAS Camélia Gaby Ferraz",
    description:
      "Consulte a análise do RMA e os dados de acompanhamento do CRAS Camélia Gaby Ferraz.",
    href: "/rma/cras-camelia-gaby/",
    kind: "community",
    tag: "CRAS",
  },
  {
    title: "Centro de Convivência da Pessoa Idosa",
    description:
      "Acesse as informações e atividades do Centro de Convivência da Pessoa Idosa.",
    href: "/assistencia-social/ccpi",
    kind: "older-adults",
    tag: "CONVIVÊNCIA",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AreaIcon({ kind }: { kind: SocialService["kind"] }) {
  if (kind === "older-adults") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8" aria-hidden="true">
        <circle cx="18" cy="14" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="17" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M8 38c.8-8 4.2-12 10-12s9.2 4 10 12M29 28c5.6 0 8.8 3.3 9.5 10M32 22v7m0 0-4 4m4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "community") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8" aria-hidden="true">
        <circle cx="17" cy="16" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="17" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M6 38c.7-7.5 4.2-11.5 11-11.5S27.3 30.5 28 38m1-10c6.8 0 10.1 3.4 11 10M8 9h5m-2.5-2.5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8" aria-hidden="true">
      <circle cx="24" cy="15" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M11 39c.8-9 5-14 13-14s12.2 5 13 14M16 33l-5 5m21-5 5 5M8 11l4 3m28-3-4 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProtecaoSocialBasicaPage() {
  return (
    <main className="min-h-screen bg-[#f3f2ed] text-slate-900">
      <header className="border-b border-white/10 bg-[#102b27] text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" aria-label="Voltar à página inicial" className="flex min-w-0 items-center gap-4">
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
              <p className="truncate text-xs font-semibold text-emerald-100/75">Secretaria Municipal de Trabalho</p>
              <p className="truncate text-sm font-extrabold">e Promoção Social <span className="font-medium text-emerald-100/70">/ SEMTEPS</span></p>
            </div>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]"
          >
            <span aria-hidden="true">←</span> Início
          </Link>
        </div>
      </header>

      <section className="bg-[#102b27] text-white">
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-9 sm:px-8 sm:pb-12 lg:px-12 lg:pt-12">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-lime-300">Rede socioassistencial · SEMTEPS</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-[-.035em] sm:text-4xl lg:text-5xl">
            Proteção Social Básica
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/75 sm:text-base">
            Acesse os serviços, análises e informações dos equipamentos de proteção social básica de Santa Izabel do Pará.
          </p>
          <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-lime-300 to-emerald-400" />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-9 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="mb-7">
          <p className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-800">Escolha um equipamento</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#102b27] sm:text-3xl">Serviços disponíveis</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Selecione uma opção para abrir a página correspondente.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {options.map((option, index) => (
            <Link
              key={option.href}
              href={option.href}
              className="group flex min-h-64 flex-col rounded-[1.5rem] border border-[#e1e3d9] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(16,43,39,.4)] transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_22px_44px_-26px_rgba(16,90,66,.4)] focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-[1.1rem] bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-100 transition group-hover:bg-emerald-100">
                  <AreaIcon kind={option.kind} />
                </div>
                <span className="rounded-full bg-[#f3f2ed] px-3 py-1.5 text-[10px] font-black tracking-[.14em] text-slate-500">
                  {option.tag} · {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-black leading-snug tracking-tight text-[#142e29]">{option.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{option.description}</p>
              </div>
              <span className="mt-auto inline-flex items-center justify-between gap-3 border-t border-[#efefe9] pt-5 text-xs font-extrabold text-emerald-800 transition group-hover:text-emerald-950">
                Acessar página <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="bg-[#102b27] text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div>
            <p className="text-sm font-extrabold">SEMTEPS · Santa Izabel do Pará</p>
            <p className="mt-1 text-xs text-emerald-100/65">Secretaria Municipal de Trabalho e Promoção Social</p>
          </div>
          <p className="text-xs text-emerald-100/65">Proteção Social Básica</p>
        </div>
      </footer>
    </main>
  );
}

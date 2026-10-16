import Image from "next/image";
import Link from "next/link";

type WorkOption = {
  title: string;
  description: string;
  kind: "registration" | "data";
  href: string;
  available: boolean;
};

// Página do sistema de registro da Sala do Trabalhador.
const REGISTRATION_SYSTEM_URL = "/rma/trabalho";

// Página de indicadores e análise do trabalho.
const WORK_DATA_URL = "/rma/dados_trabalho";

const options: WorkOption[] = [
  {
    title: "Acessar sistema de registro",
    description:
      "Registre os atendimentos e acompanhe os serviços realizados pela Sala do Trabalhador.",
    kind: "registration",
    href: REGISTRATION_SYSTEM_URL,
    available: true,
  },
  {
    title: "Acessar dados sobre trabalho",
    description:
      "Consulte indicadores e informações relacionados ao trabalho no município.",
    kind: "data",
    href: WORK_DATA_URL,
    available: true,
  },
];

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

function WorkIcon({ kind }: { kind: WorkOption["kind"] }) {
  if (kind === "data") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path
          d="M8 39h33M12 35V24h7v11m5 0V15h7v20m5 0V9h7v26"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m11 18 9-6 7 2 11-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-8 w-8"
      aria-hidden="true"
    >
      <rect
        x="10"
        y="8"
        width="28"
        height="34"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M18 8.5h12v6H18zM17 23h14m-14 7h14m-14 7h9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m18 5 2-2 2 2m6 0 2-2 2 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OptionCard({
  option,
  index,
}: {
  option: WorkOption;
  index: number;
}) {
  const cardClass = `group flex min-h-64 flex-col rounded-[1.5rem] border border-[#e1e3d9] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(16,43,39,.4)] transition duration-200 sm:p-6 ${
    option.available
      ? "hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_22px_44px_-26px_rgba(16,90,66,.4)] focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
      : "cursor-not-allowed opacity-80"
  }`;

  const contents = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div
          className={`grid h-14 w-14 place-items-center rounded-[1.1rem] text-emerald-800 ring-1 ring-inset ring-emerald-100 transition ${
            option.available
              ? "bg-emerald-50 group-hover:bg-emerald-100"
              : "bg-slate-100 text-slate-500 ring-slate-200"
          }`}
        >
          <WorkIcon kind={option.kind} />
        </div>

        <span className="rounded-full bg-[#f3f2ed] px-3 py-1.5 text-[10px] font-black tracking-[.14em] text-slate-500">
          {option.kind === "registration" ? "REGISTRO" : "INDICADORES"} ·{" "}
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-black leading-snug tracking-tight text-[#142e29]">
          {option.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {option.description}
        </p>
      </div>

      <span
        className={`mt-auto inline-flex items-center justify-between gap-3 border-t border-[#efefe9] pt-5 text-xs font-extrabold ${
          option.available
            ? "text-emerald-800 transition group-hover:text-emerald-950"
            : "text-slate-500"
        }`}
      >
        {option.available
          ? option.kind === "registration"
            ? "Acessar Sistema"
            : "Acessar informações"
          : "Endereço será configurado"}

        {option.available && (
          <ArrowIcon external={option.href.startsWith("http")} />
        )}
      </span>
    </>
  );

  if (!option.available) {
    return (
      <div
        className={cardClass}
        aria-disabled="true"
        title="Configure o endereço para habilitar este acesso"
      >
        {contents}
      </div>
    );
  }

  if (option.href.startsWith("http")) {
    return (
      <a
        href={option.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${option.title} (abre em nova aba)`}
        className={cardClass}
      >
        {contents}
      </a>
    );
  }

  return (
    <Link href={option.href} aria-label={option.title} className={cardClass}>
      {contents}
    </Link>
  );
}

export default function SalaDoTrabalhadorPage() {
  return (
    <main className="min-h-screen bg-[#f3f2ed] text-slate-900">
      <header className="border-b border-white/10 bg-[#102b27] text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <Link
            href="/"
            aria-label="Voltar à página inicial"
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

          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]"
          >
            <span aria-hidden="true">←</span> Início
          </Link>
        </div>
      </header>

      <section className="bg-[#102b27] text-white">
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-9 sm:px-8 sm:pb-12 lg:px-12 lg:pt-12">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-lime-300">
            Rede municipal · SEMTEPS
          </p>

          <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-[-.035em] sm:text-4xl lg:text-5xl">
            Sala do Trabalhador
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/75 sm:text-base">
            Acesse o sistema de registro e as informações sobre trabalho de
            Santa Izabel do Pará.
          </p>

          <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-lime-300 to-emerald-400" />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-9 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="mb-7">
          <p className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-800">
            Escolha uma opção
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#102b27] sm:text-3xl">
            Acessos disponíveis
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Selecione o serviço que deseja consultar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {options.map((option, index) => (
            <OptionCard
              key={option.kind}
              option={option}
              index={index}
            />
          ))}
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
          <p className="text-xs text-emerald-100/65">Sala do Trabalhador</p>
        </div>
      </footer>
    </main>
  );
}
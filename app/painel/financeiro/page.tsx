"use client";

import Image from "next/image";
import Link from "next/link";

type FinanceOption = {
  title: string;
  description: string;
  kind: "system" | "data";
  href: string;
};

const options: FinanceOption[] = [
  {
    title: "Acesso ao Sistema de Prestação de Contas",
    description:
      "Acesse o sistema utilizado para registrar e acompanhar a prestação de contas da SEMTEPS.",
    kind: "system",
    href: "/rma/financeiro",
  },
  {
    title: "Dados Financeiros da SEMTEPS",
    description:
      "Consulte os dados e indicadores financeiros da Secretaria Municipal de Trabalho e Promoção Social.",
    kind: "data",
    href: "/rma/dados-financeiros",
  },
];

function ArrowIcon({ left = false }: { left?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      {left ? (
        <path
          d="M19 12H5m6 6-6-6 6-6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M5 12h14m-6-6 6 6-6 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function FinanceIcon({ kind }: { kind: FinanceOption["kind"] }) {
  if (kind === "data") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path
          d="M7 40h34M11 36V25h7v11m6 0V17h7v19m6 0V9h7v27"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m10 18 9-6 7 2 12-8"
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
        x="8"
        y="7"
        width="32"
        height="35"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 7V4h16v3M15 17h18M15 24h18M15 31h11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="34"
        cy="34"
        r="7"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M34 30v8m-2-6h2.5a1.5 1.5 0 0 1 0 3H32"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OptionCard({
  option,
  index,
}: {
  option: FinanceOption;
  index: number;
}) {
  return (
    <Link
      href={option.href}
      aria-label={option.title}
      className="group flex min-h-64 flex-col rounded-[1.5rem] border border-[#e1e3d9] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(16,43,39,.4)] transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_22px_44px_-26px_rgba(16,90,66,.4)] focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-[1.1rem] bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-100 transition group-hover:bg-emerald-100">
          <FinanceIcon kind={option.kind} />
        </div>

        <span className="rounded-full bg-[#f3f2ed] px-3 py-1.5 text-[10px] font-black tracking-[.14em] text-slate-500">
          {option.kind === "system" ? "SISTEMA" : "INDICADORES"} ·{" "}
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-5">
        <h2 className="text-lg font-black leading-snug tracking-tight text-[#142e29]">
          {option.title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {option.description}
        </p>
      </div>

      <span className="mt-auto inline-flex items-center justify-between gap-3 border-t border-[#efefe9] pt-5 text-xs font-extrabold text-emerald-800 transition group-hover:text-emerald-950">
        {option.kind === "system"
          ? "Acessar Sistema"
          : "Consultar dados financeiros"}
        <ArrowIcon />
      </span>
    </Link>
  );
}

export default function SetorFinanceiroPage() {
  function handleBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.assign("/");
    }
  }

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

          <nav
            aria-label="Navegação principal"
            className="flex shrink-0 flex-col items-end gap-2"
          >
            <Link
              href="/"
              className="inline-flex h-9 w-24 items-center justify-center gap-2 rounded-full border border-white/20 px-3 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]"
            >
              Início
              <ArrowIcon />
            </Link>

            <button
              type="button"
              onClick={handleBack}
              className="inline-flex h-9 w-24 items-center justify-center gap-2 rounded-full border border-white/20 px-3 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]"
            >
              <ArrowIcon left />
              Voltar
            </button>
          </nav>
        </div>
      </header>

      <section className="bg-[#102b27] text-white">
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-9 sm:px-8 sm:pb-12 lg:px-12 lg:pt-12">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-lime-300">
            Rede municipal · SEMTEPS
          </p>

          <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-.035em] sm:text-4xl lg:text-5xl">
            Informações Financeiras da SEMTEPS
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/75 sm:text-base">
            Acesse o sistema de prestação de contas e consulte os dados
            financeiros da Secretaria.
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
            Selecione o serviço financeiro que deseja consultar.
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

          <p className="text-xs text-emerald-100/65">
            Informações Financeiras da SEMTEPS
          </p>
        </div>
      </footer>
    </main>
  );
}
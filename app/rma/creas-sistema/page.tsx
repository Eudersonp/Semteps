import Image from "next/image";
import Link from "next/link";

const sistemaCreasUrl =
  "https://creas-sistema-de-registro-de-viol-00a89639.base44.app";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
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

export default function SistemaCreasPage() {
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
              className="inline-flex h-9 w-24 items-center justify-center gap-1.5 rounded-full border border-white/20 px-2 text-xs font-semibold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]"
            >
              Início
              <ArrowIcon />
            </Link>

            <Link
              href="/painel/pse"
              className="inline-flex h-9 w-24 items-center justify-center gap-1.5 rounded-full border border-white/20 px-2 text-xs font-semibold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]"
            >
              <span aria-hidden="true" className="rotate-180">
                <ArrowIcon />
              </span>
              Voltar
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#102b27] text-white">
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-9 sm:px-8 sm:pb-12 lg:px-12 lg:pt-12">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-lime-300">
            Rede socioassistencial · SEMTEPS
          </p>

          <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-.035em] sm:text-4xl lg:text-5xl">
            Dados e Indicadores do CREAS
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/75 sm:text-base">
            Sistema de indicadores do Centro de Referência Especializado de
            Assistência Social.
          </p>

          <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-lime-300 to-emerald-400" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] space-y-5 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="overflow-hidden rounded-xl border border-[#e1e3d9] bg-white shadow-sm">
          <div className="border-b border-[#e1e3d9] px-5 py-4 sm:px-6">
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-800">
              Sistema integrado
            </p>

            <h2 className="mt-1 text-lg font-extrabold text-[#102b27]">
              RMA CREAS
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              O sistema está incorporado nesta página.
            </p>
          </div>

          <div className="bg-[#f3f2ed] p-0 sm:p-2">
            <iframe
              title="Sistema RMA CREAS"
              src={sistemaCreasUrl}
              className="h-[78vh] min-h-[600px] w-full border-0 bg-white sm:rounded-lg lg:h-[calc(100vh-260px)] lg:min-h-[720px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </section>
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
            Dados e Indicadores do CREAS
          </p>
        </div>
      </footer>
    </main>
  );
}
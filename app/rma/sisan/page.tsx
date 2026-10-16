import Image from "next/image";
import Link from "next/link";

const sistemaFinanceiroUrl = "https://gestao-fome-zero-copy-d37b72ff.base44.app";

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

export default function SetorFinanceiroPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-5 lg:px-8">
          <Link
            href="/"
            aria-label="Página inicial"
            className="flex min-w-0 items-center"
          >
            <div className="flex h-24 w-40 shrink-0 items-center sm:h-28 sm:w-56">
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
              <p className="text-2xl font-extrabold leading-tight tracking-tight text-slate-800">
                Secretaria Municipal de Trabalho
                <span className="block">e Promoção Social - SEMTEPS</span>
              </p>
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
          <p className="text-lg font-extrabold leading-tight text-slate-800">
            Secretaria Municipal de Trabalho
            <span className="block">e Promoção Social - SEMTEPS</span>
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Plataforma da Vigilância Socioassistencial
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-[1600px] space-y-5 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-green-700">
            Acesso ao sistema
          </p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
           Dados e Indicadores do SISAN
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Sistema de Indicadores para o Sistema de Segurança Alimentar e Nutricional (SISAN)
          </p>
        </div>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="text-lg font-extrabold text-slate-900">
              Dados SISAN
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              O sistema está incorporado nesta página.
            </p>
          </div>

          <div className="bg-slate-100 p-0 sm:p-2">
            <iframe
              title="Dados SISAN"
              src={sistemaFinanceiroUrl}
              className="h-[78vh] min-h-[600px] w-full border-0 bg-white sm:rounded-lg lg:h-[calc(100vh-260px)] lg:min-h-[720px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </section>
      </section>
    </main>
  );
}

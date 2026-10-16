import Image from "next/image";
import Link from "next/link";

const sistemaFinanceiroUrl = "https://conta-publica-pro.base44.app/";

function ArrowIcon({ back = false }: { back?: boolean }) {
  return back ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <path d="M19 12H5m6 6-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SetorFinanceiroPage() {
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
            <ArrowIcon back />
            Início
          </Link>
        </div>
      </header>

      <section className="bg-[#102b27] text-white">
        <div className="mx-auto max-w-[1440px] px-5 pb-9 pt-8 sm:px-8 sm:pb-11 lg:px-12 lg:pt-10">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-lime-300">
            Rede municipal · SEMTEPS
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-.035em] sm:text-4xl lg:text-5xl">
            Setor Financeiro
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/75 sm:text-base">
            Sistema de gestão e acompanhamento financeiro da Secretaria.
          </p>
          <div className="mt-7 h-1 w-24 rounded-full bg-gradient-to-r from-lime-300 to-emerald-400" />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-10">
        <div className="overflow-hidden rounded-[1.5rem] border border-[#e1e3d9] bg-white shadow-[0_12px_32px_-24px_rgba(16,43,39,.4)]">
          <div className="border-b border-[#efefe9] px-5 py-4 sm:px-7 sm:py-5">
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-800">
              Acesso ao sistema
            </p>
            <h2 className="mt-2 text-xl font-black tracking-tight text-[#102b27] sm:text-2xl">
              Sistema de Prestação de Contas
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              O sistema está incorporado nesta página.
            </p>
          </div>

          <div className="bg-slate-100 p-0 sm:p-2">
            <iframe
              title="Sistema do Setor Financeiro"
              src={sistemaFinanceiroUrl}
              className="block h-[78vh] min-h-[600px] w-full border-0 bg-white sm:rounded-lg lg:h-[calc(100vh-260px)] lg:min-h-[720px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
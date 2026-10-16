import Image from "next/image";
import Link from "next/link";

const salaDoTrabalhadorUrl = "https://conecta-trabalho-pro.base44.app/";

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

export default function DadosSalaDoTrabalhadorPage() {
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
              <p className="truncate text-sm font-extrabold">
                e Promoção Social <span className="font-medium text-emerald-100/70">/ SEMTEPS</span>
              </p>
            </div>
          </Link>
          <Link
            href="/painel/trabalho"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]"
          >
            <span aria-hidden="true">←</span> Voltar
          </Link>
        </div>
      </header>

      <section className="bg-[#102b27] text-white">
        <div className="mx-auto max-w-[1440px] px-5 pb-9 pt-8 sm:px-8 sm:pb-11 lg:px-12 lg:pt-10">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-lime-300">
            Sala do Trabalhador · SEMTEPS
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-.035em] sm:text-4xl lg:text-5xl">
            Dados da Sala do Trabalhador
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/75 sm:text-base">
            Sistema de registro e consulta de informações sobre trabalho.
          </p>
          <div className="mt-7 h-1 w-24 rounded-full bg-gradient-to-r from-lime-300 to-emerald-400" />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-800">Acesso ao sistema</p>
            <h2 className="mt-2 text-xl font-black tracking-tight text-[#102b27] sm:text-2xl">
              Sistema de indicadores
            </h2>
          </div>
          <span className="rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-[10px] font-bold text-emerald-800">
            Conteúdo incorporado
          </span>
        </div>

        <section className="overflow-hidden rounded-[1.35rem] border border-[#e1e3d9] bg-white shadow-[0_16px_44px_-30px_rgba(16,43,39,.42)]">
          <div className="border-b border-[#efefe9] px-4 py-4 sm:px-6">
            <h3 className="text-base font-extrabold text-[#142e29] sm:text-lg">
              Sistema da Sala do Trabalhador
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Use o painel abaixo para consultar os dados disponíveis.
            </p>
          </div>
          <div className="bg-[#e9e9e3] p-1.5 sm:p-3">
            <iframe
              title="Sistema de indicadores da Sala do Trabalhador"
              src={salaDoTrabalhadorUrl}
              className="h-[76vh] min-h-[560px] w-full rounded-lg border-0 bg-white sm:min-h-[680px] lg:h-[calc(100vh-285px)] lg:min-h-[700px]"
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
            <p className="text-sm font-extrabold">SEMTEPS · Santa Izabel do Pará</p>
            <p className="mt-1 text-xs text-emerald-100/65">
              Secretaria Municipal de Trabalho e Promoção Social
            </p>
          </div>
          <p className="text-xs text-emerald-100/65">Dados da Sala do Trabalhador</p>
        </div>
      </footer>
    </main>
  );
}

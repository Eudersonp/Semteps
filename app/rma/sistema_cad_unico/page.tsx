import Image from "next/image";
import Link from "next/link";

const sistemaCadastroUrl = "https://rma-data-flow.base44.app/";

function ArrowIcon({ left = false }: { left?: boolean }) {
  return left ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M19 12H5m6 6-6-6 6-6"
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

export default function SistemaCadastroUnicoPage() {
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

          <nav aria-label="Navegação principal">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]"
            >
              <ArrowIcon left />
              Início
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#102b27] text-white">
        <div className="mx-auto max-w-[1440px] px-5 pb-9 pt-8 sm:px-8 sm:pb-11 lg:px-12 lg:pt-10">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-lime-300">
            Rede municipal · SEMTEPS
          </p>

          <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-.035em] sm:text-4xl lg:text-5xl">
            Cadastro Único / Programa Bolsa Família
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/75 sm:text-base">
            Sistema de registro e consulta integrado à Plataforma da Vigilância
            Socioassistencial.
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
              Sistema Cadastro Único / PBF
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              O aplicativo está incorporado abaixo. Use o próprio quadro para
              acessar o sistema.
            </p>
          </div>

          <div className="bg-[#f3f2ed] p-2 sm:p-4">
            <iframe
              title="Sistema do Cadastro Único e Programa Bolsa Família"
              src={sistemaCadastroUrl}
              className="block h-[78vh] min-h-[650px] w-full rounded-xl border border-[#e1e3d9] bg-white lg:h-[calc(100vh-290px)] lg:min-h-[720px]"
              loading="eager"
              allowFullScreen
              referrerPolicy="strict-origin"
            />
          </div>
        </div>

        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-950">
          Se o sistema não carregar dentro do quadro, o Base44 precisa permitir
          a incorporação em iframe para o domínio deste painel. Essa autorização
          é configurada nas opções de segurança do aplicativo.
        </p>
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

          <Link
            href="/cadastro-unico-pbf"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-100/80 transition hover:text-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300"
          >
            Voltar às opções
            <ArrowIcon left />
          </Link>
        </div>
      </footer>
    </main>
  );
}
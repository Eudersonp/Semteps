import Image from "next/image";
import Link from "next/link";

const mapEmbedUrl =
  "https://www.google.com/maps/d/u/0/embed?mid=1RTfwf1S4E9FI8ucL0y0NLwVC58wBAXM&ehbc=2E312F";

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
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MapaMunicipioPage() {
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
                <span className="font-medium text-emerald-100/70">/ SEMTEPS</span>
              </p>
            </div>
          </Link>

          <nav aria-label="Navegação principal">
            <Link
              href="/"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]"
            >
              <span aria-hidden="true">←</span> Início
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#102b27] text-white">
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-9 sm:px-8 sm:pb-12 lg:px-12 lg:pt-12">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-lime-300">
            Vigilância Socioassistencial · SEMTEPS
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-[-.035em] sm:text-4xl lg:text-5xl">
            Mapa do município
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/75 sm:text-base">
            Santa Izabel do Pará · Mapa interativo
          </p>
          <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-lime-300 to-emerald-400" />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <section className="overflow-hidden rounded-[1.5rem] border border-[#e1e3d9] bg-white shadow-[0_12px_32px_-24px_rgba(16,43,39,.4)]">
          <div className="border-b border-[#efefe9] px-5 py-4 sm:px-7 sm:py-5">
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-800">
              Mapa territorial
            </p>
            <h2 className="mt-2 text-xl font-black tracking-tight text-[#102b27] sm:text-2xl">
              Mapa interativo de Santa Izabel do Pará
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Use os controles do mapa para navegar, ampliar e consultar as
              informações disponíveis.
            </p>
          </div>

          <div className="bg-[#f3f2ed] p-2 sm:p-4">
            <iframe
              title="Mapa interativo de Santa Izabel do Pará"
              src={mapEmbedUrl}
              className="h-[75vh] min-h-[560px] w-full rounded-xl border border-[#e1e3d9] bg-white lg:h-[calc(100vh-300px)] lg:min-h-[700px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <p className="mt-4 text-xs leading-6 text-slate-500">
          O mapa interativo é carregado nesta página pelo Google My Maps.
        </p>
      </section>

      <footer className="bg-[#102b27] text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div>
            <p className="text-sm font-extrabold">SEMTEPS · Santa Izabel do Pará</p>
            <p className="mt-1 text-xs text-emerald-100/65">
              Secretaria Municipal de Trabalho e Promoção Social
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-100/80 transition hover:text-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300"
          >
            Voltar ao painel <ArrowIcon />
          </Link>
        </div>
      </footer>
    </main>
  );
}

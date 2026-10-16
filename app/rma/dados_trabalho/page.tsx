import Image from "next/image";
import Link from "next/link";

const ibgeCityUrl =
  "https://www.ibge.gov.br/cidades-e-estados/pa/santa-izabel-do-para.html";
const ibgePanoramaUrl = "https://censo2022.ibge.gov.br/panorama/";
const ibgeLaborUrl =
  "https://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/44879-pnad-continua-taxa-de-desocupacao-e-de-5-6-e-taxa-de-subutilizacao-e-de-13-9-no-trimestre-encerrado-em-setembro";
const mteProfileUrl =
  "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/acoes-e-programas/programas-projetos-acoes-obras-e-atividades/estatisticas-trabalho/perfil-do-municipio";
const mteIsperUrl =
  "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/acoes-e-programas/programas-projetos-acoes-obras-e-atividades/estatisticas-trabalho/isper-dados-por-municipio";
const dieeseUrl =
  "https://www.dieese.org.br/boletimdeconjuntura/2026/boletimconjuntura52/index.html?page=1";

const localSnapshot = [
  { label: "Pessoas cadastradas", value: "178", detail: "registros no sistema municipal" },
  { label: "Empresas cadastradas", value: "33", detail: "registros no sistema municipal" },
  { label: "Anúncios de vagas abertos", value: "11", detail: "registros listados em 15/10/2026" },
  { label: "Oportunidades anunciadas", value: "43", detail: "soma das quantidades informadas nas 11 vagas" },
];

const vacancyTimeline = [
  { month: "Julho", listings: 6, positions: 15 },
  { month: "Agosto", listings: 1, positions: 1 },
  { month: "Setembro", listings: 1, positions: 2 },
  { month: "Outubro*", listings: 3, positions: 25 },
];

const recommendations = [
  {
    title: "Atualizar e validar as vagas",
    text: "Confirmar semanalmente com cada empregador se a vaga continua aberta. Oito dos 11 anúncios do relatório tinham data anterior a outubro; registrar encerramento, motivo e data da atualização.",
  },
  {
    title: "Acompanhar o percurso até a contratação",
    text: "Registrar inscrição, encaminhamento, entrevista, resultado e contratação. Os campos de encaminhamentos e contratações aparecem zerados no relatório, o que indica ausência de registros no sistema, não comprova que nenhuma contratação ocorreu.",
  },
  {
    title: "Qualificar o cadastro e proteger os dados",
    text: "Revisar duplicidades e campos incompletos, definir prazo de validade dos cadastros e publicar apenas indicadores agregados. Não exibir nomes, CPFs, telefones ou outros dados pessoais no painel público.",
  },
  {
    title: "Planejar cursos a partir da demanda real",
    text: "Cruzar as ocupações solicitadas pelos empregadores com as habilidades dos trabalhadores e ofertar cursos em parceria com instituições de formação. O relatório apresenta um curso registrado, então é importante conferir se o catálogo está atualizado.",
  },
  {
    title: "Construir uma série municipal comparável",
    text: "Acompanhar mensalmente admissões, desligamentos, saldo e remuneração de admissão do Novo Caged; complementar com estoque e perfil ocupacional da RAIS. Separar sempre emprego formal de ocupação total e trabalho informal.",
  },
];

function ArrowIcon({ back = false }: { back?: boolean }) {
  return back ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <path d="M19 12H5m6 6-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="rounded-[1.35rem] border border-[#e1e3d9] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(16,43,39,.4)] sm:p-6">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-black tracking-tight text-[#102b27]">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p>
    </article>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mb-6">
      <p className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-800">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-[#102b27] sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

export default function DadosDoTrabalhoPage() {
  return (
    <main className="min-h-screen bg-[#f3f2ed] text-slate-900">
      <header className="border-b border-white/10 bg-[#102b27] text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" aria-label="Página inicial" className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-32 shrink-0 items-center rounded-xl bg-white px-2 sm:h-16 sm:w-40">
              <Image src="/log.png" alt="Prefeitura de Santa Izabel do Pará" width={200} height={110} className="h-full w-full object-contain" priority />
            </div>
            <div className="hidden min-w-0 border-l border-white/20 pl-4 sm:block">
              <p className="truncate text-xs font-semibold text-emerald-100/75">Secretaria Municipal de Trabalho</p>
              <p className="truncate text-sm font-extrabold">e Promoção Social <span className="font-medium text-emerald-100/70">/ SEMTEPS</span></p>
            </div>
          </Link>
          <nav aria-label="Navegação da página" className="flex shrink-0 items-center gap-2">
            <Link href="/sala-do-trabalhador" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-2.5 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27] sm:px-4">
              <ArrowIcon back /> Voltar
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27] sm:px-4">
              Início <ArrowIcon />
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#102b27] text-white">
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-9 sm:px-8 sm:pb-12 lg:px-12 lg:pt-12">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-lime-300">Vigilância socioassistencial · SEMTEPS</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-.035em] sm:text-4xl lg:text-5xl">Panorama do Trabalho</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-emerald-50/75 sm:text-base">
            Indicadores municipais, registros da Sala do Trabalhador e uma leitura orientada para apoiar políticas de emprego, renda e qualificação em Santa Izabel do Pará.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-emerald-50/75">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Atualização dos registros locais: 15 out. 2026</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Fontes externas com períodos próprios</span>
          </div>
          <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-lime-300 to-emerald-400" />
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] space-y-12 px-5 py-9 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <section aria-labelledby="municipio-title">
          <SectionHeading eyebrow="Contexto municipal · IBGE" title="Santa Izabel do Pará em números" text="Os indicadores censitários ajudam a dimensionar o território e a renda. Eles não medem, por si só, desemprego nem o total de pessoas procurando trabalho." />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="População estimada" value="80.039" detail="habitantes · estimativa IBGE 2026" />
            <MetricCard label="População do Censo 2022" value="73.019" detail="pessoas recenseadas · IBGE" />
            <MetricCard label="Renda domiciliar per capita" value="R$ 914,02" detail="Censo 2022 · valor mensal de referência do panorama" />
            <MetricCard label="PIB per capita" value="R$ 25.036,57" detail="2023 · valor econômico por habitante, não salário" />
          </div>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950">
            <strong>Como interpretar a renda:</strong> R$ 914,02 é renda domiciliar por pessoa, não salário individual nem remuneração de quem está empregado. O PIB per capita também não representa quanto cada morador recebe.
          </div>
        </section>

        <section aria-labelledby="sala-title">
          <SectionHeading eyebrow="Registros administrativos · Sala do Trabalhador" title="Atendimento e oportunidades cadastradas" text="Retrato do relatório gerencial Conecta Trabalho anexado, emitido em 15/10/2026 sem filtros. São registros do serviço municipal, não uma pesquisa amostral da população." />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {localSnapshot.map((metric) => <MetricCard key={metric.label} {...metric} />)}
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <article className="rounded-[1.35rem] border border-[#e1e3d9] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(16,43,39,.4)] sm:p-6">
              <div className="mb-5">
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-800">Vagas do relatório por mês de abertura</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Barras representam quantidade de oportunidades anunciadas; o número ao lado indica anúncios.</p>
              </div>
              <div className="space-y-4">
                {vacancyTimeline.map((item) => (
                  <div key={item.month} className="grid grid-cols-[72px_1fr_78px] items-center gap-3">
                    <span className="text-xs font-bold text-slate-700">{item.month}</span>
                    <div className="h-3 overflow-hidden rounded-full bg-[#eeefe9]" role="img" aria-label={`${item.positions} oportunidades em ${item.month}`}>
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-700 to-lime-500" style={{ width: `${(item.positions / 25) * 100}%` }} />
                    </div>
                    <span className="text-right text-xs font-extrabold text-[#102b27]">{item.positions} vagas <span className="font-medium text-slate-500">· {item.listings} anúncios</span></span>
                  </div>
                ))}
              </div>
              <p className="mt-5 border-t border-[#efefe9] pt-4 text-xs leading-5 text-slate-500">* Outubro considera registros disponíveis até 15/10/2026. As 43 oportunidades são a soma dos quantitativos indicados nos anúncios, e não 43 vagas confirmadas como ainda abertas.</p>
            </article>

            <article className="rounded-[1.35rem] border border-[#e1e3d9] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(16,43,39,.4)] sm:p-6">
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-800">Pontos de acompanhamento</p>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl bg-[#f3f2ed] p-4">
                  <p className="text-sm font-extrabold text-[#102b27]">8 de 11 anúncios eram anteriores a outubro</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">Verificar com as empresas se permanecem abertos e atualizar o status no sistema.</p>
                </div>
                <div className="rounded-xl bg-[#f3f2ed] p-4">
                  <p className="text-sm font-extrabold text-[#102b27]">Encaminhamentos e contratações: zero registros</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">O relatório não documenta resultados do fluxo. Isso pode indicar falta de registro, e não necessariamente ausência de encaminhamentos ou admissões.</p>
                </div>
                <div className="rounded-xl bg-[#f3f2ed] p-4">
                  <p className="text-sm font-extrabold text-[#102b27]">1 atendimento e 1 curso listados</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">Conferir se o período do relatório está completo e se atendimentos e cursos estão sendo lançados regularmente.</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section aria-labelledby="dieese-title">
          <SectionHeading eyebrow="Referência de contexto · IBGE e DIEESE" title="O cenário nacional não é uma taxa municipal" text="Indicadores nacionais ajudam a situar tendências de emprego, informalidade e qualidade da inserção. Eles contextualizam a análise, mas não podem ser atribuídos diretamente a Santa Izabel do Pará." />
          <div className="grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
            <article className="rounded-[1.35rem] bg-[#102b27] p-6 text-white shadow-[0_18px_44px_-30px_rgba(16,43,39,.8)]">
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-lime-300">Brasil · trimestre encerrado em setembro de 2025</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xl font-black">5,6%</p>
                  <p className="mt-1 text-xs leading-5 text-emerald-50/70">taxa de desocupação nacional · IBGE/PNAD Contínua</p>
                </div>
                <div>
                  <p className="text-3xl font-black">37,8%</p>
                  <p className="mt-1 text-xs leading-5 text-emerald-50/70">taxa de informalidade nacional no mesmo trimestre</p>
                </div>
              </div>
              <a href={ibgeLaborUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-lime-300 underline decoration-lime-300/40 underline-offset-4 hover:text-white">Consultar dados do IBGE <ArrowIcon /></a>
            </article>
            <article className="rounded-[1.35rem] border border-[#e1e3d9] bg-white p-6 shadow-[0_12px_32px_-24px_rgba(16,43,39,.4)]">
              <h3 className="text-lg font-black text-[#102b27]">Leitura do DIEESE para a gestão</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">A análise do DIEESE sobre 2025 registra melhora em indicadores agregados do mercado de trabalho, mas aponta limites persistentes na qualidade da inserção, como informalidade, baixos rendimentos e rotatividade. Isso reforça que reduzir a desocupação não basta: a política municipal também deve acompanhar formalização, remuneração e permanência no emprego.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">A taxa nacional de desocupação e a taxa de informalidade apresentadas ao lado não medem o município. Da mesma forma, não compare diretamente renda domiciliar per capita do Censo (R$ 914,02 em 2022) com rendimento médio do trabalho nacional: os conceitos, períodos e populações são diferentes. Para medir a dinâmica local, use RAIS e Novo Caged e mantenha os indicadores com suas definições e datas.</p>
            </article>
          </div>
        </section>

        <section aria-labelledby="analysis-title">
          <SectionHeading eyebrow="Análise aplicada" title="O que os dados indicam" text="A leitura a seguir combina a fotografia do sistema municipal com as referências censitárias e de conjuntura, sem transformar cadastros administrativos em estimativas de desemprego." />
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-[1.35rem] border border-emerald-100 bg-emerald-50 p-5 sm:p-6">
              <h3 className="text-base font-black text-emerald-950">Há demanda registrada, mas o resultado não está sendo medido</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-950/80">O relatório reúne 178 pessoas cadastradas e 11 anúncios de vagas, mas não informa encaminhamentos nem contratações. Sem registrar cada etapa, a gestão não consegue estimar quantas pessoas foram atendidas, quantas chegaram à entrevista ou quais vagas foram preenchidas.</p>
            </article>
            <article className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-5 sm:p-6">
              <h3 className="text-base font-black text-amber-950">A validade das oportunidades precisa ser confirmada</h3>
              <p className="mt-2 text-sm leading-6 text-amber-950/80">Oito anúncios têm data de abertura anterior a outubro, enquanto três foram cadastrados em 14/10. Como todos aparecem como abertos no relatório, a equipe deve confirmar a situação diretamente com os empregadores antes de divulgar ou encaminhar candidatos.</p>
            </article>
            <article className="rounded-[1.35rem] border border-sky-100 bg-sky-50 p-5 sm:p-6">
              <h3 className="text-base font-black text-sky-950">A escala de renda merece atenção no desenho das ações</h3>
              <p className="mt-2 text-sm leading-6 text-sky-950/80">A renda domiciliar per capita de R$ 914,02 do Censo 2022 é um indicador de contexto socioeconômico. Para orientar qualificação e intermediação, precisa ser combinada com dados de remuneração local, perfil ocupacional e barreiras de acesso — sem tratar o valor como salário médio.</p>
            </article>
            <article className="rounded-[1.35rem] border border-violet-100 bg-violet-50 p-5 sm:p-6">
              <h3 className="text-base font-black text-violet-950">Os indicadores atuais ainda não descrevem o mercado inteiro</h3>
              <p className="mt-2 text-sm leading-6 text-violet-950/80">O cadastro da Sala representa usuários e empresas registrados no serviço. Ele não cobre automaticamente trabalhadores informais, autônomos sem cadastro, pessoas que não procuraram o serviço nem todo o estoque de empregos formais da cidade.</p>
            </article>
          </div>
        </section>

        <section aria-labelledby="recommendations-title">
          <SectionHeading eyebrow="Encaminhamentos" title="Recomendações para a gestão" text="Medidas práticas para transformar os registros atuais em monitoramento contínuo, útil para trabalhadores, empregadores e planejamento municipal." />
          <div className="grid gap-3 lg:grid-cols-2">
            {recommendations.map((item, index) => (
              <article key={item.title} className="flex gap-4 rounded-2xl border border-[#e1e3d9] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(16,43,39,.35)]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-xs font-black text-emerald-800">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-sm font-black text-[#102b27]">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="sources-title" className="rounded-[1.5rem] border border-[#e1e3d9] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(16,43,39,.4)] sm:p-7">
          <SectionHeading eyebrow="Fontes e metodologia" title="Fontes consultadas" text="Os anos de referência são exibidos junto aos indicadores. Atualize os dados periodicamente antes de usar esta página como diagnóstico oficial." />
          <ul className="grid gap-3 text-sm sm:grid-cols-2">
            <li><a className="font-bold text-emerald-800 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950" href={ibgeCityUrl} target="_blank" rel="noreferrer">IBGE Cidades e Estados — Santa Izabel do Pará</a><p className="mt-1 text-xs leading-5 text-slate-500">População censitária e estimada, área territorial e PIB per capita.</p></li>
            <li><a className="font-bold text-emerald-800 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950" href={ibgePanoramaUrl} target="_blank" rel="noreferrer">IBGE — Panorama do Censo 2022</a><p className="mt-1 text-xs leading-5 text-slate-500">Renda domiciliar per capita municipal; referência consultada no material anexado.</p></li>
            <li><a className="font-bold text-emerald-800 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950" href={mteProfileUrl} target="_blank" rel="noreferrer">MTE — Perfil do Município</a><p className="mt-1 text-xs leading-5 text-slate-500">Base de CAGED com recortes municipais e por atividade, ocupação e salário de admissão.</p></li>
            <li><a className="font-bold text-emerald-800 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950" href={mteIsperUrl} target="_blank" rel="noreferrer">MTE — ISPER por município</a><p className="mt-1 text-xs leading-5 text-slate-500">Acesso a dados recentes da RAIS e do CAGED municipal.</p></li>
            <li><a className="font-bold text-emerald-800 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950" href={ibgeLaborUrl} target="_blank" rel="noreferrer">IBGE — PNAD Contínua, trimestre encerrado em setembro de 2025</a><p className="mt-1 text-xs leading-5 text-slate-500">Taxas nacionais de desocupação e informalidade, não municipais.</p></li>
            <li><a className="font-bold text-emerald-800 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950" href={dieeseUrl} target="_blank" rel="noreferrer">DIEESE — Boletim de Conjuntura</a><p className="mt-1 text-xs leading-5 text-slate-500">Análise de emprego, renda e qualidade da inserção no contexto brasileiro; não estima indicadores para Santa Izabel do Pará.</p></li>
            <li><span className="font-bold text-slate-800">Conecta Trabalho — relatório gerencial anexado</span><p className="mt-1 text-xs leading-5 text-slate-500">Snapshot emitido em 15/10/2026, sem filtros. Foram usados apenas totais agregados; os dados pessoais do relatório não foram reproduzidos.</p></li>
          </ul>
          <p className="mt-5 border-t border-[#efefe9] pt-4 text-xs leading-5 text-slate-500">Nota: a taxa de desemprego municipal não é calculada a partir dos 178 cadastros do serviço. Para estimar desemprego e informalidade no município, é necessário usar fonte estatística com metodologia e amostra apropriadas; RAIS e Novo Caged medem principalmente o emprego formal.</p>
        </section>
      </div>

      <footer className="bg-[#102b27] text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div><p className="text-sm font-extrabold">SEMTEPS · Santa Izabel do Pará</p><p className="mt-1 text-xs text-emerald-100/65">Vigilância Socioassistencial · Trabalho e renda</p></div>
          <p className="text-xs text-emerald-100/65">Página de análise · revisão dos dados em 15/10/2026</p>
        </div>
      </footer>
    </main>
  );
}

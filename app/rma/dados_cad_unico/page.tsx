import Image from "next/image";
import Link from "next/link";

const sourceUrl =
  "https://aplicacoes.cidadania.gov.br/ri/ri/relatorios/cidadania/?codigo=150650&aM=0";

type BarDatum = {
  label: string;
  value: number;
  total: number;
  color?: string;
};

function ArrowIcon({ left = false }: { left?: boolean }) {
  return left ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
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
      className="h-4 w-4"
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

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="rounded-2xl border border-[#e1e3d9] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(16,43,39,.4)]">
      <p className="text-[10px] font-black uppercase tracking-[.16em] text-emerald-800">
        {label}
      </p>
      <p className="mt-3 text-3xl font-black tracking-tight text-[#102b27]">
        {value}
      </p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p>
    </article>
  );
}

function BarList({ data }: { data: BarDatum[] }) {
  return (
    <div className="space-y-4">
      {data.map((item) => {
        const percentage =
          item.total > 0 ? (item.value / item.total) * 100 : 0;

        return (
          <div key={item.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
              <span className="font-semibold text-slate-700">
                {item.label}
              </span>
              <span className="shrink-0 font-black tabular-nums text-[#102b27]">
                {item.value.toLocaleString("pt-BR")}{" "}
                <span className="font-medium text-slate-500">
                  ({percentage.toFixed(1).replace(".", ",")}%)
                </span>
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${
                  item.color ?? "bg-emerald-700"
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <p className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-800">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-[#102b27] sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

const traditionalGroups = [
  ["Agricultores familiares", "1.700", "1.072"],
  ["Quilombolas", "356", "203"],
  ["Pessoas em situação de rua", "157", "100"],
  ["Catadores de material reciclável", "72", "53"],
  ["Pescadores artesanais", "15", "13"],
  ["Ribeirinhos", "36", "21"],
  ["Extrativistas", "36", "21"],
  ["Assentados da Reforma Agrária", "1", "1"],
  ["Desalojados", "1", "1"],
  ["Pessoas ciganas", "2", "2"],
  ["Pessoas privadas de liberdade", "2", "2"],
];

const transfers = [
  ["Gestão (IGD/PBF)", "R$ 289.987,17"],
  ["Programas", "R$ 114.520,67"],
  ["Serviços", "R$ 339.927,21"],
  ["SIGTV - custeio", "R$ 100.000,00"],
];

export default function DadosCadastroUnicoPage() {
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
              className="inline-flex h-9 w-28 items-center justify-center gap-2 rounded-full bg-lime-300 px-3 text-xs font-extrabold text-[#173b2f] transition hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Início
              <ArrowIcon />
            </Link>

            <Link
              href="/painel/cad_unico"
              className="inline-flex h-9 w-28 items-center justify-center gap-2 rounded-full border border-white/20 px-3 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]"
            >
              <ArrowIcon left />
              Voltar
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#102b27] text-white">
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-9 sm:px-8 sm:pb-12 lg:px-12 lg:pt-12">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-lime-300">
            Vigilância Socioassistencial · SEMTEPS
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-.035em] sm:text-4xl lg:text-5xl">
            Cadastro Único e Bolsa Família
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-emerald-50/75 sm:text-base">
            Panorama municipal de Santa Izabel do Pará, com indicadores de
            setembro de 2026 e referências complementares do relatório do MDS.
          </p>
          <div className="mt-7 flex flex-wrap gap-2 text-[11px] font-bold text-emerald-50/80">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
              Relatório emitido em 15/10/2026
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
              Município: Santa Izabel do Pará · PA
            </span>
          </div>
          <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-lime-300 to-emerald-400" />
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] space-y-12 px-5 py-9 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <section>
          <SectionHeading
            eyebrow="Resumo municipal"
            title="Indicadores principais"
            description="As referências variam conforme o indicador. O mês ou ano-base está indicado em cada cartão."
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="População estimada"
              value="80.039"
              detail="Estimativa IBGE 2026; população do Censo 2022: 73.019."
            />
            <StatCard
              label="Famílias no Cadastro Único"
              value="16.338"
              detail="Referência: setembro de 2026."
            />
            <StatCard
              label="Pessoas no Cadastro Único"
              value="38.938"
              detail="Referência: setembro de 2026."
            />
            <StatCard
              label="Famílias no Bolsa Família"
              value="8.787"
              detail="23.152 pessoas beneficiadas em setembro de 2026."
            />
            <StatCard
              label="Repasse mensal do PBF"
              value="R$ 5,90 mi"
              detail="R$ 5.900.090 em setembro de 2026; benefício médio de R$ 671,46."
            />
            <StatCard
              label="Famílias em situação de pobreza"
              value="7.846"
              detail="48,0% das famílias cadastradas, segundo as categorias do relatório."
            />
            <StatCard
              label="Famílias em baixa renda"
              value="3.933"
              detail="24,1% das famílias cadastradas, segundo as categorias do relatório."
            />
            <StatCard
              label="Beneficiários do BPC"
              value="3.109"
              detail="Referência: agosto de 2026; 1.863 pessoas com deficiência e 1.246 idosos."
            />
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[1.5rem] border border-[#e1e3d9] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(16,43,39,.4)] sm:p-7">
            <SectionHeading
              eyebrow="Cadastro Único · setembro/2026"
              title="Perfil de renda das famílias"
              description="Distribuição das 16.338 famílias cadastradas, conforme as faixas apresentadas no relatório."
            />
            <BarList
              data={[
                {
                  label: "Em situação de pobreza",
                  value: 7846,
                  total: 16338,
                  color: "bg-emerald-800",
                },
                {
                  label: "Em situação de baixa renda",
                  value: 3933,
                  total: 16338,
                  color: "bg-teal-600",
                },
                {
                  label: "Renda per capita acima de ½ salário mínimo",
                  value: 4559,
                  total: 16338,
                  color: "bg-lime-600",
                },
              ]}
            />
            <div className="mt-5 rounded-xl bg-[#f3f2ed] p-4 text-sm leading-6 text-slate-700">
              <strong className="text-[#102b27]">Leitura:</strong> pobreza e
              baixa renda somam 11.779 famílias, cerca de 72,1% do total
              cadastrado. Esse resultado descreve os registros do Cadastro
              Único; não deve ser interpretado como estimativa de prevalência
              para toda a população municipal.
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-[#e1e3d9] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(16,43,39,.4)] sm:p-7">
            <SectionHeading
              eyebrow="Bolsa Família · setembro/2026"
              title="Composição dos benefícios"
              description="O total de 42.886 benefícios corresponde à soma dos componentes listados no relatório; uma família ou pessoa pode receber mais de um componente."
            />
            <BarList
              data={[
                {
                  label: "Renda de Cidadania (BRC)",
                  value: 23146,
                  total: 42886,
                  color: "bg-emerald-800",
                },
                {
                  label: "Complementares (BCO)",
                  value: 8298,
                  total: 42886,
                  color: "bg-teal-600",
                },
                {
                  label: "Variáveis familiares (BFV)",
                  value: 7526,
                  total: 42886,
                  color: "bg-lime-600",
                },
                {
                  label: "Primeira Infância (BPI)",
                  value: 3916,
                  total: 42886,
                  color: "bg-amber-500",
                },
              ]}
            />

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs font-bold text-emerald-900">
                  Variáveis para crianças
                </p>
                <p className="mt-1 text-xl font-black text-emerald-900">
                  5.577
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs font-bold text-emerald-900">
                  Adolescentes
                </p>
                <p className="mt-1 text-xl font-black text-emerald-900">
                  1.487
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs font-bold text-emerald-900">
                  Gestantes
                </p>
                <p className="mt-1 text-xl font-black text-emerald-900">
                  310
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs font-bold text-emerald-900">Nutrizes</p>
                <p className="mt-1 text-xl font-black text-emerald-900">
                  152
                </p>
              </div>
            </div>
          </article>
        </section>

        <section>
          <SectionHeading
            eyebrow="Condicionalidades"
            title="Acompanhamento de educação e saúde"
            description="Os resultados são de ciclos distintos: educação em julho de 2026 e saúde em junho de 2026. Cobertura de acompanhamento e cumprimento da condicionalidade são medidas diferentes."
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-[1.5rem] border border-[#e1e3d9] bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-800">
                    Educação · julho/2026
                  </p>
                  <h3 className="mt-2 text-xl font-black text-[#102b27]">
                    Faixa de 4 a 17 anos
                  </h3>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-900">
                  Cobertura 98,36%
                </span>
              </div>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[540px] text-left text-sm">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="pb-3 pr-4">Faixa etária</th>
                      <th className="pb-3 pr-4">Público</th>
                      <th className="pb-3 pr-4">Acompanhados</th>
                      <th className="pb-3">Cumprimento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 pr-4 font-semibold">4–5 anos</td>
                      <td className="py-3 pr-4">1.403</td>
                      <td className="py-3 pr-4">1.365 (97,29%)</td>
                      <td className="py-3 font-bold">100,00%</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold">6–15 anos</td>
                      <td className="py-3 pr-4">6.092</td>
                      <td className="py-3 pr-4">6.032 (99,02%)</td>
                      <td className="py-3 font-bold">100,00%</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold">16–17 anos</td>
                      <td className="py-3 pr-4">1.449</td>
                      <td className="py-3 pr-4">1.400 (96,62%)</td>
                      <td className="py-3 font-bold">99,79%</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="py-3 pr-4 font-black">Total</td>
                      <td className="py-3 pr-4 font-black">8.944</td>
                      <td className="py-3 pr-4 font-black">
                        8.797 (98,36%)
                      </td>
                      <td className="py-3 font-black">99,97%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                8.794 pessoas cumpriram a frequência exigida; 3 adolescentes
                de 16–17 anos não constam entre os que cumpriram.
              </p>
            </article>

            <article className="rounded-[1.5rem] border border-[#e1e3d9] bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-800">
                    Saúde · junho/2026
                  </p>
                  <h3 className="mt-2 text-xl font-black text-[#102b27]">
                    Públicos acompanhados
                  </h3>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-900">
                  Cobertura geral 90,71%
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex justify-between gap-3">
                    <span className="font-bold text-slate-800">
                      Crianças menores de 7 anos
                    </span>
                    <strong>77,38%</strong>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    3.106 de 4.014 acompanhadas; 3.086 cumpriram a
                    condicionalidade (99,36% das acompanhadas).
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex justify-between gap-3">
                    <span className="font-bold text-slate-800">Mulheres</span>
                    <strong>95,09%</strong>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    11.613 de 12.213 acompanhadas.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex justify-between gap-3">
                    <span className="font-bold text-slate-800">Gestantes</span>
                    <strong>100,00%</strong>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    151 acompanhadas e 151 cumpriram a condicionalidade.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <article className="rounded-[1.5rem] border border-[#e1e3d9] bg-white p-5 shadow-sm sm:p-7">
            <SectionHeading
              eyebrow="Públicos específicos · setembro/2026"
              title="Grupos tradicionais cadastrados"
              description="Famílias por grupo populacional tradicional específico (GPTE). Os grupos podem se sobrepor; o total oficial informado, que exclui múltiplas marcações, é 2.224 famílias cadastradas e 1.394 beneficiárias do PBF."
            />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="pb-3 pr-4">Grupo familiar</th>
                    <th className="pb-3 pr-4">No Cadastro Único</th>
                    <th className="pb-3">Com PBF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {traditionalGroups.map(([label, registered, pbf]) => (
                    <tr key={label}>
                      <td className="py-2.5 pr-4 font-semibold">{label}</td>
                      <td className="py-2.5 pr-4">{registered}</td>
                      <td className="py-2.5">{pbf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              O documento não apresenta famílias indígenas, acampadas ou de
              povos de terreiro no período (valores registrados como zero).
              Trabalho infantil aparece como “-”, sem quantitativo informado.
            </p>
          </article>

          <div className="space-y-5">
            <article className="rounded-[1.5rem] border border-[#e1e3d9] bg-white p-5 shadow-sm sm:p-7">
              <SectionHeading
                eyebrow="Recorte racial"
                title="População negra e acesso aos programas"
                description="IBGE 2022: 61.068 pessoas negras, equivalentes a 83,63% da população de 73.019 habitantes."
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#f3f2ed] p-4">
                  <p className="text-xs font-bold text-slate-600">
                    Mulheres negras no CadÚnico
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#102b27]">
                    21.303
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    13.358 beneficiárias do PBF
                  </p>
                </div>

                <div className="rounded-xl bg-[#f3f2ed] p-4">
                  <p className="text-xs font-bold text-slate-600">
                    Homens negros no CadÚnico
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#102b27]">
                    14.823
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    8.228 beneficiários do PBF
                  </p>
                </div>

                <div className="rounded-xl bg-[#f3f2ed] p-4">
                  <p className="text-xs font-bold text-slate-600">
                    Famílias quilombolas cadastradas
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#102b27]">
                    356
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    203 recebem PBF
                  </p>
                </div>

                <div className="rounded-xl bg-[#f3f2ed] p-4">
                  <p className="text-xs font-bold text-slate-600">
                    Pessoas quilombolas com BPC
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#102b27]">
                    33
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Referência: agosto/2026
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-[1.5rem] border border-[#e1e3d9] bg-white p-5 shadow-sm sm:p-7">
              <SectionHeading
                eyebrow="Gestão e capacidade"
                title="Índices e estrutura"
              />

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="font-semibold text-slate-700">
                    IGD-M / Bolsa Família (ago/2026)
                  </span>
                  <strong className="text-lg text-emerald-800">0,91</strong>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="font-semibold text-slate-700">
                    IGD-SUAS municipal (dez/2021)
                  </span>
                  <strong className="text-lg text-emerald-800">0,85</strong>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="font-semibold text-slate-700">
                    CRAS ativos
                  </span>
                  <strong className="text-lg text-emerald-800">2</strong>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="font-semibold text-slate-700">
                    Posto de cadastramento
                  </span>
                  <strong className="text-lg text-emerald-800">1</strong>
                </div>
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                O IGD-SUAS é de dezembro de 2021 e não deve ser comparado
                diretamente ao IGD-M de agosto de 2026.
              </p>
            </article>
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="Recursos da assistência social"
            title="Repasses registrados em 2026"
            description="Totais acumulados indicados no relatório, com posição financeira atualizada em 14/10/2026."
          />

          <div className="overflow-hidden rounded-[1.5rem] border border-[#e1e3d9] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-[#102b27] text-white">
                  <tr>
                    <th className="px-5 py-3.5">Bloco de financiamento</th>
                    <th className="px-5 py-3.5 text-right">
                      Repassado em 2026
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transfers.map(([label, amount]) => (
                    <tr key={label}>
                      <td className="px-5 py-3.5 font-semibold text-slate-700">
                        {label}
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold tabular-nums text-slate-900">
                        {amount}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-50">
                    <td className="px-5 py-4 font-black text-[#102b27]">
                      Total geral informado
                    </td>
                    <td className="px-5 py-4 text-right text-lg font-black tabular-nums text-emerald-900">
                      R$ 844.435,05
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 border-t border-slate-100 p-5 sm:grid-cols-2">
              <p className="text-sm leading-6 text-slate-600">
                <strong className="text-[#102b27]">PROCAD-SUAS:</strong>{" "}
                repasse municipal indicado de R$ 57.048, referente a 50% do
                repasse de 2025; saldo em conta de R$ 89.216 em junho de 2026.
              </p>
              <p className="text-sm leading-6 text-slate-600">
                <strong className="text-[#102b27]">IGD-M/PBF:</strong> R$
                30.520,67 repassados em agosto e R$ 253.815,68 somados nas
                parcelas de 2026 até a referência do relatório.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[1.7rem] bg-[#102b27] p-5 text-white shadow-[0_20px_45px_-30px_rgba(16,43,39,.75)] sm:p-8 lg:p-10">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-lime-300">
            Síntese analítica
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            Análise final e prioridades para a gestão
          </h2>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-base font-extrabold text-lime-200">
                O que os dados mostram
              </h3>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-emerald-50/85">
                <li>
                  <strong className="text-white">
                    Alta demanda por proteção de renda:
                  </strong>{" "}
                  16.338 famílias estão no CadÚnico; 7.846 são classificadas em
                  situação de pobreza e 3.933 em baixa renda. Bolsa Família
                  alcança 8.787 famílias e movimenta cerca de R$ 5,9 milhões no
                  mês de setembro.
                </li>
                <li>
                  <strong className="text-white">
                    Acompanhamento educacional elevado:
                  </strong>{" "}
                  cobertura de 98,36% e cumprimento de 99,97%. O público
                  adolescente de 16–17 anos apresenta a menor cobertura
                  (96,62%) e cumprimento de 99,79%, sendo a principal faixa para
                  busca ativa e conferência de registros.
                </li>
                <li>
                  <strong className="text-white">
                    Lacuna na saúde infantil:
                  </strong>{" "}
                  a cobertura de crianças menores de 7 anos é 77,38%, abaixo da
                  cobertura de mulheres (95,09%) e do total (90,71%). Há 908
                  crianças do público informado sem acompanhamento registrado
                  (4.014 menos 3.106).
                </li>
                <li>
                  <strong className="text-white">
                    Importância do recorte étnico-racial e territorial:
                  </strong>{" "}
                  83,63% da população do Censo 2022 é negra; há 356 famílias
                  quilombolas cadastradas, 203 delas beneficiárias do PBF.
                  Agricultores familiares formam o maior grupo específico
                  listado (1.700 famílias).
                </li>
                <li>
                  <strong className="text-white">
                    BPC e integração cadastral:
                  </strong>{" "}
                  o relatório informa 3.109 beneficiários do BPC e 3.082
                  inscritos no CadÚnico em agosto; apresenta o indicador como
                  100%, mas os quantitativos diferem em 27 pessoas e a própria
                  nota informa que há defasagem entre bases.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-lime-200">
                Recomendações práticas
              </h3>
              <ol className="mt-3 space-y-3 text-sm leading-6 text-emerald-50/85">
                <li>
                  <strong className="text-white">
                    1. Priorizar busca ativa em saúde:
                  </strong>{" "}
                  cruzar os 908 registros sem acompanhamento de crianças
                  menores de 7 anos com territórios, equipes de saúde e
                  calendário de vacinação/pré-natal, observando critérios de
                  sigilo e acesso às bases.
                </li>
                <li>
                  <strong className="text-white">
                    2. Fechar lacunas de educação:
                  </strong>{" "}
                  revisar os 147 integrantes do público de 4–17 anos ainda sem
                  acompanhamento e os 3 adolescentes que não aparecem como
                  cumpridores, com foco em frequência, evasão e atualização do
                  motivo.
                </li>
                <li>
                  <strong className="text-white">
                    3. Qualificar o Cadastro Único:
                  </strong>{" "}
                  monitorar atualização cadastral e inconsistências,
                  acompanhar famílias em pobreza e baixa renda, e articular
                  postos de cadastramento com CRAS, saúde e educação.
                </li>
                <li>
                  <strong className="text-white">
                    4. Planejar ações por grupo e território:
                  </strong>{" "}
                  pactuar estratégias com comunidades quilombolas, ribeirinhas,
                  agricultores familiares, pessoas em situação de rua e
                  catadores; evitar somar grupos sobrepostos como se fossem
                  população distinta.
                </li>
                <li>
                  <strong className="text-white">
                    5. Validar bases e períodos:
                  </strong>{" "}
                  conferir defasagem entre Cadastro Único, folha do PBF, BPC e
                  acompanhamento de condicionalidades antes de calcular
                  cobertura ou comparar meses.
                </li>
                <li>
                  <strong className="text-white">
                    6. Monitorar execução financeira:
                  </strong>{" "}
                  relacionar os R$ 844.435,05 informados aos planos de
                  aplicação, saldos, metas e entregas; acompanhar
                  especificamente recursos do IGD-M e do PROCAD-SUAS.
                </li>
              </ol>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-white/15 bg-white/5 p-4 text-xs leading-5 text-emerald-50/75">
            <strong className="text-white">Limites de interpretação:</strong>{" "}
            os períodos de referência não são uniformes; campos com “-” no PDF
            indicam ausência de informação publicada, não necessariamente valor
            zero; a contagem de benefícios soma componentes e não equivale ao
            número de pessoas ou famílias; indicadores de condicionalidade têm
            denominadores e ciclos próprios.
          </div>
        </section>

        <section className="rounded-2xl border border-[#e1e3d9] bg-white p-5 text-sm leading-6 text-slate-600 shadow-sm sm:p-6">
          <h2 className="font-black text-[#102b27]">Fonte e referências</h2>
          <p className="mt-2">
            Relatório de Informações - Relatório de Programas e Ações para
            Santa Izabel do Pará (PA), impresso em 15/10/2026. Fontes indicadas
            no documento: MDS/SAGICAD, SENARC, SNAS, CadSUAS, Rede SUAS e
            IBGE/Censo Demográfico 2022.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Indicadores: CadÚnico e PBF (setembro/2026); educação
            (julho/2026); saúde (junho/2026); IGD-M (agosto/2026); BPC
            (agosto/2026); estrutura SUAS atualizada em 15/10/2026; IGD-SUAS
            (dezembro/2021).
          </p>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-emerald-800 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950"
          >
            Consultar relatório oficial do MDS
            <ArrowIcon />
          </a>
        </section>
      </div>

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
            Análise do Cadastro Único e Bolsa Família
          </p>
        </div>
      </footer>
    </main>
  );
}
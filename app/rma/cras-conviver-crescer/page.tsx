"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

// Arquivo completo para app/rma/cras-conviver-crescer/page.tsx.
// Dados estáticos de janeiro a setembro de 2026, com base nos RMA anexados.
type Metric = { label: string; values: number[]; kind: "sum" | "average" };
const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"];
const metrics: Metric[] = [
  {
    "label": "Famílias acompanhadas (PAIF)",
    "values": [
      122,
      125,
      135,
      171,
      156,
      164,
      170,
      124,
      189
    ],
    "kind": "average"
  },
  {
    "label": "Novas famílias no PAIF",
    "values": [
      47,
      10,
      11,
      6,
      3,
      11,
      6,
      9,
      3
    ],
    "kind": "sum"
  },
  {
    "label": "Atendimentos particularizados",
    "values": [
      440,
      445,
      625,
      473,
      362,
      329,
      309,
      130,
      517
    ],
    "kind": "sum"
  },
  {
    "label": "Visitas domiciliares",
    "values": [
      81,
      48,
      48,
      46,
      58,
      104,
      77,
      12,
      81
    ],
    "kind": "sum"
  },
  {
    "label": "Enc. Cadastro Único – inclusão",
    "values": [
      5,
      1,
      5,
      0,
      1,
      3,
      2,
      3,
      2
    ],
    "kind": "sum"
  },
  {
    "label": "Enc. Cadastro Único – atualização",
    "values": [
      13,
      14,
      26,
      12,
      13,
      11,
      4,
      3,
      12
    ],
    "kind": "sum"
  },
  {
    "label": "Enc. acesso ao BPC",
    "values": [
      0,
      4,
      4,
      1,
      0,
      2,
      1,
      3,
      0
    ],
    "kind": "sum"
  },
  {
    "label": "Enc. ao CREAS",
    "values": [
      0,
      2,
      2,
      1,
      3,
      3,
      3,
      1,
      15
    ],
    "kind": "sum"
  },
  {
    "label": "Auxílio-natalidade",
    "values": [
      0,
      0,
      0,
      0,
      1,
      4,
      0,
      5,
      6
    ],
    "kind": "sum"
  },
  {
    "label": "Auxílio-funeral",
    "values": [
      3,
      10,
      3,
      2,
      4,
      4,
      5,
      0,
      4
    ],
    "kind": "sum"
  },
  {
    "label": "Outros benefícios eventuais",
    "values": [
      37,
      53,
      75,
      66,
      34,
      129,
      63,
      65,
      95
    ],
    "kind": "sum"
  },
  {
    "label": "Famílias em grupos do PAIF",
    "values": [
      19,
      17,
      11,
      27,
      63,
      14,
      14,
      10,
      19
    ],
    "kind": "average"
  },
  {
    "label": "Crianças 0–6 (SCFV)",
    "values": [
      28,
      19,
      29,
      29,
      31,
      28,
      29,
      26,
      26
    ],
    "kind": "average"
  },
  {
    "label": "Crianças/adolesc. 7–14 (SCFV)",
    "values": [
      139,
      158,
      163,
      172,
      169,
      163,
      164,
      47,
      183
    ],
    "kind": "average"
  },
  {
    "label": "Adolescentes 15–17 (SCFV)",
    "values": [
      19,
      19,
      20,
      10,
      22,
      22,
      22,
      15,
      32
    ],
    "kind": "average"
  },
  {
    "label": "Idosos (SCFV)",
    "values": [
      188,
      186,
      187,
      189,
      186,
      177,
      34,
      15,
      177
    ],
    "kind": "average"
  },
  {
    "label": "Pessoas com deficiência",
    "values": [
      17,
      17,
      23,
      23,
      20,
      17,
      28,
      5,
      27
    ],
    "kind": "average"
  },
  {
    "label": "Participantes de palestras e oficinas",
    "values": [
      170,
      161,
      188,
      291,
      361,
      517,
      156,
      31,
      477
    ],
    "kind": "sum"
  },
  {
    "label": "Adultos 18–59 anos (SCFV)",
    "values": [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    "kind": "average"
  }
];
const sections = [
  {
    title: "Atendimento às famílias (PAIF)",
    paragraphs: [
      "De janeiro a setembro, o estoque informado soma 1.356 registros mensais e média de 150,7 famílias acompanhadas. O total somado não representa famílias únicas. O estoque variou de 122 em janeiro ao máximo de 189 em setembro; após cair a 124 em agosto, cresceu 52,4% no mês. É uma variação do estoque declarado e, isoladamente, não comprova aumento da demanda.",
      "Foram 106 novas inserções: 47 em janeiro (44,3% do período) e 3 em setembro. De fevereiro a setembro, foram 59 inserções, média de 7,4 por mês. O valor de janeiro destoa; conferir se houve lançamento acumulado ou diferença de competência.",
      "Os atendimentos particularizados totalizaram 3.630 (média de 403,3 por mês). Setembro registrou 517, ante 130 em agosto (+297,7%), ainda abaixo do pico de março (625). As visitas somaram 555 (média de 61,7); setembro teve 81 após 12 em agosto, e o pico foi 104 em junho."
    ],
    bullets: []
  },
  {
    title: "Perfil das 106 novas famílias",
    paragraphs: [
      "Os perfis B.1 a B.6 identificam condições selecionadas e podem se sobrepor; sua soma não precisa coincidir com as 106 inserções de A.2. Até agosto, foram informadas 16 famílias com membro beneficiário do BPC, 10 beneficiárias do Bolsa Família, 2 em extrema pobreza e 1 com descumprimento de condicionalidades. Em setembro, todos os campos B.1 a B.6 aparecem zerados, embora A.2 registre 3 novas famílias.",
      "Não há registro de famílias novas com crianças/adolescentes em trabalho infantil ou acolhimento no período. Isso significa ausência de registro nesses campos, não comprovação de inexistência das situações."
    ],
    bullets: []
  },
  {
    title: "Encaminhamentos e benefícios",
    paragraphs: [
      "No acumulado, foram 130 encaminhamentos ao Cadastro Único (22 para inclusão e 108 para atualização), 15 encaminhamentos para acesso ao BPC e 30 famílias encaminhadas ao CREAS. Setembro concentrou 15 encaminhamentos ao CREAS, frente a 1 em agosto (janeiro teve zero; de fevereiro a julho, foram de 1 a 3 por mês); o salto precisa ser validado.",
      "Os benefícios eventuais somaram 668 registros: 16 auxílios-natalidade, 35 auxílios-funeral e 617 outros benefícios. Em setembro foram 105 (6, 4 e 95, respectivamente). Os 95 registros em C.9 compõem cerca de 90% dos benefícios eventuais do mês; identificar quais benefícios foram contabilizados e confirmar o critério de registro."
    ],
    bullets: []
  },
  {
    title: "Serviços de convivência e atividades coletivas",
    paragraphs: [
      "A soma dos registros mensais das quatro faixas etárias do SCFV foi de 374 a 408 entre janeiro e junho, caiu para 249 em julho e 103 em agosto, e subiu para 418 em setembro. O salto de setembro decorre, principalmente, de 47 para 183 registros na faixa de 7–14 anos e de 15 para 177 entre idosos. As mudanças podem refletir retomada das atividades, atualização cadastral ou lançamento acumulado; conferir listas de presença, calendário e competência.",
      "As palestras e oficinas (D.6) acumularam 2.352 participações; foram 477 em setembro, após 31 em agosto, e o pico foi 517 em junho. Os grupos regulares do PAIF tiveram média de 21,6 famílias por mês; setembro registrou 19. O total de participações não deve ser interpretado automaticamente como pessoas únicas."
    ],
    bullets: []
  },
  {
    title: "Públicos que merecem atenção",
    paragraphs: [],
    bullets: [
      "Pessoas idosas no SCFV: 177 registros em setembro, após 15 em agosto e 34 em julho; confirmar se os meses anteriores tiveram suspensão, sub-registro ou mudança na contagem.",
      "Crianças e adolescentes de 7 a 14 anos: 183 registros em setembro, após 47 em agosto; validar retomada e listas nominais de participação.",
      "Adultos de 18 a 59 anos: D.8 permaneceu zerado de janeiro a setembro; verificar se a atividade não foi ofertada ou se faltou preenchimento.",
      "Pessoas com deficiência: 27 registros em setembro (média mensal 19,7); o campo pode se sobrepor às faixas etárias e não deve ser somado como público exclusivo.",
      "Famílias novas em extrema pobreza: 2 registros entre 106 novas inserções até setembro. Conferir a identificação sem concluir subnotificação apenas pelo percentual.",
      "Famílias com membro beneficiário do BPC e do Bolsa Família: 16 e 10 registros até agosto, respectivamente; em setembro, ambos os campos foram informados como zero."
    ]
  },
  {
    title: "Pontos de atenção nos dados",
    paragraphs: [],
    bullets: [
      "Oscilações em setembro: atendimentos particularizados passaram de 130 para 517 (+297,7%); visitas, de 12 para 81 (+575%); palestras/oficinas, de 31 para 477. Confirmar se os registros são todos da competência setembro ou se houve atualização de meses anteriores.",
      "SCFV com retomadas abruptas: idosos passaram de 177 em junho para 34 em julho, 15 em agosto e 177 em setembro. A faixa de 7–14 anos caiu de 164 em julho para 47 em agosto e subiu a 183 em setembro. Verificar calendário, frequência e composição dos registros.",
      "Encaminhamentos ao CREAS: 15 em setembro ante 1 em agosto. Validar se C.5 registra encaminhamentos realizados no mês, sem duplicidade nem inclusão de estoque acumulado.",
      "Benefícios eventuais: setembro informa 95 em ‘outros benefícios’ (C.9), além de 6 de natalidade e 4 de funeral. Discriminar o conteúdo de C.9 e conferir os comprovantes e o padrão dos meses anteriores.",
      "Novas famílias: janeiro registra 47 de 106 inserções (44,3%); setembro, 3. Conferir eventual entrada acumulada e a competência de cada inclusão.",
      "Campos zerados: B.5 (trabalho infantil), B.6 (acolhimento) e D.8 (adultos de 18–59 anos) aparecem sem registros. Confirmar oferta, ocorrência e preenchimento; zero não prova ausência de demanda.",
      "Planilha de janeiro a agosto: a análise anterior identificou a fórmula =SUM(E3:G3) na célula Q24 junto a ‘atendimentos coletivos’, somando o estoque do PAIF de abril a junho, e não os coletivos. Revisar a referência e criar total compatível com o indicador. Também padronizar o código B.1 e a ordenação D.5/D.8."
    ]
  },
  {
    title: "Recomendações para a gestão",
    paragraphs: [],
    bullets: [
      "Validar a competência e a completude de agosto e setembro, priorizando os saltos de atendimentos, visitas, oficinas, SCFV e encaminhamentos ao CREAS.",
      "Conferir listas de presença e calendário do SCFV, com foco nos registros de idosos e de pessoas de 7–14 anos entre junho e setembro.",
      "Revisar C.5 e C.9: confirmar os 15 encaminhamentos ao CREAS e detalhar os 95 outros benefícios eventuais de setembro.",
      "Corrigir a fórmula de Q24 na planilha-base e separar indicadores de fluxo (somas) de estoques/participação recorrente (médias mensais e série mensal).",
      "Auditar as 47 novas famílias de janeiro e as 3 de setembro para verificar eventual lançamento acumulado e competência correta.",
      "Confirmar com a equipe os zeros de B.5, B.6 e D.8, distinguindo ‘serviço não ofertado’, ‘nenhuma ocorrência’ e ‘não informado’.",
      "Acompanhar os encaminhamentos ao Cadastro Único: atualização caiu de 26 em março para 3 em agosto e voltou a 12 em setembro.",
      "Padronizar códigos, ordem dos campos e fórmulas; fazer conferência por dupla checagem antes do envio do RMA."
    ]
  }
];
const septemberProfile = [
  ["Famílias em situação de extrema pobreza", 0],
  ["Famílias beneficiárias do Programa Bolsa Família", 0],
  ["Beneficiárias do PBF em descumprimento de condicionalidades", 0],
  ["Famílias com membro beneficiário do BPC", 0],
  ["Famílias com criança/adolescente em trabalho infantil", 0],
  ["Famílias com criança/adolescente em acolhimento", 0],
] as const;

const referrals = [
  [
    "Atualização do Cadastro Único",
    "108",
    "Pico de 26 em março; 3 em agosto e 12 em setembro"
  ],
  [
    "Inclusão no Cadastro Único",
    "22",
    "2 em setembro; nenhuma em abril"
  ],
  [
    "Acesso ao BPC",
    "15",
    "Nenhum em janeiro e maio; zero em setembro"
  ],
  [
    "Famílias encaminhadas ao CREAS",
    "30",
    "15 em setembro, ante 1 em agosto; validar o salto"
  ],
  [
    "Auxílio-funeral",
    "35",
    "Pico de 10 em fevereiro; 4 em setembro"
  ],
  [
    "Auxílio-natalidade",
    "16",
    "6 em setembro; 5 em agosto"
  ],
  [
    "Outros benefícios eventuais",
    "617",
    "95 em setembro; pico de 129 em junho"
  ]
];

const fmt = (value: number) => value.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true"><path d="M5 12h14" strokeLinecap="round" /><path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><h2 className="text-lg font-extrabold text-slate-900">{title}</h2>{subtitle && <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>}<div className="mt-5 space-y-4">{children}</div></section>;
}
function ProfileBar({ label, value }: { label: string; value: number }) {
  const percent = value / 106 * 100;
  return <div><div className="mb-2 flex justify-between gap-3 text-sm"><span className="text-slate-600">{label}</span><span className="font-bold text-slate-800">{value} <span className="font-normal text-slate-500">({fmt(percent)}%)</span></span></div><div className="h-2.5 rounded-full bg-slate-100" aria-hidden="true"><div className="h-full rounded-full bg-green-700" style={{ width: `${percent}%` }} /></div></div>;
}
const groups = [
  { index: 12, label: "0 a 6 anos", color: "#86bba0", textColor: "#153728" },
  { index: 13, label: "7 a 14 anos", color: "#15803d", textColor: "#ffffff" },
  { index: 14, label: "15 a 17 anos", color: "#d19a3a", textColor: "#34250b" },
  { index: 15, label: "Pessoas idosas", color: "#8a6bb5", textColor: "#ffffff" },
];

function ScfvChart({ indexes }: { indexes: number[] }) {
  const baseline = 245;
  const scale = 0.38;
  const gridValues = [0, 100, 200, 300, 400, 500];

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">
        {groups.map((group) => (
          <span key={group.label}>
            <span
              className="mr-2 inline-block h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: group.color }}
            />
            {group.label}
          </span>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 700 290"
          role="img"
          aria-labelledby="scfv-title scfv-description"
          className="min-w-[700px] w-full"
        >
          <title id="scfv-title">
            Participantes mensais do SCFV por faixa etária
          </title>
          <desc id="scfv-description">
            {indexes
              .map(
                (index) =>
                  `${months[index]}: ${groups
                    .map(
                      (group) =>
                        `${group.label}, ${metrics[group.index].values[index]}`,
                    )
                    .join("; ")}`,
              )
              .join(". ")}
          </desc>

          {gridValues.map((value) => (
            <g key={value}>
              <line
                x1="40"
                x2="690"
                y1={baseline - value * scale}
                y2={baseline - value * scale}
                stroke="#e2e8f0"
              />
              <text
                x="31"
                y={baseline - value * scale + 4}
                textAnchor="end"
                fontSize="11"
                fill="#64748b"
              >
                {value}
              </text>
            </g>
          ))}

          {indexes.map((index, position) => {
            const slot = 640 / indexes.length;
            const width = Math.min(46, slot * 0.65);
            const x = 45 + position * slot + (slot - width) / 2;
            let accumulated = 0;

            const bars = groups.map((group) => {
              const value = metrics[group.index].values[index];
              const height = value * scale;
              const top = baseline - (accumulated + value) * scale;
              const labelY = value > 0 ? top + height / 2 + 3 : baseline - 5;
              accumulated += value;

              return (
                <g key={group.label}>
                  <rect
                    x={x}
                    y={top}
                    width={width}
                    height={height}
                    fill={group.color}
                  >
                    <title>
                      {months[index]} · {group.label}: {value}
                    </title>
                  </rect>
                  <text
                    x={x + width / 2}
                    y={labelY}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill={value > 0 ? group.textColor : "#172338"}
                    pointerEvents="none"
                  >
                    {value}
                  </text>
                </g>
              );
            });

            return (
              <g key={months[index]}>
                {bars}
                <text
                  x={x + width / 2}
                  y={baseline - accumulated * scale - 7}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="#0f172a"
                >
                  {accumulated}
                </text>
                <text
                  x={x + width / 2}
                  y="269"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#64748b"
                >
                  {months[index]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="text-xs leading-6 text-slate-500">
        Os números dentro das barras mostram os registros de cada faixa etária;
        o número acima da barra é a soma das quatro faixas. Os registros podem
        incluir a mesma pessoa em mais de um mês. Pessoas com deficiência são
        apresentadas em indicador separado e podem também integrar as faixas
        etárias.
      </p>
    </div>
  );
}

export default function RmaCrasConviverCrescerPage() {
  const [selectedMonth, setSelectedMonth] = useState("all");
  const indexes = selectedMonth === "all" ? months.map((_,i) => i) : [Number(selectedMonth)];
  const aggregate = (index: number) => {
    const metric=metrics[index]; const sum=indexes.reduce((total,i) => total+metric.values[i],0);
    return metric.kind === "average" ? sum/indexes.length : sum;
  };
  const fullPeriod=selectedMonth === "all";
  const period=fullPeriod ? "Janeiro a setembro de 2026" : `${months[Number(selectedMonth)]} de 2026`;
  const kpis = [
    { label: fullPeriod ? "Média de famílias no PAIF" : "Famílias no PAIF", value: aggregate(0), note: "Estoque de famílias em acompanhamento" },
    { label: "Novas famílias no PAIF", value: aggregate(1), note: "Inserções no período selecionado" },
    { label: "Atendimentos particularizados", value: aggregate(2), note: "Volume registrado de atendimentos" },
    { label: "Visitas domiciliares", value: aggregate(3), note: "Volume registrado de visitas" },
    { label: "Encaminhamentos ao Cadastro Único", value: aggregate(4)+aggregate(5), note: "Inclusão e atualização cadastral" },
    { label: "Benefícios eventuais concedidos", value: aggregate(8)+aggregate(9)+aggregate(10), note: "Natalidade, funeral e outros benefícios" },
  ];
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-white/10 bg-[#102b27] text-white print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-5 lg:px-8">
          <Link href="/" aria-label="Página inicial" className="flex min-w-0 items-center">
            <div className="flex h-14 w-32 shrink-0 items-center rounded-xl bg-white px-2 sm:h-16 sm:w-36"><Image src="/log.png" alt="Prefeitura de Santa Izabel do Pará" width={200} height={110} className="h-full w-full object-contain" priority /></div>
            <div className="mx-4 hidden h-10 w-px bg-white/20 sm:block md:mx-5" />
            <div className="hidden min-w-0 sm:block"><p className="text-xs font-semibold leading-tight text-emerald-100/75">Secretaria Municipal de Trabalho</p><p className="mt-1 text-sm font-extrabold leading-tight text-white">e Promoção Social <span className="font-medium text-emerald-100/75">/ SEMTEPS</span></p><p className="mt-1 text-xs text-emerald-100/65">Plataforma da Vigilância Socioassistencial</p></div>
          </Link>
          <nav aria-label="Navegação principal" className="flex flex-col items-end gap-2">
            <Link href="/" className="inline-flex h-9 w-24 items-center justify-center gap-1.5 rounded-full border border-white/20 bg-transparent px-2 text-xs font-semibold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]">
              Início<ArrowIcon />
            </Link>
            <Link href="/painel/psb" className="inline-flex h-9 w-24 items-center justify-center gap-1.5 rounded-full border border-white/20 bg-transparent px-2 text-xs font-semibold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]">
              Voltar<span className="rotate-180"><ArrowIcon /></span>
            </Link>
          </nav>
        </div>
        <div className="border-t border-white/10 px-6 py-4 sm:hidden"><p className="text-sm font-extrabold leading-tight text-white">Secretaria Municipal de Trabalho<span className="block">e Promoção Social - SEMTEPS</span></p><p className="mt-1 text-xs text-emerald-100/65">Plataforma da Vigilância Socioassistencial</p></div>
      </header>


      <div className="mx-auto max-w-7xl space-y-6 px-6 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-green-700">Vigilância Socioassistencial</p><h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Análise do RMA do CRAS Conviver e Crescer</h1><p className="mt-2 text-sm leading-6 text-slate-500">Área urbana · PAIF e Serviços de Convivência · 2026</p></div>
          <button type="button" onClick={() => window.print()} className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-600 print:hidden">Imprimir / salvar PDF</button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div><span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">{period}</span><p className="mt-2 text-xs text-slate-500">Dados estáticos do relatório anexado. Setembro incluído com base no RMA gerado em 14/10/2026. Outubro a dezembro ainda sem consolidação.</p></div><div className="flex items-center gap-3 print:hidden"><label htmlFor="month" className="text-sm font-semibold text-slate-600">Período</label><select id="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-600" style={{ color: "#000000", backgroundColor: "#ffffff", colorScheme: "light" }}><option value="all" style={{ color: "#000000", backgroundColor: "#ffffff" }}>Janeiro a setembro</option>{months.map((month,i) => <option key={month} value={i} style={{ color: "#000000", backgroundColor: "#ffffff" }}>{month} / 2026</option>)}</select></div></div>
        <p className="text-sm text-slate-600">O filtro atualiza os indicadores, a tabela e o gráfico. A análise geral, os perfis e as recomendações abrangem janeiro a setembro.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{kpis.map(k => <div key={k.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-semibold text-slate-500">{k.label}</p><p className="mt-3 text-3xl font-black text-green-700">{fmt(k.value)}</p><p className="mt-2 text-xs leading-5 text-slate-500">{k.note}</p></div>)}</div>
        <Panel title="Leitura geral do período" subtitle="Janeiro a setembro de 2026"><p className="text-sm leading-7 text-slate-600">De janeiro a setembro, o CRAS registrou média de 150,7 famílias acompanhadas pelo PAIF, 106 novas inserções, 3.630 atendimentos particularizados e 555 visitas. Setembro se destaca pela alta do estoque para 189, 517 atendimentos, 81 visitas, 15 encaminhamentos ao CREAS e 95 outros benefícios eventuais. Também houve recuperação dos registros do SCFV após valores baixos em julho e agosto. As variações precisam ser validadas com os registros de origem.</p><div className="grid gap-4 sm:grid-cols-3">{[["189","famílias acompanhadas em setembro"],["2.352","participações em palestras e oficinas"],["30","encaminhamentos ao CREAS no período"]].map(([value,label]) => <div key={label} className="rounded-lg bg-slate-50 p-4"><p className="text-xl font-extrabold text-slate-800">{value}</p><p className="mt-1 text-xs leading-5 text-slate-500">{label}</p></div>)}</div></Panel>
        <Panel title="Índices mensais" subtitle={period}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <caption className="sr-only">Indicadores do CRAS Conviver e Crescer</caption>
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left">Indicador</th>
                  {indexes.map((index) => (
                    <th key={index} scope="col" className="px-3 py-3 text-right">{months[index]}</th>
                  ))}
                  <th scope="col" className="whitespace-nowrap px-3 py-3 text-right">Total do período</th>
                  <th scope="col" className="whitespace-nowrap px-3 py-3 text-right">Média mensal</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric) => {
                  const total = indexes.reduce(
                    (sum, monthIndex) => sum + metric.values[monthIndex],
                    0,
                  );
                  const average = total / indexes.length;

                  return (
                    <tr key={metric.label} className="border-b border-slate-100 even:bg-slate-50">
                      <th scope="row" className="min-w-[220px] px-3 py-3 text-left font-semibold text-slate-700">{metric.label}</th>
                      {indexes.map((monthIndex) => (
                        <td key={monthIndex} className="px-3 py-3 text-right tabular-nums text-slate-600">{fmt(metric.values[monthIndex])}</td>
                      ))}
                      <td className="whitespace-nowrap bg-green-50 px-3 py-3 text-right font-bold text-green-800">{fmt(total)}</td>
                      <td className="whitespace-nowrap bg-green-50 px-3 py-3 text-right font-bold text-green-800">{fmt(average)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs leading-6 text-slate-500">
            Total do período = soma dos meses selecionados. Média mensal = total dividido pela quantidade de meses selecionados. Para indicadores de estoque e participação recorrente, o total representa a soma dos registros mensais, e não famílias ou pessoas únicas. Participações em oficinas podem incluir uma pessoa em mais de uma atividade.
          </p>
        </Panel>
        {sections.map(section => <Panel key={section.title} title={section.title} subtitle="Janeiro a setembro de 2026">
          {section.title === "Perfil das 106 novas famílias" && (
            <div className="space-y-4">
              {[{label:"Com membro beneficiário do BPC",value:16},{label:"Beneficiárias do Bolsa Família",value:10},{label:"Em extrema pobreza",value:2},{label:"PBF em descumprimento",value:1}].map(item => <ProfileBar key={item.label} {...item} />)}
              <p className="text-xs leading-6 text-slate-500">Proporções sobre 106 novas famílias até setembro. Categorias podem se sobrepor.</p>
              <div className="rounded-lg border border-green-100 bg-green-50/60 p-4">
                <h3 className="text-sm font-bold text-slate-800">Perfil das 3 novas famílias inseridas em setembro</h3>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[480px] text-sm">
                    <thead><tr className="border-b border-green-100 text-slate-600"><th scope="col" className="py-2 text-left font-semibold">Campo do RMA (B.1 a B.6)</th><th scope="col" className="py-2 text-right font-semibold">Setembro</th></tr></thead>
                    <tbody>{septemberProfile.map(([label, value]) => <tr key={label} className="border-b border-green-100/70 last:border-0"><th scope="row" className="py-2 text-left font-medium text-slate-700">{label}</th><td className="py-2 text-right font-bold tabular-nums text-slate-900">{value}</td></tr>)}</tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500">O RMA informa 3 novas famílias em A.2, mas os campos de perfil B.1 a B.6 estão zerados em setembro. As categorias podem se sobrepor e não precisam somar o valor de A.2.</p>
              </div>
            </div>
          )}
          {section.title === "Encaminhamentos e benefícios" && <div className="overflow-x-auto"><table className="w-full min-w-[600px] text-sm"><thead className="bg-slate-50"><tr><th scope="col" className="px-3 py-3 text-left">Item</th><th scope="col" className="px-3 py-3 text-right">Total</th><th scope="col" className="px-3 py-3 text-left">Observação</th></tr></thead><tbody>{referrals.map(([label,total,note]) => <tr key={label} className="border-b border-slate-100 even:bg-slate-50"><th scope="row" className="px-3 py-3 text-left font-semibold text-slate-700">{label}</th><td className="px-3 py-3 text-right font-bold text-green-700">{total}</td><td className="px-3 py-3 text-slate-500">{note}</td></tr>)}</tbody></table></div>}
          {section.title === "Serviços de convivência e atividades coletivas" && <ScfvChart indexes={indexes} />}
          {section.paragraphs.map(text => <p key={text} className="text-sm leading-7 text-slate-600">{text}</p>)}
          {section.bullets.length > 0 && <ul className="list-disc space-y-3 pl-5 text-sm leading-7 text-slate-600">{section.bullets.map(text => <li key={text} className="pl-1">{text}</li>)}</ul>}
        </Panel>)}
        <footer className="border-t border-slate-200 pt-5 text-xs leading-6 text-slate-500"><p>Fontes: análise dos dados de janeiro a agosto no código fornecido e RMA do CRAS de setembro/2026, gerado em 14/10/2026. Totais e médias recalculados com os valores mensais.</p><p className="mt-2">Indicadores descrevem registros do serviço, não cobertura populacional ou número de usuários únicos. Esta página não envia informações ao sistema oficial do RMA.</p><p className="mt-3 font-semibold">SEMTEPS · Prefeitura de Santa Izabel do Pará</p></footer>
      </div>
    </main>
  );
}

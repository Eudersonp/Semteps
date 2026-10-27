"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

// Página de análise do RMA do CRAS Camélia Gaby Ferraz.
// A série contém os dados disponíveis de janeiro a setembro de 2026.
// Ao atualizar os números, mantenha a ordem dos valores alinhada à constante `months`.
type Metric = {
  // Nome mostrado nos cartões, tabelas, textos e gráficos.
  label: string;
  // Uma posição para cada mês da constante `months`.
  values: number[];
  // Identifica se o indicador deve ser somado ou tratado como média.
  kind: "sum" | "average";
};

// Tipo das análises textuais organizadas em painéis.
type AnalysisSection = {
  title: string;
  paragraphs: string[];
  bullets: string[];
};

// Meses para os quais há dados neste relatório.
const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"];

// Dados mensais do RMA. Os índices de 8 a 10 são benefícios eventuais.
const metrics: Metric[] = [
  { label: "Famílias acompanhadas (PAIF)", values: [86, 102, 109, 128, 128, 117, 124, 125, 133], kind: "average" },
  { label: "Novas famílias no PAIF", values: [38, 16, 7, 34, 0, 12, 9, 1, 8], kind: "sum" },
  { label: "Atendimentos particularizados", values: [152, 164, 143, 175, 83, 113, 130, 71, 140], kind: "sum" },
  { label: "Visitas domiciliares", values: [6, 11, 9, 24, 14, 13, 12, 17, 62], kind: "sum" },
  { label: "Enc. Cadastro Único – inclusão", values: [1, 2, 2, 0, 4, 1, 3, 1, 4], kind: "sum" },
  { label: "Enc. Cadastro Único – atualização", values: [6, 14, 10, 4, 4, 2, 3, 1, 15], kind: "sum" },
  { label: "Enc. acesso ao BPC", values: [6, 8, 0, 1, 2, 3, 3, 4, 5], kind: "sum" },
  { label: "Enc. ao CREAS", values: [0, 0, 2, 0, 0, 1, 1, 0, 1], kind: "sum" },
  { label: "Auxílio-natalidade", values: [0, 0, 0, 0, 0, 3, 5, 2, 4], kind: "sum" },
  { label: "Auxílio-funeral", values: [0, 0, 1, 0, 0, 0, 0, 0, 0], kind: "sum" },
  { label: "Outros benefícios eventuais", values: [26, 13, 17, 17, 14, 41, 65, 0, 48], kind: "sum" },
  { label: "Famílias em grupos do PAIF", values: [17, 32, 30, 31, 9, 31, 10, 9, 16], kind: "average" },
  { label: "Crianças de 0 a 6 anos (SCFV)", values: [26, 26, 25, 26, 25, 26, 26, 0, 0], kind: "average" },
  { label: "Crianças e adolescentes de 7 a 14 anos (SCFV)", values: [48, 49, 47, 47, 47, 48, 47, 53, 53], kind: "average" },
  { label: "Adolescentes de 15 a 17 anos (SCFV)", values: [15, 15, 15, 15, 15, 15, 15, 30, 30], kind: "average" },
  { label: "Pessoas idosas (SCFV)", values: [10, 15, 15, 15, 15, 15, 15, 15, 15], kind: "average" },
  { label: "Pessoas com deficiência", values: [4, 5, 5, 5, 5, 5, 5, 7, 7], kind: "average" },
  { label: "Participantes de palestras e oficinas", values: [32, 37, 72, 60, 47, 59, 31, 44, 66], kind: "sum" },
  { label: "Adultos de 18 a 59 anos (SCFV)", values: [0, 0, 0, 0, 0, 0, 0, 0, 0], kind: "average" },
];

// Leituras técnicas, alertas e recomendações organizados por tema.
const sections: AnalysisSection[] = [
  {
    title: "Atendimento às famílias (PAIF)",
    paragraphs: [
      "De janeiro a setembro, o CRAS registrou média de 116,9 famílias acompanhadas por mês. O estoque passou de 86 em janeiro para 133 em setembro, crescimento de 54,7%, com retração para 117 em junho e recuperação nos três meses seguintes. Setembro representa o maior valor do período.",
      "Foram registradas 125 novas inserções no PAIF. Janeiro (38) e abril (34) somaram 72 entradas, equivalentes a 57,6% do acumulado. Maio não teve novas inserções; setembro registrou 8, ante 1 em agosto. O relatório não traz uma série comparável de desligamentos, portanto não é possível calcular saídas ou rotatividade apenas pela diferença entre estoque e novas entradas.",
      "Os atendimentos particularizados somaram 1.171. Abril foi o pico (175) e agosto o menor mês (71); setembro voltou a 140. As visitas domiciliares totalizaram 168, com 62 em setembro, número muito acima do maior valor anterior (24 em abril). Essa variação deve ser conferida nos registros de execução.",
    ],
    bullets: [],
  },
  {
    title: "Perfil das 125 novas famílias",
    paragraphs: [
      "No acumulado informado para janeiro a setembro, foram identificadas 77 famílias com membro beneficiário do BPC, 23 beneficiárias do Bolsa Família, 3 em extrema pobreza e 1 com descumprimento de condicionalidades. Em setembro, o RMA informou 1 família com membro beneficiário do BPC e 4 beneficiárias do Bolsa Família; os demais campos do perfil ficaram zerados.",
      "Os itens B.1 a B.6 identificam condições selecionadas e podem se sobrepor. A soma desses perfis não precisa coincidir com as 125 novas inserções; os percentuais servem para descrever os registros, não para estimar prevalência no território.",
    ],
    bullets: [],
  },
  {
    title: "Encaminhamentos e benefícios",
    paragraphs: [
      "No acumulado, foram 77 encaminhamentos relacionados ao Cadastro Único: 18 para inclusão e 59 para atualização. Também foram registrados 32 encaminhamentos para acesso ao BPC e 5 famílias encaminhadas ao CREAS. Setembro teve 4 inclusões, 15 atualizações, 5 encaminhamentos ao BPC e 1 ao CREAS.",
      "Os benefícios eventuais somaram 256 registros: 14 auxílios-natalidade, 1 auxílio-funeral e 241 outros benefícios. Em setembro, foram 52 concessões (4 de natalidade e 48 em outros benefícios), após apenas 2 registros de outros benefícios em agosto. Julho foi o pico mensal, com 70 benefícios; setembro foi o segundo maior mês.",
    ],
    bullets: [],
  },
  {
    title: "Serviços de convivência e atividades coletivas",
    paragraphs: [
      "A soma dos registros mensais das quatro faixas etárias do SCFV variou de 98 a 105. Agosto e setembro tiveram 98 registros cada. Esse total estável esconde mudança na composição: crianças de 0 a 6 anos passaram de 25–26 registros mensais entre janeiro e julho para zero em agosto e setembro; adolescentes de 15 a 17 anos passaram de 15 para 30 em agosto e mantiveram 30 em setembro.",
      "Palestras, oficinas e outras atividades coletivas somaram 448 participações. Setembro registrou 66, alta de 50% em relação a agosto (44) e segundo maior valor do período, atrás de março (72). As participações não representam necessariamente pessoas únicas.",
    ],
    bullets: [],
  },
  {
    title: "Públicos que merecem atenção",
    paragraphs: [],
    bullets: [
      "Crianças de 0 a 6 anos no SCFV: o indicador está zerado em agosto e setembro, após registros de 25 a 26 nos sete primeiros meses. Confirmar continuidade da oferta, frequência e busca ativa.",
      "Adolescentes de 15 a 17 anos: o indicador dobrou de 15 para 30 em agosto e permaneceu em 30 em setembro. Verificar se houve ampliação real do grupo ou mudança na forma de contabilizar.",
      "Adultos de 18 a 59 anos: o campo específico do SCFV aparece zerado nos nove meses. Apurar se não houve oferta, participação ou lançamento.",
      "Famílias com vulnerabilidade de renda e acesso a benefícios: acompanhar a articulação com Cadastro Único, Bolsa Família e BPC, validando os perfis sem somar categorias que podem se sobrepor.",
      "Pessoas idosas e pessoas com deficiência: observar acessibilidade, frequência e continuidade dos grupos. Os registros mensais não bastam para medir cobertura nem usuários únicos.",
    ],
  },
  {
    title: "Pontos de atenção nos dados",
    paragraphs: [],
    bullets: [
      "Visitas domiciliares: 62 em setembro, ante 17 em agosto e pico anterior de 24 em abril. Conferir fichas, critério de contagem e competência; setembro representa 36,9% das 168 visitas acumuladas.",
      "Variação dos atendimentos: o total particularizado passou de 71 em agosto para 140 em setembro. Confirmar se a diferença reflete demanda e atividade realizadas ou atualização de registros.",
      "Benefícios eventuais: outros benefícios foram de zero em agosto para 48 em setembro. Discriminar internamente os tipos e motivos e reconciliar com comprovantes de concessão/entrega.",
      "SCFV por idade: dois meses sem registros para 0–6 anos e dois meses com 30 registros para 15–17 anos. Validar oferta, listas de frequência e eventual reclassificação.",
      "Campos zerados: trabalho infantil, acolhimento e participação de adultos de 18–59 anos permanecem sem registros. Zero não comprova ausência de demanda; é necessário distinguir ausência de ocorrência, de oferta e de preenchimento.",
      "Perfil das novas famílias: os registros de extrema pobreza são baixos em relação às inserções, mas isso, isoladamente, não comprova subnotificação. Conferir critérios de identificação e preenchimento do bloco B.",
    ],
  },
  {
    title: "Recomendações para a gestão",
    paragraphs: [],
    bullets: [
      "Conferir as 62 visitas domiciliares de setembro com os registros de execução, verificando a competência, o critério de contagem e possíveis duplicidades.",
      "Conciliar os 140 atendimentos particularizados e os 52 benefícios eventuais de setembro com prontuários, protocolos e comprovantes, preservando o sigilo das famílias.",
      "Revisar a continuidade do SCFV para crianças de 0 a 6 anos e a mudança de 15 para 30 adolescentes de 15 a 17 anos; registrar a justificativa das variações encontradas.",
      "Verificar se há oferta e demanda para adultos de 18 a 59 anos e confirmar a consistência dos campos de trabalho infantil e acolhimento.",
      "Manter controle mensal de entradas, estoque ativo, desligamentos e transferências no PAIF para compreender a evolução da carga de acompanhamento sem inferir saídas por diferença simples.",
      "Analisar os 19 encaminhamentos de setembro ao Cadastro Único (4 inclusões e 15 atualizações) e coordenar o atendimento de pendências com a equipe responsável pelo cadastro.",
      "Detalhar os 48 registros de ‘outros benefícios eventuais’ por tipo, motivo e público em controle interno, apoiando planejamento e transparência.",
      "Adotar fechamento mensal com responsável, prazo, conferência por amostragem e registro das correções antes do envio do RMA.",
    ],
  },
];

// Perfil das novas famílias de setembro conforme os campos do RMA.
const septemberProfile = [
  ["Famílias em extrema pobreza", 0],
  ["Famílias beneficiárias do Bolsa Família", 4],
  ["Beneficiárias do Bolsa Família com descumprimento de condicionalidades", 0],
  ["Famílias com membro beneficiário do BPC", 1],
  ["Famílias com criança/adolescente em trabalho infantil", 0],
  ["Famílias com criança/adolescente em acolhimento", 0],
] as const;

// Totais acumulados de encaminhamentos e benefícios com sua composição mensal.
const referrals = [
  ["Atualização do Cadastro Único", 59, "44 até agosto; 15 em setembro"],
  ["Inclusão no Cadastro Único", 18, "14 até agosto; 4 em setembro"],
  ["Acesso ao BPC", 32, "27 até agosto; 5 em setembro"],
  ["Famílias encaminhadas ao CREAS", 5, "4 até agosto; 1 em setembro"],
  ["Auxílio-natalidade", 14, "10 até agosto; 4 em setembro"],
  ["Auxílio-funeral", 1, "1 até agosto; nenhum em setembro"],
  ["Outros benefícios eventuais", 241, "193 até agosto; 48 em setembro"],
] as const;

// Formata os valores com separadores e convenções brasileiras.
// Formatação determinística para que servidor e navegador gerem o mesmo HTML.
const fmt = (value: number) => {
  const rounded = Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.?0+$/, "");
  const [integerPart, decimalPart] = rounded.split(".");
  const groupedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return decimalPart ? `${groupedInteger},${decimalPart}` : groupedInteger;
};

// Ícone de navegação usado no botão Início.
function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Painel reutilizável para manter padrão visual entre as seções do relatório.
function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

// Barra proporcional ao total de 125 novas famílias inseridas no PAIF.
function ProfileBar({ label, value }: { label: string; value: number }) {
  const percent = (value / 125) * 100;
  return (
    <div>
      <div className="mb-2 flex justify-between gap-3 text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-bold text-slate-800">{value} <span className="font-normal text-slate-500">({fmt(percent)}%)</span></span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-100" aria-hidden="true">
        <div className="h-full rounded-full bg-green-700" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

// Faixas etárias e cores usadas no gráfico existente do SCFV.
const groups = [
  { index: 12, label: "0 a 6 anos", color: "#86bba0", textColor: "#153728" },
  { index: 13, label: "7 a 14 anos", color: "#15803d", textColor: "#ffffff" },
  { index: 14, label: "15 a 17 anos", color: "#d19a3a", textColor: "#34250b" },
  { index: 15, label: "Pessoas idosas", color: "#8a6bb5", textColor: "#ffffff" },
];

// Gráfico de colunas empilhadas do SCFV; permanece preservado nesta versão.
function ScfvChart({ indexes }: { indexes: number[] }) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">
        {groups.map((group) => (
          <span key={group.label}>
            <span className="mr-2 inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: group.color }} />
            {group.label}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 700 290" role="img" aria-labelledby="scfv-title scfv-description" className="w-full">
        <title id="scfv-title">Registros mensais do SCFV por faixa etária</title>
        <desc id="scfv-description">
          {indexes.map((index) => `${months[index]}: ${groups.map((group) => `${group.label}, ${metrics[group.index].values[index]}`).join("; ")}`).join(". ")}
        </desc>
        {[0, 25, 50, 75, 100].map((value) => (
          <g key={value}>
            <line x1="40" x2="690" y1={245 - value * 1.8} y2={245 - value * 1.8} stroke="#e2e8f0" />
            <text x="31" y={249 - value * 1.8} textAnchor="end" fontSize="11" fill="#64748b">{value}</text>
          </g>
        ))}
        {indexes.map((index, position) => {
          const slot = 640 / indexes.length;
          const width = Math.min(46, slot * 0.65);
          const x = 45 + position * slot + (slot - width) / 2;
          let accumulated = 0;
          const bars = groups.map((group) => {
            const value = metrics[group.index].values[index];
            const height = value * 1.8;
            const top = 245 - (accumulated + value) * 1.8;
            const labelY = value > 0 ? top + height / 2 + 4 : 239;
            accumulated += value;
            return (
              <g key={group.label}>
                <rect
                  x={x}
                  y={top}
                  width={width}
                  height={height}
                  fill={group.color}
                  aria-label={`${group.label}: ${value}`}
                />
                <text x={x + width / 2} y={labelY} textAnchor="middle" fontSize="11" fontWeight="700" fill={value > 0 ? group.textColor : "#172338"} pointerEvents="none">{value}</text>
              </g>
            );
          });
          return (
            <g key={months[index]}>
              {bars}
              <text x={x + width / 2} y={235 - accumulated * 1.8} textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">{accumulated}</text>
              <text x={x + width / 2} y="269" textAnchor="middle" fontSize="12" fill="#64748b">{months[index]}</text>
            </g>
          );
        })}
      </svg>
      <p className="text-xs leading-6 text-slate-500">Soma dos registros das quatro faixas etárias. Não representa necessariamente pessoas únicas; pessoas com deficiência são apresentadas em indicador separado.</p>
    </div>
  );
}

/**
 * Desenha a linha mensal de um indicador em um SVG acessível.
 * Cada série tem escala própria para que valores pequenos também fiquem visíveis.
 */
function BenefitLineChart({
  metric,
  color,
  indexes,
}: {
  metric: Metric;
  color: string;
  indexes: number[];
}) {
  // Dimensões do SVG e espaços reservados para eixos e rótulos.
  const width = 720;
  const height = 250;
  const left = 54;
  const right = 18;
  const top = 24;
  const bottom = 42;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;

  // Os valores são filtrados de acordo com os meses escolhidos pelo usuário.
  const values = indexes.map((monthIndex) => metric.values[monthIndex]);
  const maxValue = Math.max(...values, 1);
  const axisMax = Math.ceil(maxValue / 5) * 5 || 5;

  // Define a posição horizontal de cada ponto; um único mês fica centralizado.
  const xForPosition = (position: number) =>
    indexes.length === 1
      ? left + chartWidth / 2
      : left + (position / (indexes.length - 1)) * chartWidth;

  // Converte o valor para coordenada vertical dentro da área do gráfico.
  const yForValue = (value: number) =>
    top + chartHeight - (value / axisMax) * chartHeight;

  // Cada ponto guarda seu valor e seu mês para desenhar e descrever a série.
  const points = values.map((value, position) => ({
    x: xForPosition(position),
    y: yForValue(value),
    value,
    monthIndex: indexes[position],
  }));

  // Sintaxe SVG para conectar os pontos em ordem cronológica.
  const linePath = points
    .map((point, position) => `${position === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const ticks = [0, axisMax / 2, axisMax];

  return (
    <article className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
      <div className="mb-3 flex items-start gap-3">
        <span
          className="mt-1 h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        <div>
          <h4 className="text-sm font-bold leading-5 text-slate-800">
            {metric.label}
          </h4>
          <p className="mt-1 text-xs text-slate-500">
            Evolução mensal · valores registrados
          </p>
        </div>
      </div>

      {/* Rolagem horizontal mantém os rótulos legíveis em telas estreitas. */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`Evolução mensal: ${metric.label}`}
          aria-description={points
            .map((point) => `${months[point.monthIndex]}: ${fmt(point.value)}`)
            .join("; ")}
          className="min-w-[560px] w-full"
        >

          {/* Linhas-guia e rótulos da escala vertical. */}
          {ticks.map((tick) => {
            const y = yForValue(tick);
            return (
              <g key={tick}>
                <line
                  x1={left}
                  x2={width - right}
                  y1={y}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray={tick === 0 ? undefined : "4 4"}
                />
                <text
                  x={left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#64748b"
                >
                  {fmt(tick)}
                </text>
              </g>
            );
          })}

          {/* A linha é mostrada quando há mais de um mês selecionado. */}
          {points.length > 1 && (
            <path
              d={linePath}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Pontos, valores numéricos e meses da série. */}
          {points.map((point) => (
            <g key={point.monthIndex}>
              {points.length === 1 && (
                <line
                  x1={left}
                  x2={width - right}
                  y1={point.y}
                  y2={point.y}
                  stroke={color}
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  opacity="0.5"
                />
              )}
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="white"
                stroke={color}
                strokeWidth="3"
              >
                <title>
                  {months[point.monthIndex]}: {fmt(point.value)}
                </title>
              </circle>
              <text
                x={point.x}
                y={Math.max(top + 12, point.y - 11)}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#334155"
              >
                {fmt(point.value)}
              </text>
              <text
                x={point.x}
                y={height - 12}
                textAnchor="middle"
                fontSize="11"
                fill="#64748b"
              >
                {months[point.monthIndex]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </article>
  );
}

/**
 * Mostra os quatro indicadores principais no formato 2×2 da página de referência.
 * Reutiliza o componente de linha para conservar escalas, rótulos e acessibilidade.
 */
function MainIndicatorsChart({ indexes }: { indexes: number[] }) {
  // Mantém a mesma seleção visual da imagem: PAIF, novas famílias, atendimentos e visitas.
  const mainMetrics = [
    { metric: metrics[0], color: "#15803d" },
    { metric: metrics[1], color: "#d19a3a" },
    { metric: metrics[2], color: "#0f766e" },
    { metric: metrics[3], color: "#8a6bb5" },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {mainMetrics.map(({ metric, color }) => (
        <BenefitLineChart
          key={metric.label}
          metric={metric}
          color={color}
          indexes={indexes}
        />
      ))}
    </div>
  );
}

/**
 * Apresenta a evolução total e por categoria dos benefícios eventuais,
 * além de uma tabela com os números exatos do período filtrado.
 */
function BenefitsEvolutionChart({ indexes }: { indexes: number[] }) {
  // Categorias são referenciadas pelos índices definidos em `metrics`.
  const categories = [
    { metric: metrics[8], color: "#15803d" },
    { metric: metrics[9], color: "#d19a3a" },
    { metric: metrics[10], color: "#3478a5" },
  ];

  // Calcula a soma mensal das três categorias para traçar uma linha total.
  const totalMetric: Metric = {
    label: "Total de benefícios eventuais",
    values: months.map((_, monthIndex) =>
      categories.reduce(
        (sum, category) => sum + category.metric.values[monthIndex],
        0,
      ),
    ),
    kind: "sum",
  };

  // O total aparece primeiro; em seguida, cada benefício aparece em uma linha própria.
  const charts = [
    { metric: totalMetric, color: "#0f766e" },
    ...categories,
  ];

  // Soma os meses atualmente selecionados para a coluna de total da tabela.
  const periodTotal = indexes.reduce(
    (sum, monthIndex) => sum + totalMetric.values[monthIndex],
    0,
  );

  return (
    <div className="border-t border-slate-200 pt-5">
      <div className="mb-4">
        <h3 className="text-base font-extrabold text-slate-900">
          Evolução dos benefícios eventuais
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Dados de janeiro a setembro de 2026. Outubro a dezembro ainda não
          constam na base recebida. Cada linha usa escala própria.
        </p>
      </div>

      {/* Grade responsiva com o total e as três categorias de benefício. */}
      <div className="grid gap-4 lg:grid-cols-2">
        {charts.map(({ metric, color }) => (
          <BenefitLineChart
            key={metric.label}
            metric={metric}
            color={color}
            indexes={indexes}
          />
        ))}
      </div>

      {/* Tabela complementar para leitura dos valores exatos por competência. */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-xs">
          <caption className="sr-only">
            Benefícios eventuais por mês e total do período selecionado
          </caption>
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left">Benefício</th>
              {indexes.map((monthIndex) => (
                <th key={monthIndex} scope="col" className="px-3 py-2.5 text-right">
                  {months[monthIndex]}
                </th>
              ))}
              <th scope="col" className="whitespace-nowrap px-3 py-2.5 text-right">
                Total do período
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map(({ metric }) => {
              // Soma somente os meses selecionados para esta categoria.
              const total = indexes.reduce(
                (sum, monthIndex) => sum + metric.values[monthIndex],
                0,
              );
              return (
                <tr key={metric.label} className="border-b border-slate-100 even:bg-slate-50">
                  <th scope="row" className="whitespace-nowrap px-3 py-2.5 text-left font-semibold text-slate-700">
                    {metric.label}
                  </th>
                  {indexes.map((monthIndex) => (
                    <td key={monthIndex} className="px-3 py-2.5 text-right tabular-nums text-slate-600">
                      {fmt(metric.values[monthIndex])}
                    </td>
                  ))}
                  <td className="bg-green-50 px-3 py-2.5 text-right font-bold tabular-nums text-green-800">
                    {fmt(total)}
                  </td>
                </tr>
              );
            })}
            <tr className="bg-green-50/70">
              <th scope="row" className="px-3 py-2.5 text-left font-extrabold text-slate-800">
                Total mensal
              </th>
              {indexes.map((monthIndex) => (
                <td key={monthIndex} className="px-3 py-2.5 text-right font-bold tabular-nums text-slate-800">
                  {fmt(totalMetric.values[monthIndex])}
                </td>
              ))}
              <td className="px-3 py-2.5 text-right font-black tabular-nums text-green-800">
                {fmt(periodTotal)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente principal da página; controla o período e os valores agregados.
export default function RmaCrasCameliaGabyPage() {
  // "all" mantém os nove meses; qualquer outro valor é o índice de um mês.
  const [selectedMonth, setSelectedMonth] = useState("all");

  // Índices dos meses escolhidos, reutilizados por cartões, tabela e gráficos.
  const indexes = selectedMonth === "all" ? months.map((_, index) => index) : [Number(selectedMonth)];

  // Soma métricas de fluxo e calcula média para indicadores classificados como estoque.
  const aggregate = (index: number) => {
    const metric = metrics[index];
    const sum = indexes.reduce((total, monthIndex) => total + metric.values[monthIndex], 0);
    return metric.kind === "average" ? sum / indexes.length : sum;
  };
  // Define o texto do período exibido em cartões e painéis.
  const fullPeriod = selectedMonth === "all";
  const period = fullPeriod ? "Janeiro a setembro de 2026" : `${months[Number(selectedMonth)]} de 2026`;
  // Cartões de resumo do período filtrado.
  const kpis = [
    { label: fullPeriod ? "Média de famílias no PAIF" : "Famílias no PAIF", value: aggregate(0), note: "Estoque de famílias em acompanhamento" },
    { label: "Novas famílias no PAIF", value: aggregate(1), note: "Inserções no período selecionado" },
    { label: "Atendimentos particularizados", value: aggregate(2), note: "Volume registrado de atendimentos" },
    { label: "Visitas domiciliares", value: aggregate(3), note: "Volume registrado de visitas" },
    { label: "Encaminhamentos ao Cadastro Único", value: aggregate(4) + aggregate(5), note: "Inclusão e atualização cadastral" },
    { label: "Benefícios eventuais concedidos", value: aggregate(8) + aggregate(9) + aggregate(10), note: "Natalidade, funeral e outros benefícios" },
  ];

  return (
    <main className="min-h-screen bg-[#f3f2ed] text-slate-900">
      {/* Cabeçalho institucional com os atalhos de início e retorno ao painel PSB. */}
      <header className="border-b border-white/10 bg-[#102b27] text-white print:hidden">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <Link
            href="/"
            aria-label="Página inicial"
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
              <p className="mt-1 text-xs text-emerald-100/65">
                Plataforma da Vigilância Socioassistencial
              </p>
            </div>
          </Link>

          <nav
            aria-label="Navegação principal"
            className="flex shrink-0 flex-col gap-2"
          >
            <Link
              href="/"
              className="inline-flex min-w-[96px] items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]"
            >
              Início
              <ArrowIcon />
            </Link>
            <Link
              href="/painel/psb"
              className="inline-flex min-w-[96px] items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]"
            >
              <span aria-hidden="true">←</span>
              Voltar
            </Link>
          </nav>
        </div>

        <div className="border-t border-white/10 px-5 py-3 text-white sm:hidden">
          <p className="text-sm font-extrabold">SEMTEPS</p>
          <p className="mt-0.5 text-xs text-emerald-100/70">
            Plataforma da Vigilância Socioassistencial
          </p>
        </div>
      </header>

      {/* Conteúdo principal: título, filtro, indicadores, tabelas, gráficos e análise. */}
      <div className="mx-auto w-full max-w-[1440px] space-y-6 px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-green-700">Vigilância Socioassistencial</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Análise do RMA do CRAS Camélia Gaby Ferraz</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">Unidade nº 15065040087 · Americano · Santa Izabel do Pará · 2026</p>
          </div>
          <button type="button" onClick={() => window.print()} className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-600 print:hidden">Imprimir / salvar PDF</button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">{period}</span>
            <p className="mt-2 text-xs text-slate-500">Dados estáticos de janeiro a setembro de 2026. Outubro a dezembro ainda não foram consolidados.</p>
          </div>
          <div className="flex items-center gap-3 print:hidden">
            <label htmlFor="month" className="text-sm font-semibold text-slate-600">Período</label>
            <select id="month" value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-600" style={{ color: "#000000", backgroundColor: "#ffffff", colorScheme: "light" }}>
              <option value="all" style={{ color: "#000000", backgroundColor: "#ffffff" }}>Janeiro a setembro</option>
              {months.map((month, index) => <option key={month} value={index} style={{ color: "#000000", backgroundColor: "#ffffff" }}>{month} / 2026</option>)}
            </select>
          </div>
        </div>

        <p className="text-sm text-slate-600">O filtro atualiza os indicadores, a tabela e o gráfico. A análise geral, os perfis e as recomendações abrangem janeiro a setembro.</p>
        {/* Indicadores resumidos em cartões que se reorganizam conforme a largura. */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map((kpi) => <div key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-semibold text-slate-500">{kpi.label}</p><p className="mt-3 text-3xl font-black text-green-700">{fmt(kpi.value)}</p><p className="mt-2 text-xs leading-5 text-slate-500">{kpi.note}</p></div>)}
        </div>

        {/* Síntese quantitativa do período completo com destaques do mês de setembro. */}
        <Panel title="Leitura geral do período" subtitle="Janeiro a setembro de 2026">
          <p className="text-sm leading-7 text-slate-600">O CRAS registrou média de 116,9 famílias acompanhadas, 125 novas inserções, 1.171 atendimentos particularizados, 168 visitas domiciliares e 256 benefícios eventuais. Setembro teve 133 famílias acompanhadas, 140 atendimentos, 62 visitas e 52 benefícios eventuais. As oscilações de setembro merecem validação com os registros de origem antes de serem interpretadas como aumento efetivo da demanda.</p>
          <div className="grid gap-4 sm:grid-cols-3">{[["133", "famílias acompanhadas em setembro, maior estoque do período"], ["62", "visitas em setembro; maior valor da série"], ["448", "participações em palestras e oficinas no período"]].map(([value, label]) => <div key={label} className="rounded-lg bg-slate-50 p-4"><p className="text-xl font-extrabold text-slate-800">{value}</p><p className="mt-1 text-xs leading-5 text-slate-500">{label}</p></div>)}</div>
        </Panel>

        {/* Tabela de todos os indicadores; gráficos ficam logo abaixo. */}
        <Panel title="Índices mensais" subtitle={period}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-sm">
              <caption className="sr-only">Indicadores do CRAS Camélia Gaby Ferraz</caption>
              <thead className="bg-slate-50 text-slate-500"><tr><th scope="col" className="px-3 py-3 text-left">Indicador</th>{indexes.map((index) => <th key={index} scope="col" className="px-3 py-3 text-right">{months[index]}</th>)}<th scope="col" className="whitespace-nowrap px-3 py-3 text-right">Total do período</th><th scope="col" className="whitespace-nowrap px-3 py-3 text-right">Média mensal</th></tr></thead>
              <tbody>{metrics.map((metric) => { const total = indexes.reduce((sum, monthIndex) => sum + metric.values[monthIndex], 0); const average = total / indexes.length; return <tr key={metric.label} className="border-b border-slate-100 even:bg-slate-50"><th scope="row" className="min-w-[220px] px-3 py-3 text-left font-semibold text-slate-700">{metric.label}</th>{indexes.map((monthIndex) => <td key={monthIndex} className="px-3 py-3 text-right tabular-nums text-slate-600">{fmt(metric.values[monthIndex])}</td>)}<td className="whitespace-nowrap bg-green-50 px-3 py-3 text-right font-bold text-green-800">{fmt(total)}</td><td className="whitespace-nowrap bg-green-50 px-3 py-3 text-right font-bold text-green-800">{fmt(average)}</td></tr>; })}</tbody>
            </table>
          </div>
          <p className="text-xs leading-6 text-slate-500">Total do período é a soma dos meses selecionados; média mensal é o total dividido pela quantidade de meses selecionados. Para indicadores de estoque e participação, o total soma registros mensais e não representa famílias ou pessoas únicas. Perfis familiares podem se sobrepor.</p>
          {/* Gráficos principais no padrão 2×2 mostrado na imagem de referência. */}
          <div className="border-t border-slate-200 pt-5">
            <div className="mb-4">
              <h3 className="text-base font-extrabold text-slate-900">
                Evolução mensal dos principais indicadores
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Cada gráfico usa sua própria escala vertical. Os valores junto
                aos pontos indicam os registros de cada mês.
              </p>
            </div>
            <MainIndicatorsChart indexes={indexes} />
          </div>
          {/* Linha gráfica de benefícios adicionada sem remover o gráfico existente do SCFV. */}
          <BenefitsEvolutionChart indexes={indexes} />
        </Panel>

        {/* Painéis analíticos com perfis, encaminhamentos, SCFV e recomendações. */}
        {sections.map((section) => (
          <Panel key={section.title} title={section.title} subtitle="Janeiro a setembro de 2026">
            {section.title === "Perfil das 125 novas famílias" && (
              <div className="space-y-4">
                <ProfileBar label="Com membro beneficiário do BPC" value={77} />
                <ProfileBar label="Beneficiárias do Bolsa Família" value={23} />
                <ProfileBar label="Em extrema pobreza" value={3} />
                <ProfileBar label="PBF em descumprimento de condicionalidades" value={1} />
                <ProfileBar label="Com crianças/adolescentes em trabalho infantil" value={0} />
                <ProfileBar label="Com crianças/adolescentes em acolhimento" value={0} />
                <p className="text-xs leading-6 text-slate-500">Percentuais calculados sobre 125 novas inserções. Categorias podem se sobrepor e não são exaustivas.</p>
                <div className="rounded-lg border border-green-100 bg-green-50/60 p-4">
                  <h3 className="text-sm font-bold text-slate-800">Perfil das novas famílias em setembro</h3>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[420px] text-sm">
                      <thead><tr className="border-b border-green-100 text-slate-600"><th scope="col" className="py-2 text-left font-semibold">Indicador informado no RMA</th><th scope="col" className="py-2 text-right font-semibold">Setembro</th></tr></thead>
                      <tbody>{septemberProfile.map(([label, value]) => <tr key={label} className="border-b border-green-100/70 last:border-0"><th scope="row" className="py-2 text-left font-medium text-slate-700">{label}</th><td className="py-2 text-right font-bold tabular-nums text-slate-900">{value}</td></tr>)}</tbody>
                    </table>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-500">As condições podem se sobrepor; os valores não precisam somar as 8 novas famílias inseridas no PAIF em setembro.</p>
                </div>
              </div>
            )}
            {section.title === "Encaminhamentos e benefícios" && (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead className="bg-slate-50"><tr><th scope="col" className="px-3 py-3 text-left">Item</th><th scope="col" className="px-3 py-3 text-right">Total</th><th scope="col" className="px-3 py-3 text-left">Composição</th></tr></thead>
                  <tbody>{referrals.map(([label, total, note]) => <tr key={label} className="border-b border-slate-100 even:bg-slate-50"><th scope="row" className="px-3 py-3 text-left font-semibold text-slate-700">{label}</th><td className="px-3 py-3 text-right font-bold text-green-700">{total}</td><td className="px-3 py-3 text-slate-500">{note}</td></tr>)}</tbody>
                </table>
              </div>
            )}
            {section.title === "Serviços de convivência e atividades coletivas" && <ScfvChart indexes={indexes} />}
            {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-sm leading-7 text-slate-600">{paragraph}</p>)}
            {section.bullets.length > 0 && <ul className="list-disc space-y-3 pl-5 text-sm leading-7 text-slate-600">{section.bullets.map((bullet) => <li key={bullet} className="pl-1">{bullet}</li>)}</ul>}
          </Panel>
        ))}

        {/* Conclusão consolidada para orientar o acompanhamento da gestão. */}
        <Panel title="Conclusão" subtitle="Síntese para acompanhamento da gestão">
          <p className="text-sm leading-7 text-slate-600">Os dados apontam crescimento do estoque PAIF e ampliação dos registros de visitas, atendimentos e benefícios em setembro. Ao mesmo tempo, há alterações concentradas em um mês e mudanças de composição no SCFV que precisam de conferência. A prioridade é validar os registros de setembro, restabelecer comparabilidade entre competências e usar os dados revisados para orientar a continuidade das ofertas e a organização do acompanhamento familiar.</p>
        </Panel>

        {/* Fontes, limites de interpretação e identificação institucional. */}
        <footer className="border-t border-slate-200 pt-5 text-xs leading-6 text-slate-500">
          <p>Fontes: base do RMA de janeiro a agosto e RMA do CRAS Camélia Gaby Ferraz de setembro de 2026, unidade nº 15065040087.</p>
          <p className="mt-2">Os indicadores representam registros administrativos do serviço, não cobertura populacional nem contagem garantida de usuários únicos. Esta página não envia dados ao sistema oficial do RMA.</p>
          <p className="mt-3 font-semibold">SEMTEPS · Prefeitura de Santa Izabel do Pará</p>
        </footer>
      </div>
    </main>
  );
}

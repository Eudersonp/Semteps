"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

type Quarter = "all" | "q1" | "q2";
type Month = {
  name: string;
  quarter: "q1" | "q2";
  rg: number;
  militaryTotal: number;
};

type MilitaryService = {
  name: string;
  values: (number | null)[];
};

const months: Month[] = [
  { name: "Jan", quarter: "q1", rg: 968, militaryTotal: 172 },
  { name: "Fev", quarter: "q1", rg: 846, militaryTotal: 106 },
  { name: "Mar", quarter: "q1", rg: 746, militaryTotal: 123 },
  { name: "Abr", quarter: "q2", rg: 729, militaryTotal: 126 },
  { name: "Mai", quarter: "q2", rg: 834, militaryTotal: 140 },
  { name: "Jun", quarter: "q2", rg: 713, militaryTotal: 113 },
];

const militaryServices: MilitaryService[] = [
  { name: "Alistamento militar", values: [91, 56, 52, 56, 67, 60] },
  { name: "1ª via de certificado militar", values: [73, 45, 62, 55, 65, 45] },
  { name: "2ª via de certificado militar", values: [7, 2, 5, 12, 5, 5] },
  { name: "Retificação de dados", values: [0, 2, 1, 0, 0, 0] },
  { name: "Isenção do serviço militar", values: [0, 1, 2, 1, 2, 0] },
  { name: "2ª via de certificado de reservista", values: [1, 0, 1, 0, 0, 0] },
  { name: "Atestado de desobrigado", values: [null, null, null, 2, 1, 3] },
];

const digitalServices = [
  { name: "CTPS digital", q1: 126, q2: 112 },
  { name: "CPF", q1: 89, q2: 96 },
  { name: "Senha Gov", q1: 57, q2: 92 },
  { name: "Carteira do Idoso", q1: 40, q2: 115 },
  { name: "2ª via do título de eleitor", q1: 16, q2: 18 },
  { name: "Seguro-desemprego", q1: 2, q2: 4 },
];

const fmt = (value: number) =>
  value.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

const sum = (values: number[]) =>
  values.reduce((total, value) => total + value, 0);

const quarterLabel = (quarter: Quarter) =>
  quarter === "q1"
    ? "1º trimestre (jan–mar)"
    : quarter === "q2"
      ? "2º trimestre (abr–jun)"
      : "1º semestre (jan–jun)";

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

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>
      )}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function RgChart({ data }: { data: Month[] }) {
  const maxValue = Math.max(100, ...data.map((month) => month.rg));
  const plotHeight = 150;
  const baseline = 190;
  const slot = 620 / Math.max(data.length, 1);
  const barWidth = Math.min(52, slot * 0.55);

  return (
    <svg
      viewBox="0 0 680 235"
      role="img"
      aria-labelledby="rg-chart-title rg-chart-desc"
      className="w-full"
    >
      <title id="rg-chart-title">Emissões de Registro Geral por mês</title>
      <desc id="rg-chart-desc">
        {data
          .map((item) => `${item.name}: ${item.rg} emissões`)
          .join("; ")}
      </desc>

      {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
        const y = baseline - plotHeight * fraction;

        return (
          <g key={fraction}>
            <line
              x1="42"
              x2="670"
              y1={y}
              y2={y}
              stroke="#e2e8f0"
            />
            <text
              x="34"
              y={y + 4}
              textAnchor="end"
              fontSize="11"
              fill="#64748b"
            >
              {fmt(Math.round(maxValue * fraction))}
            </text>
          </g>
        );
      })}

      {data.map((item, index) => {
        const x = 48 + index * slot + (slot - barWidth) / 2;
        const height = (item.rg / maxValue) * plotHeight;
        const color = item.quarter === "q1" ? "#0f6b8a" : "#d19a3a";

        return (
          <g key={item.name}>
            <rect
              x={x}
              y={baseline - height}
              width={barWidth}
              height={height}
              rx="4"
              fill={color}
            />
            <text
              x={x + barWidth / 2}
              y={baseline - height - 8}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="#14213d"
            >
              {fmt(item.rg)}
            </text>
            <text
              x={x + barWidth / 2}
              y="216"
              textAnchor="middle"
              fontSize="12"
              fill="#64748b"
            >
              {item.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-black tracking-tight text-cyan-800">
        {value}
      </p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p>
    </div>
  );
}

export default function IdentificacaoCivilPage() {
  const [quarter, setQuarter] = useState<Quarter>("all");

  const visibleMonths = useMemo(
    () =>
      quarter === "all"
        ? months
        : months.filter((month) => month.quarter === quarter),
    [quarter],
  );

  const visibleIndexes = visibleMonths.map((month) => months.indexOf(month));

  const rgTotal = sum(visibleMonths.map((month) => month.rg));
  const militaryTotal = sum(
    visibleMonths.map((month) => month.militaryTotal),
  );

  const digitalTotal = digitalServices.reduce(
    (total, service) =>
      total +
      (quarter === "q1"
        ? service.q1
        : quarter === "q2"
          ? service.q2
          : service.q1 + service.q2),
    0,
  );

  const overallTotal = rgTotal + militaryTotal + digitalTotal;

  const enlistmentTotal = sum(
    visibleIndexes.map(
      (index) => militaryServices[0].values[index] ?? 0,
    ),
  );

  const elderlyCardTotal =
    quarter === "q1" ? 40 : quarter === "q2" ? 115 : 155;

  const totalDetail =
    quarter === "q1" ? 3291 : quarter === "q2" ? 3092 : 6383;

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white print:hidden">
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
                <span className="block">
                  e Promoção Social - SEMTEPS
                </span>
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
            <span className="block">
              e Promoção Social - SEMTEPS
            </span>
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Plataforma da Vigilância Socioassistencial
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-6 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-cyan-800">
              Vigilância Socioassistencial
            </p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
              Análise do Setor de Identificação Civil
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Relatórios de Gestão do 1º trimestre (janeiro a março) e do 2º
              trimestre (abril a junho) de 2026.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2 print:hidden"
          >
            Imprimir / salvar PDF
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800">
              Janeiro a junho de 2026
            </span>
            <p className="mt-2 text-xs text-slate-500">
              Dados estáticos dos relatórios anexados · Totais conforme
              apresentados e observações de consistência abaixo.
            </p>
          </div>

          <div className="flex items-center gap-3 print:hidden">
            <label
              htmlFor="quarter"
              className="text-sm font-semibold text-slate-600"
            >
              Período
            </label>
            <select
              id="quarter"
              value={quarter}
              onChange={(event) =>
                setQuarter(event.target.value as Quarter)
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-700"
            >
              <option value="all">1º semestre — todos os meses</option>
              <option value="q1">1º trimestre — jan a mar</option>
              <option value="q2">2º trimestre — abr a jun</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-slate-600">
          Indicadores e gráficos: <strong>{quarterLabel(quarter)}</strong>. A
          tabela de serviços digitais apresenta os totais trimestrais
          disponíveis no relatório.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Atendimentos totais"
            value={fmt(overallTotal)}
            detail={`${fmt(totalDetail)} no período selecionado`}
          />
          <MetricCard
            label="Emissões de RG"
            value={fmt(rgTotal)}
            detail={`${fmt(rgTotal / visibleMonths.length)} por mês, em média`}
          />
          <MetricCard
            label="Atendimentos da Junta Militar"
            value={fmt(militaryTotal)}
            detail="Soma dos serviços militares registrados"
          />
          <MetricCard
            label="Serviços digitais"
            value={fmt(digitalTotal)}
            detail="CTPS, CPF, Senha Gov e outros serviços digitais"
          />
          <MetricCard
            label="Alistamentos militares"
            value={fmt(enlistmentTotal)}
            detail="Registros no período selecionado"
          />
          <MetricCard
            label="Carteiras do Idoso"
            value={fmt(elderlyCardTotal)}
            detail="40 no 1º trimestre e 115 no 2º"
          />
        </div>

        <Panel
          title="Síntese do período"
          subtitle="Leitura dos indicadores registrados no relatório"
        >
          <p className="text-sm leading-7 text-slate-600">
            O setor registrou{" "}
            <strong className="text-slate-900">6.383 atendimentos</strong> no
            semestre. As emissões de Registro Geral (RG) somaram{" "}
            <strong className="text-slate-900">4.836</strong>, cerca de 76% do
            total. O volume mensal de RG caiu de 968 em janeiro para 713 em
            junho (redução de aproximadamente 26%). Os serviços digitais
            cresceram de 330 no primeiro trimestre para 437 no segundo
            (+32,4%), com destaque para a Carteira do Idoso.
          </p>
          <p className="mt-3 text-xs leading-6 text-slate-500">
            O relatório não informa características demográficas ou
            territoriais das pessoas atendidas. A descrição de públicos por
            tipo de serviço é indicativa e não substitui dados de perfil.
          </p>
        </Panel>

        <Panel
          title="Panorama do semestre"
          subtitle="Comparação entre os dois trimestres"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-sm">
              <caption className="sr-only">
                Resumo trimestral dos atendimentos do Setor de Identificação
                Civil
              </caption>
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th
                    scope="col"
                    className="border-b border-slate-200 px-3 py-3 text-left font-semibold"
                  >
                    Serviço
                  </th>
                  <th
                    scope="col"
                    className="border-b border-slate-200 px-3 py-3 text-right font-semibold"
                  >
                    1º trimestre
                  </th>
                  <th
                    scope="col"
                    className="border-b border-slate-200 px-3 py-3 text-right font-semibold"
                  >
                    2º trimestre
                  </th>
                  <th
                    scope="col"
                    className="border-b border-slate-200 px-3 py-3 text-right font-semibold"
                  >
                    Semestre
                  </th>
                  <th
                    scope="col"
                    className="border-b border-slate-200 px-3 py-3 text-right font-semibold"
                  >
                    Variação
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Emissão de Registro Geral", 2560, 2276, 4836, "−11,1%"],
                  ["Junta de Serviço Militar", 401, 379, 780, "−5,5%"],
                  ["Serviços digitais", 330, 437, 767, "+32,4%"],
                  ["Total", 3291, 3092, 6383, "−6,0%"],
                ].map(([name, q1, q2, semester, variation]) => (
                  <tr key={String(name)} className="even:bg-slate-50">
                    <th
                      scope="row"
                      className="border-b border-slate-100 px-3 py-3 text-left font-semibold text-slate-700"
                    >
                      {name}
                    </th>
                    <td className="border-b border-slate-100 px-3 py-3 text-right tabular-nums text-slate-600">
                      {fmt(Number(q1))}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3 text-right tabular-nums text-slate-600">
                      {fmt(Number(q2))}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3 text-right font-bold tabular-nums text-slate-800">
                      {fmt(Number(semester))}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3 text-right font-semibold text-slate-600">
                      {variation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel
          title="Emissão de Registro Geral (RG)"
          subtitle="Quantidade mensal · azul: 1º trimestre; dourado: 2º trimestre"
        >
          <RgChart data={visibleMonths} />
          <p className="mt-4 text-sm leading-7 text-slate-600">
            O pico ocorreu em janeiro, com 968 emissões. O volume caiu até
            abril (729), recuperou em maio (834) e voltou a cair em junho
            (713), menor resultado mensal do semestre. O total passou de
            2.560 no primeiro trimestre para 2.276 no segundo (−11,1%).
          </p>
        </Panel>

        <Panel
          title="Junta de Serviço Militar"
          subtitle="Atendimentos por serviço e mês"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-sm">
              <caption className="sr-only">
                Atendimentos mensais da Junta de Serviço Militar
              </caption>
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th
                    scope="col"
                    className="border-b border-slate-200 px-3 py-3 text-left font-semibold"
                  >
                    Serviço
                  </th>
                  {visibleMonths.map((month) => (
                    <th
                      key={month.name}
                      scope="col"
                      className="border-b border-slate-200 px-3 py-3 text-right font-semibold"
                    >
                      {month.name}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="border-b border-slate-200 px-3 py-3 text-right font-semibold"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {militaryServices.map((service) => {
                  const selectedValues = visibleIndexes.map(
                    (index) => service.values[index],
                  );
                  const rowTotal = sum(
                    selectedValues.map((value) => value ?? 0),
                  );

                  return (
                    <tr key={service.name} className="even:bg-slate-50">
                      <th
                        scope="row"
                        className="border-b border-slate-100 px-3 py-3 text-left font-semibold text-slate-700"
                      >
                        {service.name}
                      </th>
                      {selectedValues.map((value, index) => (
                        <td
                          key={`${service.name}-${index}`}
                          className="border-b border-slate-100 px-3 py-3 text-right tabular-nums text-slate-600"
                        >
                          {value === null ? "–" : fmt(value)}
                        </td>
                      ))}
                      <td className="border-b border-slate-100 px-3 py-3 text-right font-bold tabular-nums text-slate-800">
                        {fmt(rowTotal)}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-cyan-50 font-bold text-cyan-900">
                  <th scope="row" className="px-3 py-3 text-left">
                    Total da Junta
                  </th>
                  {visibleMonths.map((month) => (
                    <td
                      key={month.name}
                      className="px-3 py-3 text-right tabular-nums"
                    >
                      {fmt(month.militaryTotal)}
                    </td>
                  ))}
                  <td className="px-3 py-3 text-right tabular-nums">
                    {fmt(militaryTotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            O alistamento militar lidera com 382 registros no semestre, seguido
            da 1ª via de certificado militar, com 345. Janeiro foi o mês de
            maior movimento na Junta (172); fevereiro, o menor (106). O 2º
            trimestre teve 379 atendimentos, ante 401 no primeiro.
          </p>
        </Panel>

        <Panel
          title="Serviços digitais"
          subtitle="O relatório apresenta estes dados por trimestre, sem abertura mensal"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-sm">
              <caption className="sr-only">
                Serviços digitais por trimestre
              </caption>
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th
                    scope="col"
                    className="border-b border-slate-200 px-3 py-3 text-left font-semibold"
                  >
                    Serviço
                  </th>
                  <th
                    scope="col"
                    className="border-b border-slate-200 px-3 py-3 text-right font-semibold"
                  >
                    1º trimestre
                  </th>
                  <th
                    scope="col"
                    className="border-b border-slate-200 px-3 py-3 text-right font-semibold"
                  >
                    2º trimestre
                  </th>
                  <th
                    scope="col"
                    className="border-b border-slate-200 px-3 py-3 text-right font-semibold"
                  >
                    Semestre
                  </th>
                  <th
                    scope="col"
                    className="border-b border-slate-200 px-3 py-3 text-right font-semibold"
                  >
                    Variação
                  </th>
                </tr>
              </thead>
              <tbody>
                {digitalServices.map((service) => {
                  const total = service.q1 + service.q2;
                  const variation =
                    service.q1 === 0
                      ? null
                      : ((service.q2 - service.q1) / service.q1) * 100;
                  const variationText =
                    variation === null
                      ? "—"
                      : `${variation > 0 ? "+" : ""}${variation.toLocaleString(
                          "pt-BR",
                          { maximumFractionDigits: 1 },
                        )}%`;

                  return (
                    <tr key={service.name} className="even:bg-slate-50">
                      <th
                        scope="row"
                        className="border-b border-slate-100 px-3 py-3 text-left font-semibold text-slate-700"
                      >
                        {service.name}
                      </th>
                      <td className="border-b border-slate-100 px-3 py-3 text-right tabular-nums text-slate-600">
                        {fmt(service.q1)}
                      </td>
                      <td className="border-b border-slate-100 px-3 py-3 text-right tabular-nums text-slate-600">
                        {fmt(service.q2)}
                      </td>
                      <td className="border-b border-slate-100 px-3 py-3 text-right font-bold tabular-nums text-slate-800">
                        {fmt(total)}
                      </td>
                      <td className="border-b border-slate-100 px-3 py-3 text-right text-slate-600">
                        {variationText}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-cyan-50 font-bold text-cyan-900">
                  <th scope="row" className="px-3 py-3 text-left">
                    Total
                  </th>
                  <td className="px-3 py-3 text-right tabular-nums">330</td>
                  <td className="px-3 py-3 text-right tabular-nums">437</td>
                  <td className="px-3 py-3 text-right tabular-nums">767</td>
                  <td className="px-3 py-3 text-right">+32,4%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            A CTPS digital foi o serviço digital mais utilizado no semestre
            (238), mas recuou 11,1%. A Carteira do Idoso passou de 40 para 115
            atendimentos (+187,5%), e a Senha Gov cresceu de 57 para 92
            (+61,4%).
          </p>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel
            title="Públicos indicados pelos serviços"
            subtitle="Inferência pelo tipo de atendimento; o relatório não apresenta perfil individual"
          >
            <ul className="space-y-3 text-sm leading-7 text-slate-600">
              <li>
                <strong className="text-slate-800">
                  Jovens em idade de alistamento:
                </strong>{" "}
                382 alistamentos e 345 primeiras vias de certificado militar.
              </li>
              <li>
                <strong className="text-slate-800">
                  Pessoas que buscam documentação:
                </strong>{" "}
                4.836 emissões de RG e atendimentos de CPF.
              </li>
              <li>
                <strong className="text-slate-800">Trabalhadores:</strong> 238
                atendimentos de CTPS digital e 6 de seguro-desemprego.
              </li>
              <li>
                <strong className="text-slate-800">Pessoas idosas:</strong>{" "}
                155 Carteiras do Idoso, com crescimento no 2º trimestre.
              </li>
              <li>
                <strong className="text-slate-800">Eleitores:</strong> 34
                segundas vias de título de eleitor.
              </li>
            </ul>
          </Panel>

          <Panel
            title="Pontos de atenção nos dados"
            subtitle="Verificações recomendadas antes da consolidação anual"
          >
            <ul className="space-y-3 text-sm leading-7 text-slate-600">
              <li>
                <strong className="text-slate-800">
                  Total da 1ª via militar:
                </strong>{" "}
                os detalhes do 1º trimestre somam 180, enquanto uma tabela
                informa 181. Os totais semestrais usados aqui são os
                detalhados: 345 na 1ª via e 780 na Junta.
              </li>
              <li>
                <strong className="text-slate-800">
                  Tabelas trimestrais diferentes:
                </strong>{" "}
                “atestado de desobrigado” aparece somente no 2º trimestre; é
                preciso confirmar se houve registro no primeiro.
              </li>
              <li>
                <strong className="text-slate-800">Serviços digitais:</strong>{" "}
                não há distribuição mensal, o que impede analisar sua evolução
                mês a mês.
              </li>
              <li>
                <strong className="text-slate-800">Definição de RG:</strong> o
                relatório não esclarece se o número representa emissões
                concluídas ou atendimentos realizados.
              </li>
              <li>
                <strong className="text-slate-800">
                  Sem comparação anual:
                </strong>{" "}
                não há metas nem dados de 2025 para avaliar sazonalidade ou
                cumprimento de objetivos.
              </li>
            </ul>
          </Panel>
        </div>

        <Panel title="Recomendações para a gestão">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-600">
            <li>
              Investigar a redução das emissões de RG de janeiro a junho e
              verificar agenda, disponibilidade de vagas e insumos.
            </li>
            <li>
              Manter e ampliar a divulgação dos serviços digitais,
              especialmente Carteira do Idoso e Senha Gov.
            </li>
            <li>
              Registrar os serviços digitais mensalmente e padronizar as
              tabelas dos relatórios trimestrais.
            </li>
            <li>
              Incluir idade, sexo e bairro ou distrito, com os devidos cuidados
              de privacidade, para conhecer melhor o público atendido.
            </li>
            <li>
              Corrigir a divergência no total da primeira via de certificado
              militar e revisar os nomes dos serviços antes de consolidar o
              relatório anual.
            </li>
            <li>
              Comparar os dados com 2025 para verificar se o pico de janeiro se
              repete.
            </li>
          </ol>
        </Panel>

        <footer className="border-t border-slate-200 pt-5 text-xs leading-6 text-slate-500">
          <p>
            Fonte: Relatórios de Gestão do Setor de Identificação Civil do 1º e
            2º trimestres de 2026, fornecidos em HTML.
          </p>
          <p className="mt-2">
            Os totais representam atendimentos registrados e não
            necessariamente pessoas únicas. A caracterização do público por
            serviço é indicativa, pois os relatórios não apresentam dados
            demográficos.
          </p>
          <p className="mt-3 font-semibold text-slate-600">
            SEMTEPS · Prefeitura de Santa Izabel do Pará
          </p>
        </footer>
      </div>
    </main>
  );
}
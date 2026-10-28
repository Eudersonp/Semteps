"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

// Os valores seguem a ordem mensal informada no arquivo: Jan a Set.
const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"] as const;
type MonthValues = [number, number, number, number, number, number, number, number, number];
type Quarter = "all" | "q1" | "q2" | "q3" | "q4";
type DataRow = { label: string; values: MonthValues };

// Quantidades mensais de violações e situações registradas no documento.
const violations: DataRow[] = [
  { label: "Abuso / exploração sexual ou suspeita", values: [2, 4, 5, 4, 4, 8, 4, 1, 3] },
  { label: "Abandono de incapaz", values: [1, 2, 5, 2, 0, 2, 0, 0, 0] },
  { label: "Ameaça", values: [0, 0, 0, 0, 0, 0, 0, 1, 0] },
  { label: "Conflito familiar", values: [1, 3, 0, 4, 0, 1, 0, 0, 0] },
  { label: "Convivência familiar", values: [6, 2, 4, 4, 6, 6, 6, 7, 6] },
  { label: "Constrangimento", values: [0, 0, 1, 1, 0, 0, 0, 0, 0] },
  { label: "Desvio de comportamento", values: [1, 1, 3, 0, 2, 1, 1, 0, 1] },
  { label: "Envolvimento com álcool ou drogas", values: [0, 1, 0, 0, 0, 0, 0, 0, 0] },
  { label: "Envolvimento sexual na adolescência", values: [0, 0, 2, 0, 0, 0, 1, 0, 1] },
  { label: "Falta de registro de nascimento / CPF", values: [9, 7, 3, 0, 1, 1, 0, 0, 1] },
  { label: "Fora da escola", values: [0, 3, 3, 2, 2, 2, 0, 0, 4] },
  { label: "Fuga do lar", values: [0, 0, 3, 0, 1, 1, 0, 0, 1] },
  { label: "Fuga de entidade de acolhimento", values: [0, 0, 0, 0, 2, 0, 0, 0, 0] },
  { label: "Gravidez na adolescência", values: [3, 0, 0, 0, 0, 0, 1, 0, 2] },
  { label: "Infração administrativa", values: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { label: "Matrícula escolar", values: [2, 2, 2, 1, 4, 1, 1, 3, 3] },
  { label: "Maus-tratos", values: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { label: "Negligência familiar", values: [0, 1, 1, 0, 3, 2, 2, 4, 5] },
  { label: "Pensão alimentícia", values: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { label: "Problema de saúde", values: [0, 0, 2, 1, 2, 3, 0, 0, 3] },
  { label: "Situação de risco", values: [4, 0, 6, 0, 0, 4, 5, 0, 0] },
  { label: "Trabalho infantil", values: [0, 2, 0, 0, 0, 1, 0, 0, 1] },
  { label: "Situação de guarda / tutela", values: [3, 1, 0, 0, 0, 1, 1, 2, 1] },
  { label: "Violência física ou psicológica", values: [0, 1, 4, 0, 3, 4, 1, 2, 1] },
  { label: "Vulnerabilidade social", values: [0, 1, 1, 3, 0, 0, 0, 6, 2] },
  { label: "Encaminhamento ao acolhimento institucional", values: [0, 0, 0, 0, 0, 0, 0, 2, 1] },
];

// Crianças e adolescentes de 0 a 17 anos, conforme a tabela de gênero do PDF.
const genderRows: DataRow[] = [
  { label: "Masculino", values: [15, 13, 20, 11, 13, 17, 8, 9, 13] },
  { label: "Feminino", values: [16, 20, 26, 12, 18, 16, 16, 22, 26] },
];

// Registros por bairro, transcritos sem somar categorias territoriais diferentes.
const neighborhoods: DataRow[] = [
  { label: "Aratanha", values: [2, 0, 0, 0, 1, 1, 0, 0, 0] },
  { label: "Novo", values: [2, 4, 0, 0, 1, 3, 0, 1, 7] },
  { label: "Centro", values: [1, 1, 0, 0, 0, 0, 0, 0, 0] },
  { label: "Divinéia", values: [0, 1, 1, 0, 2, 2, 1, 1, 2] },
  { label: "Florestal", values: [2, 0, 2, 1, 0, 0, 1, 3, 4] },
  { label: "Jardim Miraí", values: [1, 0, 2, 4, 4, 5, 2, 3, 3] },
  { label: "Jardim Paraíso", values: [0, 0, 3, 0, 3, 2, 0, 1, 0] },
  { label: "Jardim das Acácias", values: [0, 1, 0, 0, 1, 2, 1, 1, 0] },
  { label: "Juazeiro", values: [3, 1, 0, 1, 0, 2, 1, 0, 0] },
  { label: "Jurunas", values: [1, 0, 0, 0, 0, 0, 0, 0, 1] },
  { label: "Kató", values: [6, 3, 2, 0, 5, 4, 2, 2, 1] },
  { label: "Nova Brasília", values: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { label: "Novo Horizonte", values: [0, 2, 2, 0, 0, 3, 1, 2, 0] },
  { label: "Sagrada Família", values: [0, 2, 2, 0, 3, 0, 1, 0, 2] },
  { label: "Santa Lúcia", values: [2, 1, 9, 2, 3, 7, 0, 5, 0] },
  { label: "Santa Rita de Cássia", values: [0, 1, 1, 1, 0, 0, 0, 0, 1] },
  { label: "Santa Terezinha", values: [0, 2, 1, 2, 1, 2, 0, 1, 0] },
  { label: "São Raimundo", values: [0, 0, 0, 0, 0, 0, 1, 0, 0] },
  { label: "Triângulo", values: [0, 2, 3, 3, 0, 0, 1, 1, 4] },
  { label: "Tokio", values: [0, 1, 0, 1, 0, 0, 1, 1, 0] },
];

// Registros por comunidade rural/localidade, apresentados em uma visualização separada.
const communities: DataRow[] = [
  { label: "Americano", values: [1, 2, 8, 2, 1, 3, 3, 4, 0] },
  { label: "Jundiaí", values: [0, 0, 0, 0, 0, 1, 0, 0, 0] },
  { label: "Travessão", values: [0, 0, 0, 2, 1, 0, 0, 0, 0] },
  { label: "Conceição do Itá", values: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { label: "Tacajós", values: [0, 0, 0, 0, 0, 0, 2, 0, 0] },
  { label: "Quitéria", values: [0, 0, 0, 1, 0, 0, 0, 0, 0] },
  { label: "Meruim", values: [0, 0, 0, 1, 0, 0, 0, 0, 0] },
  { label: "Foz do Jundiaí", values: [0, 0, 0, 0, 0, 1, 0, 0, 0] },
  { label: "João Novo", values: [5, 0, 0, 0, 0, 0, 0, 0, 0] },
  { label: "Campinense", values: [1, 0, 3, 0, 0, 0, 0, 0, 0] },
  { label: "Bom Pastor", values: [0, 2, 0, 0, 0, 0, 0, 0, 0] },
  { label: "Cacoal", values: [0, 1, 0, 0, 0, 0, 1, 0, 0] },
  { label: "Lago", values: [0, 1, 0, 0, 0, 0, 0, 0, 0] },
  { label: "Caraparú", values: [5, 0, 1, 0, 0, 0, 1, 0, 0] },
  { label: "Areia Branca", values: [0, 0, 0, 1, 1, 0, 0, 4, 3] },
  { label: "Macapazinho", values: [0, 0, 0, 0, 0, 0, 0, 2, 0] },
  { label: "Boa Vista do Itá", values: [0, 0, 0, 0, 0, 0, 0, 1, 0] },
  { label: "Catumbi", values: [0, 0, 0, 0, 0, 0, 3, 0, 0] },
];

const quarters: Record<Quarter, { label: string; indexes: number[] }> = {
  all: { label: "Janeiro a setembro", indexes: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
  q1: { label: "1º trimestre · janeiro a março", indexes: [0, 1, 2] },
  q2: { label: "2º trimestre · abril a junho", indexes: [3, 4, 5] },
  q3: { label: "3º trimestre · julho a setembro", indexes: [6, 7, 8] },
  q4: { label: "4º trimestre · sem dados no arquivo", indexes: [] },
};

function sumValues(values: MonthValues, indexes: number[]) {
  return indexes.reduce((sum, index) => sum + values[index], 0);
}

function totalRows(rows: DataRow[], indexes: number[]) {
  return rows.reduce((sum, row) => sum + sumValues(row.values, indexes), 0);
}

function pct(value: number, total: number) {
  return total ? `${((value / total) * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%` : "0%";
}

function ArrowIcon({ left = false }: { left?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      {left ? <path d="M19 12H5m6 6-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#e1e3d9] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-extrabold text-[#102b27]">{title}</h2>
      {subtitle && <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

// Gráfico de linhas que recalcula as séries mais frequentes conforme o trimestre escolhido.
function ViolenceLineChart({ indexes }: { indexes: number[] }) {
  const top = [...violations]
    .map((row) => ({ ...row, total: sumValues(row.values, indexes) }))
    .filter((row) => row.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
  const width = 820;
  const height = 330;
  const left = 48;
  const right = 22;
  const topPad = 30;
  const bottom = 50;
  const plotWidth = width - left - right;
  const plotHeight = height - topPad - bottom;
  const peak = Math.max(1, ...top.flatMap((row) => indexes.map((i) => row.values[i])));
  const axisMax = Math.max(1, Math.ceil(peak / 2) * 2);
  const ticks = Array.from(new Set([0, Math.ceil(axisMax / 2), axisMax]));
  const colors = ["#047857", "#d97706", "#2563eb", "#9333ea", "#db2777"];
  const xAt = (position: number) => indexes.length < 2 ? left + plotWidth / 2 : left + (position / (indexes.length - 1)) * plotWidth;
  const yAt = (value: number) => topPad + plotHeight - (value / axisMax) * plotHeight;

  if (!indexes.length) return <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-600">Não há registros do 4º trimestre no arquivo enviado.</p>;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">
        {top.map((row, index) => <span key={row.label} className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[index] }} />{row.label} · <strong>{row.total}</strong></span>)}
      </div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Evolução mensal das cinco situações com mais registros no período selecionado" className="min-w-[640px] w-full">
          {ticks.map((tick) => {
            const y = yAt(tick);
            return <g key={tick}><line x1={left} x2={width - right} y1={y} y2={y} stroke="#e2e8f0" strokeDasharray={tick ? "4 4" : undefined} /><text x={left - 9} y={y + 4} textAnchor="end" fontSize="11" fill="#64748b">{tick}</text></g>;
          })}
          {top.map((row, rowIndex) => {
            const points = indexes.map((monthIndex, position) => ({ x: xAt(position), y: yAt(row.values[monthIndex]), value: row.values[monthIndex], monthIndex }));
            const path = points.map((point, pointIndex) => `${pointIndex ? "L" : "M"} ${point.x} ${point.y}`).join(" ");
            return <g key={row.label}><path d={path} fill="none" stroke={colors[rowIndex]} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />{points.map((point) => <g key={`${row.label}-${point.monthIndex}`}><circle cx={point.x} cy={point.y} r="4" fill="white" stroke={colors[rowIndex]} strokeWidth="2.5" /><text x={point.x} y={point.y - 9 - rowIndex * 2} textAnchor="middle" fontSize="10" fontWeight="700" fill={colors[rowIndex]}>{point.value}</text></g>)}
              {rowIndex === 0 && points.map((point) => <text key={`month-${point.monthIndex}`} x={point.x} y={height - 15} textAnchor="middle" fontSize="11" fill="#64748b">{months[point.monthIndex]}</text>)}
            </g>;
          })}
        </svg>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">Cada linha representa uma categoria. As categorias podem se referir à mesma criança ou adolescente; não somar como pessoas únicas.</p>
    </div>
  );
}

// Colunas mensais com separação entre registros masculinos e femininos.
function GenderChart({ indexes }: { indexes: number[] }) {
  if (!indexes.length) return <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-600">Não há dados do 4º trimestre no arquivo enviado.</p>;
  const rows = indexes.map((index) => ({ month: months[index], male: genderRows[0].values[index], female: genderRows[1].values[index] }));
  const max = Math.max(...rows.map((row) => row.male + row.female), 1);
  return (
    <div>
      <div className="mb-4 flex gap-5 text-xs text-slate-600"><span><span className="mr-2 inline-block h-2.5 w-2.5 rounded-sm bg-emerald-700" />Feminino</span><span><span className="mr-2 inline-block h-2.5 w-2.5 rounded-sm bg-slate-400" />Masculino</span></div>
      <div className="grid grid-flow-col auto-cols-fr items-end gap-2 border-b border-slate-200 px-1 pb-2" style={{ height: 230 }}>
        {rows.map((row) => {
          const hFemale = (row.female / max) * 160;
          const hMale = (row.male / max) * 160;
          return <div key={row.month} className="flex h-full flex-col items-center justify-end">
            <span className="mb-1 text-[10px] font-bold text-slate-700">{row.female + row.male}</span>
            <div className="flex w-full max-w-10 flex-col justify-end overflow-hidden rounded-t-md" style={{ height: hFemale + hMale }}>
              <div className="flex items-center justify-center bg-slate-400 text-[9px] font-bold text-white" style={{ height: hMale }}>{hMale > 16 ? row.male : ""}</div>
              <div className="flex items-center justify-center bg-emerald-700 text-[9px] font-bold text-white" style={{ height: hFemale }}>{hFemale > 16 ? row.female : ""}</div>
            </div>
            <span className="mt-2 text-[10px] text-slate-500">{row.month}</span>
          </div>;
        })}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">O número sobre cada coluna é a soma dos registros informados para os dois gêneros no mês.</p>
    </div>
  );
}

function LocationBars({ rows, indexes }: { rows: DataRow[]; indexes: number[] }) {
  if (!indexes.length) return <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-600">Sem dados de outubro a dezembro no arquivo.</p>;
  const sorted = rows.map((row) => ({ label: row.label, value: sumValues(row.values, indexes) })).filter((row) => row.value > 0).sort((a, b) => b.value - a.value).slice(0, 8);
  const max = Math.max(1, ...sorted.map((row) => row.value));
  return <div className="space-y-3">{sorted.map((row) => <div key={row.label} className="grid grid-cols-[minmax(100px,1fr)_2fr_auto] items-center gap-3 text-sm"><span className="text-slate-600">{row.label}</span><div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-700" style={{ width: `${(row.value / max) * 100}%` }} /></div><strong className="min-w-6 text-right tabular-nums text-slate-800">{row.value}</strong></div>)}</div>;
}

export default function ConselhoTutelarPage() {
  const [quarter, setQuarter] = useState<Quarter>("all");
  const indexes = quarters[quarter].indexes;
  const periodName = quarters[quarter].label;
  const totalAttended = totalRows(genderRows, indexes);
  const totalFemale = sumValues(genderRows[1].values, indexes);
  const totalMale = sumValues(genderRows[0].values, indexes);
  const violationCount = totalRows(violations, indexes);
  const topViolation = useMemo(() => [...violations].map((row) => ({ label: row.label, total: sumValues(row.values, indexes) })).sort((a, b) => b.total - a.total)[0], [indexes]);

  return (
    <main className="min-h-screen bg-[#f3f2ed] text-slate-900">
      {/* Cabeçalho institucional no padrão visual das demais páginas da SEMTEPS. */}
      <header className="border-b border-white/10 bg-[#102b27] text-white print:hidden">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" aria-label="Página inicial" className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-32 shrink-0 items-center rounded-xl bg-white px-2 sm:h-16 sm:w-40"><Image src="/log.png" alt="Prefeitura de Santa Izabel do Pará" width={200} height={110} className="h-full w-full object-contain" priority /></div>
            <div className="hidden min-w-0 border-l border-white/20 pl-4 sm:block"><p className="truncate text-xs font-semibold text-emerald-100/75">Secretaria Municipal de Trabalho</p><p className="truncate text-sm font-extrabold">e Promoção Social <span className="font-medium text-emerald-100/70">/ SEMTEPS</span></p></div>
          </Link>
          <nav aria-label="Navegação principal" className="flex shrink-0 flex-col items-end gap-2">
            <Link href="/" className="inline-flex h-9 w-24 items-center justify-center gap-2 rounded-full border border-white/20 px-3 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300">Início <ArrowIcon /></Link>
            <Link href="/painel/conselho-tutelar" className="inline-flex h-9 w-24 items-center justify-center gap-2 rounded-full border border-white/20 px-3 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300"><ArrowIcon left /> Voltar</Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#102b27] text-white">
        <div className="mx-auto max-w-[1440px] px-5 pb-9 pt-8 sm:px-8 sm:pb-11 lg:px-12 lg:pt-10">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-lime-300">Vigilância Socioassistencial · SEMTEPS</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-.035em] sm:text-4xl lg:text-5xl">Estatísticas do Conselho Tutelar</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-emerald-50/75 sm:text-base">Atendimentos, situações registradas e distribuição territorial conforme o demonstrativo mensal disponibilizado.</p>
          <div className="mt-7 h-1 w-24 rounded-full bg-gradient-to-r from-lime-300 to-emerald-400" />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] space-y-6 px-5 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-10">
        {/* Filtro trimestral compartilhado por indicadores, gráficos e tabelas. */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e1e3d9] bg-white p-4 shadow-sm">
          <div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">{periodName}</span><p className="mt-2 text-xs leading-5 text-slate-500">O PDF contém dados de janeiro a setembro. O 4º trimestre está disponível no seletor, mas ainda não possui registros no arquivo.</p></div>
          <label htmlFor="quarter-filter" className="text-sm font-semibold text-slate-700">Período
            <select id="quarter-filter" value={quarter} onChange={(event) => setQuarter(event.target.value as Quarter)} className="ml-3 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-emerald-700" style={{ color: "#000", backgroundColor: "#fff", colorScheme: "light" }}>
              <option value="all">Janeiro a setembro</option><option value="q1">1º trimestre · Jan–Mar</option><option value="q2">2º trimestre · Abr–Jun</option><option value="q3">3º trimestre · Jul–Set</option><option value="q4">4º trimestre · Out–Dez (sem dados)</option>
            </select>
          </label>
        </div>

        {indexes.length === 0 ? <div role="status" className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">O documento enviado ainda não apresenta dados para o 4º trimestre. Selecione janeiro a setembro ou um dos três primeiros trimestres.</div> : null}

        {/* Indicadores do intervalo selecionado. */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Atendidos por gênero", value: totalAttended, detail: "Registros de 0 a 17 anos" },
            { label: "Registros femininos", value: totalFemale, detail: pct(totalFemale, totalAttended) + " do total" },
            { label: "Registros masculinos", value: totalMale, detail: pct(totalMale, totalAttended) + " do total" },
            { label: "Ocorrências por categoria", value: violationCount, detail: "Categorias podem se sobrepor" },
          ].map((item) => <article key={item.label} className="rounded-2xl border border-[#e1e3d9] bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-[.1em] text-emerald-800">{item.label}</p><p className="mt-3 text-3xl font-black text-[#102b27]">{indexes.length ? item.value : "—"}</p><p className="mt-2 text-xs text-slate-500">{item.detail}</p></article>)}
        </div>

        {indexes.length > 0 && <div className="rounded-2xl border border-emerald-100 bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm"><strong className="text-[#102b27]">Leitura do período:</strong> foram identificados {violationCount} registros distribuídos entre as categorias listadas; a situação mais frequente foi <strong>{topViolation?.label}</strong> ({topViolation?.total}). Esse total representa ocorrências classificadas e não necessariamente crianças ou adolescentes distintos.</div>}

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Evolução das principais situações" subtitle={`As cinco categorias com mais registros · ${periodName}`}><ViolenceLineChart indexes={indexes} /></Panel>
          <Panel title="Atendidos por mês e gênero" subtitle={`Valores mensais do grupo etário de 0 a 17 anos · ${periodName}`}><GenderChart indexes={indexes} /></Panel>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Bairros com mais registros" subtitle={`Até oito bairros com maior contagem no período · ${periodName}`}><LocationBars rows={neighborhoods} indexes={indexes} /><p className="text-xs leading-5 text-slate-500">Contagens territoriais mostradas conforme registradas; não equivalem automaticamente a pessoas únicas.</p></Panel>
          <Panel title="Comunidades com registros" subtitle={`Contagem por localidade · ${periodName}`}><LocationBars rows={communities} indexes={indexes} /><p className="text-xs leading-5 text-slate-500">Bairros e comunidades são grupos separados no arquivo e permanecem separados nesta análise.</p></Panel>
        </div>

        <Panel title="Tabela de violações e situações" subtitle={`Somatórios das colunas mensais do período selecionado · ${periodName}`}>
          <div className="overflow-x-auto"><table className="w-full min-w-[620px] border-collapse text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th scope="col" className="px-3 py-3 text-left">Situação</th><th scope="col" className="px-3 py-3 text-right">Registros</th><th scope="col" className="px-3 py-3 text-right">Participação nas ocorrências</th></tr></thead><tbody>{[...violations].map((row) => ({ ...row, count: sumValues(row.values, indexes) })).sort((a, b) => b.count - a.count).map((row) => <tr key={row.label} className="border-b border-slate-100 even:bg-slate-50"><th scope="row" className="px-3 py-3 text-left font-semibold text-slate-700">{row.label}</th><td className="px-3 py-3 text-right font-bold tabular-nums text-emerald-800">{row.count}</td><td className="px-3 py-3 text-right tabular-nums text-slate-600">{pct(row.count, violationCount)}</td></tr>)}</tbody><tfoot><tr className="bg-emerald-50 font-black"><th scope="row" className="px-3 py-3 text-left">Total de ocorrências registradas</th><td className="px-3 py-3 text-right">{violationCount}</td><td className="px-3 py-3 text-right">100%</td></tr></tfoot></table></div>
          <p className="text-xs leading-6 text-slate-500">A soma das categorias pode contar uma mesma criança ou adolescente em mais de uma situação. Por isso, o total de ocorrências não deve ser interpretado como total de pessoas atendidas.</p>
        </Panel>

        <Panel title="Série mensal completa por gênero" subtitle="Registros de 0 a 17 anos; os totais são recalculados pelo filtro trimestral">
          <div className="overflow-x-auto"><table className="w-full min-w-[560px] border-collapse text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th scope="col" className="px-3 py-3 text-left">Mês</th><th scope="col" className="px-3 py-3 text-right">Feminino</th><th scope="col" className="px-3 py-3 text-right">Masculino</th><th scope="col" className="px-3 py-3 text-right">Total mensal</th></tr></thead><tbody>{indexes.map((index) => <tr key={months[index]} className="border-b border-slate-100"><th scope="row" className="px-3 py-3 text-left font-semibold text-slate-700">{months[index]}</th><td className="px-3 py-3 text-right tabular-nums">{genderRows[1].values[index]}</td><td className="px-3 py-3 text-right tabular-nums">{genderRows[0].values[index]}</td><td className="px-3 py-3 text-right font-bold tabular-nums text-emerald-800">{genderRows[0].values[index] + genderRows[1].values[index]}</td></tr>)}</tbody><tfoot><tr className="bg-emerald-50 font-black"><th scope="row" className="px-3 py-3 text-left">Total do período</th><td className="px-3 py-3 text-right">{totalFemale}</td><td className="px-3 py-3 text-right">{totalMale}</td><td className="px-3 py-3 text-right text-emerald-900">{totalAttended}</td></tr></tfoot></table></div>
        </Panel>

        <Panel title="Observações para leitura dos dados">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
            <li>A tabela de gênero registra pessoas atendidas de 0 a 17 anos; a tabela de violações registra ocorrências por categoria. São medidas distintas.</li>
            <li>O arquivo apresenta meses de janeiro a setembro, mas não informa ano nem descreve a metodologia de contagem. Por isso, o título não atribui um ano aos dados.</li>
            <li>O 4º trimestre não aparece no documento e foi sinalizado sem dados, sem tratar ausência de informação como zero.</li>
            <li>Para planejamento, recomenda-se conferir a consistência dos totais territoriais e manter o preenchimento mensal com definições padronizadas.</li>
          </ul>
        </Panel>

        <footer className="border-t border-[#e1e3d9] pt-5 text-xs leading-6 text-slate-500"><p>Fonte: arquivo “JAN.pdf”, tabelas de violações, gênero, bairros e comunidades, com competências identificadas de janeiro a setembro.</p><p className="mt-2">Painel descritivo da Vigilância Socioassistencial · SEMTEPS · Prefeitura de Santa Izabel do Pará.</p></footer>
      </section>
    </main>
  );
}

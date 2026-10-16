"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

type Period = "semester" | "q1" | "q2";
type Pair = readonly [number, number];
type Violation = { label: string; values: Pair };
type AreaRecord = { label: string; values: Pair };

const violations: Violation[] = [
  { label: "Convivência familiar", values: [12, 16] },
  { label: "Abuso/exploração sexual ou suspeita", values: [11, 16] },
  { label: "Falta de registro de nascimento/CPF", values: [19, 2] },
  { label: "Situação de risco", values: [10, 4] },
  { label: "Abandono de incapaz", values: [8, 4] },
  { label: "Fora da escola", values: [6, 6] },
  { label: "Matrícula escolar", values: [6, 6] },
  { label: "Violência física ou psicológica", values: [5, 7] },
  { label: "Conflito familiar", values: [4, 5] },
  { label: "Desvio de comportamento", values: [5, 3] },
  { label: "Problema de saúde", values: [2, 6] },
  { label: "Negligência familiar", values: [2, 5] },
  { label: "Fuga do lar", values: [3, 2] },
  { label: "Situação de guarda/tutela", values: [4, 1] },
  { label: "Vulnerabilidade social", values: [2, 3] },
  { label: "Gravidez na adolescência", values: [3, 0] },
  { label: "Trabalho infantil", values: [2, 1] },
  { label: "Constrangimento", values: [1, 1] },
  { label: "Envolvimento sexual na adolescência", values: [2, 0] },
  { label: "Fuga de entidade de acolhimento", values: [0, 2] },
  { label: "Envolvimento com álcool ou drogas", values: [1, 0] },
  { label: "Ameaça", values: [0, 0] },
  { label: "Infração administrativa", values: [0, 0] },
  { label: "Maus-tratos", values: [0, 0] },
  { label: "Pensão alimentícia", values: [0, 0] },
  { label: "Encaminhamento a acolhimento institucional", values: [0, 0] },
];

const bairros: AreaRecord[] = [
  { label: "Santa Lúcia", values: [12, 12] },
  { label: "Kató", values: [13, 9] },
  { label: "Jardim Miraí", values: [5, 10] },
  { label: "Aratanha", values: [7, 2] },
  { label: "Novo", values: [6, 3] },
  { label: "Sagrada Família", values: [4, 5] },
  { label: "Jardim Paraíso", values: [3, 5] },
  { label: "Santa Terezinha", values: [3, 5] },
  { label: "Triângulo", values: [5, 3] },
  { label: "Novo Horizonte", values: [4, 3] },
  { label: "Nova Divinéia", values: [2, 4] },
  { label: "Florestal", values: [4, 1] },
  { label: "Juazeiro", values: [4, 1] },
  { label: "Divinéia", values: [2, 2] },
  { label: "Jardim das Acácias", values: [1, 3] },
  { label: "Santa Rita de Cássia", values: [2, 1] },
  { label: "Centro", values: [2, 0] },
  { label: "Tokio", values: [1, 1] },
  { label: "Jurunas", values: [1, 0] },
  { label: "Nova Brasília", values: [0, 0] },
  { label: "São Raimundo", values: [0, 0] },
];

const communities: AreaRecord[] = [
  { label: "Americano", values: [11, 8] },
  { label: "Caraparu", values: [6, 0] },
  { label: "João Novo", values: [5, 0] },
  { label: "Campinense", values: [4, 0] },
  { label: "Travessão", values: [0, 3] },
  { label: "Outras comunidades (nomes não detalhados)", values: [0, 6] },
];

const violationGroups = [
  { label: "Acesso a direitos básicos", values: [33, 20], part: "27%", variation: "−39%" },
  { label: "Violência e exploração", values: [19, 25], part: "22%", variation: "+32%" },
  { label: "Convivência e vínculos familiares", values: [20, 22], part: "21%", variation: "+10%" },
  { label: "Negligência, abandono e risco", values: [22, 16], part: "19%", variation: "−27%" },
  { label: "Comportamento na adolescência", values: [14, 7], part: "11%", variation: "−50%" },
];

const recommendations = [
  "Priorizar a rede de proteção para casos de abuso e exploração sexual, articulando Conselho Tutelar, CREAS, saúde e escola.",
  "Manter e ampliar ações de registro civil e CPF, verificando a redução dos registros de 19 para 2.",
  "Reforçar a busca ativa escolar, pois os registros de crianças fora da escola e sem matrícula permaneceram em 6 por trimestre.",
  "Direcionar ações preventivas para Santa Lúcia, Kató, Jardim Miraí e a comunidade de Americano.",
  "Passar a registrar faixa etária detalhada, mês, vínculo com o possível agressor, origem da denúncia e medidas aplicadas.",
  "Padronizar categorias de violação e a lista de comunidades para permitir comparações consistentes entre períodos.",
  "Cruzar os dados com os registros do CREAS e dos CRAS, observando os cuidados de sigilo e proteção de dados.",
];

const periodLabels: Record<Period, string> = {
  semester: "1º semestre de 2026",
  q1: "1º trimestre de 2026",
  q2: "2º trimestre de 2026",
};

const periodIndexes: Record<Period, number[]> = {
  semester: [0, 1],
  q1: [0],
  q2: [1],
};

function total(values: Pair, period: Period) {
  return periodIndexes[period].reduce((sum, index) => sum + values[index], 0);
}

function pct(value: number, denominator: number) {
  return denominator ? `${((value / denominator) * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%` : "0%";
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function BarRow({ label, value, max, color = "bg-cyan-700", note }: { label: string; value: number; max: number; color?: string; note?: string }) {
  const width = max === 0 ? 0 : (value / max) * 100;
  return (
    <div className="grid grid-cols-[minmax(115px,1.1fr)_2fr_auto] items-center gap-3 text-sm">
      <span className="leading-5 text-slate-600">{label}</span>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${width}%` }} />
      </div>
      <span className="min-w-8 text-right font-bold tabular-nums text-slate-800" title={note}>{value}</span>
    </div>
  );
}

function LocationRows({ records, period, max }: { records: AreaRecord[]; period: Period; max: number }) {
  const sorted = [...records].sort((a, b) => total(b.values, period) - total(a.values, period));
  return (
    <div className="space-y-3">
      {sorted.map((record) => {
        const value = total(record.values, period);
        return <BarRow key={record.label} label={record.label} value={value} max={max} />;
      })}
    </div>
  );
}

export default function ConselhoTutelarPage() {
  const [period, setPeriod] = useState<Period>("semester");
  const attendees: Pair = [110, 87];
  const girls: Pair = [62, 46];
  const boys: Pair = [48, 41];
  const selectedAttendees = total(attendees, period);
  const selectedGirls = total(girls, period);
  const selectedBoys = total(boys, period);
  const selectedAbuse = total([11, 16], period);
  const selectedSantaLucia = total([12, 12], period);
  const topViolations = [...violations]
    .map((item) => ({ label: item.label, value: total(item.values, period) }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
  const topMax = Math.max(...topViolations.map((item) => item.value), 1);
  const displayedNeighborhoods = bairros
    .filter((item) => total(item.values, period) > 0)
    .sort((a, b) => total(b.values, period) - total(a.values, period))
    .slice(0, 10);
  const locationMax = Math.max(...displayedNeighborhoods.map((item) => total(item.values, period)), 1);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-5 lg:px-8">
          <Link href="/" aria-label="Página inicial" className="flex min-w-0 items-center">
            <div className="flex h-24 w-40 shrink-0 items-center sm:h-28 sm:w-56">
              <Image src="/log.png" alt="Prefeitura de Santa Izabel do Pará" width={250} height={140} className="h-full w-full object-contain object-left" priority />
            </div>
            <div className="mx-6 hidden h-20 w-px bg-slate-200 md:block" />
            <div className="hidden md:block">
              <p className="text-2xl font-extrabold leading-tight tracking-tight text-slate-800">
                Secretaria Municipal de Trabalho
                <span className="block">e Promoção Social - SEMTEPS</span>
              </p>
              <p className="mt-2 text-lg text-slate-500">Plataforma da Vigilância Socioassistencial</p>
            </div>
          </Link>
          <nav aria-label="Navegação principal">
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
              Início <ArrowIcon />
            </Link>
          </nav>
        </div>
        <div className="border-t border-slate-100 px-6 py-4 md:hidden">
          <p className="text-lg font-extrabold leading-tight text-slate-800">
            Secretaria Municipal de Trabalho
            <span className="block">e Promoção Social - SEMTEPS</span>
          </p>
          <p className="mt-1 text-sm text-slate-500">Plataforma da Vigilância Socioassistencial</p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-6 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-cyan-800">Vigilância Socioassistencial</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Análise do Conselho Tutelar</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">Santa Izabel do Pará · 1º semestre de 2026</p>
          </div>
          <button type="button" onClick={() => window.print()} className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-700 print:hidden">
            Imprimir / salvar PDF
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800">{periodLabels[period]}</span>
            <p className="mt-2 max-w-3xl text-xs leading-5 text-slate-500">
              O relatório de origem não informa explicitamente as competências dos PDFs. A organização como 1º e 2º trimestres foi inferida pela ordem dos documentos.
            </p>
          </div>
          <div className="flex items-center gap-3 print:hidden">
            <label htmlFor="period" className="text-sm font-semibold text-slate-600">Período</label>
            <select id="period" value={period} onChange={(event) => setPeriod(event.target.value as Period)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-cyan-700" style={{ color: "#000000", backgroundColor: "#ffffff", colorScheme: "light" }}>
              <option value="semester" style={{ color: "#000000", backgroundColor: "#ffffff" }}>1º semestre</option>
              <option value="q1" style={{ color: "#000000", backgroundColor: "#ffffff" }}>1º trimestre</option>
              <option value="q2" style={{ color: "#000000", backgroundColor: "#ffffff" }}>2º trimestre</option>
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-cyan-100 bg-cyan-50/70 p-4 text-sm leading-7 text-slate-700">
          No período selecionado, foram registrados <strong>{selectedAttendees} atendimentos a crianças e adolescentes</strong> de 0 a 17 anos. No semestre, meninas representam 54,8% dos atendidos. Abuso ou exploração sexual, inclusive suspeita, subiu de 11 para 16 registros entre os trimestres; a falta de registro civil/CPF caiu de 19 para 2.
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            { label: "Crianças e adolescentes atendidos", value: selectedAttendees, note: "0 a 17 anos" },
            { label: "Meninas", value: selectedGirls, note: `${pct(selectedGirls, selectedAttendees)} dos atendidos` },
            { label: "Meninos", value: selectedBoys, note: `${pct(selectedBoys, selectedAttendees)} dos atendidos` },
            { label: "Abuso/exploração sexual ou suspeita", value: selectedAbuse, note: "Registros no período" },
            { label: "Registros em Santa Lúcia", value: selectedSantaLucia, note: "Bairro com mais ocorrências" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold leading-5 text-slate-500">{kpi.label}</p>
              <p className="mt-3 text-3xl font-black text-cyan-800">{kpi.value}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{kpi.note}</p>
            </div>
          ))}
        </div>

        <Panel title="Perfil dos atendidos" subtitle="Registros por gênero e trimestre">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr><th scope="col" className="px-3 py-3 text-left">Gênero</th><th scope="col" className="px-3 py-3 text-right">1º trimestre</th><th scope="col" className="px-3 py-3 text-right">2º trimestre</th><th scope="col" className="px-3 py-3 text-right">Semestre</th><th scope="col" className="px-3 py-3 text-right">Participação</th></tr>
              </thead>
              <tbody>
                {[
                  { label: "Feminino", values: girls },
                  { label: "Masculino", values: boys },
                ].map((row) => {
                  const semesterTotal = total(row.values, "semester");
                  return <tr key={row.label} className="border-b border-slate-100"><th scope="row" className="px-3 py-3 text-left font-semibold text-slate-700">{row.label}</th><td className="px-3 py-3 text-right tabular-nums">{row.values[0]}</td><td className="px-3 py-3 text-right tabular-nums">{row.values[1]}</td><td className="px-3 py-3 text-right font-bold tabular-nums text-cyan-900">{semesterTotal}</td><td className="px-3 py-3 text-right">{pct(semesterTotal, 197)}</td></tr>;
                })}
                <tr className="bg-slate-50 font-bold"><th scope="row" className="px-3 py-3 text-left">Total de atendidos</th><td className="px-3 py-3 text-right">110</td><td className="px-3 py-3 text-right">87</td><td className="px-3 py-3 text-right text-cyan-900">197</td><td className="px-3 py-3 text-right">100%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-7 text-slate-600">As meninas corresponderam a 56% dos atendidos no 1º trimestre e 53% no 2º. Os relatórios apresentam apenas a faixa ampla de 0 a 17 anos, sem separar primeira infância, crianças e adolescentes.</p>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Violações mais registradas" subtitle={`Principais categorias · ${periodLabels[period]}`}>
            <div className="space-y-4">
              {topViolations.map((item) => <BarRow key={item.label} label={item.label} value={item.value} max={topMax} />)}
            </div>
            <p className="text-xs leading-6 text-slate-500">Uma criança pode ter mais de uma violação registrada. As barras mostram ocorrências, não pessoas únicas.</p>
          </Panel>

          <Panel title="Grupos de violações" subtitle="Agrupamento analítico das categorias do relatório de origem">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse text-sm">
                <thead className="bg-slate-50 text-slate-500"><tr><th className="px-3 py-3 text-left">Grupo</th><th className="px-3 py-3 text-right">1º tri.</th><th className="px-3 py-3 text-right">2º tri.</th><th className="px-3 py-3 text-right">Semestre</th><th className="px-3 py-3 text-right">Parte</th><th className="px-3 py-3 text-right">Variação</th></tr></thead>
                <tbody>{violationGroups.map((group) => <tr key={group.label} className="border-b border-slate-100"><th className="px-3 py-3 text-left font-semibold text-slate-700">{group.label}</th><td className="px-3 py-3 text-right">{group.values[0]}</td><td className="px-3 py-3 text-right">{group.values[1]}</td><td className="px-3 py-3 text-right font-bold text-cyan-900">{group.values[0] + group.values[1]}</td><td className="px-3 py-3 text-right">{group.part}</td><td className="px-3 py-3 text-right">{group.variation}</td></tr>)}</tbody>
              </table>
            </div>
            <p className="text-xs leading-6 text-slate-500">Os grupos foram organizados para análise e podem reunir mais de uma categoria original.</p>
          </Panel>
        </div>

        <Panel title="Relação completa de violações" subtitle="Comparação dos dois trimestres e total de registros">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-sm">
              <thead className="bg-slate-50 text-slate-500"><tr><th scope="col" className="px-3 py-3 text-left">Violação ou situação registrada</th><th scope="col" className="px-3 py-3 text-right">1º trimestre</th><th scope="col" className="px-3 py-3 text-right">2º trimestre</th><th scope="col" className="px-3 py-3 text-right">Semestre</th><th scope="col" className="px-3 py-3 text-right">Variação</th></tr></thead>
              <tbody>
                {violations.map((item) => {
                  const semester = item.values[0] + item.values[1];
                  const variation = item.values[0] === 0 ? (item.values[1] > 0 ? "Novo" : "—") : `${item.values[1] > item.values[0] ? "+" : ""}${Math.round(((item.values[1] - item.values[0]) / item.values[0]) * 100)}%`;
                  return <tr key={item.label} className="border-b border-slate-100 even:bg-slate-50"><th scope="row" className="min-w-[270px] px-3 py-3 text-left font-semibold text-slate-700">{item.label}</th><td className="px-3 py-3 text-right tabular-nums">{item.values[0]}</td><td className="px-3 py-3 text-right tabular-nums">{item.values[1]}</td><td className="px-3 py-3 text-right font-bold tabular-nums text-cyan-900">{semester}</td><td className="px-3 py-3 text-right">{variation}</td></tr>;
                })}
                <tr className="bg-cyan-50 font-bold"><th scope="row" className="px-3 py-3 text-left">Total de registros de violações</th><td className="px-3 py-3 text-right">108</td><td className="px-3 py-3 text-right">90</td><td className="px-3 py-3 text-right text-cyan-900">198</td><td className="px-3 py-3 text-right">−17%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-7 text-slate-600">O total de violações não equivale ao total de crianças e adolescentes atendidos: são 198 registros de violações para 197 atendidos no semestre. Uma mesma pessoa pode ter mais de uma situação registrada, ou os relatórios podem usar bases de contagem diferentes.</p>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Bairros com mais registros" subtitle={`10 bairros com maior número no período · ${periodLabels[period]}`}>
            <LocationRows records={displayedNeighborhoods} period={period} max={locationMax} />
            <p className="text-xs leading-6 text-slate-500">Santa Lúcia e Kató lideram nos dois trimestres. Jardim Miraí passou de 5 para 10 registros; Aratanha caiu de 7 para 2.</p>
          </Panel>
          <Panel title="Comunidades registradas" subtitle="Registros discriminados no relatório">
            <div className="space-y-3">
              {communities.map((record) => <BarRow key={record.label} label={record.label} value={total(record.values, period)} max={Math.max(...communities.map((item) => total(item.values, period)), 1)} />)}
            </div>
            <p className="text-xs leading-6 text-slate-500">Americano foi a única comunidade presente nos dois trimestres (11 e 8 registros) e somou 19. O relatório informa 46 registros em comunidades no semestre; a relação nominal detalhada totaliza 43, diferença que precisa de conferência.</p>
          </Panel>
        </div>

        <Panel title="Público e territórios que merecem atenção">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
            <li><strong>Abuso ou exploração sexual, inclusive suspeita:</strong> 27 registros, com aumento de 11 para 16 entre os trimestres.</li>
            <li><strong>Registro de nascimento/CPF:</strong> 21 registros, dos quais 19 no primeiro trimestre.</li>
            <li><strong>Educação:</strong> 12 registros de crianças fora da escola e 12 sem matrícula no semestre.</li>
            <li><strong>Convivência e conflitos familiares:</strong> 37 registros somados entre convivência familiar e conflito familiar.</li>
            <li><strong>Territórios prioritários:</strong> Santa Lúcia, Kató, Jardim Miraí e a comunidade de Americano.</li>
            <li><strong>Outras situações:</strong> gravidez na adolescência (3), envolvimento sexual na adolescência (2), álcool ou drogas (1), fuga do lar (5) e fuga de entidade de acolhimento (2).</li>
          </ul>
        </Panel>

        <Panel title="Pontos de atenção nos dados">
          <div className="space-y-4">
            {[
              ["Diferença entre totais", "Os relatórios contabilizam 197 atendidos por gênero, mas 198 registros de violações (108 no 1º trimestre e 90 no 2º). Pode haver múltiplas violações por pessoa ou diferença de critério de contagem."],
              ["Detalhamento territorial", "Bairros e comunidades são informados como 151 e 46 registros, totalizando 197. A lista nominal das comunidades detalha 43; três registros não estão discriminados no texto analisado."],
              ["Períodos inferidos", "Os PDFs não indicam as competências. A divisão em janeiro a março e abril a junho foi assumida pela ordem dos relatórios e deve ser confirmada."],
              ["Faixa etária e contexto", "Não há idade mais detalhada, divisão mensal, vínculo com possível agressor nem origem da denúncia. Esses campos limitam análises de prevenção e acompanhamento."],
              ["Categorias e medidas", "“Maus-tratos” aparece zerado enquanto “violência física ou psicológica” soma 12. “Encaminhamento ao acolhimento institucional” é uma medida e não uma violação; o relatório não detalha as demais medidas aplicadas."],
              ["Comparabilidade territorial", "As comunidades listadas mudam entre os trimestres. É importante confirmar se houve alteração na forma de nomear ou registrar os territórios."],
            ].map(([title, description]) => (
              <div key={title} className="border-l-4 border-amber-400 pl-4">
                <h3 className="text-sm font-bold text-slate-800">{title}</h3>
                <p className="mt-1 text-sm leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Recomendações">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-600">
            {recommendations.map((recommendation) => <li key={recommendation} className="pl-1">{recommendation}</li>)}
          </ol>
        </Panel>

        <footer className="border-t border-slate-200 pt-5 text-xs leading-6 text-slate-500">
          <p>Fonte: Relatórios de Gestão do Conselho Tutelar de Santa Izabel do Pará, 1º semestre de 2026, consolidados no HTML fornecido.</p>
          <p className="mt-2">Os números refletem registros administrativos do período e não devem ser interpretados como estimativa de prevalência populacional. Esta página apresenta dados estáticos e não envia informações ao sistema oficial.</p>
          <p className="mt-3 font-semibold text-slate-600">SEMTEPS · Prefeitura de Santa Izabel do Pará</p>
        </footer>
      </div>
    </main>
  );
}

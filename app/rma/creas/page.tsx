"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

type MonthData = {
  month: string;
  stock: number;
  cases: number;
  victims: number;
  individual: number;
  visits: number;
  mse: number;
  exits: number | null;
  female: number;
  male: number;
};

const monthly: MonthData[] = [
  { month: "Jan", stock: 128, cases: 4, victims: 4, individual: 129, visits: 85, mse: 12, exits: null, female: 3, male: 1 },
  { month: "Fev", stock: 115, cases: 10, victims: 10, individual: 101, visits: 49, mse: 13, exits: 23, female: 7, male: 3 },
  { month: "Mar", stock: 124, cases: 12, victims: 16, individual: 110, visits: 41, mse: 13, exits: 3, female: 12, male: 4 },
  { month: "Abr", stock: 115, cases: 11, victims: 11, individual: 99, visits: 49, mse: 12, exits: 20, female: 5, male: 6 },
  { month: "Mai", stock: 106, cases: 21, victims: 8, individual: 90, visits: 51, mse: 15, exits: 30, female: 4, male: 4 },
  { month: "Jun", stock: 76, cases: 19, victims: 21, individual: 126, visits: 82, mse: 13, exits: 49, female: 12, male: 9 },
  { month: "Jul", stock: 95, cases: 25, victims: 23, individual: 109, visits: 70, mse: 11, exits: 6, female: 17, male: 6 },
  { month: "Ago", stock: 102, cases: 13, victims: 17, individual: 101, visits: 54, mse: 6, exits: 6, female: 4, male: 13 },
  { month: "Set", stock: 97, cases: 14, victims: 12, individual: 141, visits: 75, mse: 7, exits: 19, female: 11, male: 1 },
];

const violations = [
  ["Abuso sexual contra crianças e adolescentes", "21", "0", "18 meninas e 3 meninos; 11 registros de 7 a 12 anos; pico em maio (9)."],
  ["Negligência ou abandono de crianças", "11", "0", "6 meninos e 5 meninas; 10 registros até 6 anos."],
  ["Violência intrafamiliar contra crianças e adolescentes", "12", "2", "10 meninas e 2 meninos; 6 registros até 6 anos. Em setembro: 2 meninas."],
  ["Trabalho infantil", "5", "1", "3 meninos e 2 meninas de 0 a 12 anos; totais auxiliares a conferir."],
  ["Exploração sexual contra crianças e adolescentes", "1", "0", "Menina de 0 a 6 anos, em julho."],
  ["Violência intrafamiliar contra mulheres adultas", "29", "5", "18 a 59 anos; pico de 7 em junho."],
  ["Negligência ou abandono de pessoas idosas", "6", "0", "5 homens e 1 mulher."],
  ["Violência intrafamiliar contra pessoas idosas", "5", "1", "4 mulheres e 1 homem."],
  ["Pessoa com deficiência vítima de negligência", "1", "0", "Mulher de 18 a 59 anos, em abril."],
  ["Pessoa com deficiência vítima de violência intrafamiliar", "1", "1", "Menino de 13 a 17 anos, em setembro."],
  ["Pessoa em situação de rua ingressante no PAEFI", "1", "0", "Homem de 18 a 59 anos, em agosto."],
  ["Tráfico de pessoas", "0", "0", "Nenhum registro no período."],
  ["Discriminação por orientação sexual", "0", "0", "Oito meses zerados; junho sem preenchimento."],
];

const newFamilyProfiles = [
  ["Famílias do Bolsa Família (B.1)", "49", "8", "57", "44,2%"],
  ["Famílias com membro do BPC (B.2)", "11", "2", "13", "10,1%"],
  ["Violação associada a substâncias (B.5)", "5", "1", "6", "4,7%"],
  ["Famílias com trabalho infantil (B.3)", "1", "1", "2", "1,6%"],
  ["Famílias com criança em acolhimento (B.4)", "0", "0", "0", "0,0%"],
  ["Famílias com adolescente em MSE (B.7)", "0", "0", "0", "0,0%"],
];

const quarterly = [
  ["1º trimestre (jan–mar)", "26", "30", "73,3%", "340", "175", "122,3", "12,7", "26"],
  ["2º trimestre (abr–jun)", "51", "40", "52,5%", "315", "182", "99,0", "13,3", "99"],
  ["3º trimestre (jul–set)", "52", "52", "61,5%", "351", "199", "98,0", "8,0", "31"],
];

const attention = [
  ["Meninos de C.5 e E.1 sem correspondência em B.6", "Em setembro, B.6 registra 3 meninas até 17 anos e nenhum menino. C.5 (trabalho infantil) e E.1 (pessoa com deficiência) registram um menino cada. Revisar B.6 e os quadros C e E antes da divulgação."],
  ["Abordagem social zerada e divergência de agosto", "Setembro traz K.1 a K.6 e L.1 zerados. Em agosto, L.1 informa 8 abordagens com K.1 zerado. O relatório exibe a opção “Não realiza oferta do Serviço”, mas não permite confirmar se foi marcada; validar a oferta e os campos."],
  ["Casos e vítimas têm unidades diferentes", "A.2 soma 129 casos e B.6 soma 122 registros de vítimas. Um caso pode envolver família ou indivíduo e mais de uma vítima. Maio merece conferência: 21 casos e 8 vítimas."],
  ["Saídas do acompanhamento não registradas", "O RMA não informa desligamentos. Pela fórmula registros anteriores + novos casos − registros atuais, estimam-se 156 saídas entre fevereiro e setembro, sendo 49 em junho. Confirmar motivos e prontuários encerrados."],
  ["Conciliação entre perfis e violações", "Há 65 crianças e adolescentes em B.6, 45 classificações em C.1 a C.4 e 5 registros de trabalho infantil. As categorias podem se sobrepor. Em maio, C.2 registra 9 casos e B.6 apenas 3 vítimas até 17 anos."],
  ["Mulheres adultas", "F.1 registra 29 mulheres e B.6 registra 29 mulheres de 18 a 59 anos no período, mas há diferenças mensais: junho (7 e 3) e setembro (5 e 6). Validar a origem dos dados."],
  ["Medidas socioeducativas", "A Liberdade Assistida caiu de 13 em junho para 3 em julho e 2 em setembro. Em setembro, LA 2 + PSC 5 = 7, sem sobreposição. Agosto está sem preenchimento nas novas entradas."],
  ["Totais auxiliares e prazo de fechamento", "O quadro de exploração sexual apresenta −1 em julho embora o detalhamento indique 1; trabalho infantil de março e abril e fórmulas de idosos também precisam de revisão. O arquivo de setembro foi gerado em 14/10/2026; outubro a dezembro não foram consolidados. Campo vazio não equivale a zero."],
];

const recommendations = [
  "Proteger meninas de 7 a 12 anos e crianças até 6 anos: articular escola, saúde e Conselho Tutelar. Acompanhar abuso sexual (21) e negligência (11) por trimestre.",
  "Reforçar a rede de atendimento a mulheres adultas: são 29 registros, 5 em setembro. Acompanhar F.1 mensalmente e articular saúde, segurança e assistência.",
  "Acompanhar pessoas idosas e pessoas com deficiência com busca ativa e articulação da rede. Monitorar D.1, D.2, E.1 e E.2.",
  "Entender a queda do registros de 128 em janeiro para 97 em setembro, revisando os motivos dos desligamentos, sobretudo as 49 saídas estimadas em junho.",
  "Conciliar os blocos B.6, C, E e F, corrigindo os meninos de setembro e validando diferenças antes da divulgação oficial.",
  "Validar os registros de Abordagem Social e a queda da Liberdade Assistida. Acompanhar K.1, L.1, J.2 e J.3.",
  "Monitorar a carga da equipe: setembro teve 141 atendimentos e 75 visitas com registro de 97 casos (1,45 atendimento por caso).",
  "Padronizar o fechamento do RMA, com envio poucos dias após o mês e consolidação de outubro a dezembro no mesmo formato.",
];

const fmt = (value: number) =>
  value.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

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
    <section className="scroll-mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-extrabold tracking-tight text-slate-900">{title}</h2>
      {subtitle && <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Bar({ label, value, total, muted = false }: { label: string; value: number; total: number; muted?: boolean }) {
  const percent = total ? (value / total) * 100 : 0;
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-sm font-bold text-slate-800">{value} <span className="font-normal text-slate-500">({fmt(percent)}%)</span></span>
      <div className="col-span-2 h-2.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
        <div className={`h-full rounded-full ${muted ? "bg-slate-400" : "bg-green-700"}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function VictimsChart() {
  const max = 25;
  const chartHeight = 190;
  const scale = chartHeight / max;
  return (
    <div className="overflow-x-auto">
      <svg viewBox="0 0 760 260" role="img" aria-labelledby="victims-title victims-desc" className="min-w-[650px] w-full">
        <title id="victims-title">Vítimas ingressantes por mês e sexo</title>
        <desc id="victims-desc">{monthly.map((row) => `${row.month}: ${row.female} femininas e ${row.male} masculinas`).join("; ")}</desc>
        {[0, 5, 10, 15, 20, 25].map((value) => {
          const y = 215 - value * scale;
          return <g key={value}><line x1="42" x2="744" y1={y} y2={y} stroke="#e2e8f0" /><text x="32" y={y + 4} textAnchor="end" fontSize="11" fill="#64748b">{value}</text></g>;
        })}
        {monthly.map((row, index) => {
          const x = 56 + index * 76;
          const femaleH = row.female * scale;
          const maleH = row.male * scale;
          const totalH = femaleH + maleH;
          return (
            <g key={row.month}>
              <rect x={x} y={215 - femaleH} width="42" height={femaleH} fill="#15803d" rx="2" />
              <rect x={x} y={215 - totalH} width="42" height={maleH} fill="#94a3b8" rx="2" />
              {row.female > 0 && <text x={x + 21} y={215 - femaleH / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="white">{row.female}</text>}
              {row.male > 0 && <text x={x + 21} y={215 - femaleH - maleH / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="white">{row.male}</text>}
              <text x={x + 21} y={Math.max(16, 207 - totalH)} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">{row.victims}</text>
              <text x={x + 21} y="239" textAnchor="middle" fontSize="12" fill="#64748b">{row.month}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function RmaCreasPage() {
  const [selectedMonth, setSelectedMonth] = useState("all");
  const rows = selectedMonth === "all" ? monthly : monthly.filter((row) => row.month === selectedMonth);
  const fullPeriod = selectedMonth === "all";
  const sum = (key: "stock" | "cases" | "victims" | "individual" | "visits" | "mse") =>
    rows.reduce((total, row) => total + row[key], 0);
  const average = (key: "stock" | "mse") => sum(key) / rows.length;
  const kpis = [
    { label: "Novos casos no PAEFI", value: fmt(sum("cases")), detail: fullPeriod ? "129 no período · média de 14,3 por mês" : "Novas inserções no mês selecionado" },
    { label: fullPeriod ? "Média de casos acompanhados" : "Casos em acompanhamento", value: fmt(fullPeriod ? average("stock") : rows[0]?.stock ?? 0), detail: fullPeriod ? "Registros mensal médio; setembro fechou com 97" : "Registro de casos do PAEFI" },
    { label: "Atendimentos individualizados", value: fmt(sum("individual")), detail: fullPeriod ? "1.006 no período · setembro: 141" : "Atendimentos registrados no mês" },
    { label: "Visitas domiciliares", value: fmt(sum("visits")), detail: fullPeriod ? "556 no período · setembro: 75" : "Visitas registradas no mês" },
    { label: "Vítimas com perfil registrado", value: fmt(sum("victims")), detail: fullPeriod ? "122 no período · 61,5% do sexo feminino" : "Registros de ingresso em B.6" },
    { label: fullPeriod ? "Média de adolescentes em MSE" : "Adolescentes em MSE", value: fmt(fullPeriod ? average("mse") : rows[0]?.mse ?? 0), detail: fullPeriod ? "REgistros mensal médio de LA e/ou PSC" : "Registros mensal de LA e/ou PSC" },
    ...(fullPeriod ? [
      { label: "Atendimentos em grupo", value: "35", detail: "Soma de janeiro a setembro · 2 em setembro" },
      { label: "Famílias encaminhadas ao CRAS", value: "73", detail: "Soma de janeiro a setembro · 9 em setembro" },
    ] : []),
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-white/10 bg-[#102b27] text-white print:hidden">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" aria-label="Página inicial" className="flex min-w-0 items-center gap-4">
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
              <p className="mt-1 truncate text-xs text-emerald-100/70">
                Plataforma da Vigilância Socioassistencial
              </p>
            </div>
          </Link>

          <nav
            aria-label="Navegação principal"
            className="flex shrink-0 flex-col items-end gap-2"
          >
            <Link
              href="/"
              className="inline-flex h-9 w-24 items-center justify-center gap-1.5 rounded-full border border-white/20 px-2 text-xs font-semibold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]"
            >
              Início
              <ArrowIcon />
            </Link>
            <Link
              href="/painel/pse"
              className="inline-flex h-9 w-24 items-center justify-center gap-1.5 rounded-full border border-white/20 px-2 text-xs font-semibold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]"
            >
              <span aria-hidden="true" className="rotate-180">
                <ArrowIcon />
              </span>
              Voltar
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-6 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-green-700">Vigilância Socioassistencial</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Análise do RMA do CREAS</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">Registro Mensal de Atendimentos do CREAS Acolher e Fortalecer (unidade nº 11506500036, Travessa Santa Izabel, 1030 – Centro, Santa Izabel do Pará). PAEFI, medidas socioeducativas e abordagem social.</p>
          </div>
          <button type="button" onClick={() => window.print()} className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-green-300 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 print:hidden">Imprimir / salvar PDF</button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div><span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Janeiro a setembro de 2026</span><p className="mt-2 text-xs text-slate-500">Setembro gerado em 14/10/2026 · Consolidação sujeita à validação.</p></div>
          <div className="flex flex-wrap items-center gap-3 print:hidden">
            <label htmlFor="month" className="text-sm font-semibold text-slate-700">Período</label>
            <select id="month" value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-600">
              <option value="all">Jan a set — todos os meses</option>
              {monthly.map((row) => <option key={row.month} value={row.month}>{row.month} / 2026</option>)}
            </select>
          </div>
        </div>
        <p className="text-sm text-slate-600">Indicadores e tabela mensal: <strong className="text-slate-900">{fullPeriod ? "janeiro a setembro de 2026" : `${selectedMonth} de 2026`}</strong>. O perfil, as violações e as recomendações abaixo descrevem o período completo de janeiro a setembro.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map((kpi) => <div key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-semibold text-slate-500">{kpi.label}</p><p className="mt-3 text-3xl font-black tracking-tight text-green-700">{kpi.value}</p><p className="mt-2 text-xs leading-5 text-slate-500">{kpi.detail}</p></div>)}
        </div>

        <Panel title="Resumo executivo" subtitle="Principais conclusões do período">
          <ul className="space-y-3 text-sm leading-7 text-slate-600">
            <li><strong className="text-slate-800">Setembro:</strong> 14 novos casos, 12 vítimas ingressantes e 97 casos em acompanhamento. Foram 141 atendimentos individualizados (maior valor do ano), 75 visitas domiciliares e 7 adolescentes em medida socioeducativa.</li>
            <li><strong className="text-slate-800">Acumulado:</strong> 129 novos casos e 122 vítimas; 75 do sexo feminino (61,5%) e 47 do masculino (38,5%). Crianças e adolescentes somam 65 registros (53,3%).</li>
            <li><strong className="text-slate-800">Entradas:</strong> 26 novos casos no 1º trimestre, 51 no 2º (+96,2%) e 52 no 3º (+2,0%).</li>
            <li><strong className="text-slate-800">Registros:</strong> caiu de 128 em janeiro para 97 em setembro (−24,2%). Pela movimentação estimam-se 156 saídas de fevereiro a setembro, 49 delas em junho.</li>
            <li><strong className="text-slate-800">Violências mais registradas:</strong> abuso sexual contra crianças e adolescentes (21) e violência intrafamiliar contra mulheres adultas (29).</li>
            <li><strong className="text-slate-800">Perfil de setembro:</strong> 11 das 12 vítimas eram do sexo feminino (92%); metade tinha de 18 a 59 anos. Não houve registro de abuso sexual, exploração sexual ou negligência contra crianças e adolescentes.</li>
            <li><strong className="text-slate-800">Validações necessárias:</strong> diferenças entre casos e vítimas, meninos em C.5 e E.1 sem correspondência em B.6, abordagem social zerada e queda da Liberdade Assistida.</li>
          </ul>
        </Panel>

        <Panel title="Setembro em foco" subtitle="Comparação com agosto e com a média de janeiro a agosto">
          <div className="overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-sm">
            <thead className="bg-slate-50 text-slate-500"><tr>{["Indicador", "Setembro", "Agosto", "Variação vs. agosto", "Média jan–ago", "Variação vs. média"].map((heading, index) => <th key={heading} scope="col" className={`border-b border-slate-200 px-3 py-3 font-semibold ${index === 0 ? "text-left" : "text-right"}`}>{heading}</th>)}</tr></thead>
            <tbody>{[
              ["Casos em acompanhamento", "97", "102", "−5 (−4,9%)", "107,6", "−9,9%"],
              ["Novos casos", "14", "13", "+1 (+7,7%)", "14,4", "−2,6%"],
              ["Vítimas com perfil registrado", "12", "17", "−5 (−29,4%)", "13,8", "−12,7%"],
              ["Atendimentos individualizados", "141", "101", "+40 (+39,6%)", "108,1", "+30,4%"],
              ["Visitas domiciliares", "75", "54", "+21 (+38,9%)", "60,1", "+24,7%"],
              ["Adolescentes em MSE", "7", "6", "+1 (+16,7%)", "11,9", "−41,1%"],
            ].map((row) => <tr key={row[0]} className="even:bg-slate-50"><th scope="row" className="border-b border-slate-100 px-3 py-3 text-left font-semibold text-slate-700">{row[0]}</th>{row.slice(1).map((cell, index) => <td key={index} className="border-b border-slate-100 px-3 py-3 text-right tabular-nums text-slate-600">{cell}</td>)}</tr>)}</tbody>
          </table></div>
          <div className="mt-5 rounded-lg bg-slate-50 p-4"><h3 className="text-sm font-bold text-slate-800">Detalhe do RMA de setembro</h3><p className="mt-2 text-sm leading-7 text-slate-600">14 novos casos (A.2), 97 em acompanhamento (A.1), 12 vítimas ingressantes (B.6), 141 atendimentos individuais, 75 visitas, 2 atendimentos em grupo, 9 famílias encaminhadas ao CRAS e 7 adolescentes em MSE (2 LA e 5 PSC).</p><p className="mt-2 text-sm leading-7 text-slate-600">Foram registrados 5 casos de violência intrafamiliar contra mulheres adultas e 2 contra meninas; 1 idosa em violência intrafamiliar; 1 menino de 13 a 17 anos com deficiência; e 1 menino de 0 a 12 anos em trabalho infantil. Não houve registro de abuso sexual, exploração sexual ou negligência de crianças e adolescentes.</p><p className="mt-2 text-sm leading-7 text-slate-600">Entre os novos casos, 8 famílias eram do Bolsa Família, 2 tinham membro beneficiário do BPC, 1 tinha trabalho infantil e 1 tinha violação associada a substâncias.</p></div>
        </Panel>

        <Panel title="Índices mensais" subtitle="Registros, entradas, vítimas e atividades por mês. O filtro altera esta tabela e os indicadores superiores.">
          <div className="overflow-x-auto"><table className="w-full min-w-[1050px] border-collapse text-sm">
            <caption className="sr-only">Índices mensais do RMA do CREAS</caption>
            <thead className="bg-slate-50 text-slate-500"><tr>{["Mês", "Em acomp.", "Novos casos", "Vítimas", "Atend. indiv.", "Visitas", "Adolesc. MSE", "Saídas estim.**", "Atend./caso", "Visitas/caso"].map((heading, index) => <th key={heading} scope="col" className={`border-b border-slate-200 px-3 py-3 font-semibold ${index === 0 ? "text-left" : "text-right"}`}>{heading}</th>)}</tr></thead>
            <tbody>{rows.map((row) => <tr key={row.month} className="even:bg-slate-50"><th scope="row" className="border-b border-slate-100 px-3 py-3 text-left font-semibold text-slate-800">{row.month}</th>{[row.stock, row.cases, row.victims, row.individual, row.visits, row.mse, row.exits === null ? "–" : row.exits, (row.individual / row.stock).toFixed(2).replace(".", ","), (row.visits / row.stock).toFixed(2).replace(".", ",")].map((value, index) => <td key={index} className="border-b border-slate-100 px-3 py-3 text-right tabular-nums text-slate-600">{value}</td>)}</tr>)}</tbody>
            <tfoot className="bg-green-50 font-bold text-green-800"><tr><th scope="row" className="px-3 py-3 text-left">{fullPeriod ? "Soma" : "Mês"}</th>{fullPeriod ? ["958*", "129", "122", "1.006", "556", "102*", "156", "—", "—"].map((value, index) => <td key={index} className="px-3 py-3 text-right tabular-nums">{value}</td>) : [rows[0]?.stock ?? 0, rows[0]?.cases ?? 0, rows[0]?.victims ?? 0, rows[0]?.individual ?? 0, rows[0]?.visits ?? 0, rows[0]?.mse ?? 0, rows[0]?.exits ?? "–", (rows[0] ? rows[0].individual / rows[0].stock : 0).toFixed(2).replace(".", ","), (rows[0] ? rows[0].visits / rows[0].stock : 0).toFixed(2).replace(".", ",")].map((value, index) => <td key={index} className="px-3 py-3 text-right tabular-nums">{value}</td>)}</tr></tfoot>
          </table></div>
          <p className="mt-4 text-xs leading-6 text-slate-500">* A soma dos registros mensais não representa pessoas ou famílias únicas. ** Saídas estimadas = registro do mês anterior + novos casos − registro atual; janeiro não tem base para cálculo. Atend./caso e visitas/caso = atividades ÷ casos em acompanhamento.</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">O registros caiu de 128 em janeiro para 76 em junho, voltou a 102 em agosto e fechou setembro com 97. Julho teve o maior número de novos casos (25), o que não demonstra isoladamente aumento da violência no território. Em setembro houve 1,45 atendimento por caso e 0,77 visita por caso, contra 1,00 e 0,56, respectivamente, na média de janeiro a agosto.</p>
        </Panel>

        <Panel title="Comparativo trimestral" subtitle="Soma dos meses de cada trimestre; registro e MSE são médias mensais.">
          <div className="overflow-x-auto"><table className="w-full min-w-[900px] border-collapse text-sm"><thead className="bg-slate-50 text-slate-500"><tr>{["Trimestre", "Novos casos", "Vítimas", "% feminino", "Atend. indiv.", "Visitas", "Registro (média)", "MSE (média)", "Saídas estim."].map((heading, index) => <th key={heading} scope="col" className={`border-b border-slate-200 px-3 py-3 font-semibold ${index === 0 ? "text-left" : "text-right"}`}>{heading}</th>)}</tr></thead><tbody>{quarterly.map((row) => <tr key={row[0]} className="even:bg-slate-50">{row.map((cell, index) => index === 0 ? <th key={index} scope="row" className="border-b border-slate-100 px-3 py-3 text-left font-semibold text-slate-700">{cell}</th> : <td key={index} className="border-b border-slate-100 px-3 py-3 text-right tabular-nums text-slate-600">{cell}</td>)}</tr>)}</tbody></table></div>
          <p className="mt-4 text-sm leading-7 text-slate-600">Os novos casos passaram de 26 para 51 e 52 por trimestre. As vítimas cresceram de 30 para 40 e 52. O segundo trimestre teve a maior saída estimada (99); a média de adolescentes em MSE caiu de 13,3 no segundo para 8,0 no terceiro trimestre.</p>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Vítimas por mês e sexo" subtitle="Janeiro a setembro · 122 registros">
            <div className="mb-3 flex flex-wrap gap-5 text-xs text-slate-600"><span><span className="mr-2 inline-block h-2.5 w-2.5 rounded-sm bg-green-700" />Feminino: 75 (61,5%)</span><span><span className="mr-2 inline-block h-2.5 w-2.5 rounded-sm bg-slate-400" />Masculino: 47 (38,5%)</span></div>
            <VictimsChart />
            <p className="mt-3 text-sm leading-6 text-slate-600">Em julho, 17 dos 23 registros eram femininos. Em agosto, 13 dos 17 eram masculinos. Em setembro, 11 das 12 vítimas eram femininas (92%).</p>
          </Panel>
          <Panel title="Perfil das vítimas" subtitle="Proporções sobre os 122 registros de janeiro a setembro">
            <h3 className="mb-4 text-sm font-bold text-slate-800">Sexo</h3><div className="space-y-4"><Bar label="Feminino" value={75} total={122} /><Bar label="Masculino" value={47} total={122} muted /></div>
            <h3 className="mb-4 mt-6 text-sm font-bold text-slate-800">Faixa etária</h3><div className="space-y-4"><Bar label="0 a 12 anos" value={40} total={122} /><Bar label="13 a 17 anos" value={25} total={122} /><Bar label="18 a 59 anos" value={36} total={122} /><Bar label="60 anos ou mais" value={21} total={122} /></div>
            <h3 className="mb-3 mt-6 text-sm font-bold text-slate-800">Somente setembro · 12 registros</h3><p className="text-sm leading-6 text-slate-600">11 mulheres (91,7%) e 1 homem (8,3%). Por idade: 2 pessoas de 0 a 12 anos, 1 adolescente de 13 a 17 anos, 6 pessoas de 18 a 59 anos e 3 pessoas com 60 anos ou mais.</p>
          </Panel>
        </div>

        <Panel title="Violências e situações identificadas" subtitle="Janeiro a setembro · categorias podem se sobrepor; não somar para obter vítimas únicas.">
          <div className="overflow-x-auto"><table className="w-full min-w-[850px] border-collapse text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th scope="col" className="border-b border-slate-200 px-3 py-3 text-left">Situação</th><th scope="col" className="border-b border-slate-200 px-3 py-3 text-right">Jan–set</th><th scope="col" className="border-b border-slate-200 px-3 py-3 text-right">Setembro</th><th scope="col" className="border-b border-slate-200 px-3 py-3 text-left">Perfil e observações</th></tr></thead><tbody>{violations.map(([label, total, september, detail]) => <tr key={label} className="border-b border-slate-100 even:bg-slate-50"><th scope="row" className="px-3 py-3 text-left font-semibold text-slate-700">{label}</th><td className="px-3 py-3 text-right font-bold text-green-700">{total}</td><td className="px-3 py-3 text-right text-slate-600">{september}</td><td className="px-3 py-3 leading-6 text-slate-500">{detail}</td></tr>)}</tbody></table></div>
          <p className="mt-4 text-sm leading-7 text-slate-600">Entre as 45 classificações de C.1 a C.4: abuso sexual representa 46,7%, violência intrafamiliar 26,7%, negligência ou abandono 24,4% e exploração sexual 2,2%. Trabalho infantil é registrado separadamente em C.5.</p>
        </Panel>

        <Panel title="Perfil das famílias novas" subtitle="Características podem se sobrepor; B.1 a B.5 e B.7 não somam A.2.">
          <div className="overflow-x-auto"><table className="w-full min-w-[700px] border-collapse text-sm"><thead className="bg-slate-50 text-slate-500"><tr>{["Perfil das novas inserções", "Jan–ago", "Setembro", "Total jan–set", "% dos 129 casos"].map((heading, index) => <th key={heading} scope="col" className={`border-b border-slate-200 px-3 py-3 font-semibold ${index === 0 ? "text-left" : "text-right"}`}>{heading}</th>)}</tr></thead><tbody>{newFamilyProfiles.map((row) => <tr key={row[0]} className="even:bg-slate-50">{row.map((cell, index) => index === 0 ? <th key={index} scope="row" className="border-b border-slate-100 px-3 py-3 text-left font-semibold text-slate-700">{cell}</th> : <td key={index} className="border-b border-slate-100 px-3 py-3 text-right tabular-nums text-slate-600">{cell}</td>)}</tr>)}</tbody></table></div>
        </Panel>

        <Panel title="Atendimentos e articulação" subtitle="Volume de trabalho registrado">
          <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-lg bg-slate-50 p-4"><strong className="text-xl text-slate-800">1.006</strong><p className="mt-1 text-sm text-slate-600">Atendimentos individualizados · média de 111,8 por mês; setembro: 141, o maior do ano.</p></div><div className="rounded-lg bg-slate-50 p-4"><strong className="text-xl text-slate-800">556</strong><p className="mt-1 text-sm text-slate-600">Visitas domiciliares · picos em janeiro (85) e junho (82); setembro: 75.</p></div><div className="rounded-lg bg-slate-50 p-4"><strong className="text-xl text-slate-800">35</strong><p className="mt-1 text-sm text-slate-600">Atendimentos em grupo no período; setembro: 2.</p></div><div className="rounded-lg bg-slate-50 p-4"><strong className="text-xl text-slate-800">73</strong><p className="mt-1 text-sm text-slate-600">Famílias encaminhadas ao CRAS; setembro: 9.</p></div></div>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Medidas socioeducativas" subtitle="Liberdade Assistida e Prestação de Serviços à Comunidade"><ul className="space-y-3 text-sm leading-7 text-slate-600"><li>Registro: 12 em janeiro, 15 em maio (máximo), 6 em agosto e 7 em setembro.</li><li>Setembro: 2 em LA e 5 em PSC, sem sobreposição e sem novas entradas.</li><li>Foram 9 novas inserções entre janeiro e julho (6 masculinas e 3 femininas); fevereiro, abril, julho e setembro zerados; agosto sem preenchimento.</li><li>LA caiu de 13 em junho para 3 em julho e 2 em setembro.</li></ul></Panel>
          <Panel title="Abordagem social" subtitle="Registro pendente de conciliação"><p className="text-sm leading-7 text-slate-600">Em setembro, K.1 a K.6 e L.1 estão zerados. Em agosto, L.1 traz 8 abordagens com K.1 zerado, divergência ainda sem validação.</p><p className="mt-3 text-sm leading-7 text-slate-600">Indicadores zerados não permitem concluir que o serviço não funciona ou que não há demanda no território. Confirmar se a oferta está ativa e se os campos foram corretamente preenchidos.</p></Panel>
        </div>

        <Panel title="Públicos que merecem atenção" subtitle="Leitura descritiva dos registros de janeiro a setembro">
          <div className="grid gap-3 sm:grid-cols-2">{[
            ["Meninas de 7 a 12 anos", "10 dos 18 registros femininos de abuso sexual estão nessa faixa. Abuso sexual é a violação mais frequente contra crianças e adolescentes (21 registros)."],
            ["Crianças até 6 anos", "10 dos 11 registros de negligência ou abandono e 6 dos 12 registros de violência intrafamiliar. Em setembro, entraram 2 crianças de 0 a 12 anos no perfil."],
            ["Adolescentes de 13 a 17 anos", "25 registros no perfil de vítimas (20,5%). Setembro: 1 menina em violência intrafamiliar e 1 menino com deficiência."],
            ["Mulheres adultas (18 a 59 anos)", "29 registros de violência intrafamiliar; 5 em setembro. Em setembro, 6 das 12 vítimas tinham de 18 a 59 anos."],
            ["Pessoas idosas", "21 registros no perfil (17,2%). Negligência: 5 homens e 1 mulher. Violência intrafamiliar: 4 mulheres e 1 homem."],
            ["Pessoas com deficiência", "2 registros detalhados: negligência (mulher adulta, abril) e violência intrafamiliar (menino de 13 a 17 anos, setembro)."],
            ["Crianças em trabalho infantil", "5 registros em C.5 (3 meninos e 2 meninas) e 2 famílias novas em B.3. Setembro: 1 menino de 0 a 12 anos."],
            ["Famílias beneficiárias de programas", "57 novas inserções do Bolsa Família (44,2%); 8 de 14 em setembro. Também há 13 famílias com membro do BPC e 6 com violação associada a substâncias."],
          ].map(([title, detail]) => <div key={title} className="rounded-lg border border-slate-200 bg-white p-4"><h3 className="text-sm font-bold text-slate-800">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p></div>)}</div>
          <p className="mt-4 text-xs leading-6 text-slate-500">O RMA do CREAS não detalha gravidez na adolescência nem envolvimento sexual; para essas questões, a análise deve ser articulada com os dados do Conselho Tutelar.</p>
        </Panel>

        <Panel title="Pontos de atenção nos dados" subtitle="Conferir antes da consolidação oficial"><div className="space-y-5">{attention.map(([title, description], index) => <div key={title} className="border-l-4 border-amber-400 pl-4"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-bold text-slate-800">{title}</h3><span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${index < 3 ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-800"}`}>{index < 3 ? "Conferir primeiro" : "Conferir"}</span></div><p className="mt-1 text-sm leading-7 text-slate-600">{description}</p></div>)}</div></Panel>

        <Panel title="Recomendações para a gestão" subtitle="Ações sugeridas e indicadores para acompanhamento"><ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-600">{recommendations.map((recommendation) => <li key={recommendation} className="pl-1">{recommendation}</li>)}</ol></Panel>

        <footer className="border-t border-slate-200 pt-5 text-xs leading-6 text-slate-500"><p>Fonte principal: Registro Mensal de Atendimentos do CREAS (SNAS/SAGI), janeiro a setembro de 2026; relatório de setembro gerado em 14/10/2026. Os dados de janeiro a agosto vieram da análise anterior da planilha anexada.</p><p className="mt-2">Estes indicadores descrevem registros de atendimento. Não medem incidência municipal de violência, cobertura populacional ou efetividade do serviço. Esta página não envia dados ao sistema oficial do RMA.</p><p className="mt-3 font-semibold text-slate-600">SEMTEPS · Prefeitura de Santa Izabel do Pará</p></footer>
      </div>
    </main>
  );
}

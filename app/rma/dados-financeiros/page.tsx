"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

// Tipos dos dados transcritos do demonstrativo oficial de parcelas pagas.
type Installment = {
  parcel: string;
  date: string;
  order: string;
  account: string;
  amount: number;
};

type TransferProgram = {
  group: string;
  program: string;
  installments: Installment[];
};

// Valores em reais. Cada parcela contém referência, data da ordem bancária,
// número da ordem, conta indicada no relatório e valor bruto/líquido.
const programs: TransferProgram[] = [
  {
    group: "Programas",
    program: "PROCAD-SUAS — fortalecimento do atendimento do Cadastro Único",
    installments: [
      { parcel: "04/2026", date: "13/05/2026", order: "5970", account: "025801/00000038771", amount: 57047.67 },
    ],
  },
  {
    group: "Programas",
    program: "Primeira Infância no SUAS",
    installments: [
      { parcel: "01/2026", date: "30/01/2026", order: "315", account: "025801/00000029477", amount: 10785.00 },
      { parcel: "02/2026", date: "02/03/2026", order: "1264", account: "025801/00000029477", amount: 9219.00 },
      { parcel: "03/2026", date: "02/04/2026", order: "3269", account: "025801/00000029477", amount: 8109.00 },
    ],
  },
  {
    group: "Programas",
    program: "Ações Estratégicas do Programa de Erradicação do Trabalho Infantil",
    installments: [
      { parcel: "04/2026", date: "28/05/2026", order: "6485", account: "025801/00000044345", amount: 24000.00 },
    ],
  },
  {
    group: "Programas",
    program: "BPC na Escola — questionário a ser aplicado",
    installments: [
      { parcel: "01/2026", date: "03/03/2026", order: "1312", account: "025801/00000028315", amount: 1720.00 },
      { parcel: "02/2026", date: "09/03/2026", order: "1341", account: "025801/00000028315", amount: 3360.00 },
      { parcel: "03/2026", date: "09/04/2026", order: "3298", account: "025801/00000028315", amount: 280.00 },
    ],
  },
  {
    group: "Estruturação da Rede de Serviços do SUAS — Custeio",
    program: "EstruturaSUAS Custeio — GND3",
    installments: [
      { parcel: "03/2026", date: "30/03/2026", order: "2188", account: "025801/00000044835", amount: 100000.00 },
    ],
  },
  {
    group: "Proteção Social Especial de Média e Alta Complexidade",
    program: "Piso Fixo de Média Complexidade — PAEFI",
    installments: [
      { parcel: "01/2026", date: "30/01/2026", order: "619", account: "025801/00000030183", amount: 6055.32 },
      { parcel: "02/2026", date: "02/03/2026", order: "989", account: "025801/00000030183", amount: 6055.19 },
      { parcel: "03/2026", date: "27/03/2026", order: "1775", account: "025801/00000030183", amount: 6058.53 },
      { parcel: "04/2026", date: "28/04/2026", order: "4254", account: "025801/00000030183", amount: 6058.13 },
      { parcel: "05/2026", date: "28/05/2026", order: "6275", account: "025801/00000030183", amount: 6056.94 },
      { parcel: "06/2026", date: "01/07/2026", order: "8045", account: "025801/00000030183", amount: 6054.80 },
      { parcel: "07/2026", date: "31/07/2026", order: "9155", account: "025801/00000030183", amount: 6057.40 },
      { parcel: "08/2026", date: "28/08/2026", order: "9511", account: "025801/00000030183", amount: 6050.84 },
      { parcel: "09/2026", date: "24/09/2026", order: "10110", account: "025801/0000301833", amount: 6051.94 },
      { parcel: "10/2026", date: "23/10/2026", order: "10538", account: "025801/00000030183", amount: 6050.50 },
    ],
  },
  {
    group: "Proteção Social Especial de Média e Alta Complexidade",
    program: "Piso Fixo de Média Complexidade — MSE",
    installments: [
      { parcel: "01/2026", date: "30/01/2026", order: "620", account: "025801/00000030183", amount: 1665.21 },
      { parcel: "02/2026", date: "02/03/2026", order: "1002", account: "025801/00000030183", amount: 1665.18 },
      { parcel: "03/2026", date: "27/03/2026", order: "1795", account: "025801/00000030183", amount: 1666.09 },
      { parcel: "04/2026", date: "28/04/2026", order: "4253", account: "025801/00000030183", amount: 1665.98 },
      { parcel: "05/2026", date: "28/05/2026", order: "6261", account: "025801/00000030183", amount: 1665.66 },
      { parcel: "06/2026", date: "01/07/2026", order: "8027", account: "025801/00000030183", amount: 1665.07 },
      { parcel: "07/2026", date: "31/07/2026", order: "9096", account: "025801/00000030183", amount: 1665.78 },
      { parcel: "08/2026", date: "28/08/2026", order: "9377", account: "025801/00000030183", amount: 1663.98 },
      { parcel: "09/2026", date: "24/09/2026", order: "10106", account: "025801/0000301833", amount: 1664.28 },
      { parcel: "10/2026", date: "23/10/2026", order: "10522", account: "025801/00000030183", amount: 1663.89 },
    ],
  },
  {
    group: "Proteção Social Básica",
    program: "Serviço de Convivência e Fortalecimento de Vínculos — SCFV",
    installments: [
      { parcel: "01/2026", date: "30/01/2026", order: "401", account: "025801/00000028326", amount: 20574.73 },
      { parcel: "02/2026", date: "02/03/2026", order: "1249", account: "025801/00000028326", amount: 20574.73 },
      { parcel: "03/2026", date: "27/03/2026", order: "2000", account: "025801/00000028326", amount: 20574.73 },
      { parcel: "04/2026", date: "28/04/2026", order: "4436", account: "025801/00000028326", amount: 20968.96 },
      { parcel: "05/2026", date: "28/05/2026", order: "6045", account: "025801/00000028326", amount: 20968.96 },
      { parcel: "06/2026", date: "01/07/2026", order: "7878", account: "025801/00000028326", amount: 20968.96 },
      { parcel: "07/2026", date: "31/07/2026", order: "8833", account: "025801/00000028326", amount: 21437.42 },
      { parcel: "08/2026", date: "28/08/2026", order: "9533", account: "025801/00000028326", amount: 21437.42 },
      { parcel: "09/2026", date: "24/09/2026", order: "9919", account: "025801/0000283266", amount: 21437.42 },
      { parcel: "10/2026", date: "23/10/2026", order: "10728", account: "025801/00000028326", amount: 21351.45 },
    ],
  },
  {
    group: "Proteção Social Básica",
    program: "Piso Básico Fixo",
    installments: [
      { parcel: "01/2026", date: "30/01/2026", order: "394", account: "025801/00000028326", amount: 8833.52 },
      { parcel: "02/2026", date: "02/03/2026", order: "1171", account: "025801/00000028326", amount: 8832.93 },
      { parcel: "03/2026", date: "27/03/2026", order: "1969", account: "025801/00000028326", amount: 8832.93 },
      { parcel: "04/2026", date: "28/04/2026", order: "4108", account: "025801/00000028326", amount: 9302.31 },
      { parcel: "05/2026", date: "28/05/2026", order: "6114", account: "025801/00000028326", amount: 9305.04 },
      { parcel: "06/2026", date: "01/07/2026", order: "7816", account: "025801/00000028326", amount: 9304.79 },
      { parcel: "07/2026", date: "31/07/2026", order: "8856", account: "025801/00000028326", amount: 9026.28 },
      { parcel: "08/2026", date: "28/08/2026", order: "9605", account: "025801/00000028326", amount: 9026.28 },
      { parcel: "09/2026", date: "24/09/2026", order: "9856", account: "025801/0000283266", amount: 9033.48 },
      { parcel: "10/2026", date: "23/10/2026", order: "10724", account: "025801/00000028326", amount: 9037.65 },
    ],
  },
  {
    group: "Gestão do Programa Bolsa Família e do Cadastro Único",
    program: "Índice de Gestão Descentralizada — IGD-BF",
    installments: [
      { parcel: "12/2025", date: "16/01/2026", order: "136", account: "025801/00000028317", amount: 36171.49 },
      { parcel: "01/2026", date: "02/03/2026", order: "800", account: "025801/00000028317", amount: 32913.51 },
      { parcel: "02/2026", date: "27/03/2026", order: "2063", account: "025801/00000028317", amount: 31248.74 },
      { parcel: "03/2026", date: "10/04/2026", order: "3355", account: "025801/00000028317", amount: 31904.54 },
      { parcel: "04/2026", date: "11/05/2026", order: "5905", account: "025801/00000028317", amount: 31810.02 },
      { parcel: "05/2026", date: "16/06/2026", order: "7321", account: "025801/00000028317", amount: 31464.72 },
      { parcel: "06/2026", date: "09/07/2026", order: "8713", account: "025801/00000028317", amount: 32576.79 },
      { parcel: "07/2026", date: "18/08/2026", order: "9199", account: "025801/00000028317", amount: 31376.69 },
      { parcel: "08/2026", date: "14/09/2026", order: "9748", account: "025801/00000028317", amount: 30520.67 },
      { parcel: "09/2026", date: "23/10/2026", order: "10356", account: "025801/00000028317", amount: 31913.94 },
    ],
  },
];

// Exibe moeda brasileira com duas casas decimais.
const brl = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

// Soma as parcelas do programa sem depender de valores digitados manualmente.
const programTotal = (program: TransferProgram) =>
  program.installments.reduce((total, installment) => total + installment.amount, 0);

// Ícone reutilizado nos botões de navegação.
function ArrowIcon({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      {back ? (
        <path d="M19 12H5m6 6-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

// Cartão resumido de indicador financeiro.
function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="rounded-2xl border border-[#e1e3d9] bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[.12em] text-emerald-800">{label}</p>
      <p className="mt-3 text-2xl font-black tracking-tight text-[#102b27] sm:text-3xl">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
    </article>
  );
}

export default function ParcelasPagasPage() {
  const [selectedGroup, setSelectedGroup] = useState("Todos os grupos");

  // Consolida os totais por grupo a partir das parcelas detalhadas.
  const groupSummary = useMemo(() => {
    const grouped = new Map<string, number>();
    programs.forEach((program) => {
      grouped.set(program.group, (grouped.get(program.group) ?? 0) + programTotal(program));
    });
    return Array.from(grouped, ([group, total]) => ({ group, total }));
  }, []);

  const grandTotal = programs.reduce((total, program) => total + programTotal(program), 0);
  const filteredPrograms = selectedGroup === "Todos os grupos"
    ? programs
    : programs.filter((program) => program.group === selectedGroup);
  const installmentCount = programs.reduce((total, program) => total + program.installments.length, 0);
  const largestGroup = [...groupSummary].sort((a, b) => b.total - a.total)[0];
  const largestShare = largestGroup ? (largestGroup.total / grandTotal) * 100 : 0;

  function handleBack() {
    if (window.history.length > 1) window.history.back();
    else window.location.assign("/");
  }

  return (
    <main className="min-h-screen bg-[#f3f2ed] text-slate-900">
      {/* Cabeçalho institucional no padrão visual das páginas do painel. */}
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
          <nav aria-label="Navegação principal" className="flex shrink-0 flex-col items-end gap-2">
            <Link href="/" className="inline-flex h-9 w-24 items-center justify-center gap-2 rounded-full border border-white/20 px-3 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]">Início <ArrowIcon /></Link>
            <button type="button" onClick={handleBack} className="inline-flex h-9 w-24 items-center justify-center gap-2 rounded-full border border-white/20 px-3 text-xs font-bold text-white transition hover:border-lime-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#102b27]">
              <ArrowIcon back /> Voltar
            </button>
          </nav>
        </div>
      </header>

      {/* Título e contexto do demonstrativo. */}
      <section className="bg-[#102b27] text-white">
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-9 sm:px-8 sm:pb-12 lg:px-12 lg:pt-12">
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-lime-300">Vigilância Socioassistencial · SEMTEPS</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-.035em] sm:text-4xl lg:text-5xl">Parcelas pagas por grupo</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-emerald-50/75 sm:text-base">Demonstrativo de transferências federais para Santa Izabel do Pará em 2026, organizado por bloco, programa e ordem bancária.</p>
          <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-lime-300 to-emerald-400" />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] space-y-8 px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        {/* Indicadores gerais calculados a partir dos registros listados no documento. */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total líquido pago" value={brl(grandTotal)} detail="Total geral informado no demonstrativo." />
          <MetricCard label="Ordens / parcelas" value={String(installmentCount)} detail="Registros detalhados nos cinco grupos apresentados." />
          <MetricCard label="Maior grupo" value={brl(largestGroup?.total ?? 0)} detail={`${largestGroup?.group ?? ""} · ${largestShare.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}% do total.`} />
          <MetricCard label="Descontos e bloqueios" value={brl(0)} detail="O demonstrativo apresenta ambos os campos zerados." />
        </div>

        {/* Resumo dos valores recebidos por grupo. */}
        <section className="overflow-hidden rounded-2xl border border-[#e1e3d9] bg-white shadow-sm">
          <div className="border-b border-[#efefe9] px-5 py-5 sm:px-7">
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-800">Visão consolidada</p>
            <h2 className="mt-2 text-xl font-black text-[#102b27] sm:text-2xl">Total pago por grupo</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">Os valores abaixo reproduzem os totais dos grupos no relatório. As participações percentuais são calculadas sobre R$ 914.452,48.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-sm">
              <thead className="bg-slate-50 text-slate-500"><tr><th scope="col" className="px-5 py-3 text-left font-semibold">Grupo</th><th scope="col" className="px-5 py-3 text-right font-semibold">Valor líquido</th><th scope="col" className="px-5 py-3 text-right font-semibold">Participação</th></tr></thead>
              <tbody>
                {groupSummary.map(({ group, total }) => (
                  <tr key={group} className="border-t border-slate-100">
                    <th scope="row" className="px-5 py-4 text-left font-semibold text-slate-700">{group}</th>
                    <td className="px-5 py-4 text-right font-bold tabular-nums text-emerald-800">{brl(total)}</td>
                    <td className="px-5 py-4 text-right tabular-nums text-slate-600">{((total / grandTotal) * 100).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-emerald-200 bg-emerald-50"><th scope="row" className="px-5 py-4 text-left font-black text-[#102b27]">TOTAL GERAL</th><td className="px-5 py-4 text-right font-black tabular-nums text-[#102b27]">{brl(grandTotal)}</td><td className="px-5 py-4 text-right font-black text-[#102b27]">100%</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Leitura gerencial limitada às informações presentes no demonstrativo. */}
        <section className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm lg:col-span-2">
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-800">Análise dos valores</p>
            <h2 className="mt-2 text-xl font-black text-[#102b27]">Concentração dos repasses</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li><strong className="text-slate-800">Gestão do Bolsa Família e Cadastro Único:</strong> {brl(321901.11)}, maior montante, equivalente a 35,2% do total.</li>
              <li><strong className="text-slate-800">Proteção Social Básica:</strong> {brl(300829.99)}, ou 32,9% do total; reúne SCFV e Piso Básico Fixo.</li>
              <li><strong className="text-slate-800">PSB e gestão do Cadastro Único somadas:</strong> {brl(321901.11 + 300829.99)}, aproximadamente 68,1% dos valores listados.</li>
              <li>Os grupos de Programas, Estruturação da Rede e Proteção Social Especial somam {brl(114520.67 + 100000 + 77200.71)}.</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-amber-900">Atenção à referência</p>
            <h2 className="mt-2 text-lg font-black text-amber-950">Competência e data de pagamento</h2>
            <p className="mt-3 text-sm leading-6 text-amber-950">O relatório usa a referência “Ordem Bancária”. Em geral, parcela e data da ordem não coincidem. Por exemplo, a parcela 09/2026 do IGD-BF tem ordem bancária em 23/10/2026; há também parcela 12/2025 paga em janeiro de 2026. Não interpretar a data de pagamento como competência da parcela.</p>
          </article>
        </section>

        {/* Tabela completa das parcelas, com filtro por grupo. */}
        <section className="overflow-hidden rounded-2xl border border-[#e1e3d9] bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-[#efefe9] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-800">Detalhamento</p>
              <h2 className="mt-2 text-xl font-black text-[#102b27] sm:text-2xl">Programas e parcelas</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">Abra cada programa para consultar parcelas, datas, ordens bancárias, contas e valores.</p>
            </div>
            <label htmlFor="group-filter" className="text-sm font-semibold text-slate-700">Filtrar grupo
              <select id="group-filter" value={selectedGroup} onChange={(event) => setSelectedGroup(event.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-600 sm:min-w-72">
                <option>Todos os grupos</option>
                {groupSummary.map(({ group }) => <option key={group}>{group}</option>)}
              </select>
            </label>
          </div>
          <div className="space-y-3 p-4 sm:p-6">
            {filteredPrograms.map((program) => (
              <details key={`${program.group}-${program.program}`} className="group rounded-xl border border-slate-200 bg-white open:border-emerald-200 open:bg-emerald-50/30">
                <summary className="flex cursor-pointer list-none flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 [&::-webkit-details-marker]:hidden">
                  <span><span className="block text-[10px] font-black uppercase tracking-[.14em] text-emerald-800">{program.group}</span><span className="mt-1 block text-sm font-bold text-slate-800">{program.program}</span></span>
                  <span className="flex items-center justify-between gap-4 sm:justify-end"><span className="text-xs text-slate-500">{program.installments.length} {program.installments.length === 1 ? "parcela" : "parcelas"}</span><strong className="text-sm font-black tabular-nums text-emerald-800">{brl(programTotal(program))}</strong><span aria-hidden="true" className="text-lg text-slate-400 transition group-open:rotate-180">⌄</span></span>
                </summary>
                <div className="overflow-x-auto border-t border-slate-200">
                  <table className="w-full min-w-[760px] border-collapse text-xs sm:text-sm">
                    <thead className="bg-white/80 text-slate-500"><tr><th scope="col" className="px-4 py-3 text-left font-semibold">Parcela</th><th scope="col" className="px-4 py-3 text-left font-semibold">Data da ordem</th><th scope="col" className="px-4 py-3 text-left font-semibold">Nº da ordem</th><th scope="col" className="px-4 py-3 text-left font-semibold">Agência / conta</th><th scope="col" className="px-4 py-3 text-right font-semibold">Bruto</th><th scope="col" className="px-4 py-3 text-right font-semibold">Líquido</th></tr></thead>
                    <tbody>{program.installments.map((installment) => <tr key={`${installment.parcel}-${installment.order}`} className="border-t border-slate-100"><td className="px-4 py-3 text-slate-700">{installment.parcel}</td><td className="px-4 py-3 text-slate-700">{installment.date}</td><td className="px-4 py-3 text-slate-700">{installment.order}</td><td className="px-4 py-3 font-mono text-xs text-slate-600">{installment.account}</td><td className="px-4 py-3 text-right tabular-nums text-slate-700">{brl(installment.amount)}</td><td className="px-4 py-3 text-right font-semibold tabular-nums text-emerald-800">{brl(installment.amount)}</td></tr>)}</tbody>
                    <tfoot><tr className="border-t border-emerald-200 bg-white/80"><th colSpan={4} scope="row" className="px-4 py-3 text-left font-black text-slate-800">Total do programa</th><td className="px-4 py-3 text-right font-black tabular-nums text-slate-800">{brl(programTotal(program))}</td><td className="px-4 py-3 text-right font-black tabular-nums text-emerald-800">{brl(programTotal(program))}</td></tr></tfoot>
                  </table>
                </div>
              </details>
            ))}
          </div>
          <div className="border-t border-emerald-200 bg-emerald-50 px-5 py-4 sm:px-7">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><span className="text-sm font-black text-[#102b27]">Total geral do demonstrativo</span><strong className="text-xl font-black tabular-nums text-emerald-800">{brl(grandTotal)}</strong></div>
            <p className="mt-1 text-xs leading-5 text-slate-600">Descontos: R$ 0,00 · Bloqueios/suspensões: R$ 0,00 · Líquido: {brl(grandTotal)}.</p>
          </div>
        </section>

        {/* Identificação da origem e ressalvas de leitura. */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600 shadow-sm sm:p-6">
          <h2 className="font-black text-[#102b27]">Fonte e escopo</h2>
          <p className="mt-2">Fonte: Demonstrativo Parcelas Pagas — por Grupo, referência Ordem Bancária, ano 2026, município de Santa Isabel do Pará/PA, código IBGE 150650. O documento informa população de 73.019 habitantes e porte médio. Relatório emitido em 27/10/2026.</p>
          <p className="mt-2">Os totais foram conferidos pela soma das parcelas transcritas. O PDF apresenta contas de destino em alguns lançamentos com numeração diferente da conta recorrente; esses números foram reproduzidos exatamente como impressos, sem correção presumida.</p>
        </section>
      </section>

      {/* Rodapé institucional. */}
      <footer className="bg-[#102b27] text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div><p className="text-sm font-extrabold">SEMTEPS · Santa Izabel do Pará</p><p className="mt-1 text-xs text-emerald-100/65">Secretaria Municipal de Trabalho e Promoção Social</p></div>
          <p className="text-xs text-emerald-100/65">Demonstrativo de parcelas pagas · 2026</p>
        </div>
      </footer>
    </main>
  );
}

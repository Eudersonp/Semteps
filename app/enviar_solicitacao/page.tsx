"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

const ADMIN_EMAIL = "euderson@gmail.com";

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

type RequestData = {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  reason: string;
};

export default function SolicitarCadastroPage() {
  const [request, setRequest] = useState<RequestData>({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    reason: "",
  });
  const [mailLink, setMailLink] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const emailFromLogin = new URLSearchParams(window.location.search).get("email");
    if (emailFromLogin) {
      setRequest((current) => ({ ...current, email: emailFromLogin }));
    }
  }, []);

  function updateField(field: keyof RequestData, value: string) {
    setRequest((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = [
      "Olá, administrador.",
      "",
      "Gostaria de solicitar acesso à Plataforma da Vigilância Socioassistencial da SEMTEPS.",
      "",
      `Nome completo: ${request.fullName.trim()}`,
      `E-mail para cadastro: ${request.email.trim()}`,
      `Telefone: ${request.phone.trim() || "Não informado"}`,
      `Setor/unidade: ${request.department.trim()}`,
      `Função: ${request.role.trim() || "Não informada"}`,
      "",
      "Motivo da solicitação:",
      request.reason.trim(),
      "",
      "Aguardo a avaliação e, se autorizado, o envio do convite de acesso.",
    ].join("\n");

    const href = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(
      "Solicitação de cadastro - Plataforma SEMTEPS",
    )}&body=${encodeURIComponent(body)}`;

    setMailLink(href);
    setSubmitted(true);
    window.location.href = href;
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100";
  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/login" aria-label="Voltar ao login" className="flex items-center gap-3">
            <div className="flex h-14 w-20 shrink-0 items-center sm:h-16 sm:w-24">
              <Image
                src="/log.png"
                alt="Prefeitura de Santa Izabel do Pará"
                width={160}
                height={120}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-extrabold leading-tight text-slate-800 sm:text-base">
                SEMTEPS
              </p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Plataforma da Vigilância Socioassistencial
              </p>
            </div>
          </Link>
          <span className="hidden rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-800 sm:inline-flex">
            Solicitação de acesso
          </span>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-start gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-14">
        <div className="mx-auto w-full max-w-xl lg:sticky lg:top-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-green-700">
            Acesso à plataforma
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Solicite seu
            <span className="block text-green-700">cadastro</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
            Preencha os dados para que a administração avalie seu pedido de
            acesso à Plataforma da Vigilância Socioassistencial.
          </p>

          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
              <MailIcon />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Seu pedido será preparado por e-mail
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Ao enviar, será aberto o aplicativo de e-mail do seu dispositivo
                com os dados preenchidos para <strong>{ADMIN_EMAIL}</strong>.
                Revise e confirme o envio da mensagem.
              </p>
            </div>
          </div>

          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-800"
          >
            Voltar para o login
            <ArrowIcon />
          </Link>
        </div>

        <div className="mx-auto w-full max-w-2xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-8">
            <div className="mb-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <MailIcon />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Dados da solicitação
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Os campos com * são necessários para encaminhar o pedido.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className={labelClass}>
                  Nome completo *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={120}
                  value={request.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  placeholder="Informe seu nome completo"
                  className={inputClass}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className={labelClass}>
                    E-mail para cadastro *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={request.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="nome@exemplo.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Telefone/WhatsApp
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={30}
                    value={request.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder="(91) 99999-9999"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="department" className={labelClass}>
                    Setor ou unidade *
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    required
                    maxLength={120}
                    value={request.department}
                    onChange={(event) => updateField("department", event.target.value)}
                    placeholder="Ex.: CRAS, CREAS, Vigilância..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="role" className={labelClass}>
                    Cargo ou função
                  </label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    maxLength={120}
                    value={request.role}
                    onChange={(event) => updateField("role", event.target.value)}
                    placeholder="Informe sua função"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reason" className={labelClass}>
                  Por que precisa de acesso? *
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={4}
                  value={request.reason}
                  onChange={(event) => updateField("reason", event.target.value)}
                  placeholder="Descreva brevemente quais informações ou sistemas precisa consultar."
                  className={`${inputClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              >
                Preparar solicitação por e-mail
                <ArrowIcon />
              </button>
            </form>

            {submitted && (
              <div
                role="status"
                className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-900"
              >
                <p className="font-bold">Confira seu aplicativo de e-mail.</p>
                <p>
                  A mensagem foi preparada para {ADMIN_EMAIL}. Para concluir,
                  confirme o envio no aplicativo. Se ele não abriu, use o link
                  abaixo.
                </p>
                <a
                  href={mailLink}
                  className="mt-2 inline-flex items-center gap-2 font-bold underline underline-offset-2"
                >
                  Abrir mensagem para o administrador
                  <ArrowIcon />
                </a>
              </div>
            )}
          </div>
          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            O envio do pedido não cria uma conta automaticamente. A administração
            avaliará a solicitação e poderá enviar um convite.
          </p>
        </div>
      </section>
    </main>
  );
}

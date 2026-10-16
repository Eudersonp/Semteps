"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createBrowserClient } from "@supabase/ssr";

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" strokeLinecap="round" />
      <path d="M12 14v3" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M3 3l18 18" strokeLinecap="round" />
      <path
        d="M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.3A10.8 10.8 0 0 1 12 5c5.2 0 8.5 4.4 9.5 6-.4.7-1.4 2-2.9 3.2M6.2 6.2C4.5 7.3 3.3 9 2.5 11c1 1.6 4.3 6 9.5 6 1.1 0 2.1-.2 3-.6"
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
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M2.5 12s3.3-6 9.5-6 9.5 6 9.5 6-3.3 6-9.5 6-9.5-6-9.5-6Z"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.5" />
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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabasePublishableKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

      if (!supabaseUrl || !supabasePublishableKey) {
        throw new Error(
          "Configure a URL e a chave pública do Supabase no arquivo .env.local.",
        );
      }

      const supabase = createBrowserClient(
        supabaseUrl,
        supabasePublishableKey,
      );

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(
          "E-mail ou senha incorretos. Confira os dados e tente novamente.",
        );
        return;
      }

      // Lê o destino que foi solicitado antes de abrir a tela de login.
      const params = new URLSearchParams(window.location.search);
      const next = params.get("next");

      // Aceita somente caminhos internos para evitar redirecionamentos externos.
      const destination =
        next?.startsWith("/") && !next.startsWith("//") ? next : "/";

      router.replace(destination);
      router.refresh();
    } catch {
      setErrorMessage(
        "Não foi possível entrar. Confira a configuração do Supabase e tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleAccessRequest() {
    router.push("/enviar_solicitacao");
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="grid border-b border-slate-200 md:grid-cols-2">
        <div className="flex min-h-[88px] items-center justify-between gap-3 bg-[#102b27] px-5 py-4 text-white sm:px-8 lg:justify-end lg:pr-12">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-32 shrink-0 items-center rounded-xl bg-white px-2 sm:h-16 sm:w-36">
              <Image
                src="/brasao-santa-izabel.png"
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
          </div>

          <span className="inline-flex shrink-0 items-center rounded-full border border-lime-200/20 bg-lime-100/10 px-3 py-1.5 text-[10px] font-extrabold text-lime-100 sm:hidden">
            Acesso restrito
          </span>
        </div>

        <div className="hidden min-h-[88px] items-center bg-[#102b27] px-8 text-white md:flex lg:pl-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-200/20 bg-lime-100/10 px-4 py-2 text-xs font-extrabold text-lime-100">
            <span className="h-2 w-2 rounded-full bg-lime-300" />
            Acesso restrito
          </span>
        </div>

        <div className="border-t border-white/10 bg-[#102b27] px-5 py-3 text-white sm:hidden">
          <p className="text-sm font-extrabold">SEMTEPS</p>
          <p className="mt-0.5 text-xs text-emerald-100/70">
            Plataforma da Vigilância Socioassistencial
          </p>
        </div>
      </header>

      <section className="grid min-h-[calc(100vh-89px)] grid-cols-1 text-slate-900 lg:grid-cols-2">
        <div className="flex items-center justify-center bg-[#102b27] px-5 py-10 text-white sm:px-8 lg:px-12 lg:py-12">
          <div className="w-full max-w-xl">
            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.22em] text-emerald-200 sm:text-[11px]">
              <span className="h-2 w-2 rounded-full bg-lime-300" />
              Bem-vindo(a) de volta
            </p>

            <h1 className="mt-5 text-4xl font-black leading-[1.04] tracking-[-.04em] text-white sm:text-5xl lg:text-6xl">
              Entre para acessar
              <span className="block text-lime-300">seu painel.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-emerald-50/80 sm:text-base">
              Consulte os sistemas e informações da rede socioassistencial em
              um só lugar. Use o e-mail e a senha da sua conta autorizada.
            </p>

            <div className="mt-7 flex max-w-xl items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-sm backdrop-blur-sm sm:p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lime-200 text-emerald-950">
                <LockIcon />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-white">
                  Acesso protegido
                </h2>
                <p className="mt-1 text-sm leading-6 text-emerald-50/80">
                  Somente pessoas autorizadas pela administração podem entrar.
                  Se ainda não recebeu acesso, solicite seu cadastro ao
                  responsável pelo sistema.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
          <div className="w-full max-w-md">
            <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-[0_20px_55px_-30px_rgba(16,43,39,.28)] sm:p-8">
              <div className="mb-7">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-100">
                  <LockIcon />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-800">
                  Área segura
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-[#102b27]">
                  Fazer login
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Informe seus dados para continuar.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="nome@exemplo.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-bold text-slate-700"
                    >
                      Senha
                    </label>
                    <span className="text-xs text-slate-500">
                      Use a senha da sua conta
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Digite sua senha"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((current) => !current)
                      }
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 transition hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                    >
                      <EyeIcon hidden={!showPassword} />
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-5 text-red-800"
                  >
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Verificando acesso..." : "Entrar no painel"}
                  {!loading && <ArrowIcon />}
                </button>
              </form>

              <button
                type="button"
                onClick={handleAccessRequest}
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-900 transition hover:border-emerald-400 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
              >
                Solicitar Cadastro ao administrador
              </button>

              <p className="mt-6 border-t border-slate-100 pt-5 text-center text-xs leading-5 text-slate-500">
                Acesso destinado às pessoas autorizadas pela administração.
              </p>
            </div>

            <p className="mt-4 text-center text-xs text-slate-500">
              Plataforma da Vigilância Socioassistencial · SEMTEPS
            </p>
          </div>
        </div>
      </section>

      <div className="h-1.5 bg-emerald-700" />
    </main>
  );
}
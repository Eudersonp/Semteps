"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { createBrowserClient } from "@supabase/ssr";

type AccessState = "checking" | "ready" | "invalid";

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" strokeLinecap="round" />
      <path d="M12 14v3" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CadastroPage() {
  const router = useRouter();
  const started = useRef(false);
  const supabaseClient = useRef<ReturnType<typeof createBrowserClient> | null>(null);

  const [accessState, setAccessState] = useState<AccessState>("checking");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    async function verifyInvitation() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
      if (!url || !key) {
        setErrorMessage("A configuração do Supabase não foi encontrada. Confira o arquivo .env.local e reinicie o servidor.");
        setAccessState("invalid");
        return;
      }

      const supabase = createBrowserClient(url, key);
      supabaseClient.current = supabase;

      const code = new URLSearchParams(window.location.search).get("code");

      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (error || !data.session) {
          setErrorMessage("Este convite expirou ou já foi utilizado. Peça à administração que envie um novo convite.");
          setAccessState("invalid");
          return;
        }
        setEmail(data.session.user.email ?? "");
        window.history.replaceState({}, document.title, window.location.pathname);
        setAccessState("ready");
        return;
      }

      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        setErrorMessage("Esta página só pode ser usada por quem recebeu um convite de acesso. Solicite o convite à administração.");
        setAccessState("invalid");
        return;
      }

      setEmail(data.session.user.email ?? "");
      setAccessState("ready");
    }

    void verifyInvitation();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    const supabase = supabaseClient.current;

    if (!supabase || accessState !== "ready") {
      setErrorMessage("Abra o link de convite enviado para seu e-mail antes de cadastrar a senha.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas digitadas não são iguais.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password,
      data: { full_name: fullName.trim() },
    });

    if (error) {
      setErrorMessage("Não foi possível concluir o cadastro. Tente novamente ou solicite um novo convite.");
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();
    router.replace("/login?cadastro=concluido");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-20 shrink-0 items-center sm:h-16 sm:w-24">
              <Image src="/log.png" alt="Prefeitura de Santa Izabel do Pará" width={160} height={120} className="h-full w-full object-contain" priority />
            </div>
            <div>
              <p className="text-sm font-extrabold leading-tight text-slate-800 sm:text-base">SEMTEPS</p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">Plataforma da Vigilância Socioassistencial</p>
            </div>
          </div>
          <span className="hidden rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-800 sm:inline-flex">Acesso por convite</span>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:py-14">
        <div className="mx-auto w-full max-w-xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-green-700">Ativação de acesso</p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Seu acesso começa
            <span className="block text-green-700">por aqui</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
            Crie sua senha para entrar na Plataforma da Vigilância Socioassistencial. O cadastro é liberado somente por convite da administração.
          </p>

          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700"><LockIcon /></div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Convite individual</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">O link enviado ao seu e-mail confirma que a administração autorizou seu cadastro. Não compartilhe esse link com outras pessoas.</p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-8">
            <div className="mb-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700"><LockIcon /></div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Criar meu acesso</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Preencha seus dados para ativar a conta convidada.</p>
            </div>

            {accessState === "checking" ? (
              <p role="status" className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">Verificando seu convite…</p>
            ) : accessState === "invalid" ? (
              <div className="space-y-4">
                <p role="alert" className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-sm leading-5 text-amber-900">{errorMessage}</p>
                <a href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800">Ir para o login <ArrowIcon /></a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-slate-700">Nome completo</label>
                  <input id="fullName" name="fullName" type="text" autoComplete="name" required value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Digite seu nome" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100" />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">E-mail do convite</label>
                  <input id="email" name="email" type="email" value={email} readOnly className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600" />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">Criar senha</label>
                  <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Pelo menos 8 caracteres" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100" />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">Confirmar senha</label>
                  <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Digite a senha novamente" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100" />
                </div>

                {errorMessage && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-5 text-red-800">{errorMessage}</p>}

                <button type="submit" disabled={loading} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
                  {loading ? "Ativando acesso…" : "Concluir cadastro"}{!loading && <ArrowIcon />}
                </button>
              </form>
            )}

            <p className="mt-6 border-t border-slate-100 pt-5 text-center text-xs leading-5 text-slate-500">Acesso destinado somente às pessoas autorizadas pela administração.</p>
          </div>
          <p className="mt-5 text-center text-xs text-slate-500">Plataforma da Vigilância Socioassistencial · SEMTEPS</p>
        </div>
      </section>
    </main>
  );
}

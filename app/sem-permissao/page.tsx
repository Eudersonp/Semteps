import Link from "next/link";

export default function SemPermissaoPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-black text-slate-900">
          Acesso não autorizado
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Sua conta não tem permissão para acessar esta página. Fale com a
          administração do sistema se precisar desse acesso.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
        >
          Voltar ao painel
        </Link>
      </section>
    </main>
  );
}
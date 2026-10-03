import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Iniciar Sesión
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿No tenés cuenta?{' '}
          <Link href="/registro" className="text-blue-600 font-semibold hover:underline">
            Registrate acá
          </Link>
        </p>
      </div>
    </main>
  );
}
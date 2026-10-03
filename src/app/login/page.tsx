import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-md w-full">
        {/* Enlace para volver al Inicio */}
        <Link 
          href="/" 
          className="inline-block text-xs font-semibold text-slate-500 hover:text-emerald-700 transition mb-6"
        >
          ← Volver al Inicio
        </Link>

        {/* Título */}
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Iniciar Sesión</h1>
        <p className="text-xs text-slate-500 mb-6">
          Ingresá tus datos para acceder a tu cuenta.
        </p>

        {/* Formulario */}
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              placeholder="tu@email.com" 
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
              Contraseña
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>

          <button 
            type="button" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-xl transition text-sm mt-2"
          >
            Ingresar
          </button>
        </form>

        {/* Link a Registro */}
        <p className="text-xs text-slate-500 text-center mt-6">
          ¿No tenés cuenta?{' '}
          <Link href="/registro" className="text-emerald-600 font-semibold hover:underline">
            Registrate acá
          </Link>
        </p>
      </div>
    </main>
  );
}
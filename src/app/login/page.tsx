'use client';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-md w-full text-left">
        <Link 
          href="/" 
          className="text-xs text-slate-400 hover:text-slate-600 mb-6 inline-block transition"
        >
          ← Volver al inicio
        </Link>

        <h1 className="text-2xl font-bold text-slate-900 mb-1">Iniciar Sesión</h1>
        <p className="text-sm text-slate-500 mb-6">
          Ingresá tus datos para acceder a tu cuenta
        </p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">
              Correo electrónico
            </label>
            <input 
              type="email" 
              placeholder="tu@email.com" 
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">
              Contraseña
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-xl hover:bg-blue-700 transition text-sm pt-2"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          ¿No tenés cuenta?{' '}
          <Link href="/registro" className="text-blue-600 font-semibold hover:underline">
            Registrate acá
          </Link>
        </div>
      </div>
    </main>
  );
}
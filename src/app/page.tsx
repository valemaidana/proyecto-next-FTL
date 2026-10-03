import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block uppercase tracking-wider">
        MUNICIPALIDAD DE PEREZ
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 max-w-xl">
        Conectamos el talento local con las mejores oportunidades
      </h1>

      <p className="text-slate-600 mb-8 max-w-md text-sm sm:text-base">
        Encontrá trabajo cerca de tu casa o publicá tus búsquedas laborales para sumar vecinos a tu equipo.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between">
          <div>
            <span className="text-3xl mb-2 block">💼</span>
            <h3 className="font-bold text-slate-900 mb-1">Busco Trabajo</h3>
            <p className="text-sm text-slate-500 mb-4">
              Cargá tu CV y postulate a las ofertas de la ciudad.
            </p>
          </div>
          <Link
            href="/login"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-xl hover:bg-blue-700 transition text-sm block text-center"
          >
            Ingresar como Vecino
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between">
          <div>
            <span className="text-3xl mb-2 block">🏪</span>
            <h3 className="font-bold text-slate-900 mb-1">Soy Empresa / Comercio</h3>
            <p className="text-sm text-slate-500 mb-4">
              Publicá avisos de empleo y encontrá perfiles capacitados.
            </p>
          </div>
          <Link
            href="/login"
            className="w-full bg-slate-900 text-white font-medium py-2 rounded-xl hover:bg-slate-800 transition text-sm block text-center"
          >
            Publicar Búsqueda
          </Link>
        </div>
      </section>
    </main>
  );
}
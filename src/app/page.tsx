import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      {/* Logo de la Municipalidad de Funes */}
      <img 
        src="/Logo muni Funes.png" 
        alt="Logo Municipalidad de Funes" 
        className="h-20 w-auto mb-4 mx-auto object-contain" 
      />

      {/* Etiqueta institucional */}
      <span className="text-xs font-bold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase mb-4 border border-emerald-200">
        Municipalidad de Funes
      </span>

      {/* Título Principal */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 max-w-2xl leading-tight mb-4">
        Conectamos el talento local con las mejores oportunidades
      </h1>

      <p className="text-slate-600 max-w-lg mb-8 text-sm md:text-base">
        Encontrá trabajo cerca de tu casa o publicá tus búsquedas laborales para sumar vecinos a tu equipo.
      </p>

      {/* Tarjetas de Opciones */}
      <div className="grid md:grid-cols-2 gap-4 max-w-xl w-full">
        {/* Opción Vecino */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left flex flex-col justify-between">
          <div>
            <div className="text-2xl mb-2">💼</div>
            <h2 className="font-bold text-slate-800 text-lg">Busco Trabajo</h2>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Cargá tu CV y postulate a las ofertas de la ciudad.
            </p>
          </div>
          <Link 
            href="/login" 
            className="block text-center bg-emerald-600 text-white font-medium py-2.5 px-4 rounded-xl hover:bg-emerald-700 transition text-sm"
          >
            Ingresar como Vecino
          </Link>
        </div>

        {/* Opción Empresa */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left flex flex-col justify-between">
          <div>
            <div className="text-2xl mb-2">🏢</div>
            <h2 className="font-bold text-slate-800 text-lg">Soy Empresa / Comercio</h2>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Publicá avisos de empleo y encontrá perfiles capacitados.
            </p>
          </div>
          <Link 
            href="/login" 
            className="block text-center bg-slate-800 text-white font-medium py-2.5 px-4 rounded-xl hover:bg-slate-900 transition text-sm"
          >
            Publicar Búsqueda
          </Link>
        </div>
      </div>
    </main>
  );
}
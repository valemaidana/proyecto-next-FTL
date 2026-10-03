import Link from 'next/link';

// Datos de prueba para mostrar las ofertas laborales de Funes
const OFERTAS = [
  {
    id: 1,
    titulo: 'Atención al Cliente y Caja',
    empresa: 'Comercio Centro Funes',
    ubicacion: 'Funes Centro',
    modalidad: 'Presencial',
    jornada: 'Medio Tiempo',
    fecha: 'Hace 2 días',
  },
  {
    id: 2,
    titulo: 'Auxiliar de Depósito y Logística',
    empresa: 'Distribuidora Funes',
    ubicacion: 'Zona Industrial',
    modalidad: 'Presencial',
    jornada: 'Tiempo Completo',
    fecha: 'Publicado hoy',
  },
  {
    id: 3,
    titulo: 'Administrativo / Contable',
    empresa: 'Estudio de Gestión',
    ubicacion: 'Funes Norte',
    modalidad: 'Híbrido',
    jornada: 'Tiempo Completo',
    fecha: 'Hace 3 días',
  },
];

export default function OfertasPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      {/* Encabezado de la sección */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Ofertas Laborales en Funes
        </h1>
        <p className="text-sm text-slate-600">
          Explorá las búsquedas activas de empresas y comercios de la ciudad.
        </p>
      </div>

      {/* Buscador simple (simulado) */}
      <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm mb-8 flex flex-col md:flex-row gap-3">
        <input 
          type="text" 
          placeholder="Buscar por puesto o palabra clave..." 
          className="flex-1 border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
        />
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2 rounded-xl transition text-sm">
          Buscar
        </button>
      </div>

      {/* Listado de Tarjetas de Ofertas */}
      <div className="flex flex-col gap-4">
        {OFERTAS.map((oferta) => (
          <div 
            key={oferta.id}
            className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  {oferta.empresa}
                </span>
                <span className="text-xs text-slate-400">• {oferta.fecha}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                {oferta.titulo}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                <span>📍 {oferta.ubicacion}</span>
                <span>💼 {oferta.modalidad}</span>
                <span>⏰ {oferta.jornada}</span>
              </div>
            </div>

            <Link 
              href="/login" 
              className="inline-block text-center bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition whitespace-nowrap"
            >
              Postularme
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-emerald-900/40 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Lado izquierdo: Marca y descripción */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="font-bold text-white text-base">
              Municipalidad de Funes
            </span>
            <span className="text-xs bg-emerald-800/80 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-700">
              Portal Empleo
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Fomentando el desarrollo laboral y conectando vecinos con las oportunidades de la ciudad.
          </p>
        </div>

        {/* Lado derecho: Enlaces y Copyright */}
        <div className="flex flex-col items-center md:items-end gap-2 text-xs">
          <div className="flex gap-4 text-slate-300">
            <Link href="/" className="hover:text-emerald-400 transition">Inicio</Link>
            <Link href="/ofertas" className="hover:text-emerald-400 transition">Ofertas</Link>
            <Link href="/login" className="hover:text-emerald-400 transition">Ingresar</Link>
          </div>
          <span className="text-slate-500">
            © {new Date().getFullYear()} Municipalidad de Funes. Todos los derechos reservados.
          </span>
        </div>

      </div>
    </footer>
  );
}
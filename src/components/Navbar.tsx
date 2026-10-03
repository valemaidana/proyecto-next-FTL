import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img 
            src="/Logo muni Funes.png" 
            alt="Municipalidad de Funes" 
            className="h-8 w-auto object-contain"
          />
          <span className="font-bold text-slate-800 text-sm hidden sm:inline">
            Portal Empleo
          </span>
        </Link>

        {/* Links de navegación */}
        <nav className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <Link href="/" className="hover:text-emerald-700 transition">
            Inicio
          </Link>
          <Link href="/ofertas" className="hover:text-emerald-700 transition">
            Ofertas
          </Link>
          <Link 
            href="/login" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg transition"
          >
            Ingresar
          </Link>
        </nav>
      </div>
    </header>
  );
}
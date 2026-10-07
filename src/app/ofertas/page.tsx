'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function OfertasPage() {
  const router = useRouter()
  const [busqueda, setBusqueda] = useState('')
  const [filtroArea, setFiltroArea] = useState('Todas')

  const ofertas = [
    {
      id: '1',
      titulo: 'Auxiliar Administrativo / Atención al Vecino',
      area: 'Secretaría de Gobierno',
      ubicacion: 'Funes, Santa Fe',
      modalidad: 'Presencial',
      descripcion: 'Atención presencial y telefónica a vecinos, carga de trámites en el sistema municipal y gestión de archivos administrativos.'
    },
    {
      id: '2',
      titulo: 'Personal de Mantenimiento e Infraestructura',
      area: 'Obras Públicas',
      ubicacion: 'Funes, Santa Fe',
      modalidad: 'Presencial',
      descripcion: 'Tareas generales de mantenimiento de espacios públicos, reparación de mobiliario urbano y apoyo en cuadrillas operativas.'
    },
    {
      id: '3',
      titulo: 'Inspector de Tránsito y Control Urbano',
      area: 'Seguridad Ciudadana',
      ubicacion: 'Funes, Santa Fe',
      modalidad: 'Presencial',
      descripcion: 'Control del tránsito vehicular en la vía pública, verificación de licencias y ordenamiento en zonas escolares y comerciales.'
    }
  ]

  // Filtrar ofertas según búsqueda y área seleccionada
  const ofertasFiltradas = ofertas.filter((oferta) => {
    const coincideTexto = oferta.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          oferta.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    const coincideArea = filtroArea === 'Todas' || oferta.area === filtroArea
    return coincideTexto && coincideArea
  })

  const manejarPostulacion = async (tituloOferta: string) => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("Tenés que iniciar sesión para postularte.")
      router.push('/login')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    const perfilIncompleto = 
      !profile || 
      !profile.nombre || 
      !profile.apellido || 
      !profile.dni || 
      !profile.telefono || 
      !profile.direccion || 
      !profile.localidad

    if (perfilIncompleto) {
      alert(`Para postularte a "${tituloOferta}", primero tenés que completar tu perfil con tus datos personales.`)
      router.push('/perfil')
      return
    }

    const { data: yaPostulado } = await supabase
      .from('postulaciones')
      .select('id')
      .eq('user_id', user.id)
      .eq('oferta_titulo', tituloOferta)
      .maybeSingle()

    if (yaPostulado) {
      alert(`Ya te habías postulado anteriormente a: ${tituloOferta}`)
      return
    }

    const { error } = await supabase
      .from('postulaciones')
      .insert([
        {
          user_id: user.id,
          oferta_titulo: tituloOferta
        }
      ])

    if (error) {
      alert("Hubo un error al registrar tu postulación. Intentá de nuevo.")
      console.error(error)
      return
    }

    alert(`¡Te postulaste con éxito a: ${tituloOferta}!`)
  }

  return (
    <main style={{ minHeight: '80vh', padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '0.5rem' }}>
          Ofertas Laborales Disponibles
        </h1>
        <p style={{ color: '#666' }}>
          Explorá las búsquedas abiertas y postulate directamente desde el portal.
        </p>
      </div>

      {/* Barra de Búsqueda y Filtros */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <input 
          type="text"
          placeholder="🔍 Buscar por puesto o descripción..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '1rem',
            outline: 'none',
            width: '100%'
          }}
        />

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['Todas', 'Secretaría de Gobierno', 'Obras Públicas', 'Seguridad Ciudadana'].map((area) => (
            <button
              key={area}
              onClick={() => setFiltroArea(area)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                border: '1px solid #cbd5e1',
                backgroundColor: filtroArea === area ? '#0f172a' : '#ffffff',
                color: filtroArea === area ? '#ffffff' : '#475569',
                fontSize: '0.9rem',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Listado de Ofertas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {ofertasFiltradas.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
            No se encontraron ofertas que coincidan con tu búsqueda.
          </p>
        ) : (
          ofertasFiltradas.map((oferta) => (
            <div 
              key={oferta.id} 
              style={{ 
                border: '1px solid #e2e8f0', 
                padding: '1.5rem', 
                borderRadius: '10px', 
                backgroundColor: '#ffffff', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#0f172a' }}>
                    {oferta.titulo}
                  </h2>
                  <p style={{ color: '#0284c7', fontWeight: '600', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                    {oferta.area}
                  </p>
                </div>
                <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '500' }}>
                  📍 {oferta.ubicacion} • {oferta.modalidad}
                </span>
              </div>

              <p style={{ color: '#4b5563', lineHeight: '1.5', fontSize: '0.95rem' }}>
                {oferta.descripcion}
              </p>

              <div style={{ marginTop: '0.5rem' }}>
                <button
                  onClick={() => manejarPostulacion(oferta.titulo)}
                  style={{
                    backgroundColor: '#059669',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem 1.4rem',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    cursor: 'pointer'
                  }}
                >
                  Postularme
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
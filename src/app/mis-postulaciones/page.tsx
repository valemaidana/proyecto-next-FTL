'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface Postulacion {
  id: string
  oferta_titulo: string
  created_at: string
}

export default function MisPostulacionesPage() {
  const router = useRouter()
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarPostulaciones = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        alert("Tenés que iniciar sesión para ver tus postulaciones.")
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('postulaciones')
        .select('id, oferta_titulo, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error("Error al cargar postulaciones:", error)
      } else {
        setPostulaciones(data || [])
      }

      setCargando(false)
    }

    cargarPostulaciones()
  }, [router])

  return (
    <main style={{ minHeight: '80vh', padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '0.5rem' }}>
            Mis Postulaciones
          </h1>
          <p style={{ color: '#666' }}>
            Acá podés ver el historial de todas las ofertas laborales a las que te postulaste.
          </p>
        </div>
        <button
          onClick={() => router.push('/ofertas')}
          style={{
            backgroundColor: '#0f172a',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          Ver más ofertas
        </button>
      </div>

      {cargando ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '3rem' }}>Cargando tus postulaciones...</p>
      ) : postulaciones.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '1rem' }}>Todavía no te postulaste a ninguna oferta.</p>
          <button
            onClick={() => router.push('/ofertas')}
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
            Explorar ofertas disponibles
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {postulaciones.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                border: '1px solid #e2e8f0', 
                padding: '1.2rem 1.5rem', 
                borderRadius: '10px', 
                backgroundColor: '#ffffff', 
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.3rem' }}>
                  {item.oferta_titulo}
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  Postulado el: {new Date(item.created_at).toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <span style={{ backgroundColor: '#ecfdf5', color: '#047857', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                ✓ Postulación enviada
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
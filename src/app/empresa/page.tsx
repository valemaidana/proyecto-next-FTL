'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function EmpresaDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    async function verificarEmpresa() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        alert("Tenés que iniciar sesión.")
        router.push('/login')
        return
      }

      setUserEmail(user.email || null)
      setLoading(false)
    }

    verificarEmpresa()
  }, [router])

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>Cargando panel de empresa...</p>
  }

  return (
    <main style={{ minHeight: '80vh', padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ background: '#eff6ff', border: '1px solid #2563eb', padding: '2rem', borderRadius: '12px' }}>
        <h1 style={{ color: '#2563eb', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Panel de Gestión de Empresa 🏢
        </h1>
        <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
          Sesión iniciada como: <strong>{userEmail}</strong>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>Publicar Nueva Oferta Laboral</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
              Creá una nueva búsqueda para la municipalidad. Recordá que pasará por un proceso de revisión antes de publicarse.
            </p>
            <button 
              onClick={() => alert("Próximamente: Formulario de creación de ofertas")}
              style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              + Crear Oferta
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
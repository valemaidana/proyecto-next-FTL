'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [autorizado, setAutorizado] = useState(false)

  // Verificar que el usuario sea realmente administrador
  useEffect(() => {
    async function verificarAdmin() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        alert("Tenés que iniciar sesión.")
        router.push('/login')
        return
      }

      const rol = user.user_metadata?.role

      if (rol !== 'admin') {
        alert("Acceso denegado. No tenés permisos de administrador.")
        router.push('/ofertas')
        return
      }

      setAutorizado(true)
      setLoading(false)
    }

    verificarAdmin()
  }, [router])

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>Verificando permisos...</p>
  }

  if (!autorizado) return null

  return (
    <main style={{ minHeight: '80vh', padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ background: '#f5f3ff', border: '1px solid #7c3aed', padding: '2rem', borderRadius: '12px' }}>
        <h1 style={{ color: '#7c3aed', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Panel de Administración 🛠️
        </h1>
        <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
          Zona exclusiva para la gestión global de usuarios, moderación de cuentas de empresas y control del portal municipal.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => alert("Próximamente: Listado de empresas pendientes de aprobación.")}
            style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
          >
            Aprobar Empresas Pendientes
          </button>
          <button 
            onClick={() => alert("Próximamente: Gestión de usuarios del sistema.")}
            style={{ background: '#475569', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
          >
            Gestionar Usuarios
          </button>
        </div>
      </div>
    </main>
  )
}
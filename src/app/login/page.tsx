'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cargando, setCargando] = useState(false)

  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)

    // 1. Iniciar sesión universal con Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(`Error al iniciar sesión: ${error.message}`)
      setCargando(false)
      return
    }

    // 2. Obtener el rol guardado en los metadatos del usuario
    const userRole = data.user?.user_metadata?.role || 'postulante'

    setCargando(false)

    // 3. Redirigir inteligentemente según el rol
    if (userRole === 'admin') {
      router.push('/admin') // Oficina de Empleo
    } else if (userRole === 'empresa') {
      router.push('/empresa') // Panel de Empresa
    } else {
      router.push('/ofertas') // Vecino / Postulante
    }
  }

  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '2.5rem', borderRadius: '12px', maxWidth: '400px', width: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem', textAlign: 'center' }}>
          Iniciar Sesión
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          Ingresá con tu correo y contraseña para acceder al portal.
        </p>

        <form
  onSubmit={(e) => {
    alert('El formulario respondió')
    manejarLogin(e)
  }}
  style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '0.3rem' }}>
              Correo Electrónico:
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu-correo@ejemplo.com"
              style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#334155', marginBottom: '0.3rem' }}>
              Contraseña:
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>

          <button 
            type="submit"
            disabled={cargando}
            style={{ 
              background: '#0284c7', 
              color: '#ffffff', 
              border: 'none', 
              padding: '0.8rem', 
              borderRadius: '6px', 
              fontWeight: '600', 
              cursor: 'pointer',
              marginTop: '0.5rem'
            }}
          >
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </main>
  )
}
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
  const [userId, setUserId] = useState<string | null>(null)
  
  // Datos del perfil de la empresa
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [localidad, setLocalidad] = useState('')
  const [guardandoPerfil, setGuardandoPerfil] = useState(false)

  // Datos para publicar nueva oferta
  const [tituloOferta, setTituloOferta] = useState('')
  const [areaOferta, setAreaOferta] = useState('')
  const [descripcionOferta, setDescripcionOferta] = useState('')
  const [publicando, setPublicando] = useState(false)

  useEffect(() => {
    async function verificarYCargar() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        alert("Tenés que iniciar sesión.")
        router.push('/login')
        return
      }

      setUserId(user.id)

      // Cargar perfil
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        setNombre(profile.nombre || '')
        setTelefono(profile.telefono || '')
        setLocalidad(profile.localidad || '')
      }

      setLoading(false)
    }

    verificarYCargar()
  }, [router])

  const manejarGuardarPerfil = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return

    setGuardandoPerfil(true)

    const { error } = await supabase
      .from('profiles')
      .update({ nombre, telefono, localidad })
      .eq('id', userId)

    setGuardandoPerfil(false)

    if (error) {
      alert(`Error al guardar perfil: ${error.message}`)
      return
    }

    alert("¡Perfil de empresa actualizado con éxito!")
  }

  const manejarPublicarOferta = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return

    if (!tituloOferta || !areaOferta || !descripcionOferta) {
      alert("Por favor completá todos los campos de la oferta.")
      return
    }

    setPublicando(true)

    // Aquí guardamos la oferta con estado 'pendiente' para que el Admin municipal la apruebe
    const { error } = await supabase
      .from('ofertas') // O la tabla donde guarden las ofertas
      .insert([
        {
          user_id: userId,
          titulo: tituloOferta,
          area: areaOferta,
          descripcion: descripcionOferta,
          estado: 'pendiente' // Clave: Requiere aprobación de la Oficina de Empleo
        }
      ])

    setPublicando(false)

    if (error) {
      // Si la tabla no está creada aún, avisamos de forma clara
      alert("Oferta redactada. (Nota: Asegurate de tener la tabla de ofertas creada en Supabase).")
      console.error(error)
      return
    }

    alert("¡Oferta publicada con éxito! Quedó pendiente de aprobación por la Oficina de Empleo.")
    setTituloOferta('')
    setAreaOferta('')
    setDescripcionOferta('')
  }

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>Cargando panel de empresa...</p>
  }

  return (
    <main style={{ minHeight: '80vh', padding: '2rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#eff6ff', border: '1px solid #2563eb', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2563eb', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Panel de Empresa 🏢
        </h1>
        <p style={{ color: '#4b5563' }}>
          Gestioná los datos de tu institución y publicá nuevas búsquedas laborales para la comunidad.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        {/* 1. Formulario de Publicación de Ofertas */}
        <section style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#1e293b', marginBottom: '1rem' }}>📢 Publicar Nueva Oferta Laboral</h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
            Las ofertas cargadas pasarán por un proceso de revisión y aprobación de la Oficina de Empleo antes de publicarse en el portal.
          </p>

          <form onSubmit={manejarPublicarOferta} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.3rem', color: '#334155' }}>Título del Puesto:</label>
              <input 
                type="text" 
                value={tituloOferta} 
                onChange={(e) => setTituloOferta(e.target.value)} 
                placeholder="Ej: Auxiliar Administrativo"
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.3rem', color: '#334155' }}>Área / Secretaría:</label>
              <input 
                type="text" 
                value={areaOferta} 
                onChange={(e) => setAreaOferta(e.target.value)} 
                placeholder="Ej: Administración y Finanzas"
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.3rem', color: '#334155' }}>Descripción y Requisitos:</label>
              <textarea 
                value={descripcionOferta} 
                onChange={(e) => setDescripcionOferta(e.target.value)} 
                placeholder="Detallá las tareas, horarios y requisitos..."
                rows={4}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={publicando}
              style={{ background: '#059669', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              {publicando ? 'Enviando a revisión...' : 'Enviar Oferta a Revisión'}
            </button>
          </form>
        </section>

        {/* 2. Formulario de Perfil de Empresa */}
        <section style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#1e293b', marginBottom: '1rem' }}>⚙️ Configuración del Perfil</h2>
          
          <form onSubmit={manejarGuardarPerfil} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.3rem', color: '#334155' }}>Nombre de la Empresa:</label>
              <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.3rem', color: '#334155' }}>Teléfono:</label>
              <input 
                type="text" 
                value={telefono} 
                onChange={(e) => setTelefono(e.target.value)} 
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.3rem', color: '#334155' }}>Localidad:</label>
              <input 
                type="text" 
                value={localidad} 
                onChange={(e) => setLocalidad(e.target.value)} 
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={guardandoPerfil}
              style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.7rem 1.2rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              {guardandoPerfil ? 'Guardando...' : 'Actualizar Perfil'}
            </button>
          </form>
        </section>

      </div>
    </main>
  )
}
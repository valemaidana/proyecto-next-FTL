'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function PerfilPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [dni, setDni] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [localidad, setLocalidad] = useState('Funes')

  // Cargar los datos actuales del usuario al entrar a la página
  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        alert('Debes iniciar sesión para ver tu perfil.')
        window.location.href = '/login'
        return
      }

      setUserId(user.id)

      // Traer los datos guardados en la tabla 'profiles'
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        setNombre(data.nombre || '')
        setApellido(data.apellido || '')
        setDni(data.dni || '')
        setTelefono(data.telefono || '')
        setDireccion(data.direccion || '')
        setLocalidad(data.localidad || 'Funes')
      }

      setLoading(false)
    }

    loadProfile()
  }, [])

  // Guardar o actualizar los datos
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return

    setSaving(true)

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        nombre,
        apellido,
        dni,
        telefono,
        direccion,
        localidad,
      })

    setSaving(false)

    if (error) {
      alert('Error al guardar los datos: ' + error.message)
    } else {
      alert('¡Perfil actualizado con éxito!')
      window.location.href = '/ofertas'
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600 font-medium">Cargando perfil...</p>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-2 text-center">
          Completar Mi Perfil
        </h1>
        <p className="text-sm text-slate-500 mb-6 text-center">
          Cargá tus datos personales para postularte a las ofertas de empleo.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Apellido</label>
              <input
                type="text"
                required
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">DNI</label>
              <input
                type="text"
                required
                placeholder="Sin puntos"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
              <input
                type="text"
                required
                placeholder="Ej: 341..."
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Dirección</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Localidad</label>
            <input
              type="text"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition duration-200 mt-4 disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar Perfil'}
          </button>
        </form>
      </div>
    </main>
  )
}
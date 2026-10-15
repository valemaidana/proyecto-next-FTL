'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function RegistroPage() {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('postulante')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    alert("¡Hizo clic en el botón!")
    console.log("¡Hizo clic!", { email, fullname, role })

    if (!email || !password || !fullname) {
      alert('Por favor completá todos los campos.')
      return
    }

    setLoading(true)

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullname,
            role: role,
            localidad: 'Funes'
          }
        }
      })

      console.log("Respuesta de Supabase:", { data, signUpError })

      if (signUpError) {
        alert("Error de Supabase: " + signUpError.message)
        setLoading(false)
        return
      }

      alert('¡Registro exitoso! Ya podés iniciar sesión.')
      window.location.href = '/login'

    } catch (err: any) {
      console.error("Error:", err)
      alert('Ocurrió un error inesperado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-slate-100">
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Crear Cuenta (Prueba)
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nombre Completo / Nombre de la Empresa
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Ej: Juan Pérez o Mi Empresa S.A."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tipo de Cuenta
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-slate-900"
            >
              <option value="postulante">Buscar Empleo (Postulante)</option>
              <option value="empresa">Ofrecer Empleo (Empresa)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900"
            />
          </div>

          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </div>

        <p className="text-center text-sm text-slate-600 mt-6">
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Ingresá acá
          </Link>
        </p>
      </div>
    </div>
  )
}
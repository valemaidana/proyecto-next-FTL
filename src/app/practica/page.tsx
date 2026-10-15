'use client'

import { useState } from 'react'

export default function PracticaRolesPage() {
  const [rolSimulado, setRolSimulado] = useState('postulante')

  return (
<main style={{ minHeight: '60vh', padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#e2e8f0', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>🧪 Panel de Práctica de Roles</h3>
        <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#475569' }}>
          Seleccioná un rol para probar cómo cambia la interfaz automáticamente:
        </p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setRolSimulado('postulante')}
            style={{ padding: '0.5rem 1rem', background: rolSimulado === 'postulante' ? '#059669' : '#fff', color: rolSimulado === 'postulante' ? '#fff' : '#333', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
          >
            👤 Vecino / Postulante
          </button>
          <button 
            onClick={() => setRolSimulado('empresa')}
            style={{ padding: '0.5rem 1rem', background: rolSimulado === 'empresa' ? '#2563eb' : '#fff', color: rolSimulado === 'empresa' ? '#fff' : '#333', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
          >
            🏢 Empresa
          </button>
          <button 
            onClick={() => setRolSimulado('admin')}
            style={{ padding: '0.5rem 1rem', background: rolSimulado === 'admin' ? '#7c3aed' : '#fff', color: rolSimulado === 'admin' ? '#fff' : '#333', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
          >
            👑 Administrador
          </button>
        </div>
      </div>

      {rolSimulado === 'admin' && (
        <div style={{ border: '2px solid #7c3aed', padding: '1.5rem', borderRadius: '8px', background: '#f5f3ff' }}>
          <h2 style={{ color: '#7c3aed', marginTop: 0 }}>Vista de Administrador 🛠️</h2>
          <p>Acá el admin puede moderar cuentas de empresas, aprobar ofertas pendientes y ver estadísticas globales del municipio.</p>
          <button style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}>
            Aprobar empresas pendientes
          </button>
        </div>
      )}

      {rolSimulado === 'empresa' && (
        <div style={{ border: '2px solid #2563eb', padding: '1.5rem', borderRadius: '8px', background: '#eff6ff' }}>
          <h2 style={{ color: '#2563eb', marginTop: 0 }}>Vista de Empresa 🏢</h2>
          <p>Acá la empresa gestiona sus propias búsquedas laborales y revisa los CVs de los postulantes que se inscribieron.</p>
          <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}>
            + Publicar nuevo puesto
          </button>
        </div>
      )}

      {rolSimulado === 'postulante' && (
        <div style={{ border: '2px solid #059669', padding: '1.5rem', borderRadius: '8px', background: '#f0fdf4' }}>
          <h2 style={{ color: '#059669', marginTop: 0 }}>Vista de Vecino / Postulante 👤</h2>
          <p>Acá el vecino busca ofertas abiertas, filtra por secretaría o área, y se postula completando su perfil.</p>
          <button style={{ background: '#059669', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}>
            Postularme a la oferta
          </button>
        </div>
      )}
    </main>
  )
}
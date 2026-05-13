// src/pages/Login.jsx
import { useState } from 'react'

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Email dan password wajib diisi.')
      return
    }
    setLoading(true)
    // Simulasi login — ganti dengan API call sesungguhnya
    setTimeout(() => {
      setLoading(false)
      if (form.email === 'admin@sawit.id' && form.password === 'sawit123') {
        onLogin()
      } else {
        setError('Email atau password salah. Coba: admin@sawit.id / sawit123')
      }
    }, 900)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a3a0f 0%, #2d5a1b 50%, #3d7a26 100%)' }}>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Leaf shapes */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-10"
            style={{
              width: `${120 + i * 60}px`,
              height: `${120 + i * 60}px`,
              background: 'radial-gradient(circle, #6abf3e, transparent)',
              top: `${[10, 60, 30, 80, 5, 70][i]}%`,
              left: `${[5, 85, 50, 15, 75, 40][i]}%`,
              transform: 'translate(-50%,-50%)',
              filter: 'blur(4px)',
            }} />
        ))}
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-4"
        style={{
          background: 'rgba(250,246,237,0.97)',
          borderRadius: '20px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
          overflow: 'hidden',
        }}>

        {/* Header strip */}
        <div className="px-8 py-6 text-center"
          style={{ background: 'linear-gradient(135deg, #2d5a1b, #c8900a)' }}>
          {/* Palm icon */}
          <div className="flex justify-center mb-3">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="26" fill="rgba(255,255,255,0.15)" />
              {/* trunk */}
              <rect x="23.5" y="28" width="5" height="14" rx="2.5" fill="#faf6ed"/>
              {/* fronds */}
              <ellipse cx="26" cy="20" rx="3" ry="10" fill="#6abf3e" transform="rotate(-30 26 20)"/>
              <ellipse cx="26" cy="20" rx="3" ry="10" fill="#4a9e26" transform="rotate(30 26 20)"/>
              <ellipse cx="26" cy="20" rx="3" ry="11" fill="#6abf3e" transform="rotate(0 26 20)"/>
              <ellipse cx="26" cy="20" rx="2.5" ry="9" fill="#4a9e26" transform="rotate(-60 26 20)"/>
              <ellipse cx="26" cy="20" rx="2.5" ry="9" fill="#4a9e26" transform="rotate(60 26 20)"/>
              {/* fruit bunch */}
              <circle cx="26" cy="30" r="4" fill="#c8900a"/>
              <circle cx="22" cy="33" r="2.5" fill="#f5c842"/>
              <circle cx="30" cy="33" r="2.5" fill="#f5c842"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white m-0" style={{ fontFamily: "'Playfair Display', serif" }}>
            SawitNusantara
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Portal Katalog Kelapa Sawit
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-7 flex flex-col gap-4">
          <p className="text-center text-sm font-medium mb-1" style={{ color: '#6b5e4e' }}>
            Masuk ke akun Anda
          </p>

          {error && (
            <div className="text-sm px-3 py-2 rounded-lg text-center"
              style={{ background: '#fff0f0', color: '#c0392b', border: '1px solid #f5c6c6' }}>
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#2d5a1b' }}>
              Email
            </label>
            <input
              type="email" name="email" autoComplete="email"
              placeholder="admin@sawit.id"
              value={form.email} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
              style={{
                border: '1.5px solid #d9cdb8',
                background: '#fdfaf5',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={e => e.target.style.borderColor = '#2d5a1b'}
              onBlur={e => e.target.style.borderColor = '#d9cdb8'}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#2d5a1b' }}>
              Password
            </label>
            <input
              type="password" name="password" autoComplete="current-password"
              placeholder="••••••••"
              value={form.password} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
              style={{
                border: '1.5px solid #d9cdb8',
                background: '#fdfaf5',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={e => e.target.style.borderColor = '#2d5a1b'}
              onBlur={e => e.target.style.borderColor = '#d9cdb8'}
            />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all mt-1"
            style={{
              background: loading ? '#aaa' : 'linear-gradient(135deg, #2d5a1b, #c8900a)',
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.5px',
              boxShadow: loading ? 'none' : '0 4px 16px rgba(45,90,27,0.30)',
            }}>
            {loading ? 'Memverifikasi...' : 'Masuk →'}
          </button>

          <p className="text-center text-xs mt-1" style={{ color: '#aaa' }}>
            Demo: admin@sawit.id · sawit123
          </p>
        </form>
      </div>
    </div>
  )
}

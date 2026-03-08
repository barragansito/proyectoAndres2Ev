import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function RegisterPage() {
  const navigate = useNavigate()
  const { register, authError, hasSupabaseConfig } = useAuth()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)
    const { error } = await register(form)
    setIsSubmitting(false)

    if (error) {
      setErrorMessage(error)
      return
    }
    navigate('/login', { replace: true })
  }

  return (
    <section className="auth-shell">
      <article className="panel auth-panel">
        <h1>V-TEC REGISTRY TERMINAL</h1>
        <h2>CREAR CUENTA</h2>
        {!hasSupabaseConfig ? (
          <p className="auth-warning">
            Configura `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en `.env` para registrar
            usuarios.
          </p>
        ) : null}

        {authError ? <p className="auth-error">{authError}</p> : null}
        {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Correo</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />

          <label htmlFor="password">Contrasena</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            minLength={6}
            required
          />

          <button type="submit" className="radio-btn" disabled={isSubmitting}>
            {isSubmitting ? 'CREANDO...' : 'REGISTRAR'}
          </button>
        </form>

        <p className="auth-help">
          Ya tienes cuenta? <Link to="/login">Iniciar sesion</Link>
        </p>
      </article>
    </section>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, authError, hasSupabaseConfig } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
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
    const { error } = await login(form)
    setIsSubmitting(false)

    if (error) {
      setErrorMessage(error)
      return
    }
    navigate('/stat', { replace: true })
  }

  return (
    <section className="auth-shell">
      <article className="panel auth-panel">
        <h1>V-TEC ACCESS TERMINAL</h1>
        <h2>INICIAR SESION</h2>
        {!hasSupabaseConfig ? (
          <p className="auth-warning">
            Configura `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en `.env` para activar el
            login.
          </p>
        ) : null}

        {authError ? <p className="auth-error">{authError}</p> : null}
        {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Correo</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />

          <label htmlFor="password">Contrasena</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="radio-btn" disabled={isSubmitting}>
            {isSubmitting ? 'CONECTANDO...' : 'ENTRAR'}
          </button>
        </form>

        <p className="auth-help">
          Sin cuenta? <Link to="/register">Crear nuevo usuario</Link>
        </p>
      </article>
    </section>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { hasSupabaseConfig, supabase } from '../../../services/supabaseClient'
import { AuthContext } from './authContextInstance'

async function fetchProfile(userId) {
  if (!supabase || !userId) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('username, role')
    .eq('id', userId)
    .maybeSingle()

  if (error || !data) return null
  return data
}

async function ensureProfile(user, usernameFromForm = '') {
  if (!supabase || !user) return null
  const username =
    usernameFromForm?.trim() || user.user_metadata?.username || user.email?.split('@')[0] || 'wastelander'

  const payload = {
    id: user.id,
    username,
    role: 'user',
  }

  const { error } = await supabase.from('profiles').upsert(payload, { onConflict: 'id' })
  if (error) return null
  return payload
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function bootstrapAuth() {
      if (!hasSupabaseConfig || !supabase) {
        setIsLoading(false)
        return
      }

      try {
        const { data, error } = await supabase.auth.getSession()
        if (!isMounted) return
        if (error) setAuthError(error.message)

        const currentSession = data?.session ?? null
        setSession(currentSession)

        if (currentSession?.user) {
          const currentProfile =
            (await fetchProfile(currentSession.user.id)) ?? (await ensureProfile(currentSession.user))
          if (isMounted) setProfile(currentProfile)
        }
      } catch (error) {
        if (!isMounted) return
        setAuthError(error instanceof Error ? error.message : 'Error inicializando sesion.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    bootstrapAuth()

    if (!supabase) return () => {}

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      try {
        setSession(nextSession)
        if (nextSession?.user) {
          const currentProfile =
            (await fetchProfile(nextSession.user.id)) ?? (await ensureProfile(nextSession.user))
          setProfile(currentProfile)
        } else {
          setProfile(null)
        }
      } catch (error) {
        setAuthError(error instanceof Error ? error.message : 'Error de sincronizacion de sesion.')
      }
    })

    return () => {
      isMounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const login = async ({ email, password }) => {
    if (!supabase) return { error: 'Configura las variables de Supabase para iniciar sesion.' }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const register = async ({ username, email, password }) => {
    if (!supabase) return { error: 'Configura las variables de Supabase para crear cuenta.' }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    })
    if (error) return { error: error.message }

    if (data.user) {
      await ensureProfile(data.user, username)
    }
    return { error: null }
  }

  const logout = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      profile,
      isLoading,
      authError,
      isAuthenticated: Boolean(session?.user),
      isAdmin: profile?.role === 'admin',
      displayName: profile?.username || session?.user?.email || 'COURIER 6',
      login,
      register,
      logout,
      hasSupabaseConfig,
    }),
    [authError, isLoading, profile, session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
